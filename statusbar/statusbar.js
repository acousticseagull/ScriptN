import tag from '../tag';

export const setStatusbarContent = (content) => {
  document.querySelector('.statusbar').textContent = content;
};

export function statusbar(target) {
  return tag('div', { class: 'statusbar' });
}
