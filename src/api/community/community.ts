import axios from 'axios'
import type { CommunityCommand } from './community.model'
import { BaseApi } from '@/api/BaseApi'
import { removeAmpUrl } from '@/utils/urlUtils'
import { getSubredditNamesInPosts } from '@/utils/imageUtils'
import { addAvatarToPosts } from '@/utils/formatUtils'
export class Community extends BaseApi {
  static async searchCommunity(communityName: string, limit = 8) {
    const url = `${this.redditCommonUrl}/subreddits/search.json?q=${communityName}&limit=${limit}`
    return await axios.get(url)
  }

  static async getCommunityInfo(communityName: string) {
    const url = this.oauthRedditUrl + '/r/' + communityName + '/about.json'
    return await axios.get(url, super.getOption())
  }

  static async getCommunitiesIcons(srNames: string[]) {
    const url = `${this.redditCommonUrl}/api/info.json?sr_name=${srNames.join(',')}`
    const icons: Record<string, string | null> = {}

    await axios
      .get(url)
      .then((response) => {
        if (response.data.data) {
          for (const subreddit of response.data.data.children) {
            const icon = removeAmpUrl(subreddit.data.community_icon || subreddit.data.icon_img)
            icons[subreddit.data.display_name] = icon || null
          }
        }
      })
      .catch((error) => {
        console.log(error)
      })
    return icons
  }

  static async createCommunity(command: CommunityCommand) {
    const body = {
      public_description: command.communityDescription,
      name: command.communityName,
      api_type: 'json',
      type: command.type,
      over_18: command.over18,
      restrict_commenting: command.restrictCommenting,
      restrict_posting: command.restrictPosting,
    }
    const url = `${this.oauthRedditApiUrl}/subreddit/create_subreddit`
    return await axios.post(url, body, super.getOption())
  }

  static async userCommunityList() {
    const url = `${this.oauthRedditUrl}/subreddits/mine/subscriber`
    return await axios.get(url, super.getOption())
  }

  static async getPosts(communityName: string, filter: string, after?: string, limit = 10) {
    const url = `${this.oauthRedditUrl}/r/${communityName}/${filter}?limit=${limit}&after=${after}`
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

  static async getModerators(communityName: string) {
    const url = `${this.oauthRedditUrl}/r/${communityName}/about/moderators.json`
    return await axios.get(url, Community.getOption())
  }
  static async getRules(communityName: string) {
    const url = `${this.oauthRedditUrl}/r/${communityName}/about/rules.json`
    return await axios.get(url, Community.getOption())
  }
}
