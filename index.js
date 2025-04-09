const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const PRINTIFY_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6ImI0ZDg0MmI2MjA5YmY1NDZkODc5MzQ2ZGY3OTgzZGRlM2RhYjhkMTJkMTViNzg1YjRiYmEwYTIyY2YzODMyODczMDhmMjRmMTk0YTlkOWE4IiwiaWF0IjoxNzQyNTUwNDIzLjMyNTQ5MSwibmJmIjoxNzQyNTUwNDIzLjMyNTQ5MywiZXhwIjoxNzc0MDg2NDIzLjMxNzU3Miwic3ViIjoiMTQyNDA4MjgiLCJzY29wZXMiOlsic2hvcHMubWFuYWdlIiwic2hvcHMucmVhZCIsImNhdGFsb2cucmVhZCIsIm9yZGVycy5yZWFkIiwib3JkZXJzLndyaXRlIiwicHJvZHVjdHMucmVhZCIsInByb2R1Y3RzLndyaXRlIiwid2ViaG9va3MucmVhZCIsIndlYmhvb2tzLndyaXRlIiwidXBsb2Fkcy5yZWFkIiwidXBsb2Fkcy53cml0ZSIsInByaW50X3Byb3ZpZGVycy5yZWFkIiwidXNlci5pbmZvIl19.AHfNS13a0wGbPCX-sypszpQ2Pbl27N_hJPol_2l9VypEmUtocNOZgBKkd-ZmSW0oAcXuSHEJ5zcN2fuKQH4'; // Replace with your Printify token
const STORE_ID = '21352567';

app.get('/api/products', async (req, res) => {
    try {
        const response = await axios.get(`https://api.printify.com/v1/shops/${STORE_ID}/products.json`, {
            headers: {
                'Authorization': `Bearer ${PRINTIFY_TOKEN}`
            }
        });

        // Transform the data to include the correct prices
        const productsWithCorrectPrices = response.data.products.map(product => {
            // Keep the product data but ensure that the prices are correct
            return {
                ...product,
                variants: product.variants.map(variant => ({
                    ...variant,
                    // Here you can adjust the price if necessary
                    price: variant.price,
                    title: variant.title,
                    options: variant.options
                }))
            };
        });

        res.json(productsWithCorrectPrices);
    } catch (error) {
        console.error('Error while retrieving products:', error);
        res.status(500).json({ error: 'Error while retrieving products' });
    }
});

const port = process.env.PORT || 10000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port}`);
});
