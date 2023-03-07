import type { PostModel } from '@/api/post/post.model'
export const addAvatarToPosts = (post: PostModel[], avatarUrls: Record<string, string | null>) => {
  return post.map((p) => {
    const avatarUrl = avatarUrls[p.data.subreddit]
    if (avatarUrl) {
      return { ...p, data: { ...p.data, avatarUrl } }
    }
    return p
  })
}
