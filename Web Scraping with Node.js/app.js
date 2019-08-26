// AQI	Air Pollution Level	Health Implications	Cautionary Statement (for PM2.5)
// 0 - 50	Good	Air quality is considered satisfactory, and air pollution poses little or no risk	None
// 51 -100	Moderate	Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.	Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion.
// 101-150	Unhealthy for Sensitive Groups	Members of sensitive groups may experience health effects. The general public is not likely to be affected.	Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion.
// 151-200	Unhealthy	Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects	Active children and adults, and people with respiratory disease, such as asthma, should avoid prolonged outdoor exertion; everyone else, especially children, should limit prolonged outdoor exertion
// 201-300	Very Unhealthy	Health warnings of emergency conditions. The entire population is more likely to be affected.	Active children and adults, and people with respiratory disease, such as asthma, should avoid all outdoor exertion; everyone else, especially children, should limit outdoor exertion.
// 300+	Hazardous	Health alert: everyone may experience more serious health effects	Everyone should avoid all outdoor exertion

// Import dependencies
const puppeteer = require("puppeteer");
const moment = require("moment");
const fs = require("fs");

(async () => {

    // The location / URL
    const url = "https://aqicn.org/city/denmark/copenhagen/h.c.andersens-boulevard/";

    // Create the browser
    const browser = await puppeteer.launch({
        headless: true
    });

    // Navigate to the website
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "load" });

    // Get the Air quality index
    const aqi = await page.$(`#aqiwgtvalue`);

    // Extract the index
    const index = await (await aqi.getProperty("textContent")).jsonValue();

    // Extract the title
    const title = await (await aqi.getProperty("title")).jsonValue();

    // Extract the location
    const location = await (await (await page.$(`#aqiwgttitle1`)).getProperty("textContent")).jsonValue();

    // Write the data to a CSV file
    if (fs.existsSync("air-pollution.csv")) {
        fs.appendFileSync("air-pollution.csv", `\n${moment.utc()}, ${index}, ${title}, ${location.replace(/,/g, '')}`)
    } else {
        fs.writeFileSync("air-pollution.csv", `datetime, index, title, location\n${moment.utc()}, ${index}, ${title}, ${location.replace(/,/g, '')}`)
    }

    // Close the browser
    await browser.close();

})();