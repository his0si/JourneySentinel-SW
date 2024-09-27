document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded event fired');
    var socket = io();
    var latestWarningElement = document.getElementById('latest-warning');
    var warningListElement = document.getElementById('warnings');

    socket.on('connect', function() {
        console.log('Connected to server');
    });

    socket.on('new_warning', function(data) {
        console.log('Received new warning:', data);
        updateLatestWarning(data);
        addWarningToList(data);
    });

    function updateLatestWarning(data) {
        console.log('Updating latest warning');
        latestWarningElement.innerHTML = `
            <p><strong>메시지:</strong> ${data.message}</p>
            <p><strong>시간:</strong> ${data.timestamp}</p>
        `;
    }

    function addWarningToList(data) {
        console.log('Adding warning to list');
        var listItem = document.createElement('li');
        listItem.innerHTML = `
            <p><strong>메시지:</strong> ${data.message}</p>
            <p><strong>시간:</strong> ${data.timestamp}</p>
        `;
        warningListElement.prepend(listItem);

        if (warningListElement.children.length > 10) {
            warningListElement.removeChild(warningListElement.lastChild);
        }
    }
});