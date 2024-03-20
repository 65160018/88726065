<template>
  <div id="app">
    <h1>TODO App</h1>

   
    <form @submit.prevent="addTodo">
      <input v-model="newTodo" placeholder="Enter new todo" />
      <button type="submit">Add</button>
    </form>

   
    <div>
      <button @click="filter = 'all'">All</button>
      <button @click="filter = 'active'">Active</button>
      <button @click="filter = 'done'">Done</button>
    </div>


    <ul>
      <li v-for="(todo, index) in todos" :key="todo.id">
        <span :class="{ done: todo.done }" @click="toggleTodo(index)">
          {{ todo.text }}
        </span>
        <button @click="removeTodo(index)">X</button>
      </li>
    </ul>
  </div>
</template>

<style>
.done {
  text-decoration: line-through;
}
</style>

<script>

import { ref, computed } from "vue";

export default {

  name: "App",

  setup() {
    
    const newTodo = ref("");
    
    const todos = ref([]);


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

    // function สำหรับสลับสถานะของ todo โดยรับ index ของ todos ที่ต้องการสลับสถานะ
    const toggleTodo = (index) => {
      todos.value[index].done = !todos.value[index].done;
    };

    // function สำหรับลบ todo โดยรับ index ของ todos ที่ต้องการลบ
    const removeTodo = (index) => {
      todos.value.splice(index, 1);
    };

    // ตัวแปร filter สำหรับเก็บประเภทของ todo ที่ต้องการ filter ใช้ ref เพื่อให้ Vue ติดตามการเปลี่ยนแปลงของค่าได้
    const filter = ref("all");

    // filteredTodos เป็น computed property เมื่อค่าของ filter.value หรือ todos.value มีการเปลี่ยนแปลง Vue จะทำการคำนวณค่าใหม่โดยอัตโนมัติ และส่งคืนผลลัพธ์ของ todo ที่ผ่านการกรองล่าสุด
    const filteredTodos = computed(() => {
      // ใช้ switch statement เพื่อตรวจสอบค่าของ filter.value และดำเนินการกรอง todo ตามเงื่อนไข
      switch (filter.value) {
        // กรณีที่ filter.value เป็น "done":
        case "done":
          // ใช้ todos.value.filter() เพื่อกรอง todo จาก todos.value โดยเลือกเฉพาะ todo ที่มีค่า done เป็น true และ ส่งคืน array ของ todo ที่เสร็จแล้ว
          return todos.value.filter((todo) => todo.done);
        // กรณีที่ filter.value เป็น "active":
        case "active":
          
          return todos.value.filter((todo) => !todo.done);
        default:
          
          return todos.value;
      }
    });

    
    return {
      newTodo,
      todos,
      addTodo,
      toggleTodo,
      removeTodo,
      filter,
      filteredTodos,
    };
  },
};
</script>

<style>

</style>
