import { envConfig } from "@/config/envConfig";
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: envConfig.baseApi,
})

