var recebeFraseSorteada = document.querySelector("#palavra-sorteada");
var tabuleiroJogo = document.querySelector("#tabuleiro");

var botaoComecar = document.querySelector("#botao-comecar");
botaoComecar.classList.add('botao-comecar-jogo');

var botaoAdicionaPalavra = document.querySelector("#botao-adicionar-palavra");
botaoAdicionaPalavra.classList.add('botao-adicionar-palavra');

botaoAdicionaPalavra.addEventListener('click', function(){
    botaoComecar.classList.remove('botao-comecar-jogo');
    botaoAdicionaPalavra.classList.remove('botao-adicionar-palavra');        
    botaoSalvarComeçar.classList.add('botao-salvar-comecar');
    botaoCancelar.classList.add('botao-cancelar');

    ocultarBotoesDoInicio();
    mostraBotoesIncluirPalavras();
    limpaCampoDigitado(campoAcrescentarPalavra);
});

botaoComecar.addEventListener("click", function(){
    botaoComecar.classList.remove('botao-comecar-jogo');
    botaoAdicionaPalavra.classList.remove('botao-adicionar-palavra');
    novoJogo.classList.add('botao-novo-jogo');
    desistir.classList.add('botao-desistir');        
    //novoJogo.style.top = 150;
    //desistir.style.top = 290;

    ocultarBotoesDoInicio();
    ocultarBotoesIncluirPalavras();

   // var palavraSorteada = sorteiaPalavras();
   // recebeFraseSorteada.innerHTML = palavraSorteada;
    criaTracinhosDasLetras();

    limpaCampoDigitado(inputDoJogador);
    mostraBotoesNovoJogoEDesistir();
    mostrarInputDoJogador();
});

var arrayPalavras = ["pessego", "banana", "laranja", "cachorro", "girafa", "papagaio", "orangotango"];
var arrayPalavrasLetrasPalavraSecreta = ["pessego", "banana", "laranja", "cachorro", "girafa", "papagaio", "orangotango"];

function sorteiaPalavras(){
    var posicaoArray = parseInt(Math.random()*arrayPalavras.length);
    var palavraSorteada = arrayPalavras.splice(posicaoArray, 1)[0];
    var caracteres = palavraSorteada.split("");
    var palavraSorteadaFinal = caracteres.map(p => p.toUpperCase());
   
    var palavraSorteadaPLetrasPalaraSecreta = arrayPalavrasLetrasPalavraSecreta.splice(posicaoArray, 1)[0];
    var caracteresPLetrasPalaraSecreta = palavraSorteadaPLetrasPalaraSecreta.split("");
    
    letrasPalavraSecreta = caracteresPLetrasPalaraSecreta;

    return palavraSorteadaFinal;
}

//var divPalavraSorteada = document.querySelector(".div-palavras-sorteadas");
var arrayLetras;
var letrasPalavraSecreta;
function criaTracinhosDasLetras(){
    var ulTracejadoPalavraSorteada = document.createElement('ul');
    ulTracejadoPalavraSorteada.classList.add('ul-tracejado-palavra-sorteada');
    var palavraSorteadaTr = document.createElement("tr");
    palavraSorteadaTr.classList.add('tr-palavra-sorteada');
    arrayLetras = sorteiaPalavras();
    for (let i = 0; i < arrayLetras.length; i++) {
        var liTracejadoPalavraSorteada = document.createElement('li');
        liTracejadoPalavraSorteada.classList.add('li-tracejado-palavra-sorteada');
        ulTracejadoPalavraSorteada.appendChild(liTracejadoPalavraSorteada);
        var recebeLetraTd = document.createElement("td");
        var recebeLetra = arrayLetras[i];
        recebeLetraTd.textContent = recebeLetra;
        recebeLetraTd.classList.add("fadeOut", "td-palavra-sorteada");
        console.log(recebeLetraTd.textContent);
        palavraSorteadaTr.appendChild(recebeLetraTd);
            
        tabuleiroJogo.appendChild(palavraSorteadaTr);
        tabuleiroJogo.appendChild(ulTracejadoPalavraSorteada);
    }
}

function resetaTrPalavraSorteada(){
    var palavraSorteadaTr = document.querySelector('.tr-palavra-sorteada');
    palavraSorteadaTr.remove();
    //if(palavraSorteadaTr.innerHTML.length > 0){
    //    palavraSorteadaTr.remove();
    //}
}

function removeTrPalavraSorteada(){
   // if(divPalavraSorteada.innerHTML.length > 0){
  //      divPalavraSorteada.innerHTML = '';
  //  }
}

function resetaCriaTracinhosDasLetras(){
    //var trPalavraSorteada = document.querySelector("tr");
    //trPalavraSorteada.remove();
    var ulTracejadoPalavraSorteada = document.querySelector('.ul-tracejado-palavra-sorteada');
    ulTracejadoPalavraSorteada.remove();
    //var liTracejadoPalavraSorteada = document.querySelector(".li-tracejado-palavra-sorteada");
    // liTracejadoPalavraSorteada.remove();
}

var inputDoJogador = document.querySelector("#campo-input-jogador");
inputDoJogador.addEventListener("input", function(){
    var verificaInput = verificaInputJogador(inputDoJogador.value);
    if(inputDoJogador.value.length == 1 && verificaInput && numeroDeErros < 7){
        verificaSeAcertou(inputDoJogador.value);

        limpaCampoDigitado(inputDoJogador);

    }
});

var novoJogo = document.querySelector('.novo-jogo');
novoJogo.addEventListener('click', function(){
    limpaCampoDigitado(inputDoJogador);
    mostrarInputDoJogador();
    mensagemGanhou = true;
    numeroDeErros = 0;
    apagaForca();
    apagaletraErrada();
    resetaTrPalavraSorteada();
    resetaCriaTracinhosDasLetras();
    criaTracinhosDasLetras();
});
var desistir = document.querySelector('.desistir');
desistir.addEventListener('click', function(){
    novoJogo.classList.remove('botao-novo-jogo');
    desistir.classList.remove('botao-desistir');        
    botaoComecar.classList.add('botao-comecar-jogo');
    botaoAdicionaPalavra.classList.add('botao-adicionar-palavra');
    numeroDeErros = 0;
    apagaForca();
    resetaCriaTracinhosDasLetras();
    mensagemGanhou = true;
    apagaletraErrada();
    ocultarNovoJogoEDesistir();
    ocultarInputDoJogador();
    mostrarBotoesDoInicio();
    //removeTrPalavraSorteada();
    resetaTrPalavraSorteada();
    //criaTracinhosDasLetras();
});

var numeroDeAcertos = 0;
var expressaoRegular;
function verificaSeAcertou(inputJogador){
    expressaoRegular = new RegExp(inputDoJogador.value,"i");
    var teste = arrayLetras.length;
    console.log(teste);
    console.log(numeroDeAcertos);
    console.log("verificaSeAcertou");

    var acertou = false;
    for(var i = 0; i < arrayLetras.length; i++){
        if(expressaoRegular.test(arrayLetras[i])){
            var letraTd = document.querySelectorAll(".td-palavra-sorteada");
            letraTd[i].classList.remove("fadeOut");
            acertou = true;
            verificaVencedor();
            numeroDeAcertos++;

            if(numeroDeAcertos == arrayLetras.length){
                console.log('parabéns você ganhou');
            }
        }
    }
    if(!acertou){
        escreveLetraErrada(inputJogador);
    }
}

function verificaInputJogador(inputJogador){
    var verificador = false;
    if(isNaN(inputJogador)){
        verificador = true;
    }
    if(!verificador){
        limpaCampoDigitado(inputDoJogador);
    }
    return verificador;
}

var divLetrasErradas = document.querySelector(".letras-erradas");
var letrasErradasTr = document.createElement("tr");
letrasErradasTr.classList.add("tr-letras-erradas");
divLetrasErradas.appendChild(letrasErradasTr);

function escreveLetraErrada(inputJogador){
    if(divLetrasErradas.innerHTML.length == 0){
        letrasErradasTr = document.createElement("tr");
        letrasErradasTr.classList.add("tr-letras-erradas");
        divLetrasErradas.appendChild(letrasErradasTr);
    }

    var verificaLetraRepetida = false;

    for(var i = 0; i < letrasErradasTr.textContent.length; i++){
        if(inputJogador == letrasErradasTr.textContent[i]){
            verificaLetraRepetida = true;
        }
    }

    if(!verificaLetraRepetida){
        var letraTd = document.createElement("td");
        letraTd.textContent = inputJogador;
        letrasErradasTr.appendChild(letraTd);
        numeroDeErros++;
        desenhaForca(numeroDeErros);
    }
}

function apagaletraErrada(){
    letrasErradasTr = document.querySelector(".tr-letras-erradas");
    if(divLetrasErradas.innerHTML.length > 0){
        letrasErradasTr.remove();
    }
}

var numeroDeErros = 0;
function desenhaForca(numeroDeErros){
    if(numeroDeErros <= 7){
        var idDaImagem = "#forca-" + numeroDeErros;
        var mostraImagem = document.querySelector(idDaImagem);
        mostraImagem.classList.remove("fadeOut");
    }
    if(numeroDeErros == 7){
        alert("Você Perdeu!");
    }
}

function apagaForca(){
    for (let index = 1; index < 8; index++) {
        var idDaImagem = "#forca-" + index;
        var removeImagem = document.querySelector(idDaImagem);
        removeImagem.classList.add("fadeOut"); 
    }
}


var campoAcrescentarPalavra = document.querySelector(".campo-acrescentar-palavra");
campoAcrescentarPalavra.addEventListener("input", function(){
});

limpaCampoDigitado(campoAcrescentarPalavra);

var botaoSalvarComeçar = document.querySelector(".botao-salvar-começar");
botaoSalvarComeçar.addEventListener("click", function(){
    novoJogo.classList.add('botao-novo-jogo');
    desistir.classList.add('botao-desistir');        
    botaoSalvarComeçar.classList.remove('botao-salvar-comecar');
    botaoCancelar.classList.remove('botao-cancelar');

    ocultarBotoesDoInicio();
    ocultarBotoesIncluirPalavras();
    mostrarInputDoJogador();
    mostraBotoesNovoJogoEDesistir();

    var palavraDigitada = campoAcrescentarPalavra.value;

    var verificaPalavraInput = true;
    for(var i = 0; i < arrayPalavras.length; i++){
        if(palavraDigitada == arrayPalavras[i]){
            verificaPalavraInput = false;
            break;
        }
    }
    if(verificaPalavraInput){
        arrayPalavras.push(palavraDigitada);
        arrayPalavrasLetrasPalavraSecreta.push(palavraDigitada);
        console.log(arrayPalavrasLetrasPalavraSecreta);    

    }
    criaTracinhosDasLetras();

    limpaCampoDigitado(campoAcrescentarPalavra);

    limpaCampoDigitado(inputDoJogador);
});

var botaoCancelar = document.querySelector(".botao-cancelar");
botaoCancelar.addEventListener('click', function(){
    botaoComecar.classList.add('botao-comecar-jogo');
    botaoAdicionaPalavra.classList.add('botao-adicionar-palavra');        
    botaoSalvarComeçar.classList.remove('botao-salvar-comecar');
    botaoCancelar.classList.remove('botao-cancelar');
    limpaCampoDigitado(campoAcrescentarPalavra);
    ocultarBotoesIncluirPalavras();
    mostrarBotoesDoInicio();
});

var mensagemGanhou = true;
var numeroDeLetrasRestantes = 0;
function verificaVencedor(){
    numeroDeLetrasRestantes = letrasPalavraSecreta.length;
    for (let i = 0; i < letrasPalavraSecreta.length; i++) {
        if(inputDoJogador.value == letrasPalavraSecreta[i]){
            numeroDeLetrasRestantes--;
            letrasPalavraSecreta.splice(i, 1)[0];
            console.log(numeroDeLetrasRestantes);
            console.log(letrasPalavraSecreta);
            console.log(arrayLetras);
            console.log(inputDoJogador.value);
            //break;
        }
    }
    if(numeroDeLetrasRestantes == 0 && mensagemGanhou){
        alert("Parabéns você ganhou!");
        mensagemGanhou = false;
    }
}

function limpaCampoDigitado(inputASerLimpo){
    inputASerLimpo.focus();

    setTimeout(function(){
        inputASerLimpo.value = "";
    } ,1000);
}

function ocultarBotoesDoInicio(){
    botaoComecar.classList.add('fadeOut');
    botaoAdicionaPalavra.classList.add('fadeOut');
}

ocultarBotoesIncluirPalavras();
function ocultarBotoesIncluirPalavras(){
    botaoSalvarComeçar.classList.add('fadeOut');
    botaoCancelar.classList.add('fadeOut');
    campoAcrescentarPalavra.classList.add('fadeOut');
}

ocultarInputDoJogador();
function ocultarInputDoJogador(){
    inputDoJogador.classList.add('fadeOut');
}

ocultarNovoJogoEDesistir();
function ocultarNovoJogoEDesistir(){
    novoJogo.classList.add('fadeOut');
    desistir.classList.add('fadeOut');
}

function mostrarBotoesDoInicio(){
    botaoComecar.classList.remove('fadeOut');
    botaoAdicionaPalavra.classList.remove('fadeOut');
}

function mostraBotoesIncluirPalavras(){
    botaoSalvarComeçar.classList.remove('fadeOut');
    botaoCancelar.classList.remove('fadeOut');
    campoAcrescentarPalavra.classList.remove('fadeOut');
}

function mostraBotoesNovoJogoEDesistir(){
    novoJogo.classList.remove('fadeOut');
    desistir.classList.remove('fadeOut');
}

function mostrarInputDoJogador(){
    inputDoJogador.classList.remove('fadeOut');
}

function botaoEstiloPadrao(){
    botaoComecar.classList.add('botao-comecar-jogo');
    botaoAdicionaPalavra.classList.add('botao-adicionar-palavra');

    botaoComecar.style.top = 150;
    botaoAdicionaPalavra.style.top = 290;
}

function botaoEstiloFino(botao, botao2){
    if(botao == "novoJogo"){
        botao.classList.add('botao-comecar-jogo');
        botao2.classList.add('botao-adicionar-palavra');
    
        botao.style.top = 150;
        botao2.style.top = 290;    
    }else{
        botao.classList.add('botao-comecar-jogo');
        botao2.classList.add('botao-adicionar-palavra');
    
        botao.style.top = 150;
        botao2.style.top = 290;    
    }
}





