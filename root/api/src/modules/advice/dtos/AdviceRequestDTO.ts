export interface AdviceRequestDTO {
  patientName: string;
  age: number;
  gender: string;
  medicalData: {
    mmse: number;
    functionalAssessment: number;
    memoryComplaints: boolean;
    behavioralProblems: boolean;
    adl: number;
  };
  prediction: {
    result: string;
    confidenceScore: number;
  };
}

export interface AdviceResponseDTO {
  tips: string;
}
