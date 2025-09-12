from flask import Flask
from flask_cors import CORS
from controllers.prediction_controller import prediction_blueprint

app = Flask(__name__)
CORS(app)

app.register_blueprint(prediction_blueprint, url_prefix='/predict')

if __name__ == '__main__':
  app.run(debug=True)

print(app.url_map)