$(document).ready(function () {
    let socket = io('/admin')

    // Listen for confirmation of connection
    socket.on('connect', function () {
        console.log("Connected")
    })

    socket.on('status-response', function (status) {
        var node = new PrettyJSON.view.Node({
            el: $('#status-report'),
            data: status
        });
        node.expandAll()
    })

    refreshStatusReport = function() {
        console.log('sending status request')
        socket.emit('status-request', '')
    }

    setInterval(refreshStatusReport, 200);
});

