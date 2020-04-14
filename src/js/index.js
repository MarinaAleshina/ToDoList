import "../styles/style";
import tasks from "../assets/tasks.json";
import { getObjectOfTasks } from "./helpers/getObjectOfTasks";
import { renderAllTasks } from "./views/renderAllTasks";
import userInterfaceElements from "./config/ui.config";
import { validate } from "./helpers/validate";
import { createNewTask } from "./helpers/createNewTask";
import { listItemTemplate } from "./helpers/taskTemplate";
import { setShowError, setSuccessFor } from "./views/form";
import { onComplitedTask } from "./views/complitedTask";
import { onModal } from "./modules/modals";
import tabs from "./modules/tabs";

tabs(".task-btn-container", ".btn", ".task-container", "btn-active");

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

window.addEventListener("unload", e => {
  localStorage.setItem("tasks", JSON.stringify(objOfTasks));
});

taskContainer.addEventListener("click", e => {
  const target = e.target;
  if (target.classList.contains("task-delete-btn")) onModal(target);
  if (target.classList.contains("task-complited")) onComplitedTask(target);
  if (target.classList.contains("btn-delete-task")) deleteTaskFromHtml(target);
  if (target.classList.contains("cancel-del-task")) onComeBackTask(target);
});

form.addEventListener("submit", onFormSubmitHandler);

function onFormSubmitHandler(e) {
  e.preventDefault();

  const isValid = inputs.every(input => {
    const isValidInput = validate(input);
    if (!isValidInput) {
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
}

function deleteTaskFromHtml(target) {
  const parent = target.getAttribute("data-is-delete");
  console.log(parent);
}

function onComeBackTask(target) {
  console.log(target);
}
