//solicitar fecha

function solicitarFecha() {
    const hoy = new Date()
    return hoy.toLocaleDateString();
}


let historialIngresos = JSON.parse(localStorage.getItem('historialIngresos')) || [];



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

//Generar Reporte

function generarReporteIngresos(){
    // 1. Empezamos con los títulos de las columnas
    let contenidoCSV = "Fecha,Monto,Motivo\n";

    // 2. Recorremos tu historial (la lista que ya tienes en localStorage)
    historialIngresos.forEach(item => {
        // Armamos la línea con comas
        contenidoCSV += `${item.fecha},${item.ingreso},${item.motivo}\n`;
    });

    // 3. Convertimos el texto en un "Blob" (un archivo descargable)
    const archivo = new Blob([contenidoCSV], { type: 'text/csv' });
    
    // 4. Creamos un enlace temporal para que el navegador lo descargue
    const url = URL.createObjectURL(archivo);
    const link = document.createElement('a');
    link.href = url;
    link.download = "mi_reporte_ingresos.csv"; // Nombre del archivo
    link.click(); // "Simulamos" que el usuario picó el enlace
}

// gaurdar datos

function guardarDatos() {
    localStorage.setItem('historialIngresos', JSON.stringify(historialIngresos));

}