import { Post } from './post'
import axios from 'axios'
import { vi, describe, afterEach, it, expect, beforeEach } from 'vitest'
import type { PostCommand } from '@/api/post/post.model'

const expectedOption = {
  headers: { Authorization: 'Bearer test_token', 'Content-Type': 'application/x-www-form-urlencoded' },
}
describe('Post', () => {
  beforeEach(() => {
    vi.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} })
    vi.spyOn(axios, 'post').mockResolvedValueOnce({ data: {} })
    vi.spyOn(axios, 'delete').mockResolvedValueOnce({ data: {} })
    vi.spyOn(axios, 'put').mockResolvedValueOnce({ data: {} })

    vi.spyOn(Post, 'getOption').mockReturnValue(expectedOption)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should make a POST request to create a new post', async () => {
    const subredditName = 'test_subreddit'

    const expectedResponse = {
      data: { success: true },
    }

    const expectedData = {
      api_type: 'json',
      kind: 'self',
      show_error_list: true,
      sr: 'test',
      title: subredditName,
      text: undefined,
      spoiler: undefined,
      submit_type: 'profile',
      nsfw: undefined,
    }

    // mock axios.post pour renvoyer une réponse réussie
    vi.spyOn(axios, 'post').mockResolvedValue(expectedResponse)
    const command: PostCommand = { title: subredditName, sr: 'test', submit_type: 'profile' }
    // appeler la méthode createPost et vérifier que les arguments sont correctement passés à axios.post
    const response = await Post.createPost(command)

    expect(axios.post).toHaveBeenCalledWith(Post.oauthRedditUrl + '/api/submit', expectedData, {
      headers: {
        Authorization: 'Bearer test_token',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    expect(response).toEqual(expectedResponse)
  })

  describe('homePage', () => {
    it('should retrieve the home page', async () => {
      const expectedUrl = `${Post.oauthRedditUrl}/hot?limit=5&after=test`
      await Post.homePage('hot', 'test', 5)
      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(axios.get).toHaveBeenCalledWith(expectedUrl, expectedOption)
    })
  })

  describe('getPostUser', () => {
    it('should retrieve posts by user', async () => {
      const username = 'test_user'
      const expectedUrl = `${Post.oauthRedditUrl}/user/${username}/submitted?limit=5&after=test`
      await Post.getPostUser(username, 'test', 5)
      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(axios.get).toHaveBeenCalledWith(expectedUrl, expectedOption)
    })
  })

  describe('subscribe', () => {
    it('should subscribe to a subreddit', async () => {
      const communityName = 'test_subreddit'
      const expectedUrl = `${Post.oauthRedditUrl}/api/subscribe`
      const expectedBody = { action: 'sub', sr_name: communityName }
      await Post.subscribe(communityName)
      expect(axios.post).toHaveBeenCalledTimes(1)
      expect(axios.post).toHaveBeenCalledWith(expectedUrl, expectedBody, expectedOption)
    })
  })

  describe('unsubscribe', () => {
    it('should unsubscribe to a subreddit', async () => {
      const communityName = 'test_subreddit'
      const expectedUrl = `${Post.oauthRedditUrl}/api/subscribe`
      const expectedBody = { action: 'unsub', sr_name: communityName }
      await Post.unsubscribe(communityName)
      expect(axios.post).toHaveBeenCalledTimes(1)
      expect(axios.post).toHaveBeenCalledWith(expectedUrl, expectedBody, expectedOption)
    })
  })
})
