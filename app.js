import { Todolist } from "./components/Todolist.js";
import { FetchJSON } from "./functions/api.js";
import { createElement } from "./functions/dom.js";

async function loadTodolist() {
    try {
        const todos = await FetchJSON('https://jsonplaceholder.typicode.com/todos?_limit=5')
        const list = new Todolist(todos)
        list.appendTo(document.querySelector('#todolist'))
    } catch(e) {
        const alertElement = createElement('div', {
            class: 'alert alert-danger m-2',
            role: 'alert'
        })
        alertElement.innerText = 'Impossible de charger les éléments'
        document.body.prepend(alertElement)
    }
}

loadTodolist();
