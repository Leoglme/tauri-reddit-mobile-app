import axios from 'axios'
import type { CommunityCommand } from './community.model'
import { BaseApi } from '@/api/BaseApi'
import { removeAmpUrl } from '@/utils/urlUtils'
export class Community extends BaseApi {
  static async searchCommunity(communityName: string) {
    const url = 'https://www.reddit.com/subreddits/search.json?q=' + communityName + '&limit=8'
    return await axios.get(url)
  }

  static async getCommunityInfo(communityName: string) {
    const url = super.oauthRedditUrl + '/r/' + communityName + '/about.json'
    return await axios.get(url, super.getOption())
  }

  static async getCommunitiesIcons(srNames: string[]) {
    const url = `https://www.reddit.com/api/info.json?sr_name=${srNames.join(',')}`
    const icons: Record<string, string | null> = {}

    await axios
      .get(url)
      .then((response) => {
        for (const subreddit of response.data.data.children) {
          icons[subreddit.data.display_name] = removeAmpUrl(subreddit.data.community_icon || subreddit.data.icon_img)
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
    const url = `${super.oauthRedditApiUrl}/subreddit/create_subreddit`
    return await axios.post(url, body, super.getOption())
  }

  static async userCommunityList() {
    const url = `${super.oauthRedditUrl}/subreddits/mine/subscriber`
    return await axios.get(url, super.getOption())
  }

  static async hotPostCommunity(communityName: string) {
    const url = 'https://www.reddit.com/r/' + communityName + '/hot.json'
    return await axios.get(url)
  }
}
