import tag from '../tag';
import {
  createScene,
  createAction,
  createCharacter,
  createParenthetical,
  createDialog,
} from '../create';
import { setCursor } from '../utilities';

export const save = () => {
  const script = JSON.stringify({
    title: document.querySelector('.title').textContent,
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
          if (type === 'parenthetical') return createParenthetical(content);
          if (type === 'dialog') return createDialog(content);
        })
      );

    target.append(scene);
  });
};

export const toolbar = (target) => {
  target.append(
    tag('div', { class: 'toolbar' }, [
      tag('div', [tag('button', { onclick: save }, 'Save')]),
      tag('div', { class: 'title', contenteditable: true }, 'Untitled'),
      tag('div', [
        tag('button', { onclick: () => load(target) }, 'Load'),
        tag(
          'button',
          {
            class: 'new',
            onclick: () => {
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
        ),
      ]),
    ])
  );
};
