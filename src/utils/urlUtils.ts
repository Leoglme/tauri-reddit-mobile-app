export function selfTextIsLinkFormat(inputString?: string): boolean {
  if (!inputString) return false
  const regex = /\[(.+)\]\((https?:\/\/[^\s]+)\)|\[(.+)\]\((.+)\)/
  return regex.test(inputString)
}

export function removeLinkInSelfText(inputString: string) {
  return inputString.replace(/\[.*?\]\([^)]+\)/g, '').trim()
}

export const removeAmpUrl = (url?: string) => {
  if (!url) return undefined
  return url.replace(/amp;/g, '')
}

export function extractDomain(url: string): string | null {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp']
  const domain = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
  for (const extension of imageExtensions) {
    if (domain.endsWith(extension)) {
      return null
    }
  }
  return domain
}
