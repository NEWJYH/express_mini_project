function getDayToString(number) {
  return "일 월 화 수 목 금 토".split(" ")[number];
}

export default function getToday() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const stringDay = getDayToString(date.getDay());
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");
  return `${year}년 ${month}월 ${day}일 ${stringDay}요일 ${hour}:${minute}:${second}`;
}
