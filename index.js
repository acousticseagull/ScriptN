import './style.css';
import { createScene } from './create';
import { toolbar } from './toolbar';

const app = document.getElementById('app');

toolbar(app);

let scene = createScene();
app.append(scene);
