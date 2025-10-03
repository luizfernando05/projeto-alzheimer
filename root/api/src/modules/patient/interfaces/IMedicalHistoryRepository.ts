export interface MedicalHistoryData {
  id: string;
  dateExam: string;
  mmse: number;
  functionalAssessment: number;
  adl?: number;
  bmi: number;
  cholesterolLdl: number;
  cholesterolHdl: number;
  cholesterolTriglycerides: number;
  smoking: boolean;
  alcoholConsumption: boolean;
  physicalActivity: boolean;
  memoryComplaints: boolean;
  behavioralProblems: boolean;
  confusion: boolean;
  forgetfulness: boolean;
  createdAt: string;
  prediction?: {
    id: string;
    result: string;
    confidence: number;
    createdAt: string;
  };
}

export interface IMedicalHistoryRepository {
  getMedicalHistoryByPatientId(
    patientId: string
  ): Promise<MedicalHistoryData[]>;
}
