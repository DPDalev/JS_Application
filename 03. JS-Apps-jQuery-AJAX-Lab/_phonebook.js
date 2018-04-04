function attachEvents() {

//const URL = moeto 'https:// moeto URL ot moia FireBase + ...com/phonebook'
    const URL = "https://phonebook-nakov.firebaseio.com/phonebook";
//const person = $('#person');
//const phone = $('#phone');
    $('#btnLoad').click(loadData);
    $('#btnCreate').click(postData);

    function loadData() {
        $('#phonebook').empty();
        $.get(
            "https://phonebook-nakov.firebaseio.com/phonebook.json"
            //success: handleSuccess, Това е другия начин вместо then и catch
            //error: handleError
        )
            .then(displayContacts)
            .catch(errorHandle);
    }

    function displayContacts(contacts) {
        for (let key in contacts) {
            let person = contacts[key]['person'];
            let phone = contacts[key]['phone'];

            $('#phonebook')
                .append($('<li>').text(person + ': ' + phone + ' '))
                .append($('<button>').text('Delete').click(remove(key)))
        }
    }

    function remove(key) {
        $.ajax({
                method: 'DELETE',
                url: ("https://phonebook-nakov.firebaseio.com/phonebook/" + key + ".json")

                //success: handleSuccess, Това е другия начин вместо then и catch
                //error: handleError
            }
        )
            .then(displayContacts)
            .catch(errorHandle);
    }



    function postData() {
        console.log("postData");
    }


    function deleteSuccess() {

    }

    function errorHandle(err) {
        $('#phonebook').append($('<li>').text("Error"))
    }

}