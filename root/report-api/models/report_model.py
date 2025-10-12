from pydantic import BaseModel, Field
from typing import Optional

class Patient(BaseModel):
    name: str
    email: str
    birthDate: str
    gender: str
    state: str
    ethnicity: str
    educationLevel: str
    phoneNumber: str

class MedicalData(BaseModel):
    
    # dados gerais
    dateExam: str
    bmi: float
    weight: float
    height: float
    sleepQuality: str
    dietQuality: int
    cholesterolLdl: int
    cholesterolHdl: int
    cholesterolTriglycerides: int
    cholesterolTotal: int
    systolicBP: int
    diastolicBP: int
    physicalActivity: bool
    smoking: bool
    alcoholConsumption: bool

    # histórico médico
    familyHistory: bool
    cardiovascularDisease: bool
    diabetes: bool
    depression: bool
    headTrauma: bool
    hypertension: bool

    # funções cognitivas
    mmse: int
    adl: int
    functionalAssessment: int
    memoryComplaints: bool
    behavioralProblems: bool
    
    # sintomas cognitivos
    confusion: bool
    disorientation: bool
    personalityChanges: bool
    difficultyCompletingTasks: bool
    forgetfulness: bool

class ReportData(BaseModel):
    patient: Patient
    medicalData: MedicalData
