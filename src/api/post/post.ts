import axios from 'axios'
import type { PostCommand } from './post.model'
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

  static async homePage(filter: string, after?: string, limit = 10) {
    const url = `${this.oauthRedditUrl}/${filter}?limit=${limit}&after=${after}`
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

  static async getPostUser(username: string, after?: string, limit = 10) {
    const url = `${this.oauthRedditUrl}/user/${username}/submitted?limit=${limit}&after=${after}`
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
      sr: post.sr,
      title: post.title,
      text: post.text,
      submit_type: post.submit_type,
      api_type: 'json',
      show_error_list: true,
      spoiler: post.spoiler,
      nsfw: post.nsfw,
      kind: 'self',
    }
    const url = `${this.oauthRedditUrl}/api/submit`
    return await axios.post(url, body, this.getOption())
  }

  static async deletePost(postID?: string) {
    const body = {
      id: postID,
    }
    const url = `${this.oauthRedditUrl}/api/del`
    return await axios.post(url, body, this.getOption())
  }
}
