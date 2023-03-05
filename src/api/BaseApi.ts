import axios from 'axios'

export abstract class BaseApi {
  static redditApiUrl = 'https://www.reddit.com/api/v1'
  static oauthRedditUrl = 'https://oauth.reddit.com'
  static oauthRedditApiUrl = this.oauthRedditUrl + '/api/v1'
  static redirectUri = 'http://localhost:1420/access-token'
  static redditClientId = import.meta.env.VITE_REDDIT_CLIENT_ID
  static redditSecret = import.meta.env.VITE_REDDIT_SECRET

  static getOption() {
    return {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      },
    }
  }

  static async subscribe(communityName: string) {
    const body = {
      action: 'sub',
      sr_name: communityName,
    }
    const url = `${this.oauthRedditUrl}/api/subscribe`
    return await axios.post(url, body, this.getOption())
  }

  static async unsubscribe(communityName: string) {
    const body = {
      action: 'unsub',
      sr_name: communityName,
    }
    const url = `${this.oauthRedditUrl}/api/subscribe`
    return await axios.post(url, body, this.getOption())
  }
}
