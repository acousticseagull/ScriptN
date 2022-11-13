import tag from '../tag';

const save = () => {
  localStorage.setItem('script', JSON.stringify({
    title: document.querySelector('.title').innerText,
    content: Array.from(document.querySelectorAll('.scene')).map((scene) => ({
      heading: scene.querySelector('.heading').innerText,
      blocks: Array.from(
        document.querySelectorAll('.action, .character, .dialog')
      ).map(({ className, innerText }) => ({
        type: className,
        content: innerText,
      })),
    })),
  }));
};

const load = () => {
  const script = JSON.parse(localStorage.getItem('script'));
  document.querySelector('.toolbar .title').innerText = script.title;

  document.querySelectorAll('.scene').forEach(item => item.remove());

  script.content.forEach(scene => {

  })
};

export const toolbar = (target) => {
  target.append(
    tag('div', { class: 'toolbar' }, [
      tag('button', { onclick: save }, 'Save'),
      tag('div', { class: 'title', contenteditable: true }, 'Untitled'),
      tag('button', 'Load'),
    ])
  );
};
