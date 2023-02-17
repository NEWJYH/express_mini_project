export class UserController {
  constructor(userService, tokenService) {
    this.userService = userService;
    this.tokenService = tokenService;
  }

  createAccount = async (req, res) => {
    // name, email, personal(주민번호), prefer(사이트), pwd, phone를 서버에 함께 보내주어야 함.
    const { name, email, personal, prefer, pwd, phone } = req.body;
    // 입력 받은 Tokens 문서를 검색해 해당 번호의 isAuth가 true인지 확인
    const documentToken = await this.tokenService.findToken({ phone });
    // 핸드폰 번호가 없거나, isAuth가 false라면 클라이언트에 422상태 코드와 에러문구를 반환
    if (!documentToken || !documentToken.isAuth) {
      res.status(422).send("에러!! 핸드폰 번호가 인증되지 않았습니다");
      // true라면 아래 로직을 수행
    } else {
      // 내가 좋아하는 사이트로 입력 받은 사이트를 cheerio를 활용 scraping 한 후,
      // 관련 오픈그래프(OG) 메타 태그 정보를 다른 입력 받은 정보들과 함꼐 User DB에 저장
      // og title, descriptiion, image가 들어있도록 만듬
      const { title, description, image } = await this.userService.scrapingOG(
        prefer
      );
      // 주민번호는 뒷자리를 *로 바꾼 후 저장
      const blindPersonal = this.userService.blindPersonal(personal);
      // DB에 저장 리턴 = document
      const documentUser = await this.userService.createUser({
        name,
        email,
        personal: blindPersonal,
        prefer,
        pwd,
        phone,
        og: {
          title,
          description,
          image,
        },
      });

      // 회원 가입 환영 이메일을 전송
      await this.userService.sendEmail(email, name);

      // 생성된 user의 _id를 클라이언트에 반환
      res.send(documentUser._id);
    }
  };

  allUsers = async (req, res) => {
    const users = await this.userService.findAllUsers();
    res.send(users);
  };
}
