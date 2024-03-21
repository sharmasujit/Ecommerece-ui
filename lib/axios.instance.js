import axios from "axios";

const $axios =axios.create({
    baseURL:"https://nepmart-api.onrender.com",
    //baseURL:"http://localhost:8000",
    //baseURL:"https://replit.com/@SujitSharma2/NepMart-api?v=1",
    timeout:1000
});

// Add a request interceptor
$axios.interceptors.request.use(function (config) {
    const accessToken=localStorage.getItem("token");

    if(accessToken)
    {
        config.headers.Authorization=`Bearer ${accessToken}`
    }
    return config;
  });

export default $axios;