from dataclasses import dataclass
from typing import Optional

@dataclass
class Patient:
    name: str
    email: str
    birth_date: str
    gender: str
    state: Optional[str] = None
    ethnicity: Optional[str] = None
    education_level: Optional[str] = None
    phone_number: Optional[str] = None

@dataclass
class MedicalData:
    date_exam: str
    bmi: float
    weight: float
    height: float
    sleep_quality: float
    diet_quality: float
    cholesterol_ldl: float
    cholesterol_hdl: float
    cholesterol_triglycerides: float
    cholesterol_total: float
    systolic_bp: float
    diastolic_bp: float
    physical_activity: bool
    smoking: bool
    alcohol_consumption: bool
    family_history: bool
    cardiovascular_disease: bool
    diabetes: bool
    depression: bool
    head_trauma: bool
    hypertension: bool
    mmse: float
    adl: float
    functional_assessment: float
    memory_complaints: bool
    behavioral_problems: bool
    confusion: bool
    disorientation: bool
    forgetfulness: bool
    personality_changes: bool
    difficulty_completing_tasks: bool
