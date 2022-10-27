export const setCursor = (target) => {
  target.focus();
  window.getSelection().selectAllChildren(target);
  window.getSelection().collapseToEnd();
};

export const remove = (target) => {
  if (target.previousElementSibling) setCursor(target.previousElementSibling);
  target.remove();
};