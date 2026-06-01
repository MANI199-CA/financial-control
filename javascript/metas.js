let metasHisto = [];
const contenerdorMetas = document.querySelector(".metas-activas-container");

// crear meta

function crearMeta() {
    const cantidadMeta = document.getElementById("cantidad-meta");
    const nombreMeta = document.getElementById("nombre-meta");
    
    const tituloMetasActivas = document.getElementById("metas-activas-h3");

    const nuevaMeta = { NOMBRE: nombreMeta.value, OBJETIVO: cantidadMeta.value, ABONADO: 0 };

    metasHisto.push(nuevaMeta);

    


    if (metasHisto.length >= 1) {
            
        tituloMetasActivas.innerHTML = 'METAS ACTIVAS';
        contenerdorMetas.style.display = 'flex';

        let html = '';

        metasHisto.forEach((item, index) =>{
            
            html += `<div class="meta-card">
                        <div class="meta-header">
                            <h4>${item.NOMBRE}</h4>
                            <span>$${item.ABONADO} / $${item.OBJETIVO}</span>
                        </div>
                        <progress value="${item.ABONADO}" max="${item.OBJETIVO}"></progress>
                        <button class="abonar-btn" onclick="abonarDinero(${index})">Abonar Dinero</button>
                    </div>`
                    
                
        })
        contenerdorMetas.innerHTML = html;
    }
    

    nombreMeta.value = ''
    cantidadMeta.value = '';

    console.log(nuevaMeta);

}

// abonar dinero

function abonarDinero(index) {
    let cantidadAbonar = Number(prompt('INGRESA LA CANTIDAD A ABONAR'));
    
    let nuevoMontoObjetivo = metasHisto[index].OBJETIVO - cantidadAbonar;

    metasHisto[index].ABONADO += cantidadAbonar;



    crearMeta()
}