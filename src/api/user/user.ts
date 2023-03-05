import axios from 'axios'
import { BaseApi } from '@/api/BaseApi'

export class User extends BaseApi {
  static sr = localStorage.getItem('sr') || ''

  static async getUserInfo(username: string) {
    const url = `${super.oauthRedditUrl}/user/${username}/about.json`
    return await axios.get(url, super.getOption())
  }

  static async updateUserInfo(newDescription: string, newTitle: string) {
    const body = {
      public_description: newDescription,
      title: newTitle,
      api_type: 'json',
      type: 'user',
      sr: this.sr,
      link_type: 'any',
    }
    const url = `${super.oauthRedditUrl}/api/site_admin`
    await axios.post(url, new URLSearchParams(body), super.getOption())
  }

  static async getUserTrophies(username: string) {
    const url = `${super.oauthRedditUrl}/user/${username}/trophies.json`
    return await axios.get(url, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      },
    })
  }
}
