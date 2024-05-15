function irParaAddEspaco() {
  window.location.href = "/addEspaco";
}
async function irParaLogin() {
  window.location.href = `/login`;
}

async function irParaEditEspaco(id) {
  window.location.href = `/editEspaco/${id}`;
}

async function irParaDeletarEspaco(id) {
  window.location.href = `/deletEspaco/${id}`;
}

async function irParaReservaEscpaco(id) {
  window.location.href = `/reservaEspaco/${id}`;
}

async function irParaHome() {
  window.location.href = `/`;
}

async function irParaCadastro() {
  window.location.href = `/cadastro`;
}

async function EfetuaLogin(event) {
  event.preventDefault();

  let form = document.getElementById("form");
  const formData = new FormData(form);

  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(formData).toString(),
  });
  const data = await response.json();
  console.log("data", data);
  if (!data.nome) {
    const divErro = document.querySelector(".divErro");
    divErro.innerHTML = "Usuario ou senhas inválidos!";
    divErro.style.display = "flex";

    setTimeout(() => {
      divErro.style.display = "none";
    }, 2000);
  }
  window.localStorage.setItem("nome", data.nome);

  irParaHome();
}

async function cadastraUser(event) {
  event.preventDefault();

  let form = document.getElementById("form");
  const formData = new FormData(form);

  try {
    const response = await fetch("/cadastro", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData).toString(),
    });
    const data = await response;
    if (!response.ok) {
      const responseData = await response.json();
      const errMsg = responseData.err;
      const divErro = document.querySelector(".divErro");
      divErro.innerHTML = errMsg;
      divErro.style.display = "flex";

      setTimeout(() => {
        divErro.innerHTML = "";
        divErro.style.display = "none";
      }, 2000);
    } else {
      const divErro = document.querySelector(".divErro");
      divErro.innerHTML = "Usuário cadastrado!";
      divErro.style.background = "green";
      divErro.style.display = "flex";

      setTimeout(() => {
        divErro.innerHTML = "";
        divErro.style.display = "none";
      }, 2000);
      irParaLogin();
    }
  } catch (error) {
    console.log("Erro na requisição:", error);
  }
}

async function addEspaco(event) {
  event.preventDefault();
  let form = document.getElementById("form");
  const formData = new FormData(form);
  try {
    const response = await fetch("/addEspaco", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData).toString(),
    });

    console.log("res", response);
    const divErro = document.querySelector(".divErro");
    if (!response.ok) {
      const responseData = await response.json();
      const errMsg = responseData.err;
      divErro.innerHTML = errMsg;
      divErro.style.display = "flex";

      setTimeout(() => {
        divErro.innerHTML = "";
        divErro.style.display = "none";
      }, 2000);
    } else {
      divErro.innerHTML = "Espaço cadastrado!";
      divErro.style.background = "green";
      divErro.style.display = "flex";

      setTimeout(() => {
        divErro.innerHTML = "";
        divErro.style.display = "none";
        irParaHome();
      }, 2000);
    }
    console.log("OK");
  } catch (error) {
    console.log("Erro na requisição:", error);
  }
}

async function BuscaEspaco(id) {
  if (!id) {
    window.location.href = "/";
  }
  const response = await fetch("/lerEspaco", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id: id}),
  });

  const espaco = await response.json();
  return espaco;
}

async function editEspaco(event, id) {
  event.preventDefault();

  let form = document.getElementById("form");
  const formData = new FormData(form);
  formData.append("id", id);

  const response = await fetch("/editEspaco", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(formData).toString(),
  });
  const divErro = document.querySelector(".divErro");
  if (!response.ok) {
    const responseData = await response.json();
    const errMsg = responseData.err;
    divErro.innerHTML = errMsg;
    divErro.style.display = "flex";

    setTimeout(() => {
      divErro.innerHTML = "";
      divErro.style.display = "none";
    }, 2000);
  } else {
    divErro.innerHTML = "Espaço editado!";
    divErro.style.background = "green";
    divErro.style.display = "flex";

    setTimeout(() => {
      divErro.innerHTML = "";
      divErro.style.display = "none";
      irParaHome();
    }, 2000);
  }
}

async function lerEspacos() {
  const response = await fetch("/lerEspacos");
  const data = await response.json();
  const div = document.getElementById("espacos");
  for (let e of data.res) {
    div.innerHTML += `<div class="col-sm-3 mb-4" id="${e.espaco_id}">
    
    <div class="card border-primary card-body">
      <h2>${e.nome}</h2>
        <h5 class="card-title">${e.descricao}</h5>
        <p class="card-text fw-bold"><p>${e.local}</p>
        <div>
        <button type="button" class="btn btn-sm btn btn-warning" onclick="irParaReservaEscpaco(${e.espaco_id})">Reservar</button>
        <button type="button" class="btn btn-sm btn-primary" onclick="irParaEditEscpaco(${e.espaco_id})">Editar</button>
        <button type="button" class="btn btn-sm btn-danger" onclick="irParaDeletarEspaco(${e.espaco_id})">Deletar</button>
      </div>
    </div>
  </div>`;
  }
}