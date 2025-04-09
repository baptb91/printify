const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

const PRINTIFY_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6ImI0ZDg0MmI2MjA5YmY1NDZkODc5MzQ2ZGY3OTgzZGRlM2RhYjhkMTJkMTViNzg1YjRiYmEwYTIyY2YzODMyODczMDhmMjRmMTk0YTlkOWE4IiwiaWF0IjoxNzQyNTUwNDIzLjMyNTQ5MSwibmJmIjoxNzQyNTUwNDIzLjMyNTQ5MywiZXhwIjoxNzc0MDg2NDIzLjMxNzU3Miwic3ViIjoiMTQyNDA4MjgiLCJzY29wZXMiOlsic2hvcHMubWFuYWdlIiwic2hvcHMucmVhZCIsImNhdGFsb2cucmVhZCIsIm9yZGVycy5yZWFkIiwib3JkZXJzLndyaXRlIiwicHJvZHVjdHMucmVhZCIsInByb2R1Y3RzLndyaXRlIiwid2ViaG9va3MucmVhZCIsIndlYmhvb2tzLndyaXRlIiwidXBsb2Fkcy5yZWFkIiwidXBsb2Fkcy53cml0ZSIsInByaW50X3Byb3ZpZGVycy5yZWFkIiwidXNlci5pbmZvIl19.AHfNS13a0wGbPCX-sypszpQ2Pbl27N_hJPol_2l9VypEmUtocNOZgBKkd-ZmSW0oAcXuSHEJ5zcN2fuKQH4';
const STORE_ID = '21352567';

app.get('/api/products', async (req, res) => {
  try {
    console.log('Récupération des produits Printify...');
    console.log('Token API:', PRINTIFY_TOKEN);
    console.log('Store ID:', STORE_ID);

    const response = await axios.get(`https://api.printify.com/v1/shops/${STORE_ID}/products.json`, {
      headers: {
        'Authorization': `Bearer ${PRINTIFY_TOKEN}`
      }
    });

    console.log('Données Printify récupérées avec succès.');
    res.json(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
