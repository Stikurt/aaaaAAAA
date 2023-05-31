const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('');

    const titles = await page.evaluate(() => {
        const results = [];

        const items = document.querySelectorAll('.tn-main-news-title');
    
        // items.forEach(item =>{
        //     results.push(item.innerText);
        // });

        return items[0].innerHTML;
    });

    const html = `<ul>\n${titles.map(title => ` <li>${title}</li>\n`).join('')}</ul>`;

    fs.writeFile('index.html', html, err => {
        if(err) throw err;
        console.log('изминение сохранены ы файле indtx.html');
    });
    await browser.close(); 
})();

async function getPic() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://tengrinews.kz');
    await page.screenshot({path: 'screenshot.png'});
    await browser.close();
}

getPic();

puppeteer.launch();