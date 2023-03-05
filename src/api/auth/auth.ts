import axios from 'axios'
import { BaseApi } from '@/api/BaseApi'

export class Auth extends BaseApi {
  static oauthRedditLoginUrl = `${this.redditApiUrl}/authorize?client_id=${this.redditClientId}&response_type=code&state=redditech&redirect_uri=${this.redirectUri}&duration=permanent&scope=*`

  static option = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }

  static async getToken(code: string) {
    if (this.redditClientId === undefined || this.redditSecret === undefined) {
      throw new Error('Missing REDDIT_CLIENT_ID or REDDIT_SECRET in .env file')
    }

    const option = {
      ...this.option,
      auth: {
        username: this.redditClientId,
        password: this.redditSecret,
      },
    }

    const url = `${this.redditApiUrl}/access_token?grant_type=authorization_code&code=${code}&redirect_uri=${this.redirectUri}`
    return await axios.post(url, null, option)
  }

  static async getUserConnected(token: string) {
    const url = `${this.oauthRedditApiUrl}/me`
    return await axios.get(url, { ...this.option, headers: { Authorization: 'Bearer ' + token } })
  }
}
