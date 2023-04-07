export const setCursor = (target) => {
  target.focus();
  window.getSelection().selectAllChildren(target);
  window.getSelection().collapseToEnd();
};

export const remove = (target) => {
  if (target.previousElementSibling) setCursor(target.previousElementSibling);
  target.remove();
};

export const setTitle = (title) => {
  document.querySelector('.toolbar > .title').textContent = title.replace(
    '.json',
    ''
  );
};
