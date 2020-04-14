export function createModal() {
  const divModal = document.createElement("div");
  divModal.className = "modal-window";

  const divContainer = document.createElement("div");
  divContainer.className = "container";

  const btnOk = document.createElement("button");
  btnOk.setAttribute("data-is-delete", "delete");
  btnOk.className = "btn-delete-task";
  btnOk.textContent = "Ok";

  const btnCancel = document.createElement("button");
  btnCancel.setAttribute("data-is-cancel", "delete");
  btnCancel.className = "cancel-del-task";
  btnCancel.textContent = "Cancel";

  divModal.appendChild(divContainer);
  divContainer.appendChild(btnOk);
  divContainer.appendChild(btnCancel);

  return divModal;
}
