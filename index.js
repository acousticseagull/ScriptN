import './style.css';
import { createScene } from './create';
import { toolbar, save } from './toolbar';

const app = document.getElementById('app');

toolbar(app);

let scene = createScene();
app.append(scene);

let timeout;
document.addEventListener('keydown', () => {
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => save(), 5000);
});
