import './style.css';
import {
  createScene,
  createCharacter,
  createParenthetical,
  createDialog,
} from './create';
import { toolbar, save } from './toolbar';

const app = document.getElementById('app');

toolbar(app);

let scene = createScene('INT. Day');

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

app.append(scene);

document.querySelector('.toolbar .title').textContent =
  'The Sermon on the Mount';

let timeout;
document.addEventListener('keydown', () => {
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => save(), 5000);
});

window.addEventListener('resize', () => {
  document.querySelector(':focus')?.blur();
});
