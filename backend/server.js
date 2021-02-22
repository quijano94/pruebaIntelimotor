import express from 'express';
import puppeteer from 'puppeteer';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post('/api/puppet', async(req,res) => {
    const browser = await puppeteer.launch({
        headless:false,
        slowMo:200,
    });
    const page = await browser.newPage();
    await page.goto('https://seminuevos.com/');

    await page.evaluate(() => {
        document.querySelector('.login-btn').click();
    });
    await page.waitForSelector('#email_login');
    await page.type('#email_login', `angel.q.nolasco@gmail.com`);
    await page.type('#password_login', `Agqn1415`);
    //Da click en el boton de iniciar sesion
    await page.click('button.input__submit');
    //Esper que inicie sesion buscando la clase user-account
    await page.waitForSelector('.user-account');
    //Da click en publicar venta
    await page.evaluate(() => {
        document.querySelector('.cta-btn a').click();
    });

    await page.waitForSelector('a[data-activates=dropdown_brands]');
    await page.click('a[data-activates=dropdown_brands]');
    await page.type('#dropdown_brands input', `acura`);
    await page.click("li[data-content='acura']");

    await page.click('a[data-activates=dropdown_models]');
    await page.click("li[data-content='ilx']");

    await page.click('a[data-activates=dropdown_subtypes]');
    await page.click("li[data-content='sedan']");

    await page.click('a[data-activates=dropdown_years]');
    await page.click("li[data-content='2018']");

    await page.click('a[data-activates=dropdown_provinces]');
    await page.click("li[data-content='nuevo leon']");


    await page.evaluate(() => {
        document.querySelector('a[data-activates=dropdown_cities]').click();
    });
    await page.click("li[data-content='monterrey']");
    await page.type('#input_recorrido', `20000`);
    await page.type('#input_precio', `${req.body.precio}`);
    await page.evaluate(() => {
        document.querySelector('.next-button').click();
    });


    await page.waitForSelector('#input_text_area_review');
    await page.type('#input_text_area_review', `${req.body.descripcion}`);

    const [fileChooser1] = await Promise.all([
        page.waitForFileChooser(),
        page.click('.file-input'),
    ]);
    
    //Path a cambiar dependiendo la imagen a subir
    await fileChooser1.accept(['/Users/Quijano/Downloads/prueba1.png']);

    const [fileChooser2] = await Promise.all([
        page.waitForFileChooser(),
        page.click('.file-input'),
    ]);
    
    //Path a cambiar dependiendo la imagen a subir
    await fileChooser2.accept(['/Users/Quijano/Downloads/prueba2.png']);

    const [fileChooser3] = await Promise.all([
        page.waitForFileChooser(),
        page.click('.file-input'),
    ]);
    
    //Path a cambiar dependiendo la imagen a subir
    await fileChooser3.accept(['/Users/Quijano/Downloads/prueba3.png']);
    await page.waitForSelector("li[data-key='2']");

    await page.click("button[class='next-button']");
    await page.waitForSelector('#cancelButton');
    await page.click("#cancelButton");


    await page.screenshot({path: 'frontend/src/images/example.png'});

    await browser.close();
    res.send(`Publicado`);
})

app.get('/', (req,res) => {
    res.send('Server is ready');
});

app.listen(5000, () => {
    console.log('Serve at http://localhost:5000');
})