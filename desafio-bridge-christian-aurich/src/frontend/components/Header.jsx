import React from "react";

import { Text, VFlow } from "bold-ui";

const Header = () => (
    <VFlow vSpacing={0}>
        <Text>
            <h1 className="header-default">
                Desafio Bridge_ - Christian Aurich Zanettini Martins
            </h1>
        </Text>
        <Text>
            <h4>
                Insira um número natural no campo abaixo para poder
                verificar se o mesmo é primo, e quais são seus divisores
            </h4>
        </Text>
    </VFlow>
);

export default Header;