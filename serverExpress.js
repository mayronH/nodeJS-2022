const express = require('express');
// Node default module, generate random id
const { randomUUID } = require('crypto');
// Node fault module, file system
const fs = require('fs');

const app = express();

// Middleware
app.use(express.json()); //accept json body

let products = [];

fs.readFile('products.json', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        products = JSON.parse(data);
    }
});

/**
 * body = Whatever you want to send to the app
 * params = route's params
 * query = optional params like (/product?2333)
 */

app.post('/products', (req, res) => {
    const { name, price } = req.body;

    const product = {
        name,
        price,
        id: randomUUID(),
    };

    products.push(product);

    productFile();

    return res.json(product);
});

app.get('/products', (req, res) => {
    return res.json(products);
});

app.get('/products/:id', (req, res) => {
    const { id } = req.params;

    const product = products.find((product) => product.id === id);

    return res.json(product);
});

app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;

    const productIndex = products.findIndex((product) => product.id === id);

    products[productIndex] = {
        ...products[productIndex],
        name,
        price,
    };

    productFile();

    return res.json({ message: 'Product updated successfully' });
});

app.delete('/products/:id', (req, res) => {
    const { id } = req.params;

    const productIndex = products.findIndex((product) => product.id === id);

    products.splice(productIndex, 1);

    productFile();

    return res.json({ message: 'Product deleted successfully' });
});

// Function to manipulate a file
function productFile() {
    fs.writeFile('products.json', JSON.stringify(products), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Product saved');
        }
    });
}

// Express server
app.listen(8081, () => console.log('Server running on 8081'));
