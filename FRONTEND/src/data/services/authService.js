import api from "../data/api/axios";
import { AUTH } from "../data/constants/endPoint";

class AuthService {
  static async register(userData) {
    const response = await api.post(AUTH.REGISTER, {
      "user_name": userData.user_name,
      "user_mail": userData.user_mail,
      "user_password": userData.user_password,
    });
    return response.data;
  }

  static async login(userData) {
    const response = await api.post(AUTH.LOGIN, {
      "user_name": userData.user_name,
      "user_password": userData.user_password,
    });
    return response.data; 
  }
}

export default AuthService;