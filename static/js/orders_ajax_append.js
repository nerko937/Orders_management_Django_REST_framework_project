function appendJSON ( data ) {
    var main = $( 'main' );
    main.children().remove();

    var divTable = $(
        '<div class="m-5">' +
            '<table class="table border">' +
                '<tr>' +
                    '<th>Name</th>' +
                    '<th>Type</th>' +
                    '<th>Status</th>' +
                    '<th>Realisation date</th>' +
                '</tr>' +
            '</table>' +
        '</div>'
    );
    var rows = data.map( elem => $(
        '<tr>' +
            '<td>' + elem['name'] + '</td>' +
            '<td>' + elem['order_type'] + '</td>' +
            '<td>' + elem['status'] + '</td>' +
            '<td>' + elem['realisation_limit_date'] + '</td>' +
        '</tr>')
    );
    rows.forEach(function ( elem ) {
        divTable.children().append( elem )
    });
    main.append(divTable)
}

function makeGetRequest ( url ) {
    $.get( url, function( data ) {

    })
        .fail(function ( xhr, status, err ) {
            alert('error');
            console.log(xhr);
            console.log(status);
            console.log(err);
        })
        .done(function (data) {
            appendJSON(data);
        })
}

$(function () {

    var showAll = $( '#show-all' );
    showAll.click(function () {
        makeGetRequest( "/api/orders/" )
    });
    if ( window.location.pathname === '/' ) {
        showAll.trigger( "click" );
    }

    var search = $( '#search' );
    search.on( "submit", function( event ) {
        event.preventDefault();
        var url = '/api/orders/?order_name=' + $( this ).find( 'input' ).val();
        console.log(url);
        makeGetRequest( url )
    });
});
