// 1. 주민번호 가운데 -로 구성되어 있는지 확인
function includeHypen(regiNumber) {
  return regiNumber.includes("-");
}

// 2. 주민번호는 앞 6자리, 뒤 7자리로 구성
function countValidation(regiNumber) {
  const [regi1, regi2] = regiNumber.split("-");

  return regi1.length === 6 && regi2.length === 7 ? true : false;
}

// 3. 뒤 7자리 중, 끝 6자리는 *로 변경해서 콘솔에 출력
function printRegiNumber(regiNumber) {
  const [regi1, regi2] = regiNumber.split("-");

  const regi2_ = regi2.slice(0, 1).padEnd(7, "*");
  return `${regi1}-${regi2_}`;
}

export default function customRegistrationNumber(regiNumber) {
  // 1. 주민번호 가운데 -로 구성되어 있는지 확인
  const condition1 = includeHypen(regiNumber);
  if (!condition1) {
    console.log("에러 발생!!! 형식이 올바르지 않습니다.");
    return;
  }

  // 2. 주민번호는 앞 6자리, 뒤 7자리로 구성
  const condition2 = countValidation(regiNumber);
  if (!condition2) {
    console.log("에러 발생!!! 개수를 제대로 입력해 주세요!!!");
    return;
  }

  return printRegiNumber(regiNumber);
}
