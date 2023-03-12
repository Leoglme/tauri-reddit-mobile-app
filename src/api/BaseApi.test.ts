import { BaseApi } from './BaseApi'
import { vi, describe, afterEach, it, expect, beforeEach } from 'vitest'
import axios from 'axios'

// Mock axios requests
vi.mock('axios', () => {
  return {
    default: {
      get: vi.fn(),
      post: vi.fn(),
    },
  }
})
const expectedOption = {
  headers: { Authorization: 'Bearer test_token', 'Content-Type': 'application/x-www-form-urlencoded' },
}
describe('BaseApi', () => {
  beforeEach(() => {
    vi.spyOn(axios, 'post').mockResolvedValueOnce({ data: {} })
    vi.spyOn(BaseApi, 'getOption').mockReturnValue(expectedOption)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })
  describe('subscribe', () => {
    afterEach(() => {
      vi.resetAllMocks()
    })

    it('should send a POST request to the correct URL with the correct data', async () => {
      const communityName = 'testCommunity'

      const expectedBody = {
        action: 'sub',
        sr_name: communityName,
      }

      const expectedUrl = `${BaseApi.oauthRedditUrl}/api/subscribe`

      const expectedResponse = { data: {} }

      const response = await BaseApi.subscribe(communityName)

      expect(axios.post).toHaveBeenCalledWith(expectedUrl, expectedBody, expectedOption)
      expect(response).toEqual(expectedResponse)
    })
  })
})
