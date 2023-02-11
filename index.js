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

	let browser = await puppeteer.launch(options);
	try {
		// open browser
		let page = await browser.newPage();

		// open sipadung
		await page.goto(process.env.SITE, {
			waitUntil: "load",
			timeout: 240000,
		});

		// open login page (ws)
		await page.waitForNavigation({ waitUntil: "load", timeout: 240000 });

		// type username
		await page.waitForSelector("#mantine-r0", { timeout: 60000 });
		await page.type("#mantine-r0", process.env.NIM);

		// type password
		await page.waitForSelector("#mantine-r1", { timeout: 60000 });
		await page.type("#mantine-r1", process.env.PASSWORD);

		// click button
		await page.waitForSelector("button.mantine-Button-root", {
			timeout: 60000,
		});
		await page.click("button.mantine-Button-root");

		// wait for new page to load
		await page.waitForNavigation({ waitUntil: "load", timeout: 240000 });

		try {
			await page.waitForSelector("a.mantine-cih264");
			await page.click("a.mantine-cih264");

			await page.waitForSelector("button.mantine-1k5x82x");
			await page.click("button.mantine-1k5x82x");

			let date = new Date();
			let hour = date.getHours();
			let minute = date.getMinutes();
			let second = date.getSeconds();
			let day = date.getDate();
			let month = date.getMonth() + 1;
			let year = date.getFullYear();

			console.log(
				`Absen Sukses Pada ${hour}:${minute}:${second} - ${day}/${month}/${year}`
			);

			res.send({
				message: `Absen Sukses Pada ${hour}:${minute}:${second} - ${day}/${month}/${year}`,
			});
		} catch (error) {
			let date = new Date();
			let hour = date.getHours();
			let minute = date.getMinutes();
			let second = date.getSeconds();
			let day = date.getDate();
			let month = date.getMonth() + 1;
			let year = date.getFullYear();
			console.log(
				`Tidak ada jadwal absen pada  ${hour}:${minute}:${second} - ${day}/${month}/${year}`
			);
			res.send({
				message: `Tidak ada jadwal absen pada  ${hour}:${minute}:${second} - ${day}/${month}/${year}`,
			});
		}
	} catch (err) {
		console.log("Absen Gagal, Manual aja, Jangan Males");
		res.send("Absen Gagal, Manual aja, Jangan Males");
	} finally {
		await browser.close();
	}
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`Server is running on port ${process.env.PORT || 3000}`);
	console.log(`Open http://localhost:${process.env.PORT || 3000}`);
});

module.exports = app;
