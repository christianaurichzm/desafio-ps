import React, { useState } from "react";

import { Button, TextField, PagedTable, Icon, Text, VFlow } from "bold-ui";
import { isPrime, divisorsChecker } from "../services.js";

const DivisorsChecker = () => {
    const [inputedNumber, setInputedNumber] = useState(null);
    const [primeMessage, setPrimeMessage] = useState("Nenhum número foi digitado ainda.");
    const [divisors, setDivisors] = useState([]);
    const [tableParams, setTableParams] = useState({
        page: 0,
        size: 10,
    });

    const rows = divisors
        .slice(tableParams.page * tableParams.size, tableParams.page * tableParams.size + tableParams.size);

    const handleSortChange = (sort) => setTableParams((prevState) => ({ ...prevState, sort }));

    const handlePageChange = (page) => setTableParams((prevState) => ({ ...prevState, page }));

    const handleSizeChange = (size) => setTableParams((prevState) => ( { ...prevState, size, totalPages: Math.max(1, Math.round(prevState.totalElements / size)) } ));

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
                setTableParams((prevState) => ({ ...prevState, totalPages: Math.max(1, Math.round(res.length / prevState.size)) }));
            })
            .catch((e) => console.log(e));
    };

    const submitNumber = () => {
        primeChecker(inputedNumber);
        getDividers(inputedNumber);
    };

    return(
        <VFlow
            vSpacing={2}
            style={{
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
            </div>
            <Button
                kind="primary"
                skin="default"
                size="large"
                onClick={() => submitNumber()}
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
