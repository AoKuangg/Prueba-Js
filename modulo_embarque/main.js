//Acceso de la data del formulario
let myForm = document.querySelector("#myForm");
myForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));
    opcion[e.submitter.dataset.action](data);
});
//Opciones para el uso de los datos del formulario
const opcion = {
  POST: (data) => postUser(data),
  SEARCH: (data) => searchUser(data),
};
// configuracion basica de los headers para el Json-server
let config={
    headers:new Headers({
        "content-type": "application/json"
    }),
};
//Funcion asincrona para obtener los datos guardados en el Json-server con validacion
const searchUser = async()=>{
    config.method = "GET";
    const users = await (await fetch ("http://localhost:4001/users",config)).json();
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
    let users = await ( await fetch("http://localhost:4001/Registro",config)).json();
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
          <span class="apellido">${data.apellido}</span>
          <span>${data.celular}</span>
          <span>${data.fecha}</span>
          <span>${data.origen}</span>
          <span>${data.pais}</span>
          <span class="email">${data.email}</span>
          <div id="formItem">
              <button id="editar" class="bg-warning rounded border-0" type="submit" data-action="PUT"><i class="bi bi-pencil-square"></i></button>
              <button id="borrar" class=" bg-danger rounded border-0" type="submit"><i class="bi bi-trash"></i></button>
          </div>
      `;
      itemContainer.appendChild(itemUser);
    });
  }
  