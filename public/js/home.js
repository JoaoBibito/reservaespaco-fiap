// async function lerEspacos() {
//   const response = await fetch("/lerEspacos");
//   const data = await response.json();
//   const div = document.getElementById("espacos");
//   for (let e of data.res) {
//     div.innerHTML += `<div class="col-sm-3 mb-4" id="${e.espaco_id}">

//     <div class="card border-primary card-body">
//       <h2>${e.nome}</h2>
//         <h5 class="card-title">${e.descricao}</h5>
//         <p class="card-text fw-bold"><p>${e.local}</p>
//         <div>
//         <button type="button" class="btn btn-sm btn btn-warning" onclick="irParaReservaEscpaco(${e.espaco_id})">Reservar</button>
//         <button type="button" class="btn btn-sm btn-primary" onclick="irParaEditEscpaco(${e.espaco_id})">Editar</button>
//         <button type="button" class="btn btn-sm btn-danger" onclick="irParaDeletarEspaco(${e.espaco_id})">Deletar</button>
//       </div>
//     </div>
//   </div>`;
//   }
// }
// lerEspaco();
