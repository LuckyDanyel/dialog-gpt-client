import { createApp } from 'vue';
import App from './App.vue';
import './assets/fonts.scss';
import './assets/global.scss';


const ROOT_APP_ID = import.meta.env.ROOT_APP_ID;
const stylesId = import.meta.env.HEAD_STYLES_ID;
const isDev = import.meta.env.DEV;

const getStyles = () => {
    return document.querySelector(`#${stylesId}`)?.cloneNode(true);
};

const removeStyles = () => {
    document.querySelector(`#${stylesId}`)?.remove();
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
    root.setAttribute('id', `${ROOT_APP_ID}`);

    return isDev ? root : root.attachShadow({ mode: 'closed' });
};

try {
    const styles = getStyles();
    createWidget(styles);
    removeStyles();
} catch (error) {
    console.log(error);
}