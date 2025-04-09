const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const PRINTIFY_TOKEN = 'YeyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6ImI0ZDg0MmI2MjA5YmY1NDZkODc5MzQ2ZGY3OTgzZGRlM2RhYjhkMTJkMTViNzg1YjRiYmEwYTIyY2YzODMyODczMDhmMjRmMTk0YTlkOWE4IiwiaWF0IjoxNzQyNTUwNDIzLjMyNTQ5MSwibmJmIjoxNzQyNTUwNDIzLjMyNTQ5MywiZXhwIjoxNzc0MDg2NDIzLjMxNzU3Miwic3ViIjoiMTQyNDA4MjgiLCJzY29wZXMiOlsic2hvcHMubWFuYWdlIiwic2hvcHMucmVhZCIsImNhdGFsb2cucmVhZCIsIm9yZGVycy5yZWFkIiwib3JkZXJzLndyaXRlIiwicHJvZHVjdHMucmVhZCIsInByb2R1Y3RzLndyaXRlIiwid2ViaG9va3MucmVhZCIsIndlYmhvb2tzLndyaXRlIiwidXBsb2Fkcy5yZWFkIiwidXBsb2Fkcy53cml0ZSIsInByaW50X3Byb3ZpZGVycy5yZWFkIiwidXNlci5pbmZvIl19.AHfNS13a0wGbPCX-sypszpQ2Pbl27N_hJPol_2l9VypEmUtocNOZgBKkd-ZmSW0oAcXuSHEJ5zcN2fuKQH4'; // Remplacez par votre token Printify
const STORE_ID = '21352567';

app.get('/api/products', async (req, res) => {
  try {
    const response = await axios.get(`https://api.printify.com/v1/shops/${STORE_ID}/products.json`, {
      headers: {
        'Authorization': `Bearer ${PRINTIFY_TOKEN}`
      }
    });

    // Vérifiez si response.data.products est défini et est un tableau
    if (response.data && response.data.products && Array.isArray(response.data.products)) {
      // Transformez les données pour inclure les bons prix
      const productsWithCorrectPrices = response.data.products.map(product => {
        // Conservez les données du produit mais assurez-vous que les prix sont corrects
        return {
          ...product,
          variants: product.variants.map(variant => ({
            ...variant,
            // Ici vous pouvez ajuster le prix si nécessaire
            price: variant.price,
            title: variant.title,
            options: variant.options
          }))
        };
      });

      res.json(productsWithCorrectPrices);
    } else {
      console.error('Erreur : response.data.products n\'est pas un tableau valide');
      res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
  }
});

const port = process.env.PORT || 10000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
