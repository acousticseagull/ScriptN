import tag from '../tag';
import { setCursor, remove } from '../utilities/';
import { toolbox } from '../toolbox';
import { createDialog } from './dialog';
import { createParenthetical } from './parenthetical';
import { createScene } from './scene';
import { createAction } from './action';

export const createCharacter = (content = '') => {
  const { div } = tag;
  return div(
    {
      class: 'character',
      contenteditable: true,
      onkeydown: (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();

          if (e.ctrlKey) {
            const node = createScene();
            e.target.parentElement.insertAdjacentElement('afterend', node);
            setCursor(node.querySelector('.heading'));
            return;
          }

          if (e.altKey) {
            const node = createParenthetical();
            e.target.insertAdjacentElement('afterend', node);
            setCursor(node);
            return;
          }

          let node;
          if (e.target.innerText === '') node = createAction();
          else node = createDialog();
          e.target.insertAdjacentElement('afterend', node);
          if (e.target.innerText === '') e.target.remove();
          setCursor(node);
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
