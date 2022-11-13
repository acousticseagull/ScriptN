import tag from '../tag';

const save = () => {
  const script = Array.from(document.querySelectorAll('.scene')).map(
    (scene) => ({
      heading: scene.querySelector('.heading').innerText,
      blocks: Array.from(
        document.querySelectorAll('.action, .character, .dialog')
      ).map(({ className, innerText }) => ({
        type: className,
        content: innerText,
      })),
    })
  );

  localStorage.setItem('script', script);
};

const load = () => {};

export const toolbar = (target) => {
  target.append(
    tag('div', { class: 'toolbar' }, [
      tag('button', { onclick: save }, 'Save'),
      tag('div', { class: 'title', contenteditable: true }, 'Untitled'),
      tag('button', 'Load'),
    ])
  );
};
