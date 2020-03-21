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
        sort: ["divisor"],
    });

    console.log(tableParams);

    const rows = divisors
    // Naive sorting for example purposes:
        .sort((a, b) => {
            if (tableParams.sort[0] === "id") {
                return a.id - b.id;
            }
            if (tableParams.sort[0] === "-id") {
                return b.id - a.id;
            }
            return 0;
        })
    // Naive pagination for example purposes:
        .slice(tableParams.page * tableParams.size, tableParams.page * tableParams.size + tableParams.size);

    const handleSortChange = (sort) => setTableParams((prevState) => ({ ...prevState, sort }));

    const handlePageChange = (page) => setTableParams((prevState) => ({ ...prevState, page }));

    const handleSizeChange = (size) => setTableParams((prevState) => ( { ...prevState, size, totalPages: Math.max(1, prevState.totalElements / size) } ));

    const primeChecker = (number) => {
        isPrime(number)
            .then((res) => setPrimeMessage(res ? "Is prime" : "Is not prime"))
            .catch((e) => console.log(e));
    };

    const getDividers = (number) => {
        divisorsChecker(number)
            .then((res) => {
                setDivisors(res);
                setTableParams((prevState) => ({ ...prevState, totalElements: res.length }));
                setTableParams((prevState) => ({ ...prevState, totalPages: Math.max(1, res.length / prevState.size) }));
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
                    sort={tableParams.sort}
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
                >
                    Verificar
                </Button>
            </VFlow>
        </div>
    );
};

export default Home;
