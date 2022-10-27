
  const userCursos = document.getElementById("userCursos");
  
  
  async function getCourses() {
    await fetch("http://localhost:3000/api/users/cursos")
      .then((response) => response.json())
      .then((data) => showCursos(data));
  }

  getCourses()

  function showCursos(array){
    array.data.forEach((curso) => {
  
      let newElement = document.createElement("div");
      newElement.classList.add("curso_card");
      newElement.innerHTML = `
            <div class="curso_container">
            <h2>${curso.cursoId.nombre}</h2>
            <video id="videoPlayer" width="50%" controls muted="muted" poster="/assets/1.jpg" oncontextmenu="return false;" controlsList="nodownload">
              <source src="/video/${curso._id}" type="video/mp4" />
            </video>
            </div>
  
      `;
      userCursos.appendChild(newElement);
  
    });
  }