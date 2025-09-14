import numpy as np

class DataPreprocessor:
    def process(self, data):

        features = {
            "MMSE": data.get("mmse", 0),
            "FunctionalAssessment": data.get("functionalAssessment", 0),
            "MemoryComplaints": data.get("memoryComplaints", 0),
            "BehavioralProblems": data.get("behavioralProblems", 0),
            "ADL": data.get("adl", 0)
        }
        return features



