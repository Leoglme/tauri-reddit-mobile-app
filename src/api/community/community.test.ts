import axios from 'axios'
import { Community } from './community'
import { describe, afterEach, it, expect, beforeEach, vi } from 'vitest'
import type { CommunityCommand } from '@/api/community/community.model'

const expectedOption = {
  headers: { Authorization: 'Bearer test_token', 'Content-Type': 'application/x-www-form-urlencoded' },
}
describe('Community', () => {
  beforeEach(() => {
    vi.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} })
    vi.spyOn(axios, 'post').mockResolvedValueOnce({ data: {} })
    vi.spyOn(Community, 'getOption').mockReturnValue(expectedOption)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('searchCommunity', () => {
    it('should call axios.get with correct url and parameters', async () => {
      const communityName = 'test'
      const limit = 8
      const expectedUrl = `${Community.redditCommonUrl}/subreddits/search.json?q=${communityName}&limit=${limit}`

      await Community.searchCommunity(communityName, limit)

      expect(axios.get).toHaveBeenCalledWith(expectedUrl)
    })
  })

  describe('getCommunityInfo', () => {
    it('should call axios.get with correct url and parameters', async () => {
      const communityName = 'test'
      const expectedUrl = `${Community.oauthRedditUrl}/r/${communityName}/about.json`

      await Community.getCommunityInfo(communityName)

      expect(axios.get).toHaveBeenCalledWith(expectedUrl, expect.any(Object))
    })
  })

  describe('getCommunitiesIcons', () => {
    it('should call axios.get with correct url and parameters', async () => {
      const srNames = ['test1', 'test2']
      const expectedUrl = `${Community.redditCommonUrl}/api/info.json?sr_name=${srNames.join(',')}`

      await Community.getCommunitiesIcons(srNames)

      expect(axios.get).toHaveBeenCalledWith(expectedUrl)
    })
  })

  describe('createCommunity', () => {
    it('should call axios.post with correct url, body and headers', async () => {
      const command: CommunityCommand = {
        communityDescription: 'test',
        communityName: 'test',
        type: 'public',
        over18: false,
        restrictCommenting: false,
        restrictPosting: false,
      }
      const expectedUrl = `${Community.oauthRedditApiUrl}/subreddit/create_subreddit`
      const expectedBody = {
        public_description: command.communityDescription,
        name: command.communityName,
        api_type: 'json',
        type: command.type,
        over_18: command.over18,
        restrict_commenting: command.restrictCommenting,
        restrict_posting: command.restrictPosting,
      }

      await Community.createCommunity(command)

      expect(axios.post).toHaveBeenCalledWith(expectedUrl, expectedBody, expect.any(Object))
    })
  })

  describe('userCommunityList', () => {
    it('should call axios.get with correct url and headers', async () => {
      const expectedUrl = `${Community.oauthRedditUrl}/subreddits/mine/subscriber`

      await Community.userCommunityList()

      expect(axios.get).toHaveBeenCalledWith(expectedUrl, expect.any(Object))
    })
  })

  describe('getPosts', () => {
    it('should call axios.get with correct parameters', async () => {
      const communityName = 'test'
      const after = 'testAfter'
      const limit = 5

      await Community.getPosts(communityName, 'hot', after, limit)

      expect(axios.get).toHaveBeenCalledWith(
        `${Community.oauthRedditUrl}/r/${communityName}/hot?limit=${limit}&after=${after}`,
        Community.getOption()
      )
    })
  })

  describe('getModerators', () => {
    it('should call axios.get with correct parameters', async () => {
      const communityName = 'test'

      await Community.getModerators(communityName)

      expect(axios.get).toHaveBeenCalledWith(
        `${Community.oauthRedditUrl}/r/${communityName}/about/moderators.json`,
        expectedOption
      )
    })
  })
  describe('getRules', () => {
    it('should make a GET request to the correct URL', async () => {
      const communityName = 'testcommunity'
      const expectedUrl = `${Community.oauthRedditUrl}/r/${communityName}/about/rules.json`
      const expectedResponse = { data: {} }

      const response = await Community.getRules(communityName)

      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(axios.get).toHaveBeenCalledWith(expectedUrl, expect.any(Object))
      expect(response).toEqual(expectedResponse)
    })

    it('should pass the correct options to axios.get', async () => {
      const communityName = 'testcommunity'

      const response = await Community.getRules(communityName)

      expect(axios.get).toHaveBeenCalledWith(
        `${Community.oauthRedditUrl}/r/testcommunity/about/rules.json`,
        expectedOption
      )
      expect(response).toEqual({ data: {} })
    })
  })
})
