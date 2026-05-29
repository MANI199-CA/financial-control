//solicitar fecha

function solicitarFecha() {
    const hoy = new Date()
    return hoy.toLocaleDateString();
}


let historialIngresos = JSON.parse(localStorage.getItem('historialIngresos')) || [];;



// agregar ingreso nuevo

// function agregarIngreso() {
//    console.log('click')
//     const cantidadIngreso = document.getElementById('cantidad-ingreso')
//     const motivoIngreso = document.getElementById('motivo-ingreso')

//     // const nuevoIngreso = { fecha: solicitarFecha(), ingreso: cantidadIngreso, motivo: motivoIngreso }

//     historialIngresos.push({ fecha: solicitarFecha(), ingreso: cantidadIngreso.value, motivo: motivoIngreso.value })

//     guardarDatos()

//     cantidadIngreso.value = '';
//     motivoIngreso.value = '';

        

// }

function agregarIngreso() {
    const cantidadIngreso = document.getElementById('cantidad-ingreso');
    const motivoIngreso = document.getElementById('motivo-ingreso');

    // Validación básica: Si no hay valor, salimos de la función
    if (cantidadIngreso.value === '' || motivoIngreso.value === '') {
        alert("Por favor, llena los campos");
        return;
    }

    // Creamos el objeto
    const nuevoMovimiento = {
        fecha: solicitarFecha(), // Llama a tu función
        ingreso: cantidadIngreso.value,
        motivo: motivoIngreso.value
    };

    // Hacemos el push
    historialIngresos.push(nuevoMovimiento);

    // Guardamos y limpiamos
    guardarDatos();
    cantidadIngreso.value = '';
    motivoIngreso.value = '';
    
    console.log("Guardado con éxito:", nuevoMovimiento);
}

//toggle de historial

// function togglehisto() {


//     const contenedor = document.getElementById("historial-ingresos");
//     contenedor.classList.toggle('lista-historial-active');
//     mostarHistoIngresos()
// }


// mostrar historial 


function mostarHistoIngresos() {
    console.log('click')
    const contenedor = document.getElementById("historial-ingresos");

    contenedor.innerHTML = '';

    let html = '<h3>Ingresos Recientes:</h3> <br>'
    historialIngresos.forEach(item => {
        html += `<ul> <li style="padding: 10px;"> FECHA: ${item.fecha} | INGRESO: $${item.ingreso} | MOTIVO: ${item.motivo} </li> </ul>`;
    })

    contenedor.innerHTML = html


    contenedor.classList.toggle('lista-historial-active')


}

// reiniciar historial

function reiniciarHistorial() {
    historialIngresos = [];

    // 2. Vaciamos la memoria permanente (LocalStorage)
    localStorage.removeItem('historialIngresos');

    // 3. Actualizamos la pantalla para que se vea vacío
    // mostrarHistoIngresos();

}

// gaurdar datos

function guardarDatos() {
    localStorage.setItem('historialIngresos', JSON.stringify(historialIngresos));

}