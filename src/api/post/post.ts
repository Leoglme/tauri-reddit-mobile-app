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

  static async homePage(filter: string, after?: string) {
    const hasFilter = filter && filter !== ""
    console.log({filter, after})
    if(!hasFilter && !after){
      console.log("1")
      return await axios.get(super.oauthRedditUrl, this.getOption())
    }
    else if (!hasFilter && after){
      console.log("2")
      const url = `${super.oauthRedditUrl}/?count=2&after=${after}`
      return await axios.get(url, this.getOption())
    }
    else if (hasFilter && !after){
      console.log("3")
      const url = `${super.oauthRedditUrl}/${filter}`
      return await axios.get(url, this.getOption())
    }
    else{
      console.log("4")
      const url = `${super.oauthRedditUrl}/${filter}/count=2&after=${after}`
      return await axios.get(url, this.getOption())
    }
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
