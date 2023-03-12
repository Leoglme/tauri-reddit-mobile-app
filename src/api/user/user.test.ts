import axios from 'axios'
import { vi, describe, beforeEach, it, expect } from 'vitest'
import { User } from './user'

// Mock axios requests
vi.mock('axios', () => {
  return {
    default: {
      get: vi.fn(),
      post: vi.fn(),
    },
  }
})

describe('User', () => {
  beforeEach(() => {
    // Clear static variables before each test
    User.sr = ''
    localStorage.clear()
  })

  describe('getUserInfo', () => {
    it('should make a GET request to the correct URL', async () => {
      const expectedUrl = `${User.oauthRedditUrl}/user/testuser/about.json`
      const expectedOptions = User.getOption()

      await User.getUserInfo('testuser')

      expect(axios.get).toHaveBeenCalledWith(expectedUrl, expectedOptions)
    })
  })

  describe('updateUserInfo', () => {
    it('should make a POST request to the correct URL', async () => {
      const expectedUrl = `${User.oauthRedditUrl}/api/site_admin`
      const expectedBody = new URLSearchParams({
        public_description: 'new description',
        title: 'new title',
        api_type: 'json',
        type: 'user',
        sr: '',
        link_type: 'any',
      })
      const expectedOptions = User.getOption()

      await User.updateUserInfo('new description', 'new title')

      expect(axios.post).toHaveBeenCalledWith(expectedUrl, expectedBody, expectedOptions)
    })
  })

  describe('getUserTrophies', () => {
    it('should make a GET request to the correct URL with the access token in the headers', async () => {
      const expectedUrl = `${User.oauthRedditUrl}/user/testuser/trophies.json`
      const expectedOptions = {
        headers: {
          Authorization: 'Bearer testAccessToken',
        },
      }
      localStorage.setItem('access_token', 'testAccessToken')

      await User.getUserTrophies('testuser')

      expect(axios.get).toHaveBeenCalledWith(expectedUrl, expectedOptions)
    })
  })
})
