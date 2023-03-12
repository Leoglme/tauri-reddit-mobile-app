import type { ImageInfoMap, PostModel, Preview } from '@/api/post/post.model'
import { removeAmpUrl } from '@/utils/urlUtils'

type Image = {
  src?: string
  alt: string
}

export function getSubredditNamesInPosts(children: PostModel[]): string[] {
  const subredditList = children.map((child) => child.data.subreddit)
  return subredditList.filter((subreddit, index) => subredditList.indexOf(subreddit) === index)
}

export const getImageInPreview = (preview?: Preview) => {
  const images = preview?.images[0]?.resolutions
  if (!images) return undefined
  // Set browser width and height
  const screenWidth = window.innerWidth

  let bestFitImage = images[0]
  for (let i = 1; i < images.length; i++) {
    const image = images[i]
    if (image.width > bestFitImage.width && image.width <= screenWidth) {
      bestFitImage = image
    }
  }
  return removeAmpUrl(bestFitImage.url)
}

export const getBestImages = (previewData: ImageInfoMap): Image[] => {
  const screenWidth = window.innerWidth
  const images: Image[] = []

  for (const key in previewData) {
    const resolutions = previewData[key].p
    if (resolutions) {
      let bestFitImage = resolutions[0]
      for (let i = 1; i < resolutions.length; i++) {
        const resolution = resolutions[i]
        if (resolution.x > bestFitImage.x && resolution.x <= screenWidth) {
          bestFitImage = resolution
        }
      }
      const isGif = previewData[key].m === 'image/gif'
      const src = isGif ? previewData[key].s.gif : bestFitImage.u

      images.push({
        src: removeAmpUrl(src),
        alt: key,
      })
    }
  }

  return images
}
