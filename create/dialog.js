import tag from '../tag';
import { setCursor, remove } from '../utilities/';
import { toolbox } from '../toolbox';
import { createCharacter } from './character';
import { createAction } from './action';
import { createScene } from './scene';

export const createDialog = (content = '') => {
  return tag(
    'div',
    {
      class: 'dialog',
      contenteditable: true,
      onkeydown: (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();

          if (e.ctrlKey) {
            const tag = createScene();
            e.target.parentElement.insertAdjacentElement('afterend', tag);
            setCursor(tag.querySelector('.heading'));
            return;
          }

          let tag;
          if (e.target.innerText === '') tag = createAction();
          else tag = createCharacter();
          e.target.insertAdjacentElement('afterend', tag);
          if (e.target.innerText === '') e.target.remove();
          setCursor(tag);
        }

        if (e.key === 'Backspace' && e.target.innerText === '') {
          e.preventDefault();
          remove(e.target);
        }
      },
      onfocus: (e) => {
        toolbox(e.target);
      },
    },
    content
  );
};
