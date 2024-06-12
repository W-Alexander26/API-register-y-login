import {getData, postData, deleteData, putData } from "./fetch.js"

let crearTarea = async (e) => {
  e.preventDefault();
  const inputUsuario = document.getElementById("inputTexto");
  if (inputUsuario.value.trim("") !== "") {
    let nuevaTarea = {
      titulo: inputUsuario.value,
      estado: false,
      fechaCreacion: new Date(Date.now()).toLocaleString()
    }
    inputUsuario.value = "";
    let tareas = await postData(nuevaTarea);
    mostrarTareas(tareas);
  } else {
    inputUsuario.value = "";
    alert("Ingrese un texto.");
  }
}

let eliminar = async (tarea) => {
  let respuesta = await deleteData(tarea.id);
  if(respuesta !== null) {
    await actualizarContador();
  } else {
    alert("Hubo un error al eliminar su tarea.");
  }
}

let completar = async (tarea) => {
  tarea.estado = !tarea.estado;
  let respuesta = await putData(tarea);
  if(respuesta !== null) {
    await actualizarContador();
  } else {
    alert("Hubo un error al completar su tarea.");
  }
}

let actualizarContador = async (tareas) => {
  if (tareas === undefined) {
    tareas = await getData();
  }
  let contador = 0;
  tareas.forEach(tarea => {
    if (tarea.estado)
      contador++
  });
  document.getElementById("contador").textContent = contador;
}

let mostrarTareas = (tareas) => {
  let ul = document.getElementById("listaTareas");
  ul.innerHTML = "";
  tareas.forEach(tarea => {
    let li = document.createElement("li");
    let p = document.createElement("p");
    let checkbox = document.createElement("input");
    let btnEliminar = document.createElement("button");
    li.classList.add("tarea");
    checkbox.classList.add("tareaCheckbox");
    btnEliminar.classList.add("elminarTarea");
    checkbox.type = "checkbox";
    btnEliminar.textContent = "Eliminar";
    p.innerHTML = tarea.titulo;
    if(tarea.estado)
      checkbox.checked = true;
    btnEliminar.addEventListener("click", async () => {
      li.remove();
      await eliminar(tarea);
    });
    checkbox.addEventListener("click", async () => {
      await completar(tarea);
    });
    li.appendChild(checkbox);
    li.appendChild(p);
    li.appendChild(btnEliminar);
    ul.appendChild(li);
  });
  actualizarContador(tareas);
}

document.getElementById("btnAgregar").addEventListener("click", crearTarea);

window.addEventListener("load", async () => {
  const tareas = await getData();
  mostrarTareas(tareas);
});