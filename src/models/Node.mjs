export default class Node {
    key
    peso
    next
    constructor(key, peso){
        this.key=key;
        this.peso=peso;
        this.next=null;
    }
}