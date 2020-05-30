import React from 'react';

import { Text, VFlow } from 'bold-ui';

const Header = () => (
    <VFlow vSpacing={1.8}>
        <Text>
            <h1 className="header-default">
                Desafio Bridge_ - Christian Aurich Zanettini Martins
            </h1>
        </Text>
        <Text>
            <h4>
                Insira um número natural (inteiro e positivo) no campo abaixo para poder
                verificar se o mesmo é primo, e quais são seus divisores
            </h4>
        </Text>
    </VFlow>
);

export default Header;