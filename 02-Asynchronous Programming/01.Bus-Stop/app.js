async function getInfo() {
    const stopId = document.getElementById('stopId').value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;

    let stopNameElement = document.getElementById('stopName');
    let busList = document.getElementById('buses');

    stopNameElement.innerHTML = '';
    busList.innerHTML = '';


    try{
        const response = await fetch(url);
        const busStop = await response.json();
        stopNameElement.textContent = busStop.name;



        // console.log(Object.entries(busStop.buses));
        let busesArriving = Object.keys(busStop.buses);

        busesArriving.forEach(key => {
           let li = document.createElement('li');
           li.textContent = `Bus ${key} arrives in ${busStop.buses[key]} minutes`;
           busList.appendChild(li);
        });

        // console.log(busesArriving);
    } catch (error){
        stopNameElement.textContent = 'Error';
    }





}
