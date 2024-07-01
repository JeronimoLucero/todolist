const form = document.getElementById('idform');
const btn = document.getElementById('btnagregar');
const listatareas = document.getElementById('checklist');
const Input = document.getElementById('listinput');
const totalTareas = document.getElementById('countertotal');
const completadas = document.getElementById('counterrealizadas');

let Tareas = [
    { id: 1, nombre: 'Comprar Radiador', completed: false },
    { id: 2, nombre: 'Backgammon con el presidente', completed: false },
    { id: 3, nombre: 'Vacunas viaje Malasia', completed: false },
];

function cargartareas() {
    listatareas.innerHTML = '';
    let tareasCompletadas = 0;
    Tareas.forEach((Tarea, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
           <span class="fw-bold mx-3">${Tarea.id}</span>
           <span class="fw-bold me-3 ${Tarea.completed ? 'completada' : ''}">
               <input type="checkbox" class="mx-1" id="checkbox-${Tarea.id}" data-id="${index}" ${Tarea.completed ? 'checked' : ''}>
               <span class="nombre-tarea">${Tarea.nombre}</span>
           </span>
           <button class="fw-bold btn btn-outline-danger" data-id="${index}">X</button>
        `;
        listatareas.appendChild(li);

        if (Tarea.completed) {
            tareasCompletadas++;
        }

        
        const checkbox = li.querySelector(`#checkbox-${Tarea.id}`);
        checkbox.addEventListener('change', () => marcarTareaCompletada(index));

        
        const deleteBtn = li.querySelector('button');
        deleteBtn.addEventListener('click', () => eliminarTarea(index));
    });

    totalTareas.textContent = Tareas.length;
    completadas.textContent = tareasCompletadas;
}

function generateId() {
    return Tareas.length === 0 ? 1 : Tareas[Tareas.length - 1].id + 1;
}

function añadirdesdeinput(event) {
    event.preventDefault();
    const nombretarea = Input.value.trim();
    if (nombretarea !== '') {
        const nuevatarea = {
            id: generateId(),
            nombre: nombretarea,
            completed: false
        };
        Tareas.push(nuevatarea);
        cargartareas();
        Input.value = '';
    }
}

function marcarTareaCompletada(index) {
    Tareas[index].completed = !Tareas[index].completed;
    cargartareas();
}

function eliminarTarea(index) {
    Tareas.splice(index, 1);
    cargartareas();
}

btn.addEventListener('click', añadirdesdeinput);

cargartareas();
