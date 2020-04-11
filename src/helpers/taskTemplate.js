/**
 * Function listItemTemplate. create template
 * @param {object} objOfTasks
 * @param {string} objOfTasks._id
 * @param {string} objOfTasks.title
 * @param {string} objOfTasks.body
 *
 * @return {HTMLLIElement} li
 */

export function listItemTemplate({ _id, title, body }) {
  const li = document.createElement("li");
  li.className = "task-item";
  li.setAttribute("data-task-id", _id);

  const h2 = document.createElement("h2");
  h2.className = "task-title";
  h2.textContent = title;

  const p = document.createElement("p");
  p.className = "task-body";
  p.textContent = body;

  const button = document.createElement("button");
  button.className = "task-delete-btn";
  button.textContent = "Delete";

  li.appendChild(h2);
  li.appendChild(p);
  li.appendChild(button);

  return li;
}
