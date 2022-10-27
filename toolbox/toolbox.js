import tag from '../tag';
import { createScene } from '../create';
import { remove, setCursor } from '../utilities';

export const toolbox = (target) => {
  const button = {};

  button.action = tag(
    'button',
    {
      disabled: target.classList.contains('action'),
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
      disabled: target.classList.contains('character'),
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
      disabled: target.classList.contains('dialog'),
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
      onclick: (e) => {
        remove(target);
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
          target.insertAdjacentElement('beforebegin', tag);
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
          target.insertAdjacentElement('afterend', tag);
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
      class: 'toolbox',
      style: `
        top: ${target.offsetTop}px;
        left: ${target.offsetLeft - 110}px;
      `,
    },
    menu
  );

  target.parentElement.append(node);

  const removeNode = (e) => {
    node.remove();
    e.target.removeEventListener('blur', removeNode);
  };

  target.addEventListener('blur', removeNode);
};
