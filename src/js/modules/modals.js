import { createModal } from "../helpers/createModal";

export function onModal(target) {
  const li = target.closest("[data-task-id]");
  const divModal = createModal();

  li.appendChild(divModal);

  return divModal;
}
