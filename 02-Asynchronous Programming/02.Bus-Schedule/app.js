function solve() {
    let baseUrl = 'http://localhost:3030/jsonstore/bus/schedule/';

    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');
    let info = document.querySelector('#info span');

    let currentStop = {
        next: 'depot'
        };

    async function depart() {

        const response = await fetch(`${baseUrl}${currentStop.next}`)
        currentStop = await response.json();

        departBtn.disabled = true;
        arriveBtn.disabled = false;

        info.textContent = `Next stop ${currentStop.name}`;
    }

    function arrive() {
        arriveBtn.disabled = true;

        info.textContent = `Arriving at ${currentStop.name}`;

        departBtn.disabled = false;
    }

    return {
        depart,
        arrive
    };


}

let result = solve();