export type PostCommand = {
    title: string,
    text: string,
    spoiler: boolean,
    nsfw: boolean,
}

export type PostModel = {
    data: {
        subreddit_name_prefixed: string,
        title: string,
        time: string,
        selftext?: string,
        image?: string,
        avatarUrl?: string
    }
}