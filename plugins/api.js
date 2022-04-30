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
        return await this.axios.$post('/api/'+url,params,
          {headers:header})
        .catch(err => err.response || {noResponse:true})
    }
    async apiPut(url,header = {},params={}){
        return await this.axios.$put('/api/'+url,params,
          {headers:header})
        .catch(err => err.response || {noResponse:true})
    }
    async apiDelete(url,header = {},params={}){
        return await this.axios.$delete('/api/'+url,{
          headers: header,
          params: params
      })
        .catch(err => err.response || {noResponse:true})
    }
    async apiGet(url,header={},params={}){
      return await this.axios.$get('/api/'+url,{
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
   
}