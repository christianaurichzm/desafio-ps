async function numberCheckerService (number) {
    let response = await runPost("/number-checker", { number });
    return response;
}

function runPost (path, data) {
    return runPostOrDelete("POST", path, data);
}
  
function runPostOrDelete (method, path, data) {
    const params = {
        method: method,
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    };
  
    return window.fetch(path, params)
        .then(response => {
            if (!response.ok) { 
                throw new Error("Houve um problema de comunicação com o servidor da aplicação. Tente novamente mais tarde."); 
            }
            return response;
        })
        .then(response => response.json());
}

export { numberCheckerService };