import puppeteer from "puppeteer";
import mongooes from "mongoose";

// 몽고 디비 접속 - test local
mongooes.set("strictQuery", false);
mongooes.connect("mongodb://127.0.0.1:27017/mini");

import { Starbucks } from "./models/starbucks.model.js";

async function startCrawling() {
  // 옵션 : headless : true 눈에 안나타남 false 눈에 보임
  const coffeeobj = {};
  const coffeeNameList = [];
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  // goto가 waitTimeout을 걸어주지 않으면 공격으로 인식할수 있음
  // waitTimeout을 랜덤하게 해주는 것이 좋음
  await page.goto("https://www.starbucks.co.kr/menu/drink_list.do");
  await page.waitForTimeout(1000);

  // 메뉴 갯수 구하기
  // dl 밑으로 하위 커피 분류가 나뉨
  // count 20 // 2 => 10 개의 커피 중 분류가 있음
  const count = await page.$eval(
    `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl`,
    (el) => el.childElementCount
  );

  // 커피 중분류 종류에 따라 반복문 돌면서 커피 중분류 이름 뜯어오기
  for (let i = 1; i <= count; i++) {
    if (i % 2 !== 0) {
      continue;
    }
    // 짝수번째 dd 하위 ul className이 커피 이름임
    const data = await page.$eval(
      `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(${i}) > ul`,
      (el) => el.className
    );
    coffeeNameList.push(data);

    // 중분류 이름을 가지고 있는 커피 객체의 갯수
    const count2 = await page.$eval(
      `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(${i}) > ul`,
      (el) => el.childElementCount
    );
    console.log(count2);
    // 다른것이 필요 없다면 이것만 사용해도 됨 중분류 사용하지 않을 경우 !
    for (let j = 1; j <= count2; j++) {
      const data3 = await page.$eval(
        `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(${i}) > ul > li:nth-child(${j}) > dl > dt > a > img`,
        (el) => [el.getAttribute("src"), el.getAttribute("alt")]
      );

      const menu = new Starbucks({
        name: data3[1],
        img: data3[0],
      });
      await menu.save();
    }
  }

  console.log("크롤링 완료")
  await browser.close();
}

startCrawling();
