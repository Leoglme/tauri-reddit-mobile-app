export abstract class BaseApi {
    static redditApiUrl = 'https://www.reddit.com/api/v1'
    static oauthRedditApiUrl = 'https://oauth.reddit.com/api/v1'
    static redirectUri = 'http://localhost:1420/access-token'
    static redditClientId = import.meta.env.VITE_REDDIT_CLIENT_ID;
    static redditSecret = import.meta.env.VITE_REDDIT_SECRET;
}
