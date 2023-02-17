export class TokenController {
  constructor(tokenService) {
    this.tokenService = tokenService;
  }

  createToken = async (req, res) => {
    const myphone = req.body.myphone;
    // 휴대폰번효 유효성 검사
    const isValid = this.tokenService.isValidPhone(myphone);
    if (isValid) {
      // 토큰 번호 생성
      const mytoken = this.tokenService.getToken();
      // 휴대폰 번호가 토큰collection에 있는지 확인 있다면 document 없다면 null
      let token = await this.tokenService.findToken({ phone: myphone });
      // 처음 문자를 발송한다면?
      if (!token) {
        token = this.tokenService.createToken({
          token: mytoken,
          phone: myphone,
          isAuth: false,
        });
        console.log(token);
      } else {
        //문자를 보낸적이 있다면 ?
        token.token = mytoken;
      }
      await token.save();
      // this.tokenService.sendTokenToSMS(myphone, mytoken);
      // awiat sendTokenToSMS(myphone, mytoken);
      console.log(myphone, mytoken);
      res.send(`${myphone}으로 인증 문자가 전송되었습니다.`);
    }
  };

  confirmToken = async (req, res) => {
    const { myphone, mytoken } = req.body;
    // 토큰이 있는지 확인
    let token = await this.tokenService.findToken({ phone: myphone });
    if (!token || token.token !== mytoken) {
      res.status(422).send(false);
    } else {
      token.isAuth = true;
      await token.save();
      res.send(true);
    }
  };
}
