import axios from 'axios'
import { PostCommand } from './post.model'
import { Community } from '@/api/community/community'
import { getSubredditNamesInPosts } from '@/utils/imageUtils'
import { addAvatarToPosts } from '@/utils/formatUtils'
import { BaseApi } from '@/api/BaseApi'

export class Post extends BaseApi {
  static getOption() {
    return {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      },
    }
  }

  static async homePage() {
    return await axios.get(super.oauthRedditUrl, this.getOption())
  }

  static async getPostUser(username: string) {
    const url = `${super.oauthRedditUrl}/user/${username}/submitted`
    const posts = await axios.get(url, this.getOption())
    let children = posts.data?.data?.children

    if (children) {
      const subreddits = getSubredditNamesInPosts(children)
      const communitiesIcons = await Community.getCommunitiesIcons(subreddits)
      children = addAvatarToPosts(children, communitiesIcons)

      posts.data.data.children = children
    }

    return posts
  }

  static async createPost(post: PostCommand) {
    const body = {
      title: post.title,
      text: post.text,
      submit_type: 'profile',
      api_type: 'json',
      show_error_list: true,
      spoiler: post.spoiler,
      nsfw: post.nsfw,
      kind: 'self',
    }
    const url = `${super.oauthRedditUrl}/api/submit`
    return await axios.post(url, body, this.getOption())
  }

  static async deletePost(idPost: string) {
    const body = {
      id: idPost,
    }
    const url = `${super.oauthRedditUrl}/api/del`
    return await axios.post(url, body, this.getOption())
  }
}
