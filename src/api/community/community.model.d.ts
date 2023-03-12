export type CommunityCommand = {
  communityDescription: string
  communityName: string
  type: 'private' | 'public'
  over18: boolean
  restrictCommenting: boolean
  restrictPosting: boolean
}

export type CommunityModel = {
  display_name: string

  key_color?: string
  subscribers: number
  accounts_active: number
  created_utc: number
  public_description: string
  user_is_subscriber: boolean
  user_is_moderator?: boolean
  community_icon?: string
  banner_img?: string
  mobile_banner_image?: string
}

export type CommunityModeratorModel = {
  name: string
  author_flair_text: string
  mod_permissions: string[]
  date: number
  rel_id: string
  id: string
  author_flair_css_class: string
}

export type CommunityRuleModel = {
  kind: string
  description: string
  short_name: string
  violation_reason: string
  created_utc: number
  priority: number
  description_html: string
}
