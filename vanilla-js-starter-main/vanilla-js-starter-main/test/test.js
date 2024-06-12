import {getData, postData, deleteData, putData } from "../src/js/fetch.js"

test("Obtener tareas", async () => {
  let data = await getData();
  expect(data).not.toBe(null);
});

test("Crear nueva tarea", async () => {
  let nuevaTarea = {
    titulo: "Tarea de prueba",
    estado: true,
  }
  const data = await postData(nuevaTarea);
  expect(data.at(-1)).toMatchObject(nuevaTarea);
});

test("Actualizar estado de nueva tarea", async () => {
  let nuevaTarea = {
    titulo: "Tarea de prueba",
    estado: false,
  }
  const data = await postData(nuevaTarea);
  let tarea = data.at(-1);
  tarea.estado = !tarea.estado;
  const respuesta = await putData(tarea);
  expect(respuesta.estado).toBe(true);
});

test("Eliminar nueva tarea", async () => {
  let nuevaTarea = {
    titulo: "Tarea de prueba",
    estado: false,
  }
  const data = await postData(nuevaTarea); //creamos nuevo obj
  let tarea = data.at(-1); //guardamos el objeto recien creado\
  const respuesta = await deleteData(tarea.id); //eliminamos el objeto creado
  const listaTareas = await getData(); //extraemos la lista de tareas de nuevo
  expect(listaTareas.at(-1).id).not.toBe(tarea.id); //comparar el ultimo id de la lista actualizada con el id de la tarea creada, si no son iguales, el test está correcto
});