import express from "express";
import "dotenv/config";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";

import mongooes from "mongoose";

import { Token } from "./models/token.model.js";
import { User } from "./models/user.model.js";

import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";

import openGraph from "./scraping.js";
import customRegistrationNumber from "./personal.js";
import sendTemplateToEmail from "./email.js";
import { Starbucks } from "./models/starbucks.model.js";
const app = express();
const port = 3000;

app.use(express.json());
// swagger 설정
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

// cors 설정
app.use(
  cors([
    {
      origin: "http://localhost:3000",
      credentials: true,
    },
  ])
);

// 회원 가입
app.post("/users", async (req, res) => {
  console.log("post users");
  // name, email, personal(주민번호), prefer(사이트), pwd, phone를 서버에 함꼐 보내주어야 함.
  const { name, email, personal, prefer, pwd, phone } = req.body;
  // 입력 받은 Tokens 문서를 검색해 해당 번호의 isAuth가 true인지 확인
  const documentToken = await Token.findOne({ phone });
  if (!documentToken || !documentToken.isAuth) {
    // 핸드폰 번호가 없거나, isAuth가 false라면 클라이언트에 422상태 코드와 에러문구를 반환
    // true라면 아래 로직을 수행
    res.status(422).send("에러!! 핸드폰 번호가 인증되지 않았습니다");
  } else {
    // 내가 좋아하는 사이트로 입력 받은 사이트를 cheerio를 활용 scraping 한 후,
    // 관련 오픈그래프(OG) 메타 태그 정보를 다른 입력 받은 정보들과 함꼐 User DB에 저장
    // og title, descriptiion, image가 들어있도록 만듬
    const { title, description, image } = await openGraph(prefer);
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
    res.send(documentUser._id);
  }
});

// 회원 목록 조회
app.get("/users", async (req, res) => {
  const users = await User.find();

  res.send(users);
});

// 토큰 인증 요청
app.post("/tokens/phone", async (req, res) => {
  const myphone = req.body.myphone;
  const isValid = checkValidationPhone(myphone);
  if (isValid) {
    // 토큰 번호 생성
    const mytoken = getToken();
    let token = await Token.findOne({ phone: myphone });
    // 처음 문자를 발송한다면?
    if (!token) {
      token = new Token({
        token: mytoken,
        phone: myphone,
        isAuth: false,
      });
    } else {
      //문자를 보낸적이 있다면 ?
      token.token = mytoken;
    }
    await token.save();

    // sendTokenToSMS(myphone, mytoken);
    console.log(myphone, mytoken);
    res.send(`${myphone}으로 인증 문자가 전송되었습니다.`);
  }
});

// 토큰 인증 완료
app.patch("/tokens/phone", async (req, res) => {
  const { myphone, mytoken } = req.body;

  let token = await Token.findOne({ phone: myphone });
  if (!token || token.token !== mytoken) {
    res.status(422).send(false);
  } else {
    token.isAuth = true;
    token.save();
    res.send(true);
  }
});

// 스타벅스 커피 목록 조회
app.get("/starbucks", async (req, res) => {
  const menu = await Starbucks.find();

  res.send(menu);
});

// // 네임 리졸루션 사용
mongooes.connect('mongodb://my-database:27017/mini')

app.listen(port, () => {
  console.log(`mini-project BackEnd listening on port ${port}`);
});
