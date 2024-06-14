import ListaEnlazada from "./listaEnlazada.mjs"

export default class Graph {
    #listaAdyacencia = []
    #map = new Map()

    constructor() {}

    addVertices(...vertices) {
        for (let value of vertices) {
            this.#listaAdyacencia.push(new ListaEnlazada ())
            this.#map.set(value,this.#listaAdyacencia.length-1)
        }
    }

    addV(value) {
        this.#listaAdyacencia.push(new ListaEnlazada ())
        this.#map.set(value,this.#listaAdyacencia.length-1)
    }

    addConexion(start, end, weight=1){
        if (this.#map.has(start) && this.#map.has(end)) {
            this.#listaAdyacencia[this.#map.get(start)].push(this.#map.get(end) ,weight); 
            return true
        }
        return false;
    }

    bfs(callback) {
        let queue = [];
        let list = [];
        const entries = [...this.#map.entries()];

        for (let i = 0; i < this.#listaAdyacencia.length; i++) {
            list[i] = false;
        }

        let [start] = entries[0];
        queue.push(start);

        while (queue.length > 0) {
            let vertex = queue.shift();
            if (!list[this.#map.get(vertex)]) {
                callback(vertex);
                list[this.#map.get(vertex)] = true;
                const adjacencyList = this.#listaAdyacencia[this.#map.get(vertex)];

                for (let i = 0; i < adjacencyList.size(); i++) {
                    let neighbor = adjacencyList.getElementAt(i);
                    let key = [...this.#map.entries()].find(([k, v]) => v === neighbor.key)[0];
                    if (!list[neighbor.key] && !queue.includes(key)) {
                        queue.push(key);
                    }
                }
            }
        }
    }
    inicioDfs(callback) {
        let listaDeVisitas = [];
        const entries = [...this.#map.entries()];

        for (let i = 0; i < this.#listaAdyacencia.length; i++) {
            listaDeVisitas[i] = false;
        }

        let [start] = entries[0];
        this.dfs(callback, listaDeVisitas, start);
    }

    dfs(callback, list, puntoDeInicio) {
        const vertexIndex = this.#map.get(puntoDeInicio);

        list[vertexIndex] = true;
        callback(puntoDeInicio);

        const listaDeAdyacencia = this.#listaAdyacencia[vertexIndex];
        for (let i = 0; i < listaDeAdyacencia.size(); i++) {
            let neighbor = listaDeAdyacencia.getElementAt(i);
            if (neighbor) {
                let key = [...this.#map.entries()].find(([k, v]) => v === neighbor.key)[0];
                if (!list[neighbor.key]) {
                    this.dfs(callback, list, key);
                }
            }
        }
    }
}