function appendJSON ( data ) {
    // creates and appends table with orders to main tag in html
    // takes JSON data as argument

    var today = new Date();

    var main = $( 'main' );
    main.children().remove();

    var divTable = $(
        '<div class="m-5">' +
            '<table class="table border">' +
                '<thead>' +
                    '<tr>' +
                        '<th>Name</th>' +
                        '<th>Type</th>' +
                        '<th>Status</th>' +
                        '<th>Realisation date</th>' +
                    '</tr>' +
                '</thead>' +
                '<tbody></tbody>' +
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
    var tableBody = divTable.find( 'tbody' );
    rows.forEach(function ( elem ) {
        tableBody.append( elem )
    });

    // coloring finished and late orders
    tableBody.children().each(function () {
        var last = $( this ).children().last();
        var elemDate = Date.parse( last.html() );
        if ( today >= elemDate ) {
            $( this ).addClass( 'table-danger' )
        }
        if ( last.prev().html() === 'true' ) {
            $( this ).removeClass( 'table-danger' ).addClass( 'table-success' )
        }
    });

    main.append(divTable);
}

function makeGetRequest ( url ) {
    // makes get request with url as argument

    $.get( url, function( data ) {

    })
        .fail(function ( xhr, status, err ) {
            console.log(xhr);
            console.log(status);
            console.log(err);
        })
        .done(function (data) {
            appendJSON(data);
        })
}

$(function () {

    var pathName = window.location.pathname;

    // show-all button click event
    var showAll = $( '#show-all' );
    showAll.click(function () {
        if ( pathName === '/' ) {
            makeGetRequest( "/api/orders/" )
        } else {
            window.location.replace( '/' )
        }
    });

    // redirect after sending search form from different site
    // or trigger show-all on main page
    var searchParams = new URLSearchParams(window.location.search);

    if ( searchParams.has('input') ) {
        var url = '/api/orders/?order_name=' + searchParams.get( 'input' );
        makeGetRequest( url )
    } else if ( pathName === '/' ) {
        showAll.trigger("click");
    }

    // order filtering by name
    var search = $( '#search' );
    search.on( "submit", function( event ) {
        event.preventDefault();
        var input = $( this ).find( 'input' ).val();
        var url = '/api/orders/?order_name=' + input;
        if ( pathName === '/' ) {
            makeGetRequest( url )
        } else {
            window.location.replace( '/?input=' + input )
        }
    });

});
