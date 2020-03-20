import React, { useState } from "react";

import { Button, TextField, DataTable, VFlow } from "bold-ui";

import { isPrime, dividersChecker } from "../services.js";

const Home = () => {
    const [inputedNumber, setInputedNumber] = useState(null);
    const [primeMessage, setPrimeMessage] = useState("No number has been entered yet");
    const [dividers, setDividers] = useState([]);

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
            <DataTable
                rows={dividers}
                loading={false}
                columns={[
                    {
                        name: "divider",
                        header: "Divider",
                        render: item => item,
                    },                 
                ]}
            />
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
