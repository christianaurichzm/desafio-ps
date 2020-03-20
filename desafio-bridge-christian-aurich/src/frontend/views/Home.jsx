import React, { useState } from "react";

import { Button, TextField, VFlow } from "bold-ui";

import { isPrime, dividersChecker } from "../services.js";

const Home = () => {
    const [inputedNumber, setInputedNumber] = useState(0);

    const primeChecker = (number) => {
        isPrime(number)
            .then((res) => console.log(res))
            .catch((e) => console.log(e));
    };

    const dividers = (number) => {
        dividersChecker(number)
            .then((res) => console.log(res))
            .catch((e) => console.log(e));
    };

    const submitNumber = () => {
        primeChecker(inputedNumber);
        dividers(inputedNumber);
    };

    return (
        <VFlow
            style={{
                border: "1px solid #0069d0",
                borderRadius: "6px",
                height: "400px",
                justifyContent: "space-around",
                padding: "40px",
            }}
        >
            <TextField
                name="number"
                label="Number"
                type="number"
                placeholder="Enter a number"
                onChange={(e) => setInputedNumber(e.target.value)}
            />
            <p>{inputedNumber}</p>
            <Button
                kind="primary"
                skin="default"
                size="large"
                block
                onClick={submitNumber()}
            >
                Verificar
            </Button>
        </VFlow>
    );
};

export default Home;
