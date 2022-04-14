export default function ({ $axios }, inject) {
    const api = new API($axios)
  
    inject('api', api)
  }
  
  class API {
    constructor (axios) {
      this.axios = axios
    }
    
    BaseUrl="http://localhost:8000";
    async apiGet(url,params={}){
        let header= {'Content-Type': 'application/json',}
        return await this.axios.$get(this.BaseUrl+url,{
            headers: header,
            params: params
        })
        .catch(err => err.response || {noResponse:true})
    }
    
}