import ListaEnlazada from "./listaEnlazada.mjs"

export default class Graph {
    #listaAdyacencia = []
    #matrizAdyacencia = []
    #map = new Map()

    constructor() {}

    addVertices(...vertices) {
        for (let value of vertices) {
            this.#listaAdyacencia.push(new ListaEnlazada ())
            this.#matrizAdyacencia.push([])
            this.#map.set(value, this.#listaAdyacencia.length-1);
        }
    }

    addV(value) {
        this.#listaAdyacencia.push(new ListaEnlazada ())
        this.#matrizAdyacencia.push([]);
        this.#map.set(value, this.#listaAdyacencia.length-1);
    }

    addConexion(start, end, weight=1){
        if (this.#map.has(start) && this.#map.has(end)) {
            this.#listaAdyacencia[this.#map.get(start)].push(this.#map.get(end) ,weight); 
            this.#matrizAdyacencia[this.#map.get(start)][this.#map.get(end)] = weight
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

    dijkstra(start, end, callback) {
        const distances = Array(this.#listaAdyacencia.length).fill(Infinity);
        const visited = Array(this.#listaAdyacencia.length).fill(false);
        const previous = Array(this.#listaAdyacencia.length).fill(null);

        const startIndex = this.#map.get(start);
        distances[startIndex] = 0;

        for (let i = 0; i < this.#listaAdyacencia.length; i++) {
            const minVertex = this.#getMinDistanceVertex(distances, visited);
            visited[minVertex] = true;

            if (callback) callback(this.#getKeyFromIndex(minVertex));

            const adjacencyList = this.#listaAdyacencia[minVertex];
            for (let j = 0; j < adjacencyList.size(); j++) {
                const neighbor = adjacencyList.getElementAt(j);
                const newDist = distances[minVertex] + neighbor.peso;
                if (newDist < distances[neighbor.key]) {
                    distances[neighbor.key] = newDist;
                    previous[neighbor.key] = minVertex;
                }
            }
        }

        const path = [];
        let current = this.#map.get(end);

        while (current !== null) {
            path.unshift(this.#getKeyFromIndex(current));
            current = previous[current];
        }

        return { path, distance: distances[this.#map.get(end)] };
    }

    #getMinDistanceVertex(distances, visited) {
        let minDistance = Infinity;
        let minVertex = -1;

        for (let i = 0; i < distances.length; i++) {
            if (!visited[i] && distances[i] < minDistance) {
                minDistance = distances[i];
                minVertex = i;
            }
        }

        return minVertex;
    }

    #getKeyFromIndex(index) {
        for (const [key, value] of this.#map.entries()) {
            if (value === index) return key;
        }
        return null;
    }
}