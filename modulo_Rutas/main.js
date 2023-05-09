//Acceso de la data del formulario
let myForm = document.querySelector("#myForm");
myForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));
    opcion[e.submitter.dataset.action](data);
});
//Opciones para el uso de los datos del formulario
const opcion = {
  GET: () => getUserAll(),
  POST: (data) => postUser(data),
  PUT: (data) => putUser(data),
  SEARCH: (data) => searchUser(data),
  DELETE: (data) => deleteUser(data),
};
// configuracion basica de los headers para el Json-server
let config={
    headers:new Headers({
        "content-type": "application/json"
    }),
};
//Funcion asincrona para obtener los datos guardados en el Json-server con validacion
const getUserAll = async()=>{
    config.method = "GET";
    const users = await (await fetch ("http://localhost:4001/rutas",config)).json();
    if (users.length == 0) {
        alert('No hay ningún elemento')
    }else{
        renderUsers(users);
    }
}
//Funcion asincrona para "subir" los datos obtenidos del formulario en el Json-server
const postUser = async (data)=>{
    config.method = "POST";
    config.body = JSON.stringify(data);
    let res = await ( await fetch("http://localhost:4001/rutas",config)).json();
}
//Funcion asincrona para "Actualizar" los datos que se encuentran en el Json-server
const putUser = async(data)=>{
    config.method = "PUT";
    config.body = JSON.stringify(data);
    let res = await ( await fetch(`http://localhost:4001/rutas/${data.id}`,config)).json();
}
//Funcion asincrona para Eliminar alguno de los datos que se encuentran en el Json-Server
const deleteUser = async(data)=>{
    config.method = "DELETE";
    let res = await ( await fetch(`http://localhost:4001/rutas/${data.id}`,config)).json();
}
//Funcion asincrona para "Buscar" alguno de los datos que estan en el Json-Server
const searchUser = async(data)=>{
    config.method = "GET";
    let res = await ( await fetch(`http://localhost:4001/rutas/${Object.values(data).join("")}`,config)).json();
}


//Funcion para "Renderizar" los datos almacenados en el Json-Server y añadirlos a el html en forma de "tabla"
function renderUsers(users) {
    const itemContainer = document.querySelector(".itemContainer");
  //Se usa un forEach para todos los users dentro de data para crear el div y los span requeridos para adecuarlos en el html
    users.forEach((data) => {
      const itemUser = document.createElement("div");
      itemUser.setAttribute(
        "class",
        "userItem col-12 d-flex justify-content-between align-items-center border-top text-light py-2 px-2"
      );
      itemUser.setAttribute("id", `${data.id}`);
      itemUser.innerHTML = `
          <span>${data.id}</span>
          <span class="name">${data.nombre}</span>
          <span class="origen">${data.origen}</span>
          <span>${data.destino}</span>
          <span>${data.milla}</span>
          <span>${data.valor}</span>
          <div id="formItem">
              <button id="editar" class="bg-warning rounded border-0" type="submit" data-action="PUT"><i class="bi bi-pencil-square"></i></button>
              <button id="borrar" class=" bg-danger rounded border-0" type="submit"><i class="bi bi-trash"></i></button>
          </div>
      `;
      itemContainer.appendChild(itemUser);
    });
  }