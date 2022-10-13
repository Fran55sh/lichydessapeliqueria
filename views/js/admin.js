const btnListarCursos = document.getElementById('btnListarCursos')
const cursosDiv = document.getElementById('cursos')
console.log(cursosDiv)

btnListarCursos.addEventListener('click', () =>{
    async function getCursos() {
        try {
            let response = await fetch("api/cursos", { mode: "no-cors" })
            const cursos = await response.json();
            renderCursos(cursos)
            console.log(cursos)
        } catch (a) {
            console.log(a);
        }
    }
    getCursos()
})


function renderCursos(data){
    console.log(data.data)
    data.data.forEach((cursos) => {
        console.log(cursos)
        newElement = document.createElement('div');
        newElement.classList.add('curso')
        newElement.innerHTML = `
        <li> ${cursos.nombre}</li>
        <li> ${cursos.descripcion}</li>
        <li> ${cursos.filePath}</li>
        
        `
        cursosDiv.appendChild(newElement)
    });
}