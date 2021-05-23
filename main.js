const submitButton = document.querySelector('#div-app form button');
const cepField = document.querySelector('#div-app form input');
const content = document.querySelector('#div-app main');


submitButton.addEventListener('click', run);

function run(event) {
    event.preventDefault();

    let cep = cepField.value
    cep = cep.replace(' ', '');
    cep = cep.replace('.', '');
    cep = cep.trim();

    axios
    .get(`https://viacep.com.br/ws/${cep}/json/`)
    .then((response) => {
        if (response.data.erro) {
           throw new Error('CEP inválido')

        }
        content.innerHTML = '';
        createLine(response.data.logradouro);
        createLine(`${response.data.uf}/${response.data.localidade}`);
        
    })
    .catch((error) => {
        content.innerHTML = '';
        createLine('Ops, envie um CEP válido.')
        console.log(error);
    })
}

function createLine(text) {
    const line = document.createElement('p');
    const textResult = document.createTextNode(text);

    line.appendChild(textResult);
    content.appendChild(line);
}
