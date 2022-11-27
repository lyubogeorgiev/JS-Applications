function loadRepos() {
	const username = document.getElementById('username').value;

	const url = `https://api.github.com/users/${username}/repos`;

	let ulContent = document.getElementById('repos');
	ulContent.innerHTML = '';

	fetch(url)
		.then((response) => response.json())
		.then((data) =>  {

			if (data.status !== 'ok'){
				alert('Error');
			} else {
				data.forEach(repo => {
					let a = document.createElement('a');

					a.href = repo.html_url;
					a.textContent = repo.full_name;

					let li = document.createElement('li');

					li.appendChild(a);
					ulContent.appendChild(li);

					// console.log(a);
				});
			}
			// console.log(data[0].full_name);

		})
		.catch((error) => {
			alert(error);
		});
}