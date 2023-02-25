import axios from "axios";
import {PostCommand} from "./post.model";

export class Post {
    static option = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + localStorage.getItem("access_token")
        }
    }

    static async homePage(){
        let url = "https://oauth.reddit.com"
        return await axios.get(url, this.option);
    }

    static async getPostUser(username: string){
        let url = "https://oauth.reddit.com/user/" + username + "/submitted"
        return await axios.get(url, this.option)
    }

    static async createPost(post: PostCommand){
        const body = {
            "title": post.title,
            "text": post.text,
            "submit_type": "profile",
            "api_type": "json",
            "show_error_list": true,
            "spoiler": post.spoiler,
            "nsfw": post.nsfw,
            "kind": "self"
        }
        let url = "https://oauth.reddit.com/api/submit"
        return await axios.post(url, body, this.option);
    }

    static async deletePost(idPost: string){
        const body = {
            "id": idPost
        }
        let url = "https://oauth.reddit.com/api/del"
        return await axios.post(url, body, this.option);
    }
}