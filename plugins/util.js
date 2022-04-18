export default function ({ $api, store }, inject) {
    const util = new Util($api, store)
    inject('util', util)
}
// import store from '@/store/index.js';
class Util {
    constructor(api, store) {
        this.api = api
        this._store = store
    }

    //ログイン中か確認する
    async isLogin() {
        const acsessToken = this._store.getters.accessToken;
        const refreshToken = this._store.getters.refreshToken;
        if (acsessToken && refreshToken) {
            const header = { 'Authorization': 'Bearer ' + acsessToken }
            const user = await this.api.apiGet("/user/me/", header);
            if (user) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    //セッション切れの際の自動ログイン
    async refreshTokenReLogin() {
        const refreshToken = this._store.getters.refreshToken;
        const header = { 'Authorization': 'Bearer ' + refreshToken }
        const reLogin = await this.api.apiGet("/refresh_token/", header);

        this._store.commit("accessToken", reLogin.access_token);
        this._store.commit("refreshToken", reLogin.refresh_token);

        // return reLogin
    }
    async getUserName() {

        const status = this.isLogin()
        if (status) {
            const acsessToken = this._store.getters.accessToken;
            const header = { 'Authorization': 'Bearer ' + acsessToken }
            const user = await this.api.apiGet("/user/me/", header);
            // if (user.data.detail & user.data.detail == "Token_Expired") {
            //     // リフレッシュトークンで更新
            //     this.refreshTokenReLogin();
            // }
            return user
        }
    }
}