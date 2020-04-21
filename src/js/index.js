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
// import { onModal } from "./modules/modals";
import { showTabContent } from "./modules/tabs";
import { createModal } from "./helpers/createModal";

const {
  form,
  inputTitle,
  inputBody,
  taskContainer,
  taskBtnContainer,
  tabsBtn
} = userInterfaceElements;

const inputs = [inputTitle, inputBody];

const objOfTasks = getObjectOfTasks(tasks);

renderAllTasks(objOfTasks);

//Events;

inputs.forEach(input =>
  input.addEventListener("focus", function() {
    setSuccessFor(input);
  })
);

taskBtnContainer.addEventListener("click", e => {
  const target = e.target;
  const attrBtn = target.getAttribute("data-tab");

  if (!attrBtn || target.classList.contains("btn-active")) return;

  tabsBtn.forEach(el => el.classList.remove("btn-active"));
  target.classList.add("btn-active");

  showTabContent(attrBtn);
});

window.addEventListener("unload", () => {
  localStorage.setItem("tasks", JSON.stringify(objOfTasks));
});

taskContainer.addEventListener("click", e => {
  const target = e.target;
  if (target.classList.contains("task-delete-btn")) onModal(target);
  if (target.classList.contains("task-complited")) onComplitedTask(target);
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

function onModal(target) {
  const liModal = target.closest("[data-task-id]");

  const divModal = createModal();
  document.body.appendChild(divModal);

  divModal.addEventListener("click", onDeleteHandler);

  function onDeleteHandler({ target }) {
    if (target.classList.contains("btn-delete-task")) {
      const attrIdOfTask = liModal.dataset.taskId;
      delete objOfTasks[attrIdOfTask];
      localStorage.removeItem(attrIdOfTask);
      liModal.remove();
      divModal.remove();
    } else {
      divModal.remove();
    }
  }
}
