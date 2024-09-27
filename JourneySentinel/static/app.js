document.addEventListener('DOMContentLoaded', function () {
    // 데이터를 Flask 서버로 보내기 위한 예시 함수
    function sendWarningData(message, timestamp) {
        fetch('/warning', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'message': message,
                'timestamp': timestamp,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            if (data.status === 'success') {
                document.getElementById('detection-list').innerHTML += 
                    `<p>도난 시도: ${message}, 시간: ${timestamp}</p>`;
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    // 예시 데이터 전송
    sendWarningData('도난 시도 감지됨', new Date().toLocaleString());
});
