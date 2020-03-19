import React, { useState } from "react";

import { Button, TextField } from 'bold-ui'

const Home = () => {
    const [inputedNumber, setInputedNumber] = useState(0);

    return (
        <div className="home-wrapper">
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
        >
            Verificar
        </Button>
    </div>
    );
};

export default Home;