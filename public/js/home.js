$(document).ready(function () {
    var tokenKey = "tokenInfo";
    var token = sessionStorage.getItem(tokenKey);
    var headers = { "Authorization": "Bearer " + token };

    try {
        $('#myTable').DataTable({
            "processing": true,
            "serverSide": true,
            "retrieve": true,
            "scrollY": "300px",
            "ajax": {
                "url": '/api/todo/all',
                "headers": headers
            },
            "columns": [
                { "data": "title" },
                { "data": "description" },
                { "data": "status" },
                { "data": "priority" },
                { "data": "userId" }]

        });
    } catch (error) {

    }

});