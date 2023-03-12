import axios from 'axios'
import { Auth } from './auth'
import { vi, describe, afterEach, it, expect, beforeEach } from 'vitest'
import { BaseApi } from '@/api/BaseApi'

describe('Auth', () => {
  const code = 'some_code'
  const token = 'some_token'

  beforeEach(() => {
    vi.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} })
    vi.spyOn(axios, 'post').mockResolvedValueOnce({ data: {} })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })
  describe('getToken', () => {
    it('should call the correct endpoint with the correct parameters and return the token', async () => {
      const expectedOption = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: BaseApi.redditClientId,
          password: BaseApi.redditSecret,
        },
      }
      const expectedUrl = `${Auth.redditApiUrl}/access_token?grant_type=authorization_code&code=${code}&redirect_uri=${Auth.redirectUri}`

      await Auth.getToken(code)

      expect(axios.post).toHaveBeenCalledTimes(1)
      expect(axios.post).toHaveBeenCalledWith(expectedUrl, null, expectedOption)
    })
  })

  describe('getUserConnected', () => {
    it('should call the correct endpoint with the correct parameters and return the user connected', async () => {
      const expectedOption = {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
      const expectedUrl = `${Auth.oauthRedditApiUrl}/me`

      await Auth.getUserConnected(token)

      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(axios.get).toHaveBeenCalledWith(expectedUrl, expectedOption)
    })
  })
})
