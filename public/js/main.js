function irParaAddEspaco() {
  window.location.href = "/addEspaco";
}
async function irParaLogin() {
  localStorage.removeItem("token");
  localStorage.removeItem("tipo");
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
  window.location.href = "/";
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
  localStorage.setItem("token", data.token);
  localStorage.setItem("tipo", data.user_tipo);

  if (!data.nome) {
    const divErro = document.querySelector(".divErro");
    divErro.innerHTML = "Usuario ou senhas inválidos!";
    divErro.style.display = "flex";

    setTimeout(() => {
      divErro.style.display = "none";
    }, 2000);
    return;
  }

  irParaHome();
}

async function verificaLogado() {
  const token = localStorage.getItem("token");
  if (!token) {
    localStorage.clear();
    irParaLogin();
    return;
  }

  const response = await fetch("/verificaUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({token: token}),
  });
  const user = await response.json();
  if (!user) {
    localStorage.clear();
    irParaLogin();
  }
  if (!user.user_nome || !user.user_id | !user.user_tipo) {
    localStorage.clear();
    irParaLogin();
  }
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
  const tipo = localStorage.getItem("tipo");
  for (let e of data.res) {
    div.innerHTML += `<div class="col-sm-3 mb-4" id="${e.espaco_id}">
    
    <div class="card border-primary card-body">
      <h2>${e.nome}</h2>
        <h5 class="card-title">${e.descricao}</h5>
        <p class="card-text fw-bold"><p>${e.local}</p>
        <div>
        <button type="button" class="btn btn-sm btn btn-warning" onclick="irParaReservaEscpaco(${
          e.espaco_id
        })">Reservar</button>
        ${
          tipo === "Admin"
            ? `<button type="button" class="btn btn-sm btn-primary" onclick="irParaEditEspaco(${e.espaco_id})">Editar</button>
        <button type="button" class="btn btn-sm btn-danger" onclick="irParaDeletarEspaco(${e.espaco_id})">Deletar</button>`
            : ""
        }
      </div>
    </div>
  </div>`;
  }
}

async function lerMinhasReservas() {
  const tk = localStorage.getItem("token");

  const response = await fetch("/minhasReservas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(token);
}

async function reservaEspaco(event) {
  event.preventDefault();

  let dtInicio = document.getElementById("dtInicio").value;
  let dtFim = document.getElementById("dtFim").value;
  const dia = document.getElementById("diaSelecionado").value;
  const espaco_id = "<%= id %>";
  const user_id = localStorage.getItem("user_id");

  if (dtInicio > dtFim) {
    alert("Hora de inicio tem que ser menor que hora final ");
  }

  const inicio = new Date(`${dia}T${dtInicio}`);
  const fim = new Date(`${dia}T${dtFim}`);
  const diferencaEmMS = Math.abs(fim - inicio);
  const diferencaEmHs = diferencaEmMS / (1000 * 60 * 60);
  if (diferencaEmHs < 1 || diferencaEmHs > 8) {
    alert("Reserva tem que ser maior que 1 hora e menor que 8 horas.");
  }

  let form = document.getElementById("form");
  const formData = new FormData(form);
  formData.append("espaco_id", espaco_id);
  formData.append("user_id", user_id);
  formData.append("dia", dia);

  const res = await fetch("/reservaEspaco", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(formData).toString(),
  });

  const data = await res.json();

  if (data.err) {
    alert(data.err);
  }

  alert(data.res);
  setTimeout(() => {
    irParaHome();
  }, 2000);
}
