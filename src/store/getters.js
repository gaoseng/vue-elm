
export default {
    doneTodos: state=>{
        return state.todos.filter(todo=>todo.done);
    },
    getTodoById: (state) => (id) => {
        return state.todos.find(todo => todo.id === id)
      }
}