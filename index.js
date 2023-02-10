const app = require("express")();
puppeteer = require("puppeteer");
const dotenv = require("dotenv");
dotenv.config();

app.get("/", (req, res) => {
	res.send("open /absen to absen and follow my github @nubisub");
});

app.get("/absen", async (req, res) => {
	let options = {
		args: [
			"--no-sandbox",
			"--disable-setuid-sandbox",
			"--hide-scrollbars",
			"--disable-web-security",
		],
		headless: false,
	};

	try {
		// open browser
		let browser = await puppeteer.launch(options);
		let page = await browser.newPage();

		// open sipadung
		await page.goto(process.env.SITE, {
			waitUntil: "load",
			timeout: 0,
		});

		// open login page (ws)
		await page.waitForNavigation({ waitUntil: "load", timeout: 0 });

		// type username
		await page.waitForSelector("#mantine-r0", { timeout: 0 });
		await page.type("#mantine-r0", process.env.NIM);

		// type password
		await page.waitForSelector("#mantine-r1", { timeout: 0 });
		await page.type("#mantine-r1", process.env.PASSWORD);

		// click button
		await page.waitForSelector("button.mantine-Button-root", { timeout: 0 });
		await page.click("button.mantine-Button-root");

		// wait for new page to load
		await page.waitForNavigation({ waitUntil: "load", timeout: 0 });

		// click Masuk
		// await page.waitForSelector("a.mantine-cih264", { timeout: 0 });
		// await page.click("a.mantine-cih264");

		// click Absen
		// await page.waitForSelector("button.mantine-1k5x82x", { timeout: 0 });
		// await page.click("button.mantine-1k5x82x");
		
		console.log("Success Login");

		res.send({
			message: "Anjay Success",
		});

	} catch (err) {
		console.error(err);
		return null;
	}
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`Server is running on port ${process.env.PORT || 3000}`);
	console.log(`Open http://localhost:${process.env.PORT || 3000}`);
});

module.exports = app;
