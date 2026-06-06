let metasHisto =  JSON.parse(localStorage.getItem('metasHisto')) || [];
// const contenerdorMetas = document.querySelector(".metas-activas-container");

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
        </div>
        `;
    });
    contenedorMetas.innerHTML = html;
    
}   else{ 
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

    actualizarPantalla()
    guardarDatos()

    console.log(nuevaMeta);

}



// abonar dinero

function abonarDinero(index) {
    let cantidadAbonar = Number(prompt('INGRESA LA CANTIDAD A ABONAR'));




    if (!isNaN(cantidadAbonar) || cantidadAbonar > 0) {


        metasHisto[index].ABONADO += cantidadAbonar;

        if (metasHisto[index].ABONADO >= metasHisto[index].OBJETIVO) {
           
            let nombreMeta = metasHisto[index].NOMBRE;
           
            metasHisto.splice(index, 1);

            alert(`felicidades has logrado la meta de ${nombreMeta}`)


        }
        actualizarPantalla();
        guardarDatos()
    }

    // despintarPantalla()
}

// guardar datos


function guardarDatos() {
    localStorage.setItem('metasHisto', JSON.stringify(metasHisto));

}