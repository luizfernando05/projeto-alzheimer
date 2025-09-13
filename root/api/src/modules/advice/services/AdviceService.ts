import axios from 'axios';
import { AdviceRequestDTO, AdviceResponseDTO } from '../dtos/AdviceRequestDTO';
import { AppError } from '../../shared/errors/AppError';

export class AdviceService {
  private apiUrl: string;

  constructor() {
    this.apiUrl = 'https://api.cohere.ai/v1/generate';
  }

  async generateAdvice(data: AdviceRequestDTO): Promise<AdviceResponseDTO> {
    try {
      const response = await axios.post(
        this.apiUrl,
        {
          model: 'command-r-plus-08-2024',
          prompt: `
            You are a healthcare and cognitive specialist. Your task is to provide a clear, non-technical explanation of the patient's Alzheimer's diagnosis based on the provided data, followed by one simple, practical tip for managing their daily life.

            **Important Guidelines:**
            - Do NOT reinterpret the diagnosis. Use the prediction as ground truth.
            - Focus your response on:
              1. Explaining why the diagnosis makes sense based on the cognitive and functional test results.
              2. Highlighting which values are abnormal and how they relate to Alzheimer's progression.
              3. Ending with a short, simple practical tip (1–2 sentences max).

            **Output Format:**
            - First: clear explanation of diagnosis.
            - Then: one short actionable tip.

            **Example 1:**
            Diagnosis: Alzheimer's  
            Confidence: 92.5%  
            MMSE: 18 | Functional Assessment: Low independence | Memory Complaints: Present  
            Explanation: The MMSE score is significantly below the normal range (usually above 24), indicating cognitive decline. Functional assessment shows reduced independence, and reported memory complaints reinforce this diagnosis.  
            Tip: Establish a structured daily routine with reminders to reduce confusion and anxiety.

            **Example 2:**
            Diagnosis: Non-Alzheimer’s  
            Confidence: 89.7%  
            MMSE: 28 | ADL: Independent | Behavioral Problems: None  
            Explanation: The MMSE score is within the normal range, and the patient maintains independence in daily activities without behavioral changes. These values do not indicate Alzheimer's.  
            Tip: Continue engaging in mentally stimulating activities like reading or puzzles to support brain health.

            ---

            **Patient Information:**  
            - Name: ${data.patientName}  
            - Age: ${data.age} years  
            - Gender: ${data.gender}  

            **Medical Data:**    
            - MMSE: ${data.medicalData.mmse}  
            - Functional Assessment: ${data.medicalData.functionalAssessment}  
            - Memory Complaints: ${data.medicalData.memoryComplaints}  
            - Behavioral Problems: ${data.medicalData.behavioralProblems}  
            - ADL: ${data.medicalData.adl}  

            **Confirmed Diagnosis:** ${data.prediction.result} (Confidence: ${data.prediction.confidenceScore * 100}%).

            Now explain the diagnosis and end with one brief tip.
            `,
          max_tokens: 500,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const advice = response.data.generations[0].text.trim();

      return { tips: advice };
    } catch (err) {
      console.error('Error communicating with Cohere API:', err);
      throw new AppError('Error generating advice using Cohere model', 500);
    }
  }
}

export default AdviceService;
