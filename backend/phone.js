import coolsms from "coolsms-node-sdk";

export function checkValidationPhone(myphone) {
  if (myphone.length !== 10 && myphone.length !== 11) {
    console.log("에러 발생!!! 핸드폰 번호를 제대로 입력해 주세요!!!");
    return false;
  } else {
    return true; // 검증 통과
  }
}

export function getToken() {
  const count = 6;
  const result = String(Math.floor(Math.random() * 10 ** count)).padStart(
    count,
    "0"
  );
  return result;
}

export async function sendTokenToSMS(phone, token) {
  const SMS_KEY = process.env.SMS_KEY;
  const SMS_SECRET = process.env.SMS_SECRET;
  const SMS_SENDER = process.env.SMS_SENDER;

  const mysms = coolsms.default;
  const messageService = new mysms(SMS_KEY, SMS_SECRET);
  await messageService.sendOne({
    to: phone,
    from: SMS_SENDER,
    text: `[mini-project] 요청하신 인증번호는 [${token}]입니다.`,
  });
}
