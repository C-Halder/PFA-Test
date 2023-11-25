import axios from "axios";


export const BaseUrl = "https://dummyjson.com";

const Api = axios.create({ baseURL: BaseUrl });

export const GETPRODUCTS = () => Api.get("/products");