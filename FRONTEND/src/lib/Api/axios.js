import axios from "axios";

//Déclaration de l'URL
const Url= "http://127.0.1:8000"
//Création d'une instance Axios configurable
export const AxiosInstance= axios.create({
baseURL: Url,
withCredentials: true, //Indispensable pour envoyer automatiquement les cookies
})