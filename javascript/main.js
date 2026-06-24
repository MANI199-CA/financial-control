// carga de la info

window.onload = function () {
    actualizarCapital();
    
}

window.addEventListener('focus', function () {
    actualizarCapital();
});

// actualizar capital

function actualizarCapital() {
    const pantallaCapital = document.getElementById("cantidad_capital");
    const coloresTitulo = document.querySelector('.colores');
    const borderColor = document.querySelector(".colores-border");

    const datosIngresos = JSON.parse(localStorage.getItem('historialIngresos')) || [];
    const datosGastos = JSON.parse(localStorage.getItem('historialGastos')) || [];
    let sumaMetasGuardada = localStorage.getItem('sumatoriaMetas');
let sumaMetas = (sumaMetasGuardada === null || sumaMetasGuardada === "undefined") ? 
                         0 : parseFloat(sumaMetasGuardada);

    let totalIngresos = 0
    datosIngresos.forEach(item => {
        totalIngresos += parseFloat(item.ingreso);
    });

    let totalGastos = 0;
    datosGastos.forEach(item => {
        totalGastos += parseFloat(item.gasto);
    })

    let totalCapital = totalIngresos - totalGastos - sumaMetas;

    pantallaCapital.innerHTML = `$${totalCapital.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    pantallaCapital.classList.remove('positivo', 'negativo', 'neutro')

    if (totalCapital < 0) {
        pantallaCapital.classList.add('negativo'); // ¡Alerta: estás en números rojos!
        coloresTitulo.classList.add('negativo');
        borderColor.classList.add('negativo');
    } else if (totalCapital === 0) {
        pantallaCapital.classList.add('neutro'); // Neutro
        coloresTitulo.classList.add('neutro');
        borderColor.classList.add('neutro');
    } else {
        pantallaCapital.classList.add('positivo'); // ¡Vas bien, tienes saldo a favor!
        coloresTitulo.classList.add('positivo');
        borderColor.classList.add('positivo');
    }
}

// mostrar historial movimientos



function mostrarMovis() {
    const datosIngresos = JSON.parse(localStorage.getItem('historialIngresos')) || [];
    const datosGastos = JSON.parse(localStorage.getItem('historialGastos')) || [];
    const contenedor = document.getElementById("movimientos");
    let movimientos = [];

    let html = '<h3>Movimientos Recientes:</h3> <br>'
    if (movimientos >= 1) {
        movimientos.forEach(item => {
            html += `<ul> <li style="padding: 10px;"> FECHA: ${item.fecha} | MOVIMIENTO: $${item.ingreso || item.gasto} 
        | MOTIVO: ${item.motivo} </li> </ul>`
        });

        contenedor.innerHTML = html;
        contenedor.classList.toggle('lista-movis-active')

    } else {
        datosIngresos.forEach(item => {
            movimientos.push(item)
        });

        datosGastos.forEach(item => {
            movimientos.push(item)
        });

        movimientos.forEach(item => {
            html += `<ul> <li style="padding: 10px;"> FECHA: ${item.fecha} | MOVIMIENTO: $${item.ingreso || item.gasto} 
        | MOTIVO: ${item.motivo} </li> </ul>`
        });

        contenedor.innerHTML = html;
        contenedor.classList.toggle('lista-movis-active')


    }


}
//esto es una prueba






