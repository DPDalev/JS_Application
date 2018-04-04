function attachEvents() {
    const baseURL = "https://judgetests.firebaseio.com/locations.json";
    const baseForecastURL = "https://judgetests.firebaseio.com/forecast/";
    let townName = undefined; //$('#location').val();
    let townCode = undefined;
    $('#submit').on('click', getTown);

    function getTown() {
        townName = $('#location').val();


        $.ajax(baseURL)
            .then(getCode)
            .catch(handleError);
    }

    function getCode(towns) {
        for (let town of towns) {
            if (town.name === townName) {
                townCode = town.code;
            }
        }
        getForecast(townCode)
    }

    function getForecast(townCode) {
        let urlToday = baseForecastURL + 'today/' + townCode + '.json';
        let urlUpcoming = baseForecastURL + 'upcoming/' + townCode + '.json';

        let todayForecast = $.get(urlToday);
        let upcomingForecast = $.get(urlUpcoming);

        Promise.all([todayForecast, upcomingForecast])
            .then(displayForecast)
            .catch(handleError);
    }


    function displayForecast([today, upcoming]) {
        $('#location').val('');

        //$('#upcoming').val('');
        $('#current').val('');

        let icons = {
            ['Sunny']: "&#x2600;",
            ['Partly sunny']: "&#x26C5;",
            ['Overcast']: "&#x2601;",
            ['Rain']: "&#x2614;",
            ['Degrees']: "&#176;"
        };
        $('#current')
            .append($('<span>').addClass("condition symbol").html(icons[today.forecast.condition]))
            .append($('<span>').addClass("condition")
                .append($('<span>').addClass("forecast-data").text(today.name))
                .append($('<span>').addClass("forecast-data").html(`${today.forecast.low}${icons.Degrees}/${today.forecast.high}${icons.Degrees}`))
                .append($('<span>').addClass("forecast-data").text(today.forecast.condition))
            )
        for (let forecast of upcoming.forecast) {
            $('#upcoming')
                .append($('<span>').addClass("upcoming")
                    .append($('<span>').addClass("symbol").html(icons[forecast.condition]))
                    .append($('<span>').addClass("forecast-data").html(`${forecast.low}${icons.Degrees}/${forecast.high}${icons.Degrees}`))
                    .append($('<span>').addClass("forecast-data").text(forecast.condition))
                )
        }
        $('#forecast').css("display", "block");
        townName = '';
    }


    //function handleError(err) {
    //    $('#request')
    //        .append($("<li>").text("Error: " + err.status + ' (' + err.statusText + ')'))
    //}

    function handleError(err) {
        $('#forecast').text("Error");
        $('#forecast').css("display", "block");
    }
}