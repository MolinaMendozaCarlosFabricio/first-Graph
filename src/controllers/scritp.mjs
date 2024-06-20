import Graph from "../models/Graph.mjs";

let g = new Graph(8)
g.addVertices("A","B","C","D","E","F","G")
g.addV("H")
g.addV("I")

g.addConexion("A","B")
g.addConexion("A","C")
g.addConexion("A","D",8)
g.addConexion("B","E",9)
g.addConexion("B","F",10)
g.addConexion("D","F",11)
g.addConexion("E","G",12)
g.addConexion("G","H")
g.addConexion("G","I")

const callback = (value) => {
    console.log(value);
}

g.inicioDfs(callback);

const agregarUbicaciones = () => {
    let newUbicacion = document.getElementById("main_div_inputUbicacion").value;
    if(newUbicacion == ""){
        alert("Ingrese una ubicacion válida");
    }
    else{
        g.addV(newUbicacion);
        console.log(newUbicacion)
        alert("Ubicación añadida exitosamente");
        imprimirUbicaciones();
    }
}

const anadirAristas = () => {
    let distancia = document.getElementById("getWeight").value;
    let puntoInicio = document.getElementById("startPoint").value;
    let puntoFinal = document.getElementById("endPoint").value;
    if(g.addConexion(puntoInicio, puntoFinal, distancia)){
        console.log("Arista añadido")
        alert("Ruta añadida exitosamente");
        imprimirUbicaciones();
    }
    else {
        console.log("Error");
        alert("Error, asegurese de añadir ubicaciones existentes en la página");
    }
    g.inicioDfs(callback);
}

export const imprimirUbicaciones = () => {
    const listaUbicaciones = document.getElementById("main_div_resultados");
    listaUbicaciones.innerHTML = "";

    const callbackImpresionUbicaciones = (val) => {
        const ubicacion = document.createElement("li");
        ubicacion.textContent = val;
        listaUbicaciones.appendChild(ubicacion);
    }

    g.inicioDfs(callbackImpresionUbicaciones);
}
const encontrarCaminoMasCorto = () => {
    let inicio = document.getElementById("startDijkstra").value;
    let fin = document.getElementById("endDijkstra").value;
    const { path, distance } = g.dijkstra(inicio, fin, callback);
    console.log(`El camino más corto de ${inicio} a ${fin} es: ${path.join(" -> ")} con una distancia de ${distance}`);
    const resultadoDijkstra = document.getElementById("main_contenedores_resultadoDijkstra");
    resultadoDijkstra.innerHTML = "";
    const resultado = document.createElement("li");
    resultado.textContent = `El camino más corto de ${inicio} a ${fin} es: ${path.join(" -> ")} con una distancia de ${distance}`;
    resultadoDijkstra.appendChild(resultado);
}

document.addEventListener('DOMContentLoaded', (event) => {imprimirUbicaciones();});
let btnAgregarVertice = document.getElementById("main_div_buttonAgregarUbicacion");
btnAgregarVertice.addEventListener("click", agregarUbicaciones);

let btnAgregarArista = document.getElementById("main_div_buttonAgregarCamino");
btnAgregarArista.addEventListener("click", anadirAristas);

let btnEncontrarCamino = document.getElementById("main_div_buttonEncontrarCamino");
btnEncontrarCamino.addEventListener("click", encontrarCaminoMasCorto);