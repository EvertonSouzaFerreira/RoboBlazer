// const puppeteer = require("puppeteer");
// const fs = require("fs");
// let lastTime = null;
// let lastColor = null;
// let timeBeforeUnload = null;
// let nextObj = null;

// const URL = "https://www.historicosblaze.com/br/blaze/doubles";

// async function extractData() {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();

//   await page.goto(URL, { timeout: 70000 });

//   const color = await page.$$(".entries .d-none .color-table");
//   const numPedra = await page.$$(".entries .d-none .number-table");
//   const hora = await page.$$(".entries .d-none .minute-table");

//   const results = [];

//   page.on("beforeunload", () => {
//     timeBeforeUnload = Date.now();
//   });

//   for (
//     let i = 0;
//     i < 3 && i < color.length && i < numPedra.length && i < hora.length;
//     i++
//   ) {
//     const time = await hora[i].evaluate((node) => node.textContent);
//     const currColor = await color[i].evaluate((node) => node.textContent);
//     const currNumPedra = await numPedra[i].evaluate((node) => node.textContent);

//     if (currColor === "Red" && time !== lastTime && time !== timeBeforeUnload) {
//       console.log("Veio um Red");
//       if (nextObj) {
//         // Obtém a hora do objeto atual e o numPedra do próximo objeto e soma
//         const sum = parseInt(time) + parseInt(nextObj.numPedra);
//         results[i - 1].sumRed = sum;
//       }
//     } else {
//       console.log("ainda nao e uma Branca");
//     }

//     results.push({
//       color: currColor,
//       numPedra: currNumPedra,
//       hora: time,
//     });

//     // Armazena o objeto atual na variável nextObj
//     nextObj = {
//       color: currColor,
//       numPedra: currNumPedra,
//       hora: time,
//     };

//     lastTime = time;
//     lastColor = currColor;
//   }
//   console.log(results);

//   fs.writeFile("blazer.json", JSON.stringify(results, null, 2), (err) => {
//     if (err) throw new Error("something went wrong");

//     console.log("well done");
//   });

//   await browser.close();
// }

// (async () => {
//   while (true) {
//     await extractData();
//     await new Promise((resolve) => setTimeout(resolve, 25000));
//   }
// })();

// const puppeteer = require("puppeteer");
// const fs = require("fs");
// let lastTime = null;
// let lastColor = null;
// let timeBeforeUnload = null;
// let redTime = null;

// const URL = "https://www.historicosblaze.com/br/blaze/doubles";

// async function extractData() {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();

//   await page.goto(URL, { timeout: 70000 });

//   const color = await page.$$(".entries .d-none .color-table");
//   const numPedra = await page.$$(".entries .d-none .number-table");
//   const hora = await page.$$(".entries .d-none .minute-table");

//   const results = [];

//   page.on("beforeunload", () => {
//     timeBeforeUnload = Date.now();
//   });

//   for (
//     let i = 0;
//     i < 3 && i < color.length && i < numPedra.length && i < hora.length;
//     i++
//   ) {
//     const time = await hora[i].evaluate((node) => node.textContent);
//     const currColor = await color[i].evaluate((node) => node.textContent);
//     const currNumPedra = await numPedra[i].evaluate((node) => node.textContent);

//     if (currColor === "Red" && time !== lastTime && time !== timeBeforeUnload) {
//       console.log("Veio um Red");
//       redTime = time;
//     } else if (
//       currColor === "Black" &&
//       lastColor === "Red" &&
//       redTime !== null
//     ) {
//       const redTimeSplit = redTime.split(":");
//       const redHour = parseInt(redTimeSplit[0], 10);
//       const redMin = parseInt(redTimeSplit[1], 10);
//       const currNumPedraNumber = parseInt(currNumPedra, 10);

//       const currTimeSplit = time.split(":");
//       const currHour = parseInt(currTimeSplit[0], 10);
//       const currMin = parseInt(currTimeSplit[1], 10);

//       const newMin = (redMin + currNumPedraNumber) % 60;
//       const extraHour = Math.floor((redMin + currNumPedraNumber) / 60);

//       const newHour = (redHour + currHour + extraHour) % 24;

//       const sumTime = `${newHour.toString().padStart(2, "0")}:${newMin
//         .toString()
//         .padStart(2, "0")}`;

//       console.log(`Soma realizada: ${redTime} + ${currNumPedra} = ${sumTime}`);

//       redTime = null;
//     } else {
//       console.log("ainda nao e uma Branca");
//     }

//     results.push({
//       color: currColor,
//       numPedra: currNumPedra,
//       hora: time,
//     });
//     lastTime = time;
//     lastColor = currColor;
//   }
//   console.log(results);
//   fs.writeFile("blazer.json", JSON.stringify(results, null, 2), (err) => {
//     if (err) throw new Error("something went wrong");

//     console.log("well done");
//   });

//   await browser.close();
// }

// (async () => {
//   while (true) {
//     await extractData();
//     await new Promise((resolve) => setTimeout(resolve, 25000));
//   }
// })();

// const puppeteer = require("puppeteer");
// const fs = require("fs");

// let redStones = [];
// let sums = [];

// let lastTime = null;
// let lastColor = null;
// let timeBeforeUnload = null;
// let redTime = null;
// let lastRedTime = null;

// const URL = "https://www.historicosblaze.com/br/blaze/doubles";

// async function extractData() {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();

//   await page.goto(URL, { timeout: 70000 });

//   const color = await page.$$(".entries .d-none .color-table");
//   const numPedra = await page.$$(".entries .d-none .number-table");
//   const hora = await page.$$(".entries .d-none .minute-table");

//   const results = [];

//   page.on("beforeunload", () => {
//     timeBeforeUnload = Date.now();
//   });

//   for (
//     let i = 0;
//     i < 3 && i < color.length && i < numPedra.length && i < hora.length;
//     i++
//   ) {
//     const time = await hora[i].evaluate((node) => node.textContent);
//     const currColor = await color[i].evaluate((node) => node.textContent);
//     const currNumPedra = await numPedra[i].evaluate((node) => node.textContent);

//     if (currColor === "Red") {
//       console.log(`Pedra vermelha encontrada: ${currNumPedra} (${time})`);
//       lastRedTime = time;
//     } else if (currColor === "Black" && lastRedTime !== null) {
//       console.log(`Pedra preta encontrada: ${currNumPedra} (${time})`);

//       const redTimeSplit = lastRedTime.split(":");
//       const redHour = parseInt(redTimeSplit[0], 10);
//       const redMin = parseInt(redTimeSplit[1], 10);
//       const currNumPedraNumber = parseInt(currNumPedra, 10);

//       const currTimeSplit = time.split(":");
//       const currHour = parseInt(currTimeSplit[0], 10);
//       const currMin = parseInt(currTimeSplit[1], 10);

//       const newMin = (redMin + currNumPedraNumber) % 60;
//       const extraHour = Math.floor((redMin + currNumPedraNumber) / 60);

//       const newHour = (redHour + currHour + extraHour) % 24;

//       const sumTime = `${newHour.toString().padStart(2, "0")}:${newMin
//         .toString()
//         .padStart(2, "0")}`;

//       console.log(
//         `Soma realizada: ${lastRedTime} + ${currNumPedra} = ${sumTime}`
//       );

//       results.push({
//         color: currColor,
//         numPedra: currNumPedra,
//         hora: time,
//         soma: sumTime,
//       });

//       lastRedTime = null;
//     } else {
//       console.log(`Pedra ignorada: ${currNumPedra} (${time})`);
//     }
//   }
//   console.log(results);

//   fs.writeFile("blazer.json", JSON.stringify(results, null, 2), (err) => {
//     if (err) throw new Error("something went wrong");

//     console.log("well done");
//   });

//   await browser.close();
// }

// (async () => {
//   while (true) {
//     await extractData();
//     await new Promise((resolve) => setTimeout(resolve, 25000));
//   }
// })();

// const puppeteer = require("puppeteer");
// const fs = require("fs");

// let redStones = [];
// let sums = [];

// let lastTime = null;
// let lastColor = null;
// let timeBeforeUnload = null;
// let redTime = null;
// let lastRedTime = null;

// const URL = "https://www.historicosblaze.com/br/blaze/doubles";

// async function extractData() {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();

//   await page.goto(URL, { timeout: 70000 });

//   const color = await page.$$(".entries .d-none .color-table");
//   const numPedra = await page.$$(".entries .d-none .number-table");
//   const hora = await page.$$(".entries .d-none .minute-table");

//   const results = [];

//   page.on("beforeunload", () => {
//     timeBeforeUnload = Date.now();
//   });

//   for (
//     let i = 0;
//     i < 3 && i < color.length && i < numPedra.length && i < hora.length;
//     i++
//   ) {
//     const time = await hora[i].evaluate((node) => node.textContent);
//     const currColor = await color[i].evaluate((node) => node.textContent);
//     const currNumPedra = await numPedra[i].evaluate((node) => node.textContent);

//     if (currColor === "Red") {
//       console.log(`Pedra vermelha encontrada: ${currNumPedra} (${time})`);
//       lastRedTime = time;
//     } else if (currColor === "Black" && lastRedTime !== null) {
//       console.log(`Pedra preta encontrada: ${currNumPedra} (${time})`);

//       const redTimeSplit = lastRedTime.split(":");
//       const redHour = parseInt(redTimeSplit[0], 10);
//       const redMin = parseInt(redTimeSplit[1], 10);
//       const currNumPedraNumber = parseInt(currNumPedra, 10);

//       const currTimeSplit = time.split(":");
//       const currHour = parseInt(currTimeSplit[0], 10);
//       const currMin = parseInt(currTimeSplit[1], 10);

//       const newMin = (redMin + currNumPedraNumber) % 60;
//       const extraHour = Math.floor((redMin + currNumPedraNumber) / 60);

//       const newHour = (redHour + currHour + extraHour) % 24;

//       const sumTime = `${newHour.toString().padStart(2, "0")}:${newMin
//         .toString()
//         .padStart(2, "0")}`;

//       console.log(
//         `Soma realizada: ${lastRedTime} + ${currNumPedra} = ${sumTime}`
//       );

//       results.push({
//         color: currColor,
//         numPedra: currNumPedra,
//         hora: time,
//         soma: sumTime,
//       });

//       lastRedTime = null;
//     } else {
//       console.log(`Pedra ignorada: ${currNumPedra} (${time})`);
//     }
//   }
//   console.log(results);

//   fs.writeFile("blazer.json", JSON.stringify(results, null, 2), (err) => {
//     if (err) throw new Error("something went wrong");

//     console.log("well done");
//   });

//   await browser.close();
// }

// (async () => {
//   while (true) {
//     await extractData();
//     await new Promise((resolve) => setTimeout(resolve, 25000));
//   }
// })();

// const puppeteer = require("puppeteer");
// const fs = require("fs");

// let redStones = [];
// let sums = [];

// let lastTime = null;
// let lastColor = null;
// let timeBeforeUnload = null;
// let redTime = null;
// let lastRedTime = null;

// const URL = "https://www.historicosblaze.com/br/blaze/doubles";

// async function extractData() {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();

//   await page.goto(URL, { timeout: 70000 });

//   const color = await page.$$(".entries .d-none .color-table");
//   const numPedra = await page.$$(".entries .d-none .number-table");
//   const hora = await page.$$(".entries .d-none .minute-table");

//   const results = [];

//   page.on("beforeunload", () => {
//     timeBeforeUnload = Date.now();
//   });

//   for (
//     let i = 0;
//     i < 3 && i < color.length && i < numPedra.length && i < hora.length;
//     i++
//   ) {
//     const time = await hora[i].evaluate((node) => node.textContent);
//     const currColor = await color[i].evaluate((node) => node.textContent);
//     const currNumPedra = await numPedra[i].evaluate((node) => node.textContent);

//     if (currColor === "Red") {
//       console.log(`Pedra vermelha encontrada: ${currNumPedra} (${time})`);
//       if (!redTime) redTime = time;
//     } else if (currColor === "Black" && redTime !== null) {
//       console.log(`Pedra preta encontrada: ${currNumPedra} (${time})`);

//       const redTimeSplit = redTime.split(":");
//       const redHour = parseInt(redTimeSplit[0], 10);
//       const redMin = parseInt(redTimeSplit[1], 10);
//       const currNumPedraNumber = parseInt(currNumPedra, 10);

//       const currTimeSplit = time.split(":");
//       const currHour = parseInt(currTimeSplit[0], 10);
//       const currMin = parseInt(currTimeSplit[1], 10);

//       const newMin = (redMin + currNumPedraNumber) % 60;
//       const extraHour = Math.floor((redMin + currNumPedraNumber) / 60);
//       console.log(`redHour: ${redHour}`);
//       console.log(`redMin: ${redMin}`);
//       console.log(`currHour: ${currHour}`);
//       console.log(`currMin: ${currMin}`);
//       console.log(`currNumPedraNumber: ${currNumPedraNumber}`);
//       const newHour = (redHour + extraHour) % 24;

//       const sumTime = `${newHour.toString().padStart(2, "0")}:${newMin
//         .toString()
//         .padStart(2, "0")}`;

//       console.log(`Soma realizada: ${redTime} + ${currNumPedra} = ${sumTime}`);

//       results.push({
//         color: currColor,
//         numPedra: currNumPedra,
//         hora: time,
//         soma: sumTime,
//       });

//       redTime = null;
//     } else {
//       console.log(`Pedra ignorada: ${currNumPedra} (${time})`);
//     }
//   }
//   console.log(results);

//   fs.writeFile("blazer.json", JSON.stringify(results, null, 2), (err) => {
//     if (err) throw new Error("something went wrong");

//     console.log("well done");
//   });

//   await browser.close();
// }

// (async () => {
//   while (true) {
//     await extractData();
//     await new Promise((resolve) => setTimeout(resolve, 25000));
//   }
// })();

const express = require("express");
const puppeteer = require("puppeteer");
const fs = require("fs");
const app = express();
const puppeteer2 = require("puppeteer-core");
const dotenv = require("dotenv");

let redStones = [];
let sums = [];
let data = null;
let processedBlackStones = new Set();
let timeBeforeUnload = null;
let processedRedStones = [];
let lastRedTime = null;
let redStoneFound = false; // variável adicionada para controlar se a pedra vermelha já foi encontrada e somada
let ColorPedra = "Red";
dotenv.config();
const URL = "https://www.historicosblaze.com/br/blaze/doubles";

async function extractData() {
  process.env.PUPPETEER_CACHE_PATH = "/path/to/puppeteer/cache";
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      // "--single-process",
      // "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  const page = await browser.newPage();

  await page.goto(URL, { timeout: 70000 });

  const color = await page.$$(".entries .d-none .color-table");
  const numPedra = await page.$$(".entries .d-none .number-table");
  const hora = await page.$$(".entries .d-none .minute-table");

  const results = [];

  page.on("beforeunload", () => {
    timeBeforeUnload = Date.now();
  });

  for (
    let i = 0;
    i < 3 && i < color.length && i < numPedra.length && i < hora.length;
    i++
  ) {
    const time = await hora[i].evaluate((node) => node.textContent);
    const currColor = await color[i].evaluate((node) => node.textContent);
    const currNumPedra = await numPedra[i].evaluate((node) => node.textContent);

    if (currColor === ColorPedra && lastRedTime === null) {
      console.log(
        `Primeira pedra Branca encontrada: ${currNumPedra} (${time})`
      );
      lastRedTime = time;
      processedRedStones.push(currNumPedra);
    } else if (currColor === ColorPedra && lastRedTime !== null) {
      console.log(`Nova pedra Branca encontrada: ${currNumPedra} (${time})`);
      lastRedTime = time;
      processedRedStones.push(currNumPedra);
    } else if (
      currColor === "Black" &&
      lastRedTime !== null &&
      time >= lastRedTime &&
      !processedBlackStones.has(currNumPedra) && // verificar se a pedra já foi processada
      !redStoneFound // verifica se a pedra vermelha ainda não foi encontrada e somada
    ) {
      console.log(`Pedra preta encontrada: ${currNumPedra} (${time})`);

      const redTimeSplit = lastRedTime.split(":");
      const redHour = parseInt(redTimeSplit[0], 10);
      const redMin = parseInt(redTimeSplit[1], 10);
      const currNumPedraNumber = parseInt(currNumPedra, 10);

      const currTimeSplit = time.split(":");
      const currHour = parseInt(currTimeSplit[0], 10);
      const currMin = parseInt(currTimeSplit[1], 10);

      const newMin = (redMin + currNumPedraNumber) % 60;
      const extraHour = Math.floor((redMin + currNumPedraNumber) / 60);

      const newHour = (redHour + extraHour) % 24;

      //esta soma so pode acontecer se o
      const sumTime = `${newHour.toString().padStart(2, "0")}:${newMin
        .toString()
        .padStart(2, "0")}`;

      console.log(
        `Soma realizada: ${lastRedTime} + ${currNumPedra} = ${sumTime}`
      );

      results.push({
        color: currColor,
        numPedra: currNumPedra,
        hora: lastRedTime,
        soma: sumTime,
      });

      lastRedTime = null;
      contador = true;
    } else {
      console.log(`Pedra ignorada: ${currNumPedra} (${time})`);
    }
  }
  console.log(results);
  if (results.length > 0) {
    sums.push(...results);
  }

  fs.writeFile("blazer.json", JSON.stringify(sums, null, 2), (err) => {
    if (err) throw new Error("something went wrong");

    console.log("well done");
  });

  await browser.close();
  return sums;
}

module.exports = { extractData };

// (async () => {
//   const browserFetcher = puppeteer2.createBrowserFetcher();
//   const revisionInfo = await browserFetcher.download("856583");

//   console.log(revisionInfo.executablePath);
// })();
// (async () => {
//   while (true) {
//     await extractData();
//     await new Promise((resolve) => setTimeout(resolve, 25000));
//   }
// })();

// dois problemas primeiro se tiver uma pedra vermelha dentro do array que foi que ja foi somado e apare
// um novo vermelho ele esta iginorando o vermelho

//2 ele nao esta somando com a proxima bleck
