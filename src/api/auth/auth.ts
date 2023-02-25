import axios from "axios"

export class Auth {
    static token = localStorage.getItem("access_token")

    static option = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }

    static async getToken(code: string) {
        const option = {
            ...this.option, auth: {
                username: '092USZcSP0ni2yftuo1q6w',
                password: 'aosKrwSibpOH-mC5kcDR6syjX9xWnw'
            }
        }
        let url = "https://www.reddit.com/api/v1/access_token?grant_type=authorization_code&code=" + code + "&redirect_uri=http://localhost:1420/access-token"
        return await axios.post(url, null, option)
    }

    static async getUserConnected() {
        let url = "https://oauth.reddit.com/api/v1/me"
        return await axios.get(url, {...this.option, headers: {"Authorization": "Bearer " + this.token }})
    }

}