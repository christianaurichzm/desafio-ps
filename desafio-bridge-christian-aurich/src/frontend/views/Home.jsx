import React, { useState } from "react";

import { Button, TextField, VFlow } from 'bold-ui'

import { isPrime } from "../services.js";

const Home = () => {
    const [inputedNumber, setInputedNumber] = useState(0);

    const verificarSeEhPrimo = (number) => {
        isPrime(number)
        .then((res) => console.log(res))
        .catch((e) => console.log(e))
    } 

    return (
        <VFlow 
            style={{ 
                border: "1px solid #0069d0",
                borderRadius: "6px",
                height: "400px",
                justifyContent: "space-around",
                padding: "40px"
            }}
        >
            <TextField
                name='number'
                label='Number'
                type='number'
                placeholder='Enter a number'
                onChange={(e) => setInputedNumber(e.target.value)}
            />
            <p>{inputedNumber}</p>
            <Button 
                kind='primary' 
                skin='default'
                size='large'
                block
                onClick={() => verificarSeEhPrimo(inputedNumber)}
            >
                Verificar
            </Button>
        </VFlow>
    );
};

export default Home;