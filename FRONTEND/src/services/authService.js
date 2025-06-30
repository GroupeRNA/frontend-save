import api from "../data/api/api";
import { REGISTER ,LOGIN } from "../data/constants/endpoints";

class AuthService {
  static async register(userData) {
    const response = await api.post(REGISTER, {
      "user_name": userData.user_name,
      "user_mail": userData.user_mail,
      "user_password": userData.user_password,
    });
    return response.data;
  }

  static async login(userData) {
    const response = await api.post(LOGIN, {
      "user_name": userData.user_name,
      "user_password": userData.user_password,
    });
    return response.data; 
  }
}

export default AuthService;