import tag from '../tag';
import {
  createScene,
  createAction,
  createCharacter,
  createDialog,
  createParenthetical,
} from '../create';
import { remove, setCursor } from '../utilities';
import { save } from '../toolbar';

export const toolbox = (target, collapsed = true) => {
  const { div, button } = tag;

  const create = {};
  const buttons = {};

  // change block to action
  buttons.action = button(
    {
      disabled:
        target.classList.contains('action') ||
        target.classList.contains('heading'),
      onclick: (e) => {
        const node = createAction(target.textContent);
        target.insertAdjacentElement('beforebegin', node);
        target.remove();
        setCursor(node);
        Array.from(e.target.parentElement.children).forEach(
          (item) => (item.disabled = false)
        );
        e.target.disabled = target.classList.contains('action');
        save();
      },
      onmousedown: (e) => {
        e.preventDefault();
      },
    },
    `Action`
  );

  // change block to character
  buttons.character = button(
    {
      disabled:
        target.classList.contains('character') ||
        target.classList.contains('heading'),
      onclick: (e) => {
        const node = createCharacter(target.textContent);
        target.insertAdjacentElement('beforebegin', node);
        target.remove();
        setCursor(node);
        Array.from(e.target.parentElement.children).forEach(
          (item) => (item.disabled = false)
        );
        e.target.disabled = target.classList.contains('character');
        save();
      },
      onmousedown: (e) => {
        e.preventDefault();
      },
    },
    `Character`
  );

  // change block to dialog
  buttons.dialog = button(
    {
      disabled:
        target.classList.contains('dialog') ||
        target.classList.contains('heading'),
      onclick: (e) => {
        const node = createDialog(target.textContent);
        target.insertAdjacentElement('beforebegin', node);
        target.remove();
        setCursor(node);
        Array.from(e.target.parentElement.children).forEach(
          (item) => (item.disabled = false)
        );
        e.target.disabled = target.classList.contains('dialog');
        save();
      },
      onmousedown: (e) => {
        e.preventDefault();
      },
    },
    `Dialog`
  );

  // change block to parenthetical
  buttons.parenthetical = button(
    {
      disabled:
        target.classList.contains('parenthetical') ||
        target.classList.contains('heading'),
      onclick: (e) => {
        const node = createParenthetical(target.textContent);
        target.insertAdjacentElement('beforebegin', node);
        target.remove();
        setCursor(node);
        Array.from(e.target.parentElement.children).forEach(
          (item) => (item.disabled = false)
        );
        e.target.disabled = target.classList.contains('parenthetical');
        save();
      },
      onmousedown: (e) => {
        e.preventDefault();
      },
    },
    `Parenthetical`
  );

  // delete block
  buttons.delete = button(
    {
      class: 'delete',
      disabled:
        target.classList.contains('heading') &&
        document.querySelectorAll('.scene').length === 1,
      onclick: (e) => {
        if (target.classList.contains('heading')) remove(target.parentElement);
        else remove(target);
        save();
      },
      onmousedown: (e) => {
        e.preventDefault();
      },
    },
    `DELETE`
  );

  create.action = [
    div({ class: 'title' }, 'CREATE ACTION'),
    div(
      { class: 'button-group' },
      button(
        {
          disabled: target.classList.contains('heading'),
          onclick: (e) => {
            const node = createAction();
            target.insertAdjacentElement('beforebegin', node);
            setCursor(node);
            save();
          },
          onmousedown: (e) => {
            e.preventDefault();
          },
        },
        `ABOVE`
      ),
      button(
        {
          onclick: (e) => {
            const node = createAction();
            target.insertAdjacentElement('afterend', node);
            setCursor(node);
            save();
          },
          onmousedown: (e) => {
            e.preventDefault();
          },
        },
        `BELOW`
      )
    ),
  ];

  create.character = [
    div({ class: 'title' }, 'CREATE CHARACTER'),
    div(
      { class: 'button-group' },
      button(
        {
          disabled: target.classList.contains('heading'),
          onclick: (e) => {
            const node = createCharacter();
            target.insertAdjacentElement('beforebegin', node);
            setCursor(node);
            save();
          },
          onmousedown: (e) => {
            e.preventDefault();
          },
        },
        `ABOVE`
      ),
      button(
        {
          onclick: (e) => {
            const node = createCharacter();
            target.insertAdjacentElement('afterend', node);
            setCursor(node);
            save();
          },
          onmousedown: (e) => {
            e.preventDefault();
          },
        },
        `BELOW`
      )
    ),
  ];

  create.dialog = [
    div({ class: 'title' }, 'CREATE DIALOG'),
    div(
      { class: 'button-group' },
      button(
        {
          disabled: target.classList.contains('heading'),
          onclick: (e) => {
            const node = createDialog();
            target.insertAdjacentElement('beforebegin', node);
            setCursor(node);
            save();
          },
          onmousedown: (e) => {
            e.preventDefault();
          },
        },
        `ABOVE`
      ),
      button(
        {
          onclick: (e) => {
            const node = createDialog();
            target.insertAdjacentElement('afterend', node);
            setCursor(node);
            save();
          },
          onmousedown: (e) => {
            e.preventDefault();
          },
        },
        `BELOW`
      )
    ),
  ];

  create.parenthetical = [
    div({ class: 'title' }, 'CREATE PARENTHETICAL'),
    button(
      {
        disabled:
          target.classList.contains('heading') ||
          !target.classList.contains('character'),
        onclick: (e) => {
          const tag = createParenthetical();
          target.insertAdjacentElement('afterend', tag);
          setCursor(tag);
          save();
        },
        onmousedown: (e) => {
          e.preventDefault();
        },
      },
      `BELOW`
    ),
  ];

  create.scene = [
    div({ class: 'title' }, 'CREATE SCENE'),
    div(
      { class: 'button-group' },
      button(
        {
          onclick: (e) => {
            const node = createScene();
            target.parentElement.insertAdjacentElement('beforebegin', node);
            setCursor(node.querySelector('.heading'));
            save();
          },
          onmousedown: (e) => {
            e.preventDefault();
          },
        },
        `ABOVE`
      ),
      button(
        {
          onclick: (e) => {
            const node = createScene();
            target.parentElement.insertAdjacentElement('afterend', node);
            setCursor(node.querySelector('.heading'));
            save();
          },
          onmousedown: (e) => {
            e.preventDefault();
          },
        },
        `BELOW`
      )
    ),
  ];

  const menu = [
    div({ class: 'title' }, 'CHANGE BLOCK'),
    buttons.action,
    buttons.character,
    buttons.parenthetical,
    buttons.dialog,
    buttons.delete,
    ...create.action,
    ...create.character,
    ...create.parenthetical,
    ...create.dialog,
    ...create.scene,
  ];

  const node = div(
    {
      class: `toolbox ${collapsed ? 'collapsed' : ''}`,
      style: `
        top: ${target.offsetTop}px;
        left: ${target.offsetLeft - 26}px;
      `,
    },
    collapsed
      ? button(
          {
            class: 'collapse',
            onclick: (e) => {
              toolbox(target, false);
            },
            onmousedown: (e) => {
              e.preventDefault();
            },
          },
          '+'
        )
      : button(
          {
            class: 'collapse',
            onclick: (e) => {
              toolbox(target, true);
            },
            onmousedown: (e) => {
              e.preventDefault();
            },
          },
          '-'
        ),
    ...(!collapsed ? menu : [])
  );

  document.querySelector('.toolbox')?.remove();

  const removeNode = (e) => {
    node.remove();
    e.target.removeEventListener('blur', removeNode);
  };

  target.addEventListener('blur', removeNode);

  target.parentElement.append(node);
};
