from flask import Flask, request, jsonify
import message_pb2

app = Flask(__name__)

@app.route('/data', methods=['POST'])
def receive_data():
    data = message_pb2.Person()
    try:
        data.ParseFromString(request.data)
        print(data)
        return jsonify(success=True), 200
    except:
        return jsonify(success=False, message="Failed to parse data"), 400

if __name__ == "__main__":
    app.run(debug=True, port=8888)
