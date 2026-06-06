// 1. EL ARREGLO
let metasHisto = [];

// 2. EL PINTOR (La única función que toca el HTML de las tarjetas)
function actualizarPantalla() {
    const contenedorMetas = document.querySelector(".metas-activas-container");
    const tituloMetasActivas = document.getElementById("metas-activas-h3"); // Asegúrate de tener este ID en tu HTML

    if (metasHisto.length >= 1) {
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
            </div>
            `;
        });
        contenedorMetas.innerHTML = html;
    }
}

// 3. EL ARQUITECTO (Solo guarda datos y manda a pintar)
function crearMeta() {
    const cantidadMeta = document.getElementById("cantidad-meta");
    const nombreMeta = document.getElementById("nombre-meta");

    // Construimos la meta y la guardamos
    const nuevaMeta = { 
        NOMBRE: nombreMeta.value, 
        OBJETIVO: parseFloat(cantidadMeta.value), 
        ABONADO: 0 
    };
    metasHisto.push(nuevaMeta);

    // Limpiamos los inputs
    nombreMeta.value = '';
    cantidadMeta.value = '';

    // ¡Le avisamos al pintor que ya hay datos nuevos!
    actualizarPantalla(); 
}

// 4. EL CAJERO (Solo hace matemáticas y manda a pintar)
function abonarDinero(index) {
    let cantidadAbonar = parseFloat(prompt('INGRESA LA CANTIDAD A ABONAR'));
    
    // Validamos que sea un número y sea mayor a cero
    if (!isNaN(cantidadAbonar) && cantidadAbonar > 0) {
        // Sumamos el dinero a la meta exacta usando su index
        metasHisto[index].ABONADO += cantidadAbonar;
        
        // ¡Le avisamos al pintor que los números cambiaron!
        actualizarPantalla(); 
    }
}




// CASO 1: No hay metas. Limpiamos todo.
    if(metasHisto.length >= 1){

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
        </div>
        `;
    });
    contenedorMetas.innerHTML = html;
    
    }
    if (metasHisto.length === 0) {
        contenedorMetas.innerHTML = ''; // ¡Aquí está la magia: borramos el contenido!
        contenedorMetas.style.display = 'none';
        tituloMetasActivas.innerHTML = 'NO HAY METAS ACTIVAS';
        return; // Salimos de la función aquí
    }
