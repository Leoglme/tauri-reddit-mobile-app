export type CommunityCommand = {
  communityDescription: string
  communityName: string
  type: 'private' | 'public'
  over18: boolean
  restrictCommenting: boolean
  restrictPosting: boolean
}
