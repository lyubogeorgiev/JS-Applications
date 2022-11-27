async function lockedProfile() {
    const response = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
    const profiles = await response.json();

    // console.log(Object.entries(profiles));

    let mainElement = document.getElementById('main');

    Object.entries(profiles).forEach(profile => {
        createProfile(profile);
    });

    function createProfile(profile){
        let divProfile = document.createElement('div');
        divProfile.classList.add('profile');

        divProfile.innerHTML = '<img src="./iconProfile2.png" class="userIcon" />' +
            '<label>Lock</label>' +
            '<input type="radio" name="user1Locked" value="lock" checked>' +
            '<label>Unlock</label>' +
            '<input type="radio" name="user1Locked" value="unlock"><br>' +
            '<hr>' +
            '<label>Username</label>' +
            '<input type="text" name="user1Username" value="" disabled readonly />' +
            '<div class="user1Username">' +
            '<hr>' +
            '<label>Email:</label>' +
            '<input type="email" name="user1Email" value="" disabled readonly />' +
            '<label>Age:</label>' +
            '<input type="text" name="user1Age" value="" disabled readonly />' +
            '</div>' +
            '<button>Show more</button>';

        let usernameElement = divProfile.querySelector('[name="user1Username"]');
        usernameElement.value = profile[1].username;

        let emailElement = divProfile.querySelector('[name="user1Email"]');
        emailElement.value = profile[1].email;

        let ageElement = divProfile.querySelector('[name="user1Age"]');
        ageElement.value = Number(profile[1].age);

        let lockUnlockElements = divProfile.querySelectorAll('[name="user1Locked"]');
        // console.log(lockUnlockElements);
        // console.log(lockUnlockElements[0]);

        let buttonElement = divProfile.querySelector('button');

        let additionalInfo = divProfile.querySelector('.user1Username');
        additionalInfo.style.display = 'none';

        lockUnlockElements.forEach(radio => {
            radio.addEventListener('change', (e) => {
                e.currentTarget.checked = true;

                // console.log(e.currentTarget);

                if (e.currentTarget.value === 'lock'){
                    // console.log('lockeeed');

                    buttonElement.disabled = true;
                } else {
                    // console.log('unlooocked');
                    buttonElement.disabled = false;
                }

                console.log(`Button is: ${buttonElement.disabled}`);


            });
        });

        buttonElement.addEventListener('click', (e) => {
            // console.log('something???');
            if (e.currentTarget.textContent === 'Show more'){
                additionalInfo.style.display = 'inline-block'
                e.currentTarget.textContent = 'Hide it';
            } else {
                additionalInfo.style.display = 'none';
                e.currentTarget.textContent = 'Show more';
            }
        });


        mainElement.appendChild(divProfile);

    }
}