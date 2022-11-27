function attachEvents() {
    let getWeatherButton = document.getElementById('submit');
    let input = document.getElementById('location');
    let locations = {};
    let forecastElement = document.getElementById('forecast');
    let forecastSection = document.getElementById('upcoming');
    let divCurrent = document.getElementById('current');
    let divUpcoming = document.getElementById('upcoming');

    const conditionSymbols = {
        'Sunny': '&#x2600; ',
        'Partly sunny': '&#x26C5;',
        'Overcast': '&#x2601;',
        'Rain': '&#x2614;',
        'Degrees': '&#176;'
    };


    getWeatherButton.addEventListener('click', async () => {
        divCurrent.innerHTML = '';
        divUpcoming.innerHTML = '';
        let location = input.value;
        input.value = '';
        forecastElement.style.display = 'inline-block';


        try{
            const response = await fetch('http://localhost:3030/jsonstore/forecaster/locations');
            locations = await response.json();

        }catch(error){
            console.log(error.message);
            // let divError = document.createElement('div');
            // divError.textContent = 'Error';
            // forecastSection.appendChild(divError);
        }

        let userSelectedLocation = locations.find(l => l.name === location);
        console.log(userSelectedLocation);

        let selectedLocationCode;
        let baseCurrentConditionUrl = '';

        try{
            selectedLocationCode = userSelectedLocation.code;
            baseCurrentConditionUrl = 'http://localhost:3030/jsonstore/forecaster/today/';
            const responseCurrentConditions = await fetch(`${baseCurrentConditionUrl}${selectedLocationCode}`);
            const currentConditions = await responseCurrentConditions.json();

            let divLabel = document.createElement('div');
            divLabel.classList.add('label');
            divLabel.textContent = 'Current conditions';
            divCurrent.appendChild(divLabel);

            let divForecasts = document.createElement('div');
            divForecasts.classList.add('forecasts');

            let spanOne = document.createElement('span');
            spanOne.classList.add('condition', 'symbol');
            spanOne.innerHTML = conditionSymbols[currentConditions.forecast.condition];
            divForecasts.appendChild(spanOne);

            let spanCondition = document.createElement('span');
            spanCondition.classList.add('condition');

            let spanForecastDataOne = document.createElement('span');
            spanForecastDataOne.classList.add('forecast-data');
            spanForecastDataOne.textContent = currentConditions.name;
            spanCondition.appendChild(spanForecastDataOne);

            let spanForecastDataTwo = document.createElement('span');
            spanForecastDataTwo.classList.add('forecast-data');
            spanForecastDataTwo.innerHTML =
                `${currentConditions.forecast.low}&#176;/${currentConditions.forecast.high}&#176;`;
            spanCondition.appendChild(spanForecastDataTwo);

            let spanForecastDataThree = document.createElement('span');
            spanForecastDataThree.classList.add('forecast-data');
            spanForecastDataThree.textContent = currentConditions.forecast.condition;
            spanCondition.appendChild(spanForecastDataThree);

            divForecasts.appendChild(spanCondition);
            divCurrent.appendChild(divForecasts);

        } catch(error){
            console.log(error.message);
            // let divError = document.createElement('div');
            // divError.textContent = 'Error';
            // forecastSection.appendChild(divError);
        }

        let baseForecastUrl = 'http://localhost:3030/jsonstore/forecaster/upcoming/';

        try{
            const responseForecast = await fetch(`${baseForecastUrl}${selectedLocationCode}`);
            let forecast = await responseForecast.json();

            let divLabel = document.createElement('div');
            divLabel.classList.add('label');
            divLabel.textContent = 'Three-day forecast';
            divUpcoming.appendChild(divLabel);

            let divForecastInfo = document.createElement('div');
            divForecastInfo.classList.add('forecast-info');

            for (let i = 0; i < forecast.forecast.length; i++) {
                let spanUpcoming = document.createElement('span');
                spanUpcoming.classList.add('upcoming');

                let spanSymbol = document.createElement('span');
                spanSymbol.classList.add('symbol');
                spanSymbol.innerHTML = conditionSymbols[forecast.forecast[i].condition];
                spanUpcoming.appendChild(spanSymbol);

                let spanForecastDataOne = document.createElement('span');
                spanForecastDataOne.classList.add('forecast-data');
                spanForecastDataOne.innerHTML =
                    `${forecast.forecast[i].low}&#176;/${forecast.forecast[i].high}&#176;`;
                spanUpcoming.appendChild(spanForecastDataOne);

                let spanForecastDataTwo = document.createElement('span');
                spanForecastDataTwo.classList.add('forecast-data');
                spanForecastDataTwo.textContent = forecast.forecast[i].condition;
                spanUpcoming.appendChild(spanForecastDataTwo);

                divForecastInfo.appendChild(spanUpcoming);
            }


            divUpcoming.appendChild(divForecastInfo);

        }catch(error){
            console.log(error.message);
            let divError = document.createElement('div');
            divError.textContent = 'Error';
            forecastSection.appendChild(divError);
        }
    });


    // forecastElement.innerHTML = '&#x2600;';
}

attachEvents();