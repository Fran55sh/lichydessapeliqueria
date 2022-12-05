
  const userCursos = document.getElementById("userCursos");
  
  
  async function getCourses() {
    await fetch("/api/users/cursos")
      .then((response) => response.json())
      .then((data) => showCursos(data));
  }

  getCourses()

  function showCursos(array){
    array.data.forEach((curso) => {
    console.log(curso.cursoId)
      let newElement = document.createElement("div");
      newElement.classList.add("curso_card");
      newElement.innerHTML = `
            <div class="curso_container">
            <h2>${curso.cursoId.nombre}</h2>
            <video id="videoPlayer" width="50%" controls muted="muted" poster="${curso.cursoId.thumbnail.slice(9)}" oncontextmenu="return false;" controlsList="nodownload">
              <source src="/assets/${curso.cursoId.filepath.slice(9)}" type="video/mp4" />
            </video>
            </div>
  
      `;
      userCursos.appendChild(newElement);
  
    });
  }