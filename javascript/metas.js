let metasHisto = JSON.parse(localStorage.getItem('metasHisto')) || [];
// let sumatoriaMetas = Number(localStorage.getItem('sumatoriaMetas') || 0);
// const contenerdorMetas = document.querySelector(".metas-activas-container");


// 1. Al cargar la página, intentamos recuperar lo guardado
window.onload = function () {
    // Intentamos obtener los datos
    const datosGuardados = localStorage.getItem('metasHisto');

    // Si existen datos, los pasamos a nuestro arreglo y pintamos
    if (datosGuardados) {
        metasHisto = JSON.parse(datosGuardados);
        actualizarPantalla(); // ¡Aquí está la clave!
    }
};



//actualizar pantalla
function actualizarPantalla() {
    const contenedorMetas = document.querySelector(".metas-activas-container");
    const tituloMetasActivas = document.getElementById("metas-activas-h3");

    contenedorMetas.innerHTML = '';

    // CASO 1: No hay metas. Limpiamos todo.
    if (metasHisto.length >= 1) {

        // CASO 2: Sí hay metas. Pintamos normalmente.
        tituloMetasActivas.innerHTML = 'METAS ACTIVAS';
        contenedorMetas.style.display = 'flex';

        let html = '';
        metasHisto.forEach((item, index) => {
            html += `
        <div class="meta-card">
            <div class="meta-header">
                <h4>${item.NOMBRE}</h4>
                <span>$${item.ABONADO} / $${item.OBJETIVO}</span>
            </div>
            <progress value="${item.ABONADO}" max="${item.OBJETIVO}"></progress>
            <button class="abonar-btn" onclick="abonarDinero(${index})">Abonar Dinero</button>
            <button class="borrar-abonar" onclick="borrarAbonar(${index})">Borrar Meta</button>
        </div>
        `;
        });
        contenedorMetas.innerHTML = html;

    } else {
        contenedorMetas.style.display = 'none';
        tituloMetasActivas.innerHTML = 'NO HAY METAS ACTIVAS';
        // Salimos de la función aquí
    }

}


//despintar



// crear meta

function crearMeta() {
    const cantidadMeta = document.getElementById("cantidad-meta");
    const nombreMeta = document.getElementById("nombre-meta");


    const nuevaMeta = { NOMBRE: nombreMeta.value, OBJETIVO: cantidadMeta.value, ABONADO: 0 };

    metasHisto.push(nuevaMeta);



    nombreMeta.value = ''
    cantidadMeta.value = '';
    window.sumatoriaMetas = calcularSumatoriaReal();
    actualizarPantalla()
    guardarDatos()

    console.log(nuevaMeta);

}

// sumatoria
function calcularSumatoriaReal() {
    // Sumamos el campo ABONADO de todas las metas que actualmente existen en el array
    let total = 0;
    metasHisto.forEach(meta => {
        total += parseFloat(meta.ABONADO);
    });
    return total;
}


// abonar dinero

// 1. Función para registrar el cumplimiento de la meta como gasto
function agregarGastoMeta(monto, motivo) {
    const nuevoGasto = {
        fecha: new Date().toLocaleDateString(), // O tu función solicitarFecha()
        gasto: monto,
        motivo: motivo
    };
    
    // Obtenemos historial actual o creamos nuevo array
    const historial = JSON.parse(localStorage.getItem('historialGastos')) || [];
    historial.push(nuevoGasto);
    
    // Guardamos el nuevo historial en localStorage
    localStorage.setItem('historialGastos', JSON.stringify(historial));
}

// 2. Función abonarDinero actualizada
function abonarDinero(index) {
    let cantidadAbonar = Number(prompt('INGRESA LA CANTIDAD A ABONAR'));

    if (!isNaN(cantidadAbonar) && cantidadAbonar > 0) {
        metasHisto[index].ABONADO += cantidadAbonar;

        // VERIFICAMOS SI SE COMPLETÓ
        if (metasHisto[index].ABONADO >= metasHisto[index].OBJETIVO) {
            let nombreMeta = metasHisto[index].NOMBRE;
            let montoTotalMeta = metasHisto[index].ABONADO;

            // Registramos el gasto permanentemente
            agregarGastoMeta(montoTotalMeta, "Meta cumplida: " + nombreMeta);

            // ELIMINAMOS LA META DEL ARRAY
            metasHisto.splice(index, 1);
            alert(`¡Felicidades! Has completado la meta de ${nombreMeta} y se ha registrado como gasto.`);
        }

        // RECALCULAMOS TOTALES Y GUARDAMOS
        window.sumatoriaMetas = calcularSumatoriaReal();
        actualizarPantalla();
        guardarDatos();
    }
}
// function abonarDinero(index) {
//     let cantidadAbonar = Number(prompt('INGRESA LA CANTIDAD A ABONAR'));




//     if (!isNaN(cantidadAbonar) || cantidadAbonar > 0) {


//         metasHisto[index].ABONADO += cantidadAbonar;
//         // sumatoriaMetas += metasHisto[index].ABONADO;
//         window.sumatoriaMetas = calcularSumatoriaReal();

//         if (metasHisto[index].ABONADO >= metasHisto[index].OBJETIVO) {

//             let nombreMeta = metasHisto[index].NOMBRE;

//             metasHisto.splice(index, 1);

//             alert(`felicidades has logrado la meta de ${nombreMeta}`)


//         }
//         actualizarPantalla();
//         guardarDatos()
//     }

//     // despintarPantalla()
// }


// borrar meta

function borrarAbonar(index) {
    let nombreMeta = metasHisto[index].NOMBRE;

    metasHisto.splice(index, 1);

    // let nuevaSumatoria = calcularSumatoriaReal(); 
    // localStorage.setItem('sumatoriaMetas', nuevaSumatoria);

    alert(`has eliminado la meta de ${nombreMeta}`)

    actualizarPantalla();
    // calcularSumatoriaReal()
    guardarDatos()
}

// guardar datos


function guardarDatos() {
    localStorage.setItem('metasHisto', JSON.stringify(metasHisto));
    // localStorage.setItem('sumatoriaMetas', sumatoriaMetas);
    // let valorSuma = window.sumatoriaMetas || 0;
    // localStorage.setItem('sumatoriaMetas', valorSuma);

    // Recalculamos para estar 100% seguros antes de guardar
    let total = calcularSumatoriaReal();
    
    // Guardamos el total forzando a que sea un número (0 si algo sale mal)
    window.sumatoriaMetas = total;
    localStorage.setItem('sumatoriaMetas', isNaN(total) ? 0 : total);
}