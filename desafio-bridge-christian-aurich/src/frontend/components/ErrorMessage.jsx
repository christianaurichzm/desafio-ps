import React from "react";

import { Text } from "bold-ui";

const ErrorMessage = ({
    message
}) => (
    <Text 
        color="danger"
        fontWeight="bold"
    >
        {message}
    </Text>
);

export default ErrorMessage;