import tag from '../tag';
import { setCursor, remove } from '../utilities/';
import { toolbox } from '../toolbox';
import { createCharacter } from './character';
import { createScene } from './scene';

function onKeydown(e) {
  if (e.key === 'Enter') {
    e.preventDefault();

    if (e.ctrlKey) {
      const node = createScene();
      e.target.parentElement.insertAdjacentElement('afterend', node);
      setCursor(node.querySelector('.heading'));
      return;
    }

    let node;
    if (e.target.innerText === '') node = createCharacter();
    else node = createAction();
    e.target.insertAdjacentElement('afterend', node);
    if (e.target.innerText === '') e.target.remove();
    setCursor(node);
  }

  if (e.key === 'Backspace' && e.target.innerText === '') {
    e.preventDefault();
    remove(e.target);
  }
}

function onFocus(e) {
  toolbox(e.target);
}

export const createAction = (content = '') => {
  const { div } = tag;
  return div(
    {
      class: 'action',
      contenteditable: true,
      onkeydown: onKeydown,
      onfocus: onFocus,
    },
    content
  );
};
