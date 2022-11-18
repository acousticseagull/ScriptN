import tag from '../tag';
import { setCursor, remove } from '../utilities/';
import { toolbox } from '../toolbox';
import { createScene } from './scene';
import { createDialog } from './dialog';

export const createParenthetical = (content = '') => {
  return tag(
    'div',
    {
      class: 'parenthetical',
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
          if (e.target.innerText === '') tag = createDialog();
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
