import numpy as np

class DataPreprocessor:
    def process(self, data):
        features = np.array([[
            data["mmse"],
            data["functionalAssessment"],
            data["memoryComplaints"],
            data["behavioralProblems"],
            data["adl"]
        ]])

        return features    
    
    
    
