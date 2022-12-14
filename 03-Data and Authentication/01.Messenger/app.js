function attachEvents() {
    let sendButton = document.getElementById('submit');
    let refreshButton = document.getElementById('refresh');
    let messagesArea = document.getElementById('messages');

    const url = 'http://localhost:3030/jsonstore/messenger';

    sendButton.addEventListener('click', async () => {
        let author = document.querySelector('[name="author"]');
        let message = document.querySelector('[name="content"]');

        let data = {};

        data['author'] = author.value;
        data['content'] = message.value;

        author.value = '';
        message.value = '';

        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(data),
        })});

    refreshButton.addEventListener('click', async () => {
        const response = await fetch(url);
        const messages = await response.json();

        // console.log(Array.of(messages));
        // console.log(messages);
        // console.log(Object.values(messages));
        // console.log(Object.values(messages)[0].author);
        // console.log(Object.values(messages)[0].content);



        let messageArray = []

        for (const message of Object.values(messages)) {
            messageArray.push(`${message.author}: ${message.content}`);
        }

        messagesArea.textContent = messageArray.join('\n');
    });
}

attachEvents();