import * as chromium from "chrome-aws-lambda";

import {GetPDFBuffer} from "./types/HelperTypes";

export class Helper {
    static getPDFBuffer: GetPDFBuffer = async (url: string, options: any) => {
        let browser = null;
        try {
            const executablePath = process.env.IS_OFFLINE ? null : await chromium.executablePath;
            browser = await chromium.puppeteer.launch({
                args: chromium.args,
                executablePath,
            });
            const page = await browser.newPage();
            //console.log('cromium:', page)
            await page.setViewport({width: 1024, height: 1768});
            await page.goto(url, { waitUntil: 'domcontentloaded' });
            console.log('content loaded');

            return await page.pdf(options);
        } catch (error) {
            return error;
        } finally {

        }
    };
}
