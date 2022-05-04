"use strict"; // Indica que o código deve ser executado em "modo estrito". 
// Com o modo estrito, você não pode usar variáveis ​​não declaradas.

const display = document.getElementById("display");
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');

let novoNumero = true;
let operador;
let numeroAnterior;
let historioCalculo = [];


const operacaoPentente = () => operador !== undefined // verifica se o operador esta definido ou não

const calcular = () => {
  if (operacaoPentente()) {
    const numeroAtual = parseFloat(display.textContent.replace(',', '.'));
    novoNumero = true;
    const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);
    atualizarDisplay(resultado);
    historioCalculo.push(`${numeroAnterior} ${operador} ${numeroAtual} = ${resultado}`);
    historico();
  }
}

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent); // chama o atualizarDisplay passando o valor do alvo que foi clicado
numeros.forEach(numero => numero.addEventListener('click', inserirNumero)); // adiciono a função inserirNumero em todos os números

const atualizarDisplay = (texto) => {
  if (novoNumero) { // verifica se é o primeiro número ou é o segundo número da conta
    display.textContent = texto.toLocaleString('pt-BR');
    novoNumero = false;
  } else {
    display.textContent += texto.toLocaleString('pt-BR');
  }
}

const selecionarOperador = (evento) => {
  if (!novoNumero) { // verifica se é um novo número ou não
    novoNumero = true;
    operador = evento.target.textContent;
    numeroAnterior = parseFloat(display.textContent.replace(',', '.'));
    calcular()
  }
}

operadores.forEach(operador => operador.addEventListener('click', selecionarOperador)); // adiciono a função selecionarOperador em todos os operadores




let historico = () => {
  document.getElementById("historico").innerHTML += `<li>${historioCalculo[historioCalculo.length - 1]};</li>`;
}

const ativarIgual = () => {
  calcular();
  operador = undefined;
}

document.getElementById('igual').addEventListener('click', ativarIgual)

const limparDisplay = () => display.textContent = '';
document.getElementById('limparDisplay').addEventListener('click', limparDisplay);

const limparCalculo = () => {
  limparDisplay();
  operador = undefined;
  novoNumero = true;
  numeroAnterior = undefined;
}
document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', removerUltimoNumero);

const inverterSinal = () => {
  novoNumero = true;
  atualizarDisplay(display.textContent * -1);
}
document.getElementById('inverter').addEventListener('click', inverterSinal);

const existeDecial = () => display.textContent.indexOf(',') !== -1;
const existeValor = () => display.textContent.length > 0;

const inserirDecimal = () => {
  if (!existeDecial()) {
    if (existeValor()) {
      atualizarDisplay(',')
    } else {
      atualizarDisplay('0,')
    }
  }
}
document.getElementById('decimal').addEventListener('click', inserirDecimal);

const mapaTeclado = {
  0: 'tecla0',
  1: 'tecla1',
  2: 'tecla2',
  3: 'tecla3',
  4: 'tecla4',
  5: 'tecla5',
  6: 'tecla6',
  7: 'tecla7',
  8: 'tecla8',
  9: 'tecla9',
  '/': 'operadorDividir',
  '*': 'operadorMultiplicar',
  '-': 'operadorSubtrair',
  '+': 'operadorAdicionar',
  '=': 'igual',
  Enter: 'igual',
  Backspace: 'backspace',
  c: 'limparDisplay',
  Escape: 'limparCalculo',
  ',': 'decimal',
};


const mapearTeclado = (evento) => {
  const tecla = evento.key;

  const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
  if (teclaPermitida()) {
    document.getElementById(mapaTeclado[tecla]).click();
  }
}
document.addEventListener('keydown', mapearTeclado);
