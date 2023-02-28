import axios from "axios";
import type {CommunityCommand} from "./community.model"
export class Community{
    static option = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + localStorage.getItem("access_token")
        }
    }

    static async searchCommunity(communityName: string) {
        let url = "https://www.reddit.com/subreddits/search.json?q=" + communityName + "&limit=8"
        return await axios.get(url)
    }

    static async getCommunityInfo(communityName: string) {
        let url = "https://oauth.reddit.com/r/" + communityName + "/about.json"
        return await axios.get(url, this.option)
    }

    static async createCommunity(command: CommunityCommand) {
        const body = {
            "public_description": command.communityDescription,
            "name": command.communityName,
            "api_type": "json",
            "type": command.type,
            "over_18": command.over18,
            "restrict_commenting": command.restrictCommenting,
            "restrict_posting": command.restrictPosting
        }
        let url = "https://oauth.reddit.com/api/v1/subreddit/create_subreddit"
        return await axios.post(url, body, this.option)
    }

    static async userCommunityList(){
        let url = "https://oauth.reddit.com/subreddits/mine/subscriber"
        return await axios.get(url, this.option)
    }

    static async hotPostCommunity(communityName: string){
        let url = "https://www.reddit.com/r/" + communityName + "/hot.json"
        return await axios.get(url)
    }

    static async subscribeCommunity(communityName: string){
        const body = {
            "action": "sub",
            "sr_name": communityName,
        }
        let url = "https://oauth.reddit.com/api/subscribe"
        return await axios.post(url, body, this.option)
    }

    static async unsubscribeCommunity(communityName: string){
        const body = {
            "action": "unsub",
            "sr_name": communityName,
        }
        let url = "https://oauth.reddit.com/api/subscribe"
        return await axios.post(url, body, this.option)
    }

}