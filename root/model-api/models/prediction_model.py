import joblib
import pandas as pd

class AlzheimerPredictionModel:
    def __init__(self):
        self.bundle = joblib.load('ml-model/randomforest_5best_features_bundle.joblib')
        self.model = self.bundle['model']
        self.scaler = self.bundle['scaler']
        self.features = self.bundle['features']

    def preprocess(self, input_data):
        print("Esperado features:", self.features)
        print("Recebido input_data:", input_data)

        if isinstance(input_data, list):
            if len(input_data) == len(self.features):
                input_selected = dict(zip(self.features, input_data))
            elif len(input_data) == 1 and len(input_data[0]) == len(self.features):
                input_selected = dict(zip(self.features, input_data[0]))
            else:
                raise ValueError("Input lista não tem o número correto de elementos.")
        elif isinstance(input_data, dict):
            input_selected = {feat: input_data.get(feat, 0) for feat in self.features}
        else:
            raise ValueError("Formato de input_data não suportado.")
        print("Input selecionado:", input_selected)
        input_df = pd.DataFrame([input_selected], columns=self.features)
        print("Input DataFrame para scaler:\n", input_df)
        scaled = self.scaler.transform(input_df)
        print("Input escalado:", scaled)
        return scaled

    def predict(self, input_data):
        processed = self.preprocess(input_data)
        print("Input final para modelo:", processed)
        return self.model.predict(processed)[0]
    
    def get_confidence_score(self, input_data):
        processed = self.preprocess(input_data)
        print("Input final para modelo (proba):", processed)
        return max(self.model.predict_proba(processed)[0])