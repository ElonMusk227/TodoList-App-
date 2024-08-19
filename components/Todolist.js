/**
 * @typedef {object} Todo
 */
export class Todolist {
    #todos = []
    constructor(todos) {
        this.#todos = todos
    }
    appendTo(element){
        element.innerHTML
    }
}