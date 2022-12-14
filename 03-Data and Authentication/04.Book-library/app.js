function action(){
    const url = 'http://localhost:3030/jsonstore/collections/books';
    let loadAllBtn = document.getElementById('loadBooks');
    let tbody = document.querySelector('table>tbody');

    let form = document.querySelector('form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        let formData = new FormData(form);

        let title = formData.get('title');
        let author = formData.get('author');

        if (title && author){
            if (form.getAttribute('id')){
                const putUrl = `${url}/${form.id}`;
                const response = await fetch(putUrl, {
                    method: 'PUT',
                    headers:
                        {
                            'Content-Type': 'application/json'
                        },
                    body: JSON.stringify({title, author})
                });

                form.querySelector('h3').textContent = 'FORM';
                form.removeAttribute('id');
            } else {
                const response = await fetch(url, {
                    method: 'POST',
                    headers:
                        {
                            'Content-Type':'application/json'
                        },
                    body: JSON.stringify({author, title})
                });
            }

            document.querySelector('form [name="title"]').value = '';
            document.querySelector('form [name="author"]').value = '';

            loadAllBtn.click();
        }
    });

    loadAllBtn.addEventListener('click', async () => {
        tbody.innerHTML = '';

        const response = await fetch(url);
        const data = await response.json();

        let books = Object.entries(data);

        for (const book of books) {
            const id = book[0];
            const author = book[1].author;
            const title = book[1].title;

            const tr = trCreator(id, author, title);

            tbody.appendChild(tr);
        }
    });

    function trCreator(id, author, title){
        let tr = document.createElement('tr');

        tr.setAttribute('id', id);

        const tdName = document.createElement('td');
        const tdAuthor = document.createElement('td');
        const tdButtonsContainer = document.createElement('td');

        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');

        editBtn.textContent = 'Edit';
        deleteBtn.textContent = 'Delete';

        editBtn.addEventListener('click',() => {
            form.setAttribute('id', id);
            form.querySelector('h3').textContent = 'Edit FORM';

            form.querySelector('[name="title"]').value = title;
            form.querySelector('[name="author"]').value = author;
        });

        deleteBtn.addEventListener('click', async () => {
            const response = await fetch(`${url}/${id}`, {
                method: 'DELETE'
            });

            document.getElementById(id).remove();
        });

        tdButtonsContainer.appendChild(editBtn);
        tdButtonsContainer.appendChild(deleteBtn);

        tdAuthor.textContent = author;
        tdName.textContent = title;

        tr.appendChild(tdName);
        tr.appendChild(tdAuthor);
        tr.appendChild(tdButtonsContainer);

        return tr;
    }
}

action();