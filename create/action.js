import tag from '../tag';
import { setCursor, remove } from '../utilities/';
import { toolbox } from '../toolbox';
import { createCharacter } from './character';

function onKeydown(e) {
  if (e.key === 'Enter') {
    e.preventDefault();

    if (e.ctrlKey) {
      const tag = createScene();
      e.target.parentElement.insertAdjacentElement('afterend', tag);
      setCursor(tag.querySelector('.heading'));
      return;
    }

    let tag;
    if (e.target.innerText === '') tag = createCharacter();
    else tag = createAction();
    e.target.insertAdjacentElement('afterend', tag);
    if (e.target.innerText === '') e.target.remove();
    setCursor(tag);
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
  return tag(
    'div',
    {
      class: 'action',
      contenteditable: true,
      onkeydown: onKeydown,
      onfocus: onFocus,
    },
    content
  );
};
