
console.log('requset')
window.addEventListener('message', (event) => {
    console.log(event);
    const { id, message } = event.data;
    console.log('Сообщение', message);

    setTimeout(() => {
        window.parent.postMessage({ id, message }, '*');
    }, 1000);
});