import puppeteer from 'puppeteer';

export async function transcribeSpeech() {
    const browser = await puppeteer.launch({
        // headless: false, // Launch browser in non-headless mode to see the browser window
        args: ['--use-fake-ui-for-media-stream'] // Use fake UI to auto-accept permissions
    });

    const page = await browser.newPage();

    // Grant persistent permission for microphone access
    await page.evaluateOnNewDocument(() => {
        const originalQuery = window.navigator.permissions.query;
        return window.navigator.permissions.query = (parameters) => (
            parameters.name === 'microphone' ?
                Promise.resolve({ state: 'granted' }) :
                originalQuery(parameters)
        );
    });

    // Visit a webpage with speech recognition functionality
    await page.goto('https://www.google.com/intl/en/chrome/demos/speech.html');

    // Enable speech recognition on the webpage
    await page.evaluate(() => {
        document.querySelector('#start_button').click();
    });

    const transcription = await page.evaluate(() => {
        return new Promise(resolve => {
            const recognition = new webkitSpeechRecognition();
            recognition.lang = 'en-US';
            recognition.onresult = (event) => {
                const result = event.results[event.results.length - 1][0].transcript;
                resolve(result);
            };
            recognition.start();
        });
    });
    await browser.close();

    return transcription;
}

// Call the function to transcribe speech
const call = async () => {
    const final = await transcribeSpeech();
    console.log(final);
}

call();