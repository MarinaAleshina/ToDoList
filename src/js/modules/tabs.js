/**
 *Function showTabContent. Show tab content
 * @param {Attr} attrBtn
 */
export function showTabContent(attr) {
  const tasksItem = document.querySelectorAll(".task-item");

  tasksItem.forEach(el => {
    const btnChild = el.lastElementChild;
    const attrIsBtn = btnChild.dataset.complited;

    if (attr === "all" && attrIsBtn === "unDone") {
      el.classList.remove("js-hidden");
    }
    if (attr === "completed" && attrIsBtn !== "done") {
      el.classList.add("js-hidden");
    }
  });
}
