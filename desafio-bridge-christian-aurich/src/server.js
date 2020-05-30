const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(helmet());

const port = 5000;

app.get('/', (req, res) => {
    res.send({ express: 'Express server' });
});

app.post('/number-checker', (req, res) => {
    const number = parseInt(req.body.number);
    const numberSquareRoot = parseInt(Math.sqrt(number))    
    const divisors = [];
    let isPrime = false;

    for (let i = 1; i <= numberSquareRoot; i++) {
        if (number % i === 0) {
            divisors.push(i);

            if (i !== number / i) {
                divisors.push(number / i);
            }
        }
    }

    if (divisors.length === 2) {
        isPrime = true;
    }

    divisors.sort((a, b) => a - b);

    res.json({ divisors, isPrime });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
