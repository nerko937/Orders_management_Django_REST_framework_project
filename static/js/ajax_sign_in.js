$(() => {

    let nav = $('nav')
    let form = $('#sign-in');

    let logout = $(
        '<div class="navbar-nav">' +
            '<a class="nav-item nav-link" href="#">Logout</a>' +
        '</div>'
    );
    logout.children().click( (event) => {

        event.preventDefault();

        $.post('/api/auth/logout/', () => {})
            .fail((xhr,status,err) => {

                alert('Login error')
                console.log(xhr)
                console.log(status)
                console.log(err)

            });

        nav.last().remove();
        nav.last().remove();
        form.show();

    });

    form.on('submit', (event) => {

        event.preventDefault();
        $.post('/api/auth/login/', form.serialize())
            .done(() => {

                let text = $(
                    '<span class="navbar-text">' +
                        'Logged as: ' + $('#username').val() +
                    '</span>'
                );

                form.hide();
                nav.append(text).append(logout);

            })

            .fail((xhr,status,err) => {

                alert('Login error')
                console.log(xhr)
                console.log(status)
                console.log(err)

            });

    });

});