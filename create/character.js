import tag from '../tag';
import { setCursor, remove } from '../utilities/';
import { toolbox } from '../toolbox';
import { createDialog } from './dialog';
import { createScene } from './scene';
import { createAction } from './action';

export const createCharacter = (content = '') => {
  return tag(
    'div',
    {
      class: 'character',
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
          else tag = createDialog();
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
