/**
 * Function listItemTemplate. create template
 * @param {object} objOfTasks
 * @param {string} objOfTasks._id
 * @param {string} objOfTasks.title
 * @param {string} objOfTasks.body
 * @param {Boolean} complited
 *
 * @return {HTMLLIElement} li
 */

export function listItemTemplate({ _id, title, complited, body }) {
  const li = document.createElement("li");
  li.className = "task-item";
  li.setAttribute("data-task-id", _id);

  const h2 = document.createElement("h2");
  h2.className = "task-title";
  h2.textContent = title;

  const p = document.createElement("p");
  p.className = "task-body";
  p.textContent = body;

  const btnDel = document.createElement("button");
  btnDel.className = "task-delete-btn";
  btnDel.textContent = "Delete";

  const btnDone = document.createElement("button");
  btnDone.className = "task-complited";

  if (complited) {
    btnDone.setAttribute("data-complited", "done");
    btnDone.textContent = "UnDone";
    li.classList.add("js-complited");
  } else {
    btnDone.setAttribute("data-complited", "unDone");
    btnDone.textContent = "Done";
  }

  li.appendChild(h2);
  li.appendChild(p);
  li.appendChild(btnDel);
  li.appendChild(btnDone);

  return li;
}
