from models.prediction_model import AlzheimerPredictionModel
from utils.data_preprocessor import DataPreprocessor

class PredictionService:
  def __init__(self):
    self.model = AlzheimerPredictionModel()
    self.preprocessor = DataPreprocessor()

  def make_prediction(self, data):
    input_data = self.preprocessor.process(data)
    prediction = self.model.predict(input_data)
    confidence = self.model.get_confidence_score(input_data)

    return {
      "prediction_result": int(prediction),
      "confidence_score": confidence
    }