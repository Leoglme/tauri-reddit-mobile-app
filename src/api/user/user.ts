import axios from "axios";

export class User {
    static sr = localStorage.getItem("sr") || ""

    static option = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + localStorage.getItem("access_token")
        }
    }

    static async getUserInfo(username: string) {
        let url = "https://www.reddit.com/user/" + username + "/about.json"
        return await axios.get(url)
    }

    static async updateUserInfo(newDescription: string, newTitle: string){

        const body = {
            "public_description": newDescription,
                "title": newTitle,
                "api_type": "json",
                "type": "user",
                "sr": this.sr,
                "link_type": "any"
        }
        let url = "https://oauth.reddit.com/api/site_admin"
        await axios.post(url, new URLSearchParams(body), this.option)
    }
}