//Aqui la variable llama la funcion
let numeroSecreto = 0;
let intentos = 0;
let listaNumeroSorteados = [];
let numeroMaximo = 10;

/*Las funciones pueden recibir parametros*/
function asignarTextoElemento(elemento, texto){
    /*Esto selecciona el elemento del HTML
    Y el InnerHTML asigna los textos al elemento
    HTML*/

    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}
function verificarIntento(){

    /*Esto captura el valor de un elemento ingresado por el usario
      pero por su ID. Y el value es para el valor. Dentro del PARSEINT
      Es para que convierta en numero el string.
    */
    let numeroIngresado = parseInt(document.getElementById('valorUsuario').value);
    
    if (numeroIngresado === numeroSecreto){
        asignarTextoElemento('p', `Haz acertado el numero secreto en  ${intentos}  ${intentos== 1 ? 'intento' : 'intentos'}.`);
        /*Al manipular el DOM el atributo removeAttribute al adivinar el numero secreto remueve 
        el atribute del HTML que inavilita al boton. 
        */
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if(numeroIngresado > numeroSecreto){
            asignarTextoElemento('p', 'El numero secreto es menor');
        }else{
            asignarTextoElemento('p', 'El numero secreto es mayor');
        }
        limpiarcaja();
        intentos++;
    }
    return;
}

function limpiarcaja () {
    /*Al pasarle al queySelector el parametro con # indica que seleccionara unicamente los elementos ID
    luego la misma limpia la caja donde el usuario ingresa los numeros.
    */
   document.querySelector('#valorUsuario').value = '';
    
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    console.log(numeroGenerado);
    console.log(listaNumeroSorteados);

    //Esto resuelve el problema de recursividad
    if (listaNumeroSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sorteron todo los numero posibles');
    }else {
    /*Si el numero esta incluido en la lista
    el includes lo que hace es recorrer toda la lista, el cual
    recibi el parametro del numero a chequear*/
    if(listaNumeroSorteados.includes(numeroGenerado)){
        /*Esto de aqui se conoce como recurvividad que es 
        que la funcion se llama asi misma*/
        return generarNumeroSecreto();
    } else {
        listaNumeroSorteados.push(numeroGenerado)
        return numeroGenerado;
    }
    }
 
}

function condicionesIniciales (){
    asignarTextoElemento('h1', 'Juego del numero secreto');
    asignarTextoElemento('p', `Elige un numero de 1 a ${numeroMaximo}`);
    //Esto vuelve a llamar a la funcion antes declarada para no tener que declarar una nuevamente
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;

}

function reiniciarJuego (){
    //Limpiar la consola
    limpiarcaja();
    //Indicar mensaje de Invervalos de numero
    //Generar el Numero aleatoreo
    //Inicializar el numero de intentos
    condicionesIniciales();
    //Desahabilitar el boton Nuevo Juego
    /*
    Con la funcion setAttribute es para colocar, la cual recibi 2 parametros, lo cual
    indica ponme esto con tal valor.
    */
    document.querySelector('#reiniciar').setAttribute('disabled','true')
}

condicionesIniciales();