import { createElement } from "../functions/dom.js"

/**
 *  @typedef {object} Todo
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */
export class Todolist{
    /** @type {Todo []} */
    #todos = []

    /** @type {HTMLUListElement} */
    #listElement = null
    /**
     * 
     * @param {Todo []} todos 
     */
    constructor(todos){
        this.#todos = todos
    }
    /**
     * 
     * @param {HTMLElement} element 
     */
    appendTo(element){
        element.innerHTML = `        <form action="" class="d-flex pb-4">
            <input type="text" class="form-control" placeholder="Code the main page of the appli" name="title" required>
            <button type="submit" class="btn btn-primary">Add</button>
        </form>
        <main>
            <div class="btn-group mb-4 filter" role="group" aria-label="Basic outlined example"> 
                <button type="button" class="btn btn-outline-primary active" data-filter="all">All Tasks</button>
                <button type="button" class="btn btn-outline-primary"data-filter="todo">To do</button>
                <button type="button" class="btn btn-outline-primary"data-filter="done">Done</button>
            </div>
            <ul class="list-group">
            </ul>
        </main>`
        this.#listElement = element.querySelector('.list-group')
        for(let todo of this.#todos){
            const t = new TodolistItem(todo)
            this.#listElement.append(t.element)
        }
        element.querySelector('form').addEventListener('submit', e =>this.#onSubmit(e))
        element.querySelectorAll('.btn-group button').forEach(button =>{
            button.addEventListener('click', e => this.#toggleFilter(e))
        })
    }
    /**
     * 
     * @param {SubmitEvent} e 
     */
    #onSubmit(e){
      e.preventDefault()
      const form = e.currentTarget
      const title = new FormData(form).get('title').toString().trim()
      if(title === ''){
        return
      }
      const todo = {
        id: Date.now(),
        title: title,
        completed: false
      } 
      const item = new TodolistItem(todo)
      this.#listElement.prepend(item.element)
      form.reset()
    }
    /**
     * 
     * @param {PointerEvent} e 
     */
    #toggleFilter(e){
        e.preventDefault()
        const filter = e.currentTarget.getAttribute('data-filter')
        e.currentTarget.parentElement.querySelector('.active').classList.remove('active')
        e.currentTarget.classList.add('active')
        if(filter === 'todo'){
            this.#listElement.classList.add('hide-completed')
            this.#listElement.classList.remove('hide-todo')
        }else if (filter === 'done'){
            this.#listElement.classList.add('hide-todo')
            this.#listElement.classList.remove('hide-completed')
        }else{
            this.#listElement.classList.remove('hide-todo')
            this.#listElement.classList.remove('hide-completed')
        }
    }
}
class TodolistItem{
    #element

    /**
     * 
     * @type {Todo}
     */
    constructor(todo){
        const id = `todo-${todo.id}`
        const li = createElement('li',{
            class: 'todo list-group-item d-flex align-text'
        }) 
        this.#element = li  
        const checkbox = createElement('input',{
            type: 'checkbox',
            class: 'form-check-input',
            id,
            checked: todo.completed ? '' : null
        })
        const label = createElement('label',{
            class: 'ms-2 form-check-label',
            for: id
        })
        label.innerText = todo.title
        const button = createElement('button',{
            class: 'ms-auto btn btn-danger btn-sm'
        })
        button.innerHTML = '<i class="bi-trash"></i>'
        li.append(checkbox)
        li.append(label)
        li.append(button)
        this.toggle(checkbox)
        button.addEventListener('click',(e) => this.remove(e) )
        checkbox.addEventListener('change', e => this.toggle(e.currentTarget))
    }
    /**
     * 
     * @return {HTMLElement} 
     */
    get element(){
        return this.#element
    }

    /**
     * 
     * @param {PointerEvent} _e 
     */
    remove (e){
        e.preventDefault()
        this.#element.remove()
    }
    /**
     * Change the state(to do/ done) of the task
     * @param {HTMLInputElement} checkbox 
     */
    toggle(checkbox){
        if(checkbox.checked){
            this.#element.classList.add('is-completed')
        }else{
            this.#element.classList.remove('is-completed')
        }
    }
}