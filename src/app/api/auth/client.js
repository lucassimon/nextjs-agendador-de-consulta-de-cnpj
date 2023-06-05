import axios from "axios";
const client = axios.create({baseURL: process.env.MS_API_JOBS});
export default client