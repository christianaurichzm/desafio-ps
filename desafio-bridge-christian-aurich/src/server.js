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

const primeCheck = (number) => {
    let isPrime = true;

    if (number < 2) {
        isPrime = false;
    } else {
        for (let i = 2; i < number; i++) {
            if (number % i === 0) {
                isPrime = false;
            }
        }
    }

    return isPrime;
};

app.post("/prime-checker", (req, res) => {
    const number = parseInt(req.body.number);

    res.json({ ok: false, isPrime: primeCheck(number) });
});

app.post("/divisors-checker", (req, res) => {
    const number = parseInt(req.body.number);

    let divisors = [1];

    if (primeCheck(number)) {
        divisors.push(number);
    } else {
        if (number !== 0) {
            for (let i = 2; i <= number; i++) {
                if (number % i === 0) {
                    divisors.push(i);
                }
            }
        } else {
            divisors.shift();
        }
    }

    res.json({ ok: false, divisors });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
