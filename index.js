import './style.css';
import {
  createScene,
  createCharacter,
  createParenthetical,
  createDialog,
} from './create';
import { toolbar, save, load } from './toolbar';
import { statusbar } from './statusbar';

const node = document.querySelector('#app');

node.append(toolbar(node));
node.append(statusbar());

const scene = createScene('');

scene.append(
  createCharacter('narrator'),
  createDialog(
    'Seeing the crowds, he went up on the mountain, and when he sat down, his disciples came to him. And he opened his mouth and taught them.'
  ),
  createCharacter('jesus'),
  createParenthetical('The Son of God'),
  createDialog(
    'Blessed are the poor in spirit, for theirs is the kingdom of heaven. Blessed are those who mourn, for they shall be comforted. Blessed are the meek, for they shall inherit the earth. Blessed are those who hunger and thirst for righteousness, for they shall be satisfied. Blessed are the merciful, for they shall receive mercy. Blessed are the pure in heart, for they shall see God. Blessed are the peacemakers, for they shall be called sons of God. Blessed are those who are persecuted for righteousness sake, for theirs is the kingdom of heaven. Blessed are you when others revile you and persecute you and utter all kinds of evil against you falsely on my account. Rejoice and be glad, for your reward is great in heaven, for so they persecuted the prophets who were before you.'
  )
);

node.append(scene);

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey) {
    if (e.key === 's') {
      e.preventDefault();
      save();
    }

    if (e.key === 'o') {
      e.preventDefault();
      load();
    }
  }
});

let timeout;
document.addEventListener('keydown', () => {
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => save(), 3000);
});

window.addEventListener('resize', () => {
  document.querySelector(':focus')?.blur();
});
