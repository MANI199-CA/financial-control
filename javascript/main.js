// carga de la info

window.onload = function () {
    actualizarCapital();
}

window.addEventListener('focus', function() {
    actualizarCapital();
});

// actualizar capital

function actualizarCapital() {
    const pantallaCapital = document.getElementById("cantidad_capital");
    const datosIngresos = JSON.parse(localStorage.getItem('historialIngresos')) || [];
    const datosGastos = JSON.parse(localStorage.getItem('historialGastos')) || [];

    let totalIngresos = 0
    datosIngresos.forEach(item => {
        totalIngresos += parseFloat(item.ingreso);
    });

    let totalGastos = 0;
    datosGastos.forEach(item => {
        totalGastos += parseFloat(item.gasto);
    })

    let totalCapital = totalIngresos - totalGastos;

    pantallaCapital.innerHTML = `$${totalCapital.toLocaleString('en-US',{ minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    pantallaCapital.classList.remove('positivo', 'negativo', 'neutro')

    if (totalCapital < 0) {
        pantallaCapital.classList.add('negativo'); // ¡Alerta: estás en números rojos!
    } else if (totalCapital === 0) {
        pantallaCapital.classList.add('neutro'); // Neutro
    } else {
         pantallaCapital.classList.add('positivo'); // ¡Vas bien, tienes saldo a favor!
    }
}

// mostrar historial movimientos

let movimientos = [];

function mostrarMovis(){
  const datosIngresos = JSON.parse(localStorage.getItem('historialIngresos')) || [];
    const datosGastos = JSON.parse(localStorage.getItem('historialGastos')) || [];
    
    
    datosIngresos.forEach(item=> {
        movimientos.push(item)
    });
    
    datosGastos.forEach(item => {
        movimientos.push(item)
    });
    
    const contenedor = document.getElementById("movimientos");
    
    contenedor.innerHTML = ""
    let html = '<h3>Movimientos Recientes:</h3> <br>'
    
    movimientos.forEach(item =>{
      html += `<ul> <li style="padding: 10px;"> FECHA: ${item.fecha} | INGRESO: $${item.ingreso || item.gasto} | MOTIVO: ${item.motivo} </li> </ul>`
    });
    
    contenedor.innerHTML = html;
    
    contenedor.classList.toggle('lista-historial-active')
}
//esto es una prueba