import "./styles/style.css";
import tasks from "./assets/tasks.json";
import { getObjectOfTasks } from "./helpers/getObjectOfTasks.js";
import { renderAllTasks } from "./views/renderAllTasks";
import userInterfaceElements from "./config/ui.config";
import { validate } from "./helpers/validate";
import { createNewTask } from "./helpers/createNewTask";
import { listItemTemplate } from "./helpers/taskTemplate";
import { setShowError, setSuccessFor } from "./views/form";

const { form, inputTitle, inputBody, taskContainer } = userInterfaceElements;
const inputs = [inputTitle, inputBody];

const objOfTasks = getObjectOfTasks(tasks);

renderAllTasks(objOfTasks);

//Events;
inputs.forEach(input =>
  input.addEventListener("focus", function() {
    setSuccessFor(input);
  })
);

form.addEventListener("submit", e => {
  e.preventDefault();

  const isValid = inputs.every(input => {
    const isValidInput = validate(input);
    if (!isValidInput) {
      // input.classList.add("js-is-valid");
      setShowError(input, "Поле должно быть заполнено");
    }

    return isValidInput;
  });

  if (!isValid) return;

  const titleValue = inputTitle.value;
  const bodyValue = inputBody.value;

  let newTask = createNewTask(titleValue, bodyValue, objOfTasks);
  objOfTasks[newTask._id] = newTask;

  const li = listItemTemplate(newTask);
  taskContainer.insertAdjacentElement("afterbegin", li);
  form.reset();
});

taskContainer.addEventListener("click", e => {
  const target = e.target;
  onDeletehandler(target);
});

function onDeletehandler(target) {
  if (e.target.classList.contains("task-delete-btn")) {
    const deleteBtn = e.target;
    const parent = deleteBtn.closest("[data-task-id]");
    deleteTaskFromHtml(parent);
  }
}

function deleteTaskFromHtml(el) {
  el.remove();
}
