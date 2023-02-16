import openGraph from "..scraping.js";

export class UserService {
  constructor(userModel, tokenModel) {
    this.userModel = userModel;
    this.tokenModel = tokenModel;
    this.openGraph = openGraph;
  }

  checkToken = async (phone) => {
    const documentToken = await this.tokenModel.findOne({ phone });
    if (!documentToken || !documentToken.isAuth) {
      return false;
    }
  };

  createOg = async (prefer) => {
    return this.openGraph(prefer);
  };

   // 내가 좋아하는 사이트로 입력 받은 사이트를 cheerio를 활용 scraping 한 후,
      // 관련 오픈그래프(OG) 메타 태그 정보를 다른 입력 받은 정보들과 함꼐 User DB에 저장
      // og title, descriptiion, image가 들어있도록 만듬
      const { title, description, image } = this.userService.createOg(prefer)
      // 주민번호는 뒷자리를 *로 바꾼 후 저장
      const blindPersonal = customRegistrationNumber(personal);
      // DB에 저장한 후
      const documentUser = new User({
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
      await documentUser.save();

      // 회원 가입 환영 이메일을 실제로 전송
      try {
        await sendTemplateToEmail(email, name);
      } catch (error) {
        console.log(error);
      }
      // 생성된 user의 _id를 클라이언트에 반환


}
