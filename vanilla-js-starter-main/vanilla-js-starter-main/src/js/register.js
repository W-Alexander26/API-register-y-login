import { getData } from "./fetch.js";
let nombre = document.getElementById('nombre')
let correo = document.getElementById('correo')
let contraseña = document.getElementById('contraseña')
let botonRegistro = document.getElementById('registrar')
let correoValido= /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
let informacionUsuarios = []


botonRegistro.addEventListener('click', function () {
 let obtenerDatos = getData()
 if (correoValido.test(correo.value) && nombre.value !="" && contraseña.value !="") {
  
 }

})