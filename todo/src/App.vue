<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <div id="app">
    <h1>TODO App</h1>
    <form @submit.prevent="addTodo">
      <input v-model="newTodo" placeholder="Enter new todo" />
      <button type="submit">add</button>
    </form>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.text }}
      </li>
    </ul>
  </div>
</template>

<script>

import { ref } from "vue"

export default {
  name: "App",
  setup() {
    const newTodo = ref(""); // ตัวแปรสำหรับเก็บ todo ใหม่
    const todos = ref([]); // ตัวแปรสำหรับเก็บ todo ทั้งหมด
    // ฟังก์ชันสำหรับเพิ่ม todo ใหม่
    const addTodo = () => {
      if (newTodo.value) {
        todos.value.push({
          id: Date.now(),
          text: newTodo.value,
          done: false,
        });

        newTodo.value = "";

      }

    };

    return {
      newTodo,
      todos,
      addTodo,
    };
  },
};
</script>


<style>
</style>