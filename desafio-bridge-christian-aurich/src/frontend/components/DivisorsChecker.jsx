import React, { useState } from 'react';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import { Button, TextField, PagedTable, Icon, Text, VFlow } from 'bold-ui';

import ErrorMessage from './ErrorMessage';
import naturalNumberChecker from '../utils/naturalNumberChecker.js';
import { numberCheckerService } from '../services.js';

const DivisorsChecker = () => {
    const [inputedNumber, setInputedNumber] = useState(null);
    const [divisors, setDivisors] = useState([]);
    const [primeMessage, setPrimeMessage] = useState('Nenhum número foi verificado ainda.');
    const [errorMessage, setErrorMessage] = useState(null);
    const [tableParams, setTableParams] = useState({
        page: 0,
        size: 10,
    });
    const { promiseInProgress } = usePromiseTracker();

    const rows = divisors
        .slice(tableParams.page * tableParams.size, tableParams.page * tableParams.size + tableParams.size);

    const handleSortChange = (sort) => setTableParams((prevState) => ({
        ...prevState,
        sort 
    }));

    const handlePageChange = (page) => setTableParams((prevState) => ({
        ...prevState,
        page 
    }));

    const handleSizeChange = (size) => setTableParams((prevState) => ( { 
        ...prevState,
        size,
        totalPages: Math.max(1, Math.floor((prevState.totalElements / size) + 1)) 
    }));

    const numberChecker = (number) => {
        trackPromise(
            numberCheckerService(number)
                .then(({divisors, isPrime}) => {
                    setPrimeMessage(isPrime ?
                    `O número ${inputedNumber} é primo` :
                    `O número ${inputedNumber} não é primo`);
                    setDivisors(divisors);
                    setTableParams((prevState) => ({
                        ...prevState,
                        totalElements: divisors.length,
                        totalPages: Math.max(1, Math.floor((divisors.length / prevState.size) + 1)) 
                    }));
                })
        )
        .catch((e) => setErrorMessage(e.message));
    };

    const submitNumber = (number) => {
        if (naturalNumberChecker(Number(number))) {
            numberChecker(Number(number));
            setErrorMessage(null);
        } else {
            setPrimeMessage('');
            setDivisors([]);
            setErrorMessage('Digite um número natural.');
        }
    };

    return (
        <VFlow
            vSpacing={2}
            style={{
                padding: '40px',
            }}
        >
            {
                errorMessage && (
                    <ErrorMessage message={errorMessage} />
                )
            }
            <TextField
                name="number"
                label="Número"
                type="number"
                placeholder="Digite um número natural"
                required
                onChange={(e) => setInputedNumber(e.target.value)}
            />
            <Text color="inherit">{primeMessage}</Text>
            <div>
                <PagedTable
                    rows={rows}
                    page={tableParams.page}
                    size={tableParams.size}
                    totalElements={tableParams.totalElements}
                    totalPages={tableParams.totalPages}
                    onSortChange={handleSortChange}
                    onPageChange={handlePageChange}
                    onSizeChange={handleSizeChange}
                    loading={promiseInProgress}
                    columns={[
                        {
                            name: "divisor",
                            header: "Divisor",
                            align: "center",
                            render: item => item,
                        },                 
                    ]}
                />
            </div>
            <Button
                kind="primary"
                skin="default"
                size="large"
                onClick={() => submitNumber(inputedNumber)}
                disabled={!inputedNumber}
            >
                <Icon 
                    icon="playOutline" 
                    style={{ 
                        marginRight: '0.5rem',
                    }}
                />
                <Text color="inherit">Verificar</Text>
            </Button>
        </VFlow>
    );

};

export default DivisorsChecker;
