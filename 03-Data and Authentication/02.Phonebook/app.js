function attachEvents() {
    const url = 'http://localhost:3030/jsonstore/phonebook';
    let loadButton = document.getElementById('btnLoad');
    let ul = document.getElementById('phonebook');

    loadButton.addEventListener('click', async () =>{
        const response = await fetch(url);
        const phonebook = await response.json();
        ul.innerHTML = '';

        // console.log(Object.values(phonebook));

        let phonebookArray = [];

        for (const phonebookEntry of Object.values(phonebook)) {
            const li = document.createElement('li');
            const button = document.createElement('button');

            button.textContent = 'Delete';

            li.textContent = `${phonebookEntry.person}: ${phonebookEntry.phone}`;
            li.appendChild(button);

            ul.appendChild(li);

            button.addEventListener('click', async (e) => {
                const deleteUrl = `http://localhost:3030/jsonstore/phonebook/${phonebookEntry._id}`;
                const response = await fetch(deleteUrl, {method: 'DELETE'});

                // e.target.parentNode.remove();

                loadButton.click();
            })
        }
    });

    const createButton = document.getElementById('btnCreate');
    let personField = document.getElementById('person');
    let phoneField = document.getElementById('phone');

    createButton.addEventListener('click', async () => {
        const person = personField.value;
        const phone = phoneField.value;

        if (person && phone){
            const data = {
                person,
                phone,
            };

            personField.value = '';
            phoneField.value = '';

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            loadButton.click();
        }
    });
}

attachEvents();