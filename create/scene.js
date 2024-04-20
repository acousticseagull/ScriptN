import tag from '../tag';
import { createAction } from './action';
import { setCursor } from '../utilities/';
import { toolbox } from '../toolbox';

function onKeydown(e) {
  if (e.key === 'Enter') {
    e.preventDefault();

    if (e.ctrlKey) {
      const node = createScene();
      e.target.parentElement.insertAdjacentElement('afterend', node);
      toolbox(node);
      setCursor(node.querySelector('.heading'));
      return;
    }

    if (e.target.innerText !== '') {
      let node = createAction();
      e.target.insertAdjacentElement('afterend', node);
      setCursor(node);
    }
  }

  if (e.key === 'Backspace' && e.target.innerText === '') {
    e.preventDefault();
    const parent = e.target.parentElement;
    if (
      parent.parentElement.children.length > 1 &&
      parent.children.length === 1
    ) {
      if (parent.previousElementSibling)
        setCursor(parent.previousElementSibling.lastChild);
      parent.remove();
    }
  }
}

export const createScene = (content = '') => {
  const { div } = tag;
  return div(
    {
      class: 'scene',
    },
    div(
      {
        class: 'heading',
        contenteditable: true,
        onkeydown: onKeydown,
        onfocus: (e) => {
          toolbox(e.target);
        },
      },
      content
    )
  );
};
