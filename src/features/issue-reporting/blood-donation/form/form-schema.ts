import z from 'zod'
import { contactInformationSchema } from '../../shared-form-schema'

// first step
export const basicInformationSchema = z.object({
  patientName: z
    .string("Patient's Name must be provided")
    .min(3, "Patient's Name must be at least 3 characters long"),
  bloodGroup: z.enum(
    ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    'Invalid Birth Group',
  ),
  amountInBag: z.number('It should be a numeric'),
  exactDateAndTime: z.date('Must be a date input'),
})

// second step
export const locationInformationSchema = z.object({
  hospitalName: z
    .string('Hospital name is required')
    .trim()
    .min(3, 'Hospital name must be at least 3 characters long'),
  district: z.string('District is required'),
  upazila: z.string('Upazila is required'),
  specialInstruction: z.string().optional(),
})

export const bloodDonationIssueSchema = basicInformationSchema
  .and(locationInformationSchema)
  .and(contactInformationSchema)

export type BloodDonationIssueFormValue = z.infer<
  typeof bloodDonationIssueSchema
>
