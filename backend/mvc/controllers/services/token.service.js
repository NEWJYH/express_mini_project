import { Token } from "../../models/token.model.js";
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";

export class TokenService {
  // DB에 토큰이 있다면 토큰 반환 없다면 null 반환
  findToken = async ({ phone }) => {
    return await Token.findOne({ phone });
  };

  isValidPhone = (myphone) => {
    return checkValidationPhone(myphone);
  };

  getToken = () => {
    return getToken();
  };

  createToken = ({ token, phone, isAuth }) => {
    return new Token({ token, phone, isAuth });
  };

  sendTokenToSMS = async (myphone, mytoken) => {
    return await sendTokenToSMS(myphone, mytoken);
  };
}
