function appendJSON(data) {
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
    var rows = data.map(elem => $(
        '<tr>' +
            '<td>' + elem['name'] + '</td>' +
            '<td>' + elem['order_type'] + '</td>' +
            '<td>' + elem['status'] + '</td>' +
            '<td>' + elem['realisation_limit_date'] + '</td>' +
        '</tr>')
    );
    rows.forEach(function (elem) {
        divTable.children().append(elem)
    });
    $('main').append(divTable)
}

$(function () {
    $.get( "/api/orders/", function( data ) {

    })
        .fail(function () {
            alert('error')
        })
        .done(function (data) {
            appendJSON(data)
        })
});
