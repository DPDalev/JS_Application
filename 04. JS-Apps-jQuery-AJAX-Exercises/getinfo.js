function getInfo() {
    const baseURL = "https://judgetests.firebaseio.com/businfo/";
    $('#buses').empty();
    let stopId = $('#stopId').val();

    let stopURL = baseURL + stopId + ".json"
    $.ajax({
        url: stopURL,
        success: displayStopInfo,
        error: displayError
    });
    function displayStopInfo(stop){
        $('#stopName').text(stop.name)
        for (let bus in stop.buses) {
            $('#buses').append($('<li>').text(`Bus ${bus} arrives in ${stop['buses'][bus]} minutes`))
        }
    }
    function displayError(err) {
        $('#stopName').text('Error');
    }
}