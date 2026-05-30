function solicitarFecha() {
    const hoy = new Date()
    return hoy.toLocaleDateString();
}


let historialGastos = JSON.parse(localStorage.getItem('historialGastos')) || [];;

// agregar gastos

function agregarGasto() {
    const cantidadGasto = document.getElementById("cantidad-gastos");
    const motivoGasto = document.getElementById("motivo-gastos");

    // Validación básica: Si no hay valor, salimos de la función
    if (cantidadGasto.value === '' || motivoGasto.value === '') {
        alert("Por favor, llena los campos");
        return;
    }

    // Creamos el objeto
    const nuevoMovimiento = {
        fecha: solicitarFecha(), // Llama a tu función
        ingreso: cantidadGasto.value,
        motivo: motivoGasto.value
    };

    // Hacemos el push
    historialGastos.push(nuevoMovimiento);

    // Guardamos y limpiamos
    guardarDatos();
    cantidadGasto.value = '';
    motivoGasto.value = '';
    
    console.log("Guardado con éxito:", nuevoMovimiento);
}

// mostrar historial 


function mostarHistoGasto() {
    console.log('click')
    const contenedor = document.getElementById("historial-gastos");

    contenedor.innerHTML = '';

    let html = '<h3>Ingresos Recientes:</h3> <br>'
    historialGastos.forEach(item => {
        html += `<ul> <li style="padding: 10px;"> FECHA: ${item.fecha} | INGRESO: $${item.ingreso} | MOTIVO: ${item.motivo} </li> </ul>`;
    })

    contenedor.innerHTML = html


    contenedor.classList.toggle('lista-historial-active')


}

// reiniciar historial

function reiniciarHistorial() {
    historialGastos = [];

    // 2. Vaciamos la memoria permanente (LocalStorage)
    localStorage.removeItem('historialGastos');

    // 3. Actualizamos la pantalla para que se vea vacío
    // mostrarHistoIngresos();

}

function generarReporteGastos(){
    // 1. Empezamos con los títulos de las columnas
    let contenidoCSV = "Fecha,Monto,Motivo\n";

    // 2. Recorremos tu historial (la lista que ya tienes en localStorage)
    historialGastos.forEach(item => {
        // Armamos la línea con comas
        contenidoCSV += `${item.fecha},${item.ingreso},${item.motivo}\n`;
    });

    // 3. Convertimos el texto en un "Blob" (un archivo descargable)
    const archivo = new Blob([contenidoCSV], { type: 'text/csv' });
    
    // 4. Creamos un enlace temporal para que el navegador lo descargue
    const url = URL.createObjectURL(archivo);
    const link = document.createElement('a');
    link.href = url;
    link.download = "mi_reporte_gastos.csv"; // Nombre del archivo
    link.click(); // "Simulamos" que el usuario picó el enlace
}

// gaurdar datos

function guardarDatos() {
    localStorage.setItem('historialGastos', JSON.stringify(historialGastos));

}
