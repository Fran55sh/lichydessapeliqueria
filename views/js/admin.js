const btnListarCursos = document.getElementById("btnListarCursos");
const cursosDiv = document.getElementById("cursos");
console.log(cursosDiv);

async function eliminarCurso(id) {
  var requestOptions = {
    method: "DELETE",
    redirect: "follow",
  };

  fetch(`http://localhost:3000/api/cursos/delete/${id}`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

btnListarCursos.addEventListener("click", () => {
    cursosDiv.innerHTML=""
  async function getCursos() {
    try {
      let response = await fetch("api/cursos", { mode: "no-cors" });
      const cursos = await response.json();
      renderCursos(cursos);
      console.log(cursos);
    } catch (a) {
      console.log(a);
    }
  }
  getCursos();
});

function renderCursos(data) {
  console.log(data.data);
  data.data.forEach((cursos) => {
    console.log(cursos);
    newElement = document.createElement("div");
    newElement.classList.add("curso");
    newElement.innerHTML = `
        <li> ${cursos.nombre}</li>
        <img src="${cursos.thumbnail}" alt="">
        <li> ${cursos.descripcion}</li>
        <li> ${cursos.precio}</li>

        <button onClick="eliminarCurso('${cursos._id}')">Eliminar</button>
        
        `;
    cursosDiv.appendChild(newElement);
  });
}
