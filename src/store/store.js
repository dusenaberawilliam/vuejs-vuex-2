import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: []
  },

  getters: {
    getTodos: (state) => state.todos
  },

  actions: {
    fetchTodos({ commit }) {
      axios.get('https://jsonplaceholder.typicode.com/todos').then((response) => {
        commit('setTodos', response.data)
      }).catch((err) => {
        console.log(err)
      })
    },
    addTodo({ commit }, title) {
      axios.post('https://jsonplaceholder.typicode.com/todos', { title, completed: false }).then((response) => {
        commit('newTodo', response.data)
        //**************Remark*******************//
        //* use the following line of code      *//
        //* if there is no data in the response *//
        //***************************************//
        // commit('newTodo', { title })
      }).catch((err) => {
        console.log(err)
      })
    },
    removeTodo({ commit }, id) {
      axios.delete('https://jsonplaceholder.typicode.com/todos/' + id).then((response) => {
        commit('removeTodo', id)
      }).catch((err) => {
        console.log(err)
      })
    },
    updateTodo({ commit }, updTodo) {
      axios.put(`https://jsonplaceholder.typicode.com/todos/${updTodo.id}`, updTodo).then((response) => {
        commit('updateTodo', response.data);
      }).catch((err) => {
        console.log(err)
      });
    }
  },

  mutations: {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id != id),
    updateTodo: (state, updTodo) => {
      const index = state.todos.findIndex(todo => todo.id === updTodo.id);
      if (index !== -1) {
        state.todos.splice(index, 1, updTodo);
      }
    }
  }
})
