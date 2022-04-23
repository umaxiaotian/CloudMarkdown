export default function ({ $api, store, $swal,  }, inject) {
    const util = new Util($api, store, $swal, )
    inject('util', util)
}
// import store from '@/store/index.js';
class Util {
    constructor(api, store, swal) {
        this.api = api
        this._store = store
        this.swal = swal
    }

    //共通処理
    async isLogin() {
        const acsessToken = this._store.getters.accessToken;
        const refreshToken = this._store.getters.refreshToken;
        if (acsessToken && refreshToken) {
            const header = { 'Authorization': 'Bearer ' + acsessToken }
            const user = await this.api.apiGet("/user/me/", header);
            if (user.name) {
                return true
            } else {
                this.refreshTokenReLogin();
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
        if (reLogin.access_token) {
            this._store.commit("accessToken", reLogin.access_token);
            this._store.commit("refreshToken", reLogin.refresh_token);
        } else if (reLogin.data.detail == "Token_Expired") {
            this._store.commit("accessToken", null);
            this._store.commit("refreshToken", null);
            this.swal.fire({
                icon: "error",
                title: "再度ログインしてください",
                text: "アクセストークンの期間が切れました。",
            });

        }
        else {
            this.swal.fire({
                icon: "error",
                title: "エラー",
                text: reLogin.data.detail,
            });
        }
        // return reLogin
    }
    async getUserName() {

        const status = await this.isLogin()
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

    //ログイン中のみ使用可能なGET
    async authGet(url,params={}) {

        const status = await this.isLogin()
        if (status) {
            const acsessToken = this._store.getters.accessToken;
            const header = { 'Authorization': 'Bearer ' + acsessToken }
            const result = await this.api.apiGet(url, header);
           
            return result
        }
    }

    //ExtraResourceのファイルパスを取得
    getExtraResource(item) {
    var BaseUrl = process.env.baseUrl;
      return BaseUrl+"/extraResource/"+item
    }
    
     





}