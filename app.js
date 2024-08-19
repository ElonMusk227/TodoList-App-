import { Todolist } from "./components/Todolist";
import { fetchJSON } from "./functions/api";
import { createElement } from "./functions/dom";

try
{
    const todos = await fetchJSON('https://jsonplaceholder.typicode.com/todos?_limit=5')
    const list = new Todolist(todos)
    list.appendTo(document.querySelector('#todolist'))
}catch(e){
   const div = alertElement('div',{
    class: 'alert alert-danger',
    role: 'alert'
   })
   div.innerText = 'Impossible de charger les elements'
   document.body.append(alertElement)
}