from flask import Blueprint, request, jsonify
from services.prediction_service import PredictionService

prediction_blueprint = Blueprint('prediction', __name__)
service = PredictionService()

@prediction_blueprint.route('/', methods=['POST'])
def predict():
  try: 
    data = request.json
    result = service.make_prediction(data)
    return jsonify(result), 200
  except Exception as e:
    return jsonify({'error': str(e)}), 500