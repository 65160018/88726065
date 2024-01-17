document.addEventListener("DOMContentLoaded", function () {
    // รับค่า DOM elements
    const todoList = document.getElementById("todo-list");
    const todoInput = document.getElementById("todo-input");
    const addButton = document.getElementById("add-button");

    // อาร์เรย์สำหรับเก็บรายการ Todo
    let todos = [];

    // เพิ่มรายการ Todo
    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText !== "") {
            // สร้าง object ในรูปแบบของ todoItem
            const todoItem = {
                text: todoText,
                completed: false,
            };

            // เพิ่ม todoItem เข้าไปในอาร์เรย์ todos
            todos.push(todoItem);

            // แสดงรายการ Todo อัปเดตล่าสุด
            renderTodoList();

            // Reset ค่าใน input
            todoInput.value = "";
        }
    }

    // ลบรายการ Todo ตาม index
    function deleteTodo(index) {
        // ใช้ splice เพื่อลบ todo ที่ต้องการ
        todos.splice(index, 1);

        // แสดงรายการ Todo อัปเดตล่าสุด
        renderTodoList();
    }

    // สลับสถานะ completed ของรายการ Todo ตาม index
    function toggleComplete(index) {
        // สลับค่า completed ของ todo ที่ต้องการ
        todos[index].completed = !todos[index].completed;

        // แสดงรายการ Todo อัปเดตล่าสุด
        renderTodoList();
    }

    // แสดงรายการ Todo บนหน้าเว็บ
    function renderTodoList() {
        // Log ข้อมูล todos ใน console
        console.log(todos);

        // ล้างรายการ Todo ทั้งหมดใน HTML
        todoList.innerHTML = "";

        // วน loop ผ่าน todos เพื่อสร้าง HTML elements แสดงรายการ Todo
        for (let i = 0; i < todos.length; i++) {
            const todoItem = todos[i];
            const listItem = document.createElement("li");

            // กำหนดข้อความใน listItem
            listItem.textContent = todoItem.text;

            // เพิ่ม class "completed" ถ้า todo เสร็จสมบูรณ์
            if (todoItem.completed) {
                listItem.classList.add("completed");
            }

            // สร้างปุ่ม delete
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "ลบ";
            deleteButton.addEventListener("click", () => deleteTodo(i));

            // สร้างปุ่ม complete/undo
            const completeButton = document.createElement("button");
            completeButton.textContent = todoItem.completed ? "ยกเลิก" : "เสร็จ";
            completeButton.addEventListener("click", () => toggleComplete(i));

            // เพิ่มปุ่มลบและปุ่ม complete/undo เข้าไปใน listItem
            listItem.appendChild(completeButton);
            listItem.appendChild(deleteButton);

            // เพิ่ม listItem เข้าไปใน todoList
            todoList.appendChild(listItem);
        }
    }

    // การกดปุ่ม "เพิ่ม"
    addButton.addEventListener("click", addTodo);

    // การกด Enter ใน input
    todoInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTodo();
        }
    });

    // แสดงรายการ Todo ครั้งแรกที่โหลดหน้าเว็บ
    renderTodoList();
});
