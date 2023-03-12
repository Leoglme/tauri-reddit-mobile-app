import type { CommunityModel } from '@/api/community/community.model'

export type UserModel = {
  icon_img?: string
  title: string
  name: string
  display_name_prefixed: string
  display_name: string
  public_description: string
  banner_img?: string
  createdAt?: string
  user_is_subscriber: boolean

  accept_followers: boolean
  subreddit?: CommunityModel
  user_is_moderator: boolean
  subscribers: number
  comment_karma: number
  awardee_karma: number
  awarder_karma: number
  link_karma: number
}

export type Trophy = {
  data: {
    icon_70: string
    granted_at: number
    url: string | null
    icon_40: string
    name: string
    award_id: string
    id: string
    description: string | null
  }
}
