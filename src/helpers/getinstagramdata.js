import puppeteer from "puppeteer";
import fs from "fs/promises";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.instagram.com/candelamorellob/"); // Cambia la URL al sitio que deseas raspar

  // Aquí puedes escribir tu lógica para extraer datos de la página
  // Por ejemplo, obtener el título:
  const content = await page.content();

  await fs.writeFile("instagram.html", content);

  await browser.close();
})();
