import axios from "axios";
import * as cheerio from "cheerio";

export default async function openGraph(url) {
  const obj = {};
  try {
    const result = await axios.get(url);
    const $ = cheerio.load(result.data);

    $("meta").each((_, el) => {
      if ($(el).attr("property")) {
        const key = $(el).attr("property").split(":")[1];
        const value = $(el).attr("content");
        // console.log(key, value);
        obj[key] = value;
      }
    });
  } catch (error) {
  } finally {
    let isEmpty = Object.entries(obj).length === 0;
    if (isEmpty) return { title: "null", image: "null", description: "ull" };
    else {
      const { title, image, description } = { ...obj };
      return { title, image, description };
    }
  }
}

