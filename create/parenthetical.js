import tag from '../tag';
import { setCursor, remove } from '../utilities/';
import { toolbox } from '../toolbox';
import { createScene } from './scene';
import { createDialog } from './dialog';

export const createParenthetical = (content = '') => {
  const { div } = tag;
  return div(
    {
      class: 'parenthetical',
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

          let node;
          if (e.target.innerText === '') node = createDialog();
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
