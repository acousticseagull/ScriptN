import './style.css';
import { createScene } from './create';
import { toolbox } from './toolbox';

const app = document.getElementById('app');

let scene = createScene();
app.append(scene);
