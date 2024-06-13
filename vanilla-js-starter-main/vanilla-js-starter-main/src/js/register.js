import { getData, postData } from "./fetch.js";
let nombre = document.getElementById("nombre");
let correo = document.getElementById("correo");
let contraseña = document.getElementById("contraseña");
let botonRegistro = document.getElementById("registrar");
let correoValido = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
let informacionUsuarios = [];

botonRegistro.addEventListener("click", async function () {
  let coincidencias = 0;
  nombre.innerHTML = "";
  correo.innerHTML = "";
  contraseña.innerHTML = "";
  let obtenerDatos = await getData();
  let datosUsuarios = {
    nombre: nombre.value,
    correo: correo.value,
    contraseña: contraseña.value,
  };
  let usuarioEncontrado = obtenerDatos.find(
    (element) =>
      element.nombre === nombre.value &&
      element.correo === correo.value &&
      element.contraseña === contraseña.value
  );
  if (usuarioEncontrado) {
    alert("El usuario ya existe");
  } else if (
    correoValido.test(correo.value.trim()) &&
    nombre.value.trim() != "" &&
    contraseña.value.trim() != ""
    
  ) {
    informacionUsuarios.push(datosUsuarios) || [];
    await postData(datosUsuarios);
    coincidencias++;
    alert("datos correctos");
    window.location.href = "./login.html";
  }
 
});
