const diccionarioVocales = {
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat",
};

const diccionarioReemplazo = {
    "ai": "a",
    "enter": "e",
    "imes": "i",
    "ober": "o",
    "ufat": "u",
};

function encriptar(){
    let encriptar=document.getElementById("teclado").value;
    let resultado=document.getElementById("userResultado");
    if(encriptar==""){
        return;
    }
    else{
        if(/([A-Z-áéíóú])|([!@#$%^&*()_+{}\[\]:;'"<>,.?/\\|~-]).*/.test(encriptar)){
            limpiarResultado();
            resultado.value="No se permiten mayúsculas, tildes y caracteres especiales";
        }
        else{
            limpiarResultado();
            console.log();
            resultado.value=reemplazarVocales(encriptar,diccionarioVocales);
        }
    } 
}

function desencriptar(){
    let encriptar=document.getElementById("teclado").value;
    let resultado=document.getElementById("userResultado");
    if(encriptar==""){
        return;
    }
    else{
        if(/([A-Z-áéíóú])|([!@#$%^&*()_+{}\[\]:;'"<>,.?/\\|~-]).*/.test(encriptar)){
            limpiarResultado();
            resultado.value="No se permiten mayúsculas, tildes y caracteres especiales";
        }
        else{
            limpiarResultado()
            resultado.value=reemplazarCadenas(encriptar,diccionarioReemplazo);
        }    
    }
}

async function portapapeles(){
    let resultado=document.getElementById("userResultado").value;
    try {
      await navigator.clipboard.writeText(resultado);
    } catch (err) {
      console.error('Error al copiar: ', err);
    }
}

function limpiarResultado(){
    let resultado=document.getElementById("userResultado");
    let imagen=document.getElementById("imgenResultado");
    let infoVacio=document.getElementsByClassName("textoResultado");
    let btnCopiar=document.getElementsByClassName("copiar");

    resultado.style.visibility= 'visible';
    resultado.rows = 15;
    resultado.cols = 30;
    resultado.style.margin = "1% 0 4% 4%";
    imagen.style.display= 'none';
    for (let i = 0; i < infoVacio.length; i++) {
        infoVacio[i].style.display = 'none';
    }
    btnCopiar[0].style.visibility = 'visible';
}

function reemplazarVocales(cadena, vocales) {
    let nuevaCadenaResultado = "";
    for (let i = 0; i < cadena.length; i++) {
      if (vocales.hasOwnProperty(cadena[i])) {
        nuevaCadenaResultado += vocales[cadena[i]];
      } else {
        nuevaCadenaResultado += cadena[i];
      }
    }
    return nuevaCadenaResultado;
}

function reemplazarCadenas(cadena, diccionario) {
    let nuevaCadena = "";
    for (let i = 0; i < cadena.length; i++) {
      let encontrado = false;
      for (const clave in diccionario) {
        if (cadena.substr(i, clave.length) === clave) {
          nuevaCadena += diccionario[clave];
          i += clave.length - 1;
          encontrado = true;
          break;
        }
      }
      if (!encontrado) {
        nuevaCadena += cadena[i];
      }
    }
    return nuevaCadena;
}