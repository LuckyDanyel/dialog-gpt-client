import { createApp } from 'vue'
import './assets/global.scss'
import App from './App.vue'


const buildId = import.meta.env.BUILD_ID;
const styleId = import.meta.env.STYLE_ID;
const isDev = import.meta.env.DEV;

const getStyles = () => {
    return document.querySelector(`#${styleId}`)?.cloneNode(true);
};

const removeStyles = () => {
    document.querySelector(`#${styleId}`)?.remove();
};

const createWidget = (styles: Node | undefined) => {
    const app = document.createElement('div');
    const root = getRoot();
    root.appendChild(app);
    if(styles) {
        root.appendChild(styles)
    }
    document.querySelector('body')?.appendChild(root);
    createApp(App).mount(app);   
};

const getRoot = () => {
    const root = document.createElement('div');
    root.setAttribute('id', `app-${buildId}`);

    return isDev ? root : root.attachShadow({ mode: 'closed' });
};

try {
    const styles = getStyles();
    createWidget(styles);
    removeStyles();
} catch (error) {
    console.log(error);
}