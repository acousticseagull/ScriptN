import tag from '../tag';
import { createAction } from './action';
import { setCursor } from '../utilities/';
import { toolbox } from '../toolbox';

function onKeydown(e) {
  if (e.key === 'Enter') {
    e.preventDefault();

    if (e.ctrlKey) {
      const tag = createScene();
      e.target.parentElement.insertAdjacentElement('afterend', tag);
      toolbox(tag);
      setCursor(tag.querySelector('.heading'));
      return;
    }

    if (e.target.innerText !== '') {
      let tag = createAction();
      e.target.insertAdjacentElement('afterend', tag);
      setCursor(tag);
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
  return tag(
    'div',
    {
      class: 'scene',
    },
    [
      tag(
        'div',
        {
          class: 'heading',
          contenteditable: true,
          onkeydown: onKeydown,
          onfocus: (e) => {
            toolbox(e.target);
          },
        },
        content
      ),
    ]
  );
};
