export class UserController {
  constructor(userService) {
    this.userService = userService
  }

  createAccount = async (req, res) => {
    const { name, email, personal, prefer, pwd, phone } = req.body;
    // 입력 받은 Tokens 문서를 검색해 해당 번호의 isAuth가 true인지 확인
    const isTrue = this.userService.checkToken(phone)
    if (isTrue) {
      res.status(422).send("에러!! 핸드폰 번호가 인증되지 않았습니다.")
    } else {
        res.send(documentUser._id);
    }
  };

  getAllUser = async (req, res) => {
    
  }
}
