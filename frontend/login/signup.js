// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector("#ValidationInputWrapper").style.display = "flex";
  console.log("인증 번호 전송");
  // 인풋창에서 id로 가져오기
  const first = document.getElementById("PhoneNumber01").value;
  const second = document.getElementById("PhoneNumber02").value;
  const third = document.getElementById("PhoneNumber03").value;
  // 전부 합치기
  const result = first + second + third;
  console.log(result);
  await axios.post("http://localhost:3000/tokens/phone", { myphone: result });
};

// 핸드폰 인증 완료 API 요청
const submitToken = async () => {
  const userInput = document.getElementById("TokenInput").value;

  const first = document.getElementById("PhoneNumber01").value;
  const second = document.getElementById("PhoneNumber02").value;
  const third = document.getElementById("PhoneNumber03").value;
  const myphone = first + second + third;

  const result = await axios.patch("http://localhost:3000/tokens/phone", {
    myphone,
    mytoken: userInput,
  });
  console.log(result);

  console.log("핸드폰 인증 완료");
};

// 회원 가입 API 요청
const submitSignup = async () => {
  console.log("회원 가입 완료");
  console.log("회원 가입 이메일 전송");

  const name = document.getElementById("SignupName").value;

  const regi1 = document.getElementById("SignupPersonal1").value;
  const regi2 = document.getElementById("SignupPersonal2").value;

  const first = document.getElementById("PhoneNumber01").value;
  const second = document.getElementById("PhoneNumber02").value;
  const third = document.getElementById("PhoneNumber03").value;

  const prefer = document.getElementById("SignupPrefer").value;
  const email = document.getElementById("SignupEmail").value;
  const pwd = document.getElementById("SignupPwd").value;

  const personal = `${regi1}-${regi2}`;
  const phone = first + second + third;

  await axios.post("http://localhost:3000/users", {
    name,
    email,
    prefer,
    pwd,
    personal,
    phone,
  });
};
