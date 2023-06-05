import axios from "axios";
import { getSession } from "next-auth/react";

const client = axios.create({baseURL: process.env.MS_API_JOBS});

// client.interceptors.request.use(async (config) => {
//     const session = getSession()
//     config.headers.Authorization = `Bearer ${session?.accessToken}`
    
//     return config
// })

export default client