export default function ({ $axios }, inject) {
    const api = new API($axios)
  
    inject('api', api)
  }
  
  class API {
    constructor (axios) {
      this.axios = axios
    }   
    
    BaseUrl=process.env.baseUrl;
    ///////////////////////
    //　　非会員向けAPI　 //
    ///////////////////////

    async apiPost(url,header = {},params={}){
        return await this.axios.$post(this.BaseUrl+url,params,
          {headers:header})
        .catch(err => err.response || {noResponse:true})
    }
    async apiPut(url,header = {},params={}){
        return await this.axios.$put(this.BaseUrl+url,params,
          {headers:header})
        .catch(err => err.response || {noResponse:true})
    }
    async apiDelete(url,header = {},params={}){
        return await this.axios.$delete(this.BaseUrl+url,{
          headers: header,
          params: params
      })
        .catch(err => err.response || {noResponse:true})
    }
    async apiGet(url,header={},params={}){
      return await this.axios.$get(this.BaseUrl+url,{
          headers: header,
          params: params
      })
      .catch(err => err.response || {noResponse:true})
  }
    async apiLogin(target,params={}){
      var user_params = new URLSearchParams();
      user_params.append('username', params.username);
      user_params.append('password', params.password);

      var config = {
        method: 'post',
        url: this.BaseUrl+target,
        data: user_params,
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      };

      return await this.axios(config).catch(err => err.response || {noResponse:true})
  }
   
}