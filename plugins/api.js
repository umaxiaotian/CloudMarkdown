export default function ({ $axios }, inject) {
    const api = new API($axios)
  
    inject('api', api)
  }
  
  class API {
    constructor (axios) {
      this.axios = axios
    }   
    
    BaseUrl="http://localhost:8000";
    ///////////////////////
    //　　非会員向けAPI　 //
    ///////////////////////

    async apiGet(url,header={},params={}){
        return await this.axios.$get(this.BaseUrl+url,{
            headers: header,
            params: params
        })
        .catch(err => err.response || {noResponse:true})
    }
    async apiLogin(url,params={}){
      var user_params = new URLSearchParams();
      user_params.append('username', params.username);
      user_params.append('password', params.password);
      return await this.axios.$post(this.BaseUrl+url,user_params)
      .catch(err => err.response || {noResponse:true})
  }
    ///////////////////////
    //　認証会員向けAPI　 //
    ///////////////////////
}