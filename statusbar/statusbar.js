import tag from '../tag';

export const setStatusbarContent = (content) => {
  document.querySelector('.statusbar').textContent = content;
};

export const statusbar = (target) => {
  const node = tag('div', { class: 'statusbar' });

  target.append(node);
};
