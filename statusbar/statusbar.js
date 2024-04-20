import tag from '../tag';

export const setStatusbarContent = (content) => {
  document.querySelector('.statusbar').textContent = content;
};

export function statusbar() {
  return tag('div', { class: 'statusbar' });
}
