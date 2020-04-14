/**
 * Function onComplitedTask. Sets an attribute when a button is clicked
 *
 * @param {HTMLElement} target
 */

export function onComplitedTask(target) {
  let attrIsDone = target.dataset.complited;

  const parent = target.parentElement;

  if (attrIsDone === "done") {
    target.setAttribute("data-complited", "unDone");
    target.textContent = "Done";
    parent.classList.add("js-complited");
    parent.remove();
  } else {
    target.setAttribute("data-complited", "done");
    target.textContent = "UnDone";
    parent.classList.remove("js-complited");
  }
}
