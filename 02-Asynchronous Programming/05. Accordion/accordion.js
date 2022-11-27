async function solution() {
    let mainListUrl = 'http://localhost:3030/jsonstore/advanced/articles/list';

    let response = await fetch(mainListUrl);
    let mainList = await response.json();

    let mainSection = document.getElementById('main');

    mainList.forEach(item => createAccordion(item));

    function createAccordion(item){
        let divAccordion = document.createElement('div');
        divAccordion.classList.add('accordion');

        divAccordion.innerHTML = '<div class="head">\n' +
                '<span></span>\n' +
                '<button class="button" id="">More</button>\n' +
                '</div>\n' +
                '<div class="extra">\n' +
                '<p></p>\n' +
                '</div>';

        let spanHead = divAccordion.querySelector('.head span');
        spanHead.textContent = item.title;

        let button = divAccordion.querySelector('.button');
        button.id = item._id;

        mainSection.appendChild(divAccordion);

        button.addEventListener('click', (e) => {
            let currentExtraParagraph = e.currentTarget.parentNode.parentNode.querySelector('.extra p');

            if (e.target.textContent === 'More'){

                if (currentExtraParagraph.textContent === ''){
                    fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${e.target.id}`)
                        .then(response => response.json())
                        .then(element => {
                            currentExtraParagraph.textContent = element.content;
                        });
                }

                currentExtraParagraph.parentElement.style.display = 'inline-block';
                e.currentTarget.textContent = 'Less';
            }else{
                currentExtraParagraph.parentElement.style.display = 'none';
                e.currentTarget.textContent = 'More';
            }
        });
    }
}

// window.addEventListener('load', solution);
solution();