function loadRepos() {
   const url = 'https://api.github.com/users/testnakov/repos';
   const request = new XMLHttpRequest();

   let resultElement = document.getElementById('res');

    request.open('get', url);
    request.send();

    request.addEventListener('readystatechange', () => {

        if (request.readyState === 4 && request.status === 200){

            resultElement.textContent = request.responseText;
        }
    });
}