// 비즈니스 로직 실질적인 코드 작성이 이뤄지는 부분
import { User } from "../../models/user.model.js";

import customRegistrationNumber from "./personal.js";
import openGraph from "./scraping.js";
import sendTemplateToEmail from "./email.js";

export class UserService {
  constructor() {}

  scrapingOG = async (prefer) => {
    return await openGraph(prefer);
  };

  blindPersonal = (personal) => {
    return customRegistrationNumber(personal);
  };

  createUser = async ({
    name,
    email,
    personal,
    prefer,
    pwd,
    phone,
    og: { title, description, image },
  }) => {
    const documentUser = new User({
      name,
      email,
      personal,
      prefer,
      pwd,
      phone,
      og: { title, description, image },
    });

    await documentUser.save();

    return documentUser;
  };

  sendEmail = async (email, name) => {
    return await sendTemplateToEmail(email, name);
  };

  findAllUsers = async () => {
    const users = await User.find();
    return users;
  };
}
