const fecha = document.querySelector('#fecha')
const lista = document.querySelector('#lista')
const input = document.querySelector('#input')
const botonEnter = document.querySelector('#enter')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let id
let List 



//Fecha
const FECHA = new Date()
fecha.innerHTML = FECHA.toLocaleDateString('es-MX',{weekday: 'long', month: 'short', day: 'numeric'})

// Funcion Agregar tarea
function agregarTarea(tarea, id, realizado, eliminado){
    if(eliminado){return}
    const REALIZADO = realizado ?check : uncheck
    const LINE = realizado ?lineThrough : ''
    const elemento = ` <li id ="elemento">
    <i class="far ${REALIZADO} " data="realizado" id="${id}"></i>
    <p class="text ${LINE} ">${tarea}</p>
    <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
    </li>
    `
    lista.insertAdjacentHTML("beforeend",elemento)
}

//funcion de tarea Realizada

function tareaRealizada(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    List[element.id].realizado = List[element.id].realizado ? flase : true

}

//funcion de tarea Eliminada

function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    List[element.id].eliminado = true
}





botonEnter.addEventListener('click' ,()=> {
    const tarea = input.value
    if(tarea){
        agregarTarea(tarea,id,false,false)
        List.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado: false,
        })
    }
    localStorage.setItem('TODO',JSON.stringify(List))
    input.value =''
    id++
})

document.addEventListener('keyup', function(event){
    if(event.key == 'Enter'){
        const tarea = input.value
        if(tarea){
        agregarTarea(tarea,id,false,false)
        List.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado: false,
        })
        }
    localStorage.setItem('TODO',JSON.stringify(List))
    input.value =''
    id++
    }
})

lista.addEventListener('click', function(event) {
    const element = event.target;
    const elementData = element.getAttribute('data');

    if (elementData === 'realizado') {
        tareaRealizada(element);
    } else if (elementData === 'eliminado') {
        tareaEliminada(element);
    }
    localStorage.setItem('TODO',JSON.stringify(List))
});

let data = localStorage.getItem('TODO')
if(data){
    List = JSON.parse(data)
    id = List.length
    cargarLista(List)
}else{
    List = []
    id=0;
}

function cargarLista(DATA){
    DATA.forEach(function(i){
        agregarTarea(i.nombre,i.id,i.realizado,i.eliminado)
    })
}

