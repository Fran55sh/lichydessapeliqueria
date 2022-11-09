const cursos = document.getElementById("cursos");

async function getCourses() {
  await fetch("api/cursos")
    .then((response) => response.json())
    .then((data) => renderCard(data));
}

getCourses();

async function payment(param) {
  async function getCursoById() {
    await fetch(`/api/cursos/${param}`)
      .then((response) => response.json())
      .then((data) => makePayment(data));
  }
  getCursoById();

  function makePayment(curso) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: curso.data._id,
      title: curso.data.nombre,
      description: curso.data.descripcion,
      picture_url: "test",
      unit_price: curso.data.precio,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch("/payment", requestOptions)
      .then((response) => response.json())
      .then((result) => (window.location.href = result.init_point))
      .catch((error) => console.log("error", error));
  }
}

function renderCard(array) {
  array.data.forEach((curso) => {
    let newElement = document.createElement("div");
    newElement.classList.add("card");
    newElement.innerHTML = `
          <div >
          
          <img class="hero-profile-img" src="./${curso.thumbnail.slice(
            9
          )}" alt="">
          </div>
          
          <div class="hero-description-bk"></div>
          <div class="hero-description">
            <p>${curso.nombre}</p>
            <p>${curso.descripcion}</p>
            <p class="duracion-curso">Curso disponible durante 15 dias despues de tu compra</p>
            </div>
            <div class="price">
            <p>$ ${curso.precio}</p>
            </div>
            <div class="hero-btn">
            <button id="btnCompra" onclick="payment('${
              curso._id
            }')">Comprar</button>
            </div>

    `;
    cursos.appendChild(newElement);
  });
}
