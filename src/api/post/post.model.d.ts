export type PostCommand = {
  sr: string
  title: string
  text?: string
  spoiler?: boolean
  submit_type: 'profile' | 'subreddit'
  nsfw?: boolean
}

export type Preview = {
  images: { resolutions: { height: number; url: string; width: number }[] }[]
}

export type VideoModel = {
  bitrate_kbps: number
  fallback_url: string
  height: number
  width: number
  duration: number
  is_gif: boolean
  transcoding_status: string
}

export type PreviewImage = {
  gif: string
  y: number
  x: number
  u: string
}

export type ImageInfo = {
  status: string
  e: string
  m: string
  p: PreviewImage[]
  s: PreviewImage
  id: string
}
export type ImageInfoMap = {
  [id: string]: ImageInfo
}

export type PollOption = {
  text: string
  vote_count: number
  id: string
}

export type PollData = {
  prediction_status: null | string
  total_stake_amount: null | string
  voting_end_timestamp: number
  options: PollOption[]
  vote_updates_remained: null | number
  is_prediction: boolean
  resolved_option_id: null | string
  user_won_amount: null | string
  user_selection: string
  total_vote_count: number
  tournament_id: null | string
}

export type PostModel = {
  data: {
    subreddit_name_prefixed: string
    author?: string
    title: string
    name: string
    id: string
    subreddit: string
    url: string
    url_overridden_by_dest: string
    secure_media_embed?: { content: string }
    time: string
    created_utc: number
    selftext?: string
    is_video: boolean
    can_mod_post: boolean
    preview?: Preview
    avatarUrl?: string
    media_metadata: ImageInfoMap
    poll_data?: PollData
    media?: {
      reddit_video: VideoModel
    }
  }
}
