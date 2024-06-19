
let Edad = prompt("Ingresa tu edad para continuar a la base de datos");

if (Edad === "" || isNaN(parseInt(Edad))){
    alert("No ingresaste un valor valido");
} else {
    Edad = parseInt(Edad);
    let MayorEdad = (Edad >= 18);

    if (MayorEdad) {
        alert("La edad ingresada fue " + Edad);
    } else {
        alert("La edad ingresada fue " + Edad + ". Eres menor de edad");
    }
    console.log("Es mayor de edad: " + MayorEdad);
}

let request = prompt("Ingresa el nombre del estudiante(Escribe ESC para salir)");
let contador = 0;

while (request.toUpperCase() != "ESC") {
    alert("Ingresaste el nombre: " + request);
    contador++;

    if (contador >= 1) {
        alert("Has alcanzado el límite de  ingresos.");
        break;
    }

    request = prompt("Ingresa el nombre del estudiante (Escribe ESC para salir)");
}

function calcularPromedio() {
    let nota1 = prompt("Ingresa la primera nota:");
    if (nota1 === "" || isNaN(parseFloat(nota1))) {
        alert("No ingresaste una nota válida para la primera nota");
        return;
    }
    nota1 = parseFloat(nota1);
    let nota2 = prompt("Ingresa la segunda nota:");
    if (nota2 === "" || isNaN(parseFloat(nota2))) {
        alert("No ingresaste una nota válida para la segunda nota");
        return; 
    }
    nota2 = parseFloat(nota2);
    let promedio = (nota1 + nota2) / 2;
    alert("El promedio de las notas " + nota1 + " y " + nota2 + " es: " + promedio);
}
calcularPromedio();