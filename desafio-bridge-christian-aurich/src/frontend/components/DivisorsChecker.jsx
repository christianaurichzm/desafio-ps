import React, { useState } from "react";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";

import { Button, TextField, PagedTable, Icon, Text, VFlow } from "bold-ui";
import ErrorMessage from "./ErrorMessage";
import { isPrime, divisorsChecker } from "../services.js";
import naturalNumberChecker from "../utils/naturalNumberChecker.js";

const DivisorsChecker = () => {
    const [inputedNumber, setInputedNumber] = useState(null);
    const [primeMessage, setPrimeMessage] = useState("Nenhum número foi digitado ainda.");
    const [divisors, setDivisors] = useState([]);
    const [tableParams, setTableParams] = useState({
        page: 0,
        size: 10,
    });
    const [errorMessage, setErrorMessage] = useState("");
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

    const primeChecker = (number) => {
        isPrime(number)
            .then((res) => setPrimeMessage(res ?
                `O número ${inputedNumber} é primo` :
                `O número ${inputedNumber} não é primo`)
            )
            .catch((e) => setErrorMessage(e.message));
    };

    const getDividers = (number) => {
        trackPromise(
            divisorsChecker(number)
                .then((res) => {
                    setDivisors(res);
                    setTableParams((prevState) => ({
                        ...prevState, totalElements: res.length 
                    }));
                    setTableParams((prevState) => ({
                        ...prevState, totalPages: Math.max(1, Math.floor((res.length / prevState.size) + 1)) 
                    }));
                })
        ).catch((e) => setErrorMessage(e.message));
    };

    const submitNumber = (number) => {
        if (naturalNumberChecker(Number(number))) {
            primeChecker(Number(inputedNumber));
            getDividers(Number(inputedNumber));
            setErrorMessage("");
        } else {
            setPrimeMessage("");
            setDivisors([]);
            setErrorMessage("Digite um número natural.");
        }
    };

    return (
        <VFlow
            vSpacing={2}
            style={{
                padding: "40px",
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
            <Text color='inherit'>{primeMessage}</Text>
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
                    icon="plus" 
                    style={{ 
                        marginRight: "0.5rem",
                    }} />
                <Text color='inherit'>Verificar</Text>
            </Button>
        </VFlow>
    );

};

export default DivisorsChecker;
