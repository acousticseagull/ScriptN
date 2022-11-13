import tag from '../tag';

export const toolbar = (target) => {
  target.append(
    tag('div', { class: 'toolbar' }, [
      tag('button', 'Save'),
      tag('div', { class: 'title', contenteditable: true }, 'Untitled'),
      tag('button', 'Load'),
    ])
  );
};
