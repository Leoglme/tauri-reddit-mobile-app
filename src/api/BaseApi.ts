import axios from 'axios'
import platform from 'platform'

export abstract class BaseApi {
  static isInMobile = platform.os?.family === 'Android'
  static redditCommonUrl = 'https://www.reddit.com'
  static redditApiUrl = 'https://www.reddit.com/api/v1'
  static oauthRedditUrl = 'https://oauth.reddit.com'
  static oauthRedditApiUrl = this.oauthRedditUrl + '/api/v1'
  static redirectUri = this.isInMobile
    ? import.meta.env.VITE_REDDIT_REDIRECT_URI_MOBILE
    : import.meta.env.VITE_REDDIT_REDIRECT_URI
  static redditClientId = this.isInMobile
    ? import.meta.env.VITE_REDDIT_CLIENT_ID_MOBILE
    : import.meta.env.VITE_REDDIT_CLIENT_ID
  static redditSecret = this.isInMobile ? import.meta.env.VITE_REDDIT_SECRET_MOBILE : import.meta.env.VITE_REDDIT_SECRET

  static getAccessToken() {
    return localStorage.getItem('access_token')
  }

  static getOption() {
    return {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + this.getAccessToken(),
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
