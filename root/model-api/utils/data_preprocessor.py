import pandas as pd

class DataPreprocessor:
    def process(self, data):
        features = [
            data["mmse"],
            data["functionalAssessment"],
            data["memoryComplaints"],
            data["behavioralProblems"],
            data["adl"]
        ]

        return pd.DataFrame([features], columns=[
            'MMSE', 'FunctionalAssessment', 'MemoryComplaints',
       'BehavioralProblems', 'ADL'
        ])
    
    'MMSE', 'FunctionalAssessment', 'MemoryComplaints','BehavioralProblems', 'ADL'
    
    
    
