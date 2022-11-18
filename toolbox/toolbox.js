import tag from '../tag';
import {
  createScene,
  createAction,
  createCharacter,
  createDialog,
  createParenthetical,
} from '../create';
import { remove, setCursor } from '../utilities';

export const toolbox = (target, collapsed = true) => {
  const create = {};
  const button = {};

  button.action = tag(
    'button',
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
      },
      onmousedown: (e) => {
        e.preventDefault();
      },
    },
    `Action`
  );

  button.character = tag(
    'button',
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
      },
      onmousedown: (e) => {
        e.preventDefault();
      },
    },
    `Character`
  );

  button.dialog = tag(
    'button',
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
      },
      onmousedown: (e) => {
        e.preventDefault();
      },
    },
    `Dialog`
  );

  button.delete = tag(
    'button',
    {
      class: 'delete',
      disabled:
        target.classList.contains('heading') &&
        document.querySelectorAll('.scene').length === 1,
      onclick: (e) => {
        if (target.classList.contains('heading')) remove(target.parentElement);
        else remove(target);
      },
      onmousedown: (e) => {
        e.preventDefault();
      },
    },
    `DELETE`
  );

  create.action = [
    tag('div', { class: 'title' }, 'CREATE ACTION'),
    tag('div', { class: 'button-group' }, [
      tag(
        'button',
        {
          disabled: target.classList.contains('heading'),
          onclick: (e) => {
            const tag = createAction();
            target.insertAdjacentElement('beforebegin', tag);
            setCursor(tag);
          },
          onmousedown: (e) => {
            e.preventDefault();
          },
        },
        `ABOVE`
      ),
      tag(
        'button',
        {
          onclick: (e) => {
            const tag = createAction();
            target.insertAdjacentElement('afterend', tag);
            setCursor(tag);
          },
          onmousedown: (e) => {
            e.preventDefault();
          },
        },
        `BELOW`
      ),
    ]),
  ];

  create.character = [
    tag('div', { class: 'title' }, 'CREATE CHARACTER'),
    tag('div', { class: 'button-group' }, [
      tag(
        'button',
        {
          disabled: target.classList.contains('heading'),
          onclick: (e) => {
            const tag = createCharacter();
            target.insertAdjacentElement('beforebegin', tag);
            setCursor(tag);
          },
          onmousedown: (e) => {
            e.preventDefault();
          },
        },
        `ABOVE`
      ),
      tag(
        'button',
        {
          onclick: (e) => {
            const tag = createCharacter();
            target.insertAdjacentElement('afterend', tag);
            setCursor(tag);
          },
          onmousedown: (e) => {
            e.preventDefault();
          },
        },
        `AFTER`
      ),
    ]),
  ];

  create.dialog = [
    tag('div', { class: 'title' }, 'CREATE DIALOG'),
    tag('div', { class: 'button-group' }, [
      tag(
        'button',
        {
          disabled: target.classList.contains('heading'),
          onclick: (e) => {
            const tag = createDialog();
            target.insertAdjacentElement('beforebegin', tag);
            setCursor(tag);
          },
          onmousedown: (e) => {
            e.preventDefault();
          },
        },
        `ABOVE`
      ),
      tag(
        'button',
        {
          onclick: (e) => {
            const tag = createDialog();
            target.insertAdjacentElement('afterend', tag);
            setCursor(tag);
          },
          onmousedown: (e) => {
            e.preventDefault();
          },
        },
        `BELOW`
      ),
    ]),
  ];

  create.parenthetical = [
    tag('div', { class: 'title' }, 'CREATE PARENTHETICAL'),
    tag(
      'button',
      {
        disabled:
          target.classList.contains('heading') ||
          !target.classList.contains('character'),
        onclick: (e) => {
          const tag = createParenthetical();
          target.insertAdjacentElement('afterend', tag);
          setCursor(tag);
        },
        onmousedown: (e) => {
          e.preventDefault();
        },
      },
      `BELOW`
    ),
  ];

  create.scene = [
    tag('div', { class: 'title' }, 'CREATE SCENE'),
    tag('div', { class: 'button-group' }, [
      tag(
        'button',
        {
          onclick: (e) => {
            const tag = createScene();
            target.parentElement.insertAdjacentElement('beforebegin', tag);
            setCursor(tag.querySelector('.heading'));
          },
          onmousedown: (e) => {
            e.preventDefault();
          },
        },
        `ABOVE`
      ),
      tag(
        'button',
        {
          onclick: (e) => {
            const tag = createScene();
            target.parentElement.insertAdjacentElement('afterend', tag);
            setCursor(tag.querySelector('.heading'));
          },
          onmousedown: (e) => {
            e.preventDefault();
          },
        },
        `BELOW`
      ),
    ]),
  ];

  const menu = [
    tag('div', { class: 'title' }, 'CHANGE BLOCK'),
    button.action,
    button.character,
    button.dialog,
    button.delete,
    ...create.action,
    ...create.character,
    ...create.parenthetical,
    ...create.dialog,
    ...create.scene,
  ];

  const node = tag(
    'div',
    {
      class: `toolbox ${collapsed ? 'collapsed' : ''}`,
      style: `
        top: ${target.offsetTop}px;
        left: ${target.offsetLeft - 26}px;
      `,
    },
    collapsed
      ? tag(
          'button',
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
      : tag(
          'button',
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
    !collapsed && menu
  );

  document.querySelector('.toolbox')?.remove();

  const removeNode = (e) => {
    node.remove();
    e.target.removeEventListener('blur', removeNode);
  };

  target.addEventListener('blur', removeNode);

  target.parentElement.append(node);
};
