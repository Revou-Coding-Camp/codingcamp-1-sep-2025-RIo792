const addBtn = document.getElementById("add-btn");
const deleteAllBtn = document.getElementById("delete-all");
const filterBtn = document.getElementById("filter-btn");
const taskInput = document.getElementById("task");
const dateInput = document.getElementById("date");
const todoBody = document.getElementById("todo-body");

// ✅ Add Task
addBtn.addEventListener("click", () => {
  const task = taskInput.value.trim();
  const date = dateInput.value;

  if (task === "" || date === "") {
    alert("⚠️ Please enter task and date!");
    return;
  }

  // remove "No task found" if exists
  if (todoBody.children.length === 1 && todoBody.children[0].textContent.includes("No task")) {
    todoBody.innerHTML = "";
  }

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${task}</td>
    <td>${date}</td>
    <td>Pending</td>
    <td>
      <button class="complete-btn">Complete</button>
      <button class="delete-btn">Delete</button>
    </td>
  `;
  todoBody.appendChild(row);

  taskInput.value = "";
  dateInput.value = "";
});

// ✅ Delete Single Task
todoBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    e.target.parentElement.parentElement.remove();
    if (todoBody.children.length === 0) {
      todoBody.innerHTML = `<tr><td colspan="4" style="text-align:center;">No task found</td></tr>`;
    }
  }

  // Mark complete
  if (e.target.classList.contains("complete-btn")) {
    const row = e.target.parentElement.parentElement;
    row.children[2].textContent = "Completed";
    row.children[2].style.color = "#4CAF50";
  }
});

// ✅ Delete All
deleteAllBtn.addEventListener("click", () => {
  todoBody.innerHTML = `<tr><td colspan="4" style="text-align:center;">No task found</td></tr>`;
});

// ✅ Filter
filterBtn.addEventListener("click", () => {
  const filterText = prompt("Enter text to filter:").toLowerCase();
  document.querySelectorAll("#todo-body tr").forEach(row => {
    if (row.textContent.toLowerCase().includes(filterText) || row.textContent.includes("No task")) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});
