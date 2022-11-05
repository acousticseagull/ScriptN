import tag from '../tag';
import { createScene } from '../create';
import { remove, setCursor } from '../utilities';

export const toolbox = (target, collapsed = true) => {
  const button = {};

  button.action = tag(
    'button',
    {
      disabled:
        target.classList.contains('action') ||
        target.classList.contains('heading'),
      onclick: (e) => {
        target.className = 'action';
        e.target.parentElement.style.top = `${target.offsetTop}px`;
        e.target.parentElement.style.left = `${target.offsetLeft - 110}px`;
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
        target.className = 'character';
        e.target.parentElement.style.top = `${target.offsetTop}px`;
        e.target.parentElement.style.left = `${target.offsetLeft - 110}px`;
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
        target.className = 'dialog';
        e.target.parentElement.style.top = `${target.offsetTop}px`;
        e.target.parentElement.style.left = `${target.offsetLeft - 110}px`;
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

  const menu = [
    tag('div', { class: 'title' }, 'CHANGE BLOCK'),
    button.action,
    button.character,
    button.dialog,
    button.delete,
    tag('div', { class: 'title' }, 'CREATE SCENE'),
    tag(
      'button',
      {
        onclick: (e) => {
          const tag = createScene();
          target.parentElement.insertAdjacentElement('beforebegin', tag);
          toolbox(tag);
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
          toolbox(tag);
          setCursor(tag.querySelector('.heading'));
        },
        onmousedown: (e) => {
          e.preventDefault();
        },
      },
      `BELOW`
    ),
  ];

  const node = tag(
    'div',
    {
      class: `toolbox ${collapsed ? 'collapsed' : ''}`,
      style: `
        top: ${target.offsetTop}px;
        left: ${target.offsetLeft - 110}px;
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
