import React, { useState } from "react";

import { Button, TextField, VFlow } from "bold-ui";

import { isPrime, dividersChecker } from "../services.js";

const Home = () => {
    const [inputedNumber, setInputedNumber] = useState(0);
    const [primeMessage, setPrimeMessage] = useState("No number has been entered yet");
    const [, setDividers] = useState([]);

    const primeChecker = (number) => {
        isPrime(number)
            .then((res) => setPrimeMessage(res ? "Is prime" : "Is not prime"))
            .catch((e) => console.log(e));
    };

    const getDividers = (number) => {
        dividersChecker(number)
            .then((res) => setDividers(res))
            .catch((e) => console.log(e));
    };

    const submitNumber = () => {
        primeChecker(inputedNumber);
        getDividers(inputedNumber);
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
            <p>{primeMessage}</p>
            <Button
                kind="primary"
                skin="default"
                size="large"
                block
                onClick={() => submitNumber()}
            >
                Verificar
            </Button>
        </VFlow>
    );
};

export default Home;
