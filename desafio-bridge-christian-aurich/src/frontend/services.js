/* eslint-disable quotes */
async function isPrime (number) {
    let response = await runPost('/prime-checker', { number });
    if (response.ok) { 
        return { ok: true }; 
    }
    return response.isPrime;
}

async function divisorsChecker (number) {
    let response = await runPost('/divisors-checker', { number });
    if (response.ok) { 
        return { ok: true }; 
    }
    return response.divisors;
}

function runPost (path, data) {
    return runPostOrDelete('POST', path, data);
}
  
function runPostOrDelete (method, path, data) {
    const params = {
        method: method,
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    };
  
    return window.fetch(path, params)
        .then(response => {
            if (!response.ok) { 
                throw new Error('Houve um problema de comunicação com o servidor da aplicação. Tente novamente mais tarde.'); 
            }
            return response;
        })
        .then(response => response.json());
}

export { isPrime, divisorsChecker };