import getToday from "./utils.js";
import nodemailer from "nodemailer";

// 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
export function checkValidationEmail(email) {
  if (email && email.includes("@")) {
    return true;
  } else {
    return false;
  }
}

// 2. 가입환영 템플릿 만들기
export function getWelcomeTemplate(name) {
  const template = `\
    <html>
        <body>
            <h1>[mini-project]</h1>
            <h1>${name}님 가입을 환영합니다.</h1>
            <hr />
            <div>가입일: ${getToday()}</div>
    </body>
</html>\
    `;
  return template;
}

// 3. 이메일 가입환영 템플릿 전송하기

export default async function sendTemplateToEmail(email, name) {
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;
  const EMAIL_SENDER = process.env.EMAIL_SENDER;
  const template = getWelcomeTemplate(name);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: EMAIL_SENDER,
    to: email,
    subject: "[min-project] 가입을 축하합니다!!!",
    html: template,
  });
}
