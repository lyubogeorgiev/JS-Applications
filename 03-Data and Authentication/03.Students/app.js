async function createStudents(){
    let url = 'http://localhost:3030/jsonstore/collections/students';
    let form = document.getElementById('form');
    let tbody = document.querySelector('#results tbody');

    const response = await fetch(url);
    const data = await response.json();

    for (const entry of Object.values(data)) {
        let tr = trCreator(entry.firstName, entry.lastName, entry.facultyNumber, entry.grade);

        tbody.appendChild(tr);
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        let currentForm = new FormData(e.currentTarget);

        let firstName = currentForm.get('firstName');
        let lastName = currentForm.get('lastName');
        let facultyNumber = currentForm.get('facultyNumber');
        let grade = Number(currentForm.get('grade'));

        if (firstName && lastName && facultyNumber && grade){
            const response = await fetch(url, {
                method: 'POST',
                headers:
                    {
                        'Content-Type': 'application/json'
                    },
                body: JSON.stringify({firstName, lastName, facultyNumber, grade: Number(grade)})
            });

            tbody.appendChild(trCreator(firstName, lastName, facultyNumber, grade));

            document.querySelector('[name="firstName"]').value = '';
            document.querySelector('[name="lastName"]').value = '';
            document.querySelector('[name="facultyNumber"]').value = '';
            document.querySelector('[name="grade"]').value = '';
        }
    });

    function trCreator (firstName, lastName, facultyNumber, grade) {
        let tr = document.createElement('tr');
        let elements = [firstName, lastName, facultyNumber, Number(grade).toFixed(2)];

        for (const element of elements) {
            let td = document.createElement('td');
            td.innerText = element;

            tr.appendChild(td);
        }

        return tr;
    }
}

createStudents();