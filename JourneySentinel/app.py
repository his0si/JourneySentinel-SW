from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# 도난 시도 데이터 저장 (메모리 내 리스트에 저장)
detection_data = []

# index.html 렌더링을 위한 경로 설정
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/warning', methods=['POST'])
def warning():
    message = request.form.get('message')  # ESP32에서 전송하는 message 값
    timestamp = request.form.get('timestamp')  # ESP32에서 전송하는 timestamp 값
    location = request.form.get('location')  # ESP32에서 전송하는 location 값

    if message and timestamp and location:
        # 수신된 데이터를 detection_data 리스트에 추가
        detection_data.append({"message": message, "timestamp": timestamp, "location": location})
        print(f"Received message: {message} at {timestamp} in {location}")
        return jsonify({'status': 'success', 'message': 'Data received'}), 200
    else:
        return jsonify({'status': 'error', 'message': 'Missing data'}), 400


if __name__ == '__main__':
    app.run(host='0.0.0.0')  # 로컬 네트워크에서 서버 실행