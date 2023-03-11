import { defineStore } from 'pinia'
import type { PostModel } from '@/api/post/post.model'

export const usePostStore = defineStore('post', {
  state: () => ({
    deletePostId: undefined as string | undefined,
    posts: [] as PostModel[],
  }),
  actions: {
    setDeletePostId(postId?: string) {
      this.deletePostId = postId
    },
    setPosts(posts: PostModel[]) {
      this.posts = posts
    },
    removePost(name?: string) {
      if (name) this.posts = this.posts.filter((p) => p.data.name !== name)
    },
  },
})
