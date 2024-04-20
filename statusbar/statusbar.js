import tag from '../tag';

export const setStatusbarContent = (content) => {
  document.querySelector('.statusbar').textContent = content;
};

export function statusbar() {
  const { div } = tag;
  return div({ class: 'statusbar' });
}
