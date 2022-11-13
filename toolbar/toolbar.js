import tag from '../tag';
import {
  createScene,
  createAction,
  createCharacter,
  createDialog,
} from '../create';

export const save = () => {
  const script = JSON.stringify({
    title: document.querySelector('.title').textContent,
    content: Array.from(document.querySelectorAll('.scene')).map((scene) => ({
      heading: scene.querySelector('.heading').textContent,
      blocks: Array.from(
        document.querySelectorAll('.action, .character, .dialog')
      ).map(({ className, textContent }) => ({
        type: className,
        content: textContent,
      })),
    })),
  });
  localStorage.setItem('script', script);
};

const load = (target) => {
  const script = JSON.parse(localStorage.getItem('script'));

  if (!script) return;

  document.querySelectorAll('.scene').forEach((item) => item.remove());

  document.querySelector('.toolbar > .title').textContent = script.title;

  script.content.forEach(({ heading, blocks }) => {
    const scene = createScene(heading);

    if (blocks.length)
      scene.append(
        ...blocks.map(({ type, content }) => {
          if (type === 'action') return createAction(content);
          if (type === 'character') return createCharacter(content);
          if (type === 'dialog') return createDialog(content);
        })
      );

    target.append(scene);
  });
};

export const toolbar = (target) => {
  target.append(
    tag('div', { class: 'toolbar' }, [
      tag('button', { onclick: save }, 'Save'),
      tag('div', { class: 'title', contenteditable: true }, 'Untitled'),
      tag('button', { onclick: () => load(target) }, 'Load'),
    ])
  );
};
