import React from 'react';

import { Text, VFlow } from 'bold-ui';

const Header = () => (
    <VFlow vSpacing={1.8}>
        <Text
            component='h1'
            fontSize={1.8}
            color="primary"
        >
            Desafio Bridge_ - Christian Aurich Zanettini Martins
        </Text>
        <Text component='h4'>
            Insira um número no campo abaixo. Caso ele seja natural (inteiro e positivo), é possivel
            verificar se o mesmo é primo, e quais são seus divisores.
        </Text>
    </VFlow>
);

export default Header;