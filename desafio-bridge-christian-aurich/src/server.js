/* eslint-disable no-undef */
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(helmet());

const port = 5000;

app.get("/", (req, res) => {
    res.send({ express: "Express server" });
});

app.post("/number-checker", (req, res) => {
    const number = parseInt(req.body.number);
    let isPrime = false;
    const divisors = [];    

    for (let i = 1; i <= number; i++) {
        if (number % i === 0) {
            divisors.push(i);
        }
    }

    if (divisors.length === 2) {
        isPrime = true;
    }

    res.json({ divisors, isPrime });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
