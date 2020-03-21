import React, { useState } from "react";

import { Button, TextField, PagedTable, VFlow } from "bold-ui";

import { isPrime, divisorsChecker } from "../services.js";

const Home = () => {
    const [inputedNumber, setInputedNumber] = useState(null);
    const [primeMessage, setPrimeMessage] = useState("Nenhum número foi digitado ainda.");
    const [divisors, setDivisors] = useState([]);
    const [tableParams, setTableParams] = useState({
        page: 0,
        size: 5,
    });

    const rows = divisors
        .slice(tableParams.page * tableParams.size, tableParams.page * tableParams.size + tableParams.size);

    const handleSortChange = (sort) => setTableParams((prevState) => ({ ...prevState, sort }));

    const handlePageChange = (page) => setTableParams((prevState) => ({ ...prevState, page }));

    const handleSizeChange = (size) => setTableParams((prevState) => ( { ...prevState, size, totalPages: Math.max(1, Math.floor((prevState.totalElements / size) + 1)) } ));

    const primeChecker = (number) => {
        isPrime(number)
            .then((res) => setPrimeMessage(res ? `O número ${inputedNumber} é primo` : `O número ${inputedNumber} não é primo`))
            .catch((e) => console.log(e));
    };

    const getDividers = (number) => {
        divisorsChecker(number)
            .then((res) => {
                setDivisors(res);
                setTableParams((prevState) => ({ ...prevState, totalElements: res.length }));
                setTableParams((prevState) => ({ ...prevState, totalPages: Math.round(res.length / prevState.size) }));
            })
            .catch((e) => console.log(e));
    };

    const submitNumber = () => {
        primeChecker(inputedNumber);
        getDividers(inputedNumber);
    };

    return (
        <div className="app-content-wrapper">
            <VFlow
                style={{
                    justifyContent: "space-around",
                    padding: "40px",
                }}
            >
                <TextField
                    name="number"
                    label="Número"
                    type="number"
                    placeholder="Digite um número natural"
                    required
                    onChange={(e) => setInputedNumber(e.target.value)}
                />
                <p>{primeMessage}</p>
                <PagedTable
                    rows={rows}
                    page={tableParams.page}
                    size={tableParams.size}
                    totalElements={tableParams.totalElements}
                    totalPages={tableParams.totalPages}
                    onSortChange={handleSortChange}
                    onPageChange={handlePageChange}
                    onSizeChange={handleSizeChange}
                    loading={false}
                    columns={[
                        {
                            name: "divisor",
                            header: "Divisor",
                            align: "center",
                            render: item => item,
                        },                 
                    ]}
                />
                <Button
                    kind="primary"
                    skin="default"
                    size="large"
                    onClick={() => submitNumber()}
                    disabled={!inputedNumber}
                >
                    Verificar
                </Button>
            </VFlow>
        </div>
    );
};

export default Home;
