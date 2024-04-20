import tag from '../tag';
import {
  createScene,
  createAction,
  createCharacter,
  createParenthetical,
  createDialog,
} from '../create';
import { setCursor } from '../utilities';
import { setStatusbarContent } from '../statusbar';

let fileHandle;

export const save = async (_, saveAs) => {
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

  if (!fileHandle || saveAs)
    fileHandle = await window.showSaveFilePicker(options);
  const file = await fileHandle.getFile();

  setTitleContent(file.name);

  setStatusbarContent(`Saving...`);

  const writable = await fileHandle.createWritable();
  await writable.write(script);
  await writable.close();

  setStatusbarContent(
    `Last saved at ${file.lastModifiedDate.toLocaleTimeString()}`
  );
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

  setStatusbarContent('');

  document.querySelectorAll('.scene').forEach((item) => item.remove());

  setTitleContent(file.name);

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

export const setTitleContent = (title) => {
  document.querySelector('.toolbar > .title').textContent = title.replace(
    '.json',
    ''
  );
};

export function toolbar(target) {
  const { div, button } = tag;
  return div(
    { class: 'toolbar' },
    div(
      button({ class: 'save', onclick: save }, 'Save'),
      button({ onclick: () => save(null, true) }, 'Save as...'),
      button({ class: 'print', onclick: print }, 'Print')
    ),
    div({ class: 'title', contenteditable: false }, 'Untitled'),
    div(
      { class: 'text-align-right' },
      button({ onclick: () => load(target) }, 'Load'),
      button(
        {
          class: 'new',
          onclick: () => {
            fileHandle = null;
            target.querySelectorAll('.scene').forEach((item) => item.remove());
            const node = createScene();
            document.querySelector('.title').textContent = 'Untitled';
            target.append(node);
            setCursor(node.querySelector('.heading'));
          },
        },
        'New'
      )
    )
  );
}
