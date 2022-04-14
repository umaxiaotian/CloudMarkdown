export default function ({ $axios }, inject) {
    const api = new API($axios)
  
    inject('api', api)
  }
  
  class API {
    constructor (axios) {
      this.axios = axios
    }
    
    BaseUrl="http://127.0.0.1:3100";
    async apiGet(url,params={}){
        // let header= {"X-Api-Key":"TEST",'Content-Type': 'application/json',}
        return this.axios.$get(this.BaseUrl+url,{
            // headers: header,
            params: params
        })
        .catch(err => err.response || {noResponse:true})
    }
}