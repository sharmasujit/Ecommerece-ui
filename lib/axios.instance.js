import axios from "axios";

const $axios =axios.create({
    baseURL:"http://localhost:8000",
    timeout:1000
})

export default $axios;