function loadCommits() {
    const username = document.getElementById('username');
    const repo = document.getElementById('repo');

    const url = `https://api.github.com/repos/${username.value}/${repo.value}/commits`;

    let ul = document.getElementById('commits');
    // console.log(username.value);
    // console.log(repo.value);

    ul.innerHTML = '';

    fetch(url)
        .then((response) => response.json())
        .then(data => {

            if (data.message === "Not Found"){
                //error

                let li = document.createElement('li');
                li.textContent = `Error: ${error.message} (Not Found)`;

                ul.appendChild(li);
            } else {
                //success

                data.forEach(commit => {
                    console.log(commit);
                   let li = document.createElement('li');
                   li.textContent = `${commit.commit.author.name}: ${commit.commit.message}`;

                   ul.appendChild(li);
                });
            }
            console.log(data);
        })
        .catch((error) => {
            alert(error.message);
            let li = document.createElement('li');
            li.textContent = `Error: ${error.status} (Not Found)`;

            ul.appendChild(li);
        });
}