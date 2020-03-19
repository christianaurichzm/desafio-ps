import React from "react";

import { Button, TextField } from 'bold-ui'

const Home = () => (
    <div className="home-wrapper">
        <TextField
            name='number'
            label='Number'
            type='number'
            placeholder='Enter a number'
        />
        <Button 
            kind='primary' 
            skin='default'
        >
            Verificar
        </Button>
    </div>
);

export default Home;