import tag from '../tag';
import {
  createScene,
  createAction,
  createCharacter,
  createParenthetical,
  createDialog,
} from '../create';
import { setCursor, setTitle } from '../utilities';

let fileHandle;

export const save = async () => {
  const script = JSON.stringify({
    content: Array.from(document.querySelectorAll('.scene')).map((scene) => ({
      heading: scene.querySelector('.heading').textContent,
      blocks: Array.from(
        document.querySelectorAll(
          '.action, .character, .parenthetical, .dialog'
        )
      ).map(({ className, textContent }) => ({
        type: className,
        content: textContent,
      })),
    })),
  });

  const options = {
    types: [
      {
        accept: {
          'text/plain': ['.json'],
        },
      },
    ],
  };

  if (!fileHandle) fileHandle = await window.showSaveFilePicker(options);
  const file = await fileHandle.getFile();

  setTitle(file.name);

  const writable = await fileHandle.createWritable();
  await writable.write(script);
  await writable.close();
};

export const load = async (target) => {
  const options = {
    types: [
      {
        accept: {
          'text/plain': '.json',
        },
      },
    ],
    excludeAcceptAllOption: true,
  };

  [fileHandle] = await window.showOpenFilePicker(options);

  const file = await fileHandle.getFile();
  const content = await file.text();

  const script = JSON.parse(content);

  if (!script) return;

  document.querySelectorAll('.scene').forEach((item) => item.remove());

  setTitle(file.name);

  script.content.forEach(({ heading, blocks }) => {
    const scene = createScene(heading);

    if (blocks.length)
      scene.append(
        ...blocks.map(({ type, content }) => {
          if (type === 'action') return createAction(content);
          if (type === 'character') return createCharacter(content);
          if (type === 'parenthetical') return createParenthetical(content);
          if (type === 'dialog') return createDialog(content);
        })
      );

    target.append(scene);
  });
};

const print = () => window.print();

export const toolbar = (target) => {
  target.append(
    tag(
      'div',
      { class: 'toolbar' },
      tag('div', tag('button', { class: 'save', onclick: save }, 'Save')),
      tag('div', tag('button', { class: 'print', onclick: print }, 'Print')),
      tag('div', { class: 'title', contenteditable: false }, 'Untitled'),
      tag(
        'div',
        tag('button', { onclick: () => load(target) }, 'Load'),
        tag(
          'button',
          {
            class: 'new',
            onclick: () => {
              fileHandle = null;
              target
                .querySelectorAll('.scene')
                .forEach((item) => item.remove());
              const tag = createScene();
              document.querySelector('.title').textContent = 'Untitled';
              target.append(tag);
              setCursor(tag.querySelector('.heading'));
            },
          },
          'New'
        )
      )
    )
  );
};
