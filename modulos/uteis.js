const soma = (...numeros) => numeros.reduce((soma, numero) => soma + numero, 0);

const ePar = (numero) => numero % 2 === 0;

const fatorial = (numero) => (numero <= 1 ? 1 : numero * fatorial(numero - 1));

export {
    soma,
    ePar,
    fatorial
}
