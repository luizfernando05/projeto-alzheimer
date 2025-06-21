export interface CreateMedicalDataDTO {
  bmi: number;
  sleep_quality: boolean;
  cholesterol_ldl: number;
  cholesterol_hdl: number;
  cholesterol_triglycerides: number;
  mmse: number;
  functional_assessment: number;
  memory_complaints: boolean;
  behavioral_problems: boolean;
  adl: number;
  date_exam: Date;
  patient_id: string;
}
