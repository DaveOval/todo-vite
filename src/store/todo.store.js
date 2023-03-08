import { Todo } from "../todos/models/todo.model";

export const Filters = {
    All : 'all',
    Completed: 'Completed',
    Pending: 'Pending',
}

const state = {
    todos: [
        new Todo('Crea aqui tus tareas'),
        // new Todo('Piedra del infinito'),
        // new Todo('Piedra del tiempo'),
        // new Todo('Piedra del poder'),
        // new Todo('Piedra del realidad'),
    ],
    filter: Filters.All,
}

const initStore = () =>{
    loadStore();
    console.log('InitStore 🥑');
}

const loadStore = ()=>{
    if(!localStorage.getItem('state')) return;

    const { todos = [], filter = Filters.All} = JSON.parse(localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
}

const saveStatiToLocalStorage = () =>{

    localStorage.setItem('state', JSON.stringify(state));
}

const getTodos = ( filter = Filters.All) =>{
    switch(filter){
        case Filters.All:
            return [...state.todos];

        case Filters.Completed:
            return state.todos.filter(todo => todo.done);

        case Filters.Pending:
            return state.todos.filter(todo => todo.done === false);
        
        default: 
            throw new Error(`Option ${filter} is not valid`);
    }
}

/**
 * 
 * @param {String} description 
 */
const addTodo = ( description ) => {
    if(!description) throw new Error('Description is required');
    state.todos.push(new Todo(description));

    saveStatiToLocalStorage();
}

/**
 * 
 * @param {String} todoId 
 */
const toggleTodo = (todoId) =>{
    state.todos = state.todos.map( todo =>{
        if( todo.id === todoId){
            todo.done = !todo.done;
        }
        return todo;
    });
    saveStatiToLocalStorage();
}

const deleteTodo = (todoId) =>{
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    saveStatiToLocalStorage();
}

const deleteCompleted = () =>{
    state.todos = state.todos.filter(todo => !todo.done);
    saveStatiToLocalStorage();
}
/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.All ) =>{
    state.filter = newFilter;
    saveStatiToLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}

export default{
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}
