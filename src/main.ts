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
    root?.appendChild(app);
    if(styles) {
        root?.appendChild(styles)
    }
    createApp(App).mount(app);   
};

const getRoot = () => {
    const root = document.createElement('div');
    if(!isDev) {
        root.attachShadow({ 'mode': 'open' }).innerHTML = `
            <div id="${ROOT_APP_ID}"> </div>
        `;
    } else {
        root.setAttribute('id', ROOT_APP_ID);
    }
    document.querySelector('body')?.appendChild(root);
    return isDev ? root : root.shadowRoot?.querySelector(`#${ROOT_APP_ID}`);
};

try {
    const styles = getStyles();
    createWidget(styles);
} catch (error) {
    console.log(error);
}