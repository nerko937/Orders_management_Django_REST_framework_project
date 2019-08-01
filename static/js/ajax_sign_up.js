$(function () {

    var registerForm = $( "#sign-up" );
    $.post( '/api/auth/registration/', registerForm.serialize() );
    registerForm.on('submit', function ( event ) {

        event.preventDefault();

        $.post( '/api/auth/registration/', $( this ).serialize() )
            .done(function() {
                var data = {
                    "first_name" : $('#register-name').val(),
                    "last_name" : $('#register-surname').val()
                }
                $.ajax({
                    url: '/api/auth/user/',
                    type: "PATCH",
                    data: JSON.stringify(data),
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('X-CSRFToken', Cookies.get('csrftoken'))
                    },
                    contentType: "application/json",
                })
                    .fail(function(xhr,status,err) {
                        alert('Error during patching user data')
                        console.log(xhr)
                        console.log(status)
                        console.log(err)
            });
            })
            .fail(function(xhr,status,err) {
                alert('Registration error')
                console.log(xhr)
                console.log(status)
                console.log(err)
            });

    });

});