import express from "express";
import "dotenv/config";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import mongooes from "mongoose";

// 서비스
import { TokenService } from "./mvc/controllers/services/token.service.js";

// 컨트롤러
import { UserController } from "./mvc/controllers/user.controller.js";
import { TokenController } from "./mvc/controllers/token.controller.js";
import { StarbucksController } from "./mvc/controllers/starbucks.controller.js";
import { UserService } from "./mvc/controllers/services/user.service.js";
import { StarbucksService } from "./mvc/controllers/services/starbucks.service.js";

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
// 서비스 생성
const userService = new UserService();
const tokenService = new TokenService();
const starbucksService = new StarbucksService();

// 컨트롤러 생성
const userController = new UserController(userService, tokenService);
const tokenController = new TokenController(tokenService);
const starbucksController = new StarbucksController(starbucksService);

// 회원 가입
app.post("/users", userController.createAccount);
// 회원 전체조회
app.get("/users", userController.allUsers);

// 토큰 인증 요청
app.post("/tokens/phone", tokenController.createToken);
// 토큰 인증 완료
app.patch("/tokens/phone", tokenController.confirmToken);

// 스타벅스 커피 목록 조회
app.get("/starbucks", starbucksController.allMenu);

// 네임 리졸루션 사용
// mongooes.set("strictQuery", false);
// mongooes.connect("mongodb://my-database:27017/mini");

// 로컬 몽고 디비 접속 - test local
mongooes.set("strictQuery", false);
mongooes.connect("mongodb://127.0.0.1:27017/mini");

app.listen(port, () => {
  console.log(`mini-project BackEnd listening on port ${port}`);
});
