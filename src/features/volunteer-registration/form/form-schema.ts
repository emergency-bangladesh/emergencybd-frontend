import z from 'zod'

const today = new Date()
const birthDateThreshold = new Date(
  today.getFullYear() - 12,
  today.getMonth(),
  today.getDate(),
)
const imageFileSchema = z
  .instanceof(File, { error: 'Upload a image file' })
  .refine((file) => file.type.startsWith('image/'), {
    message: 'Invalid image file',
  })

// step 1
export const personalInformationSchema = z.object({
  name: z
    .string('Name is required')
    .trim()
    .min(3, 'Name must be at least 3 characters long'),
  email: z
    .email('Email must be provided')
    .min(6, 'Email must be at least 3 characters long'),
  phoneNumber: z
    .string('Phone number is required')
    .trim()
    .regex(/^01[3-9]\d{2}-?\d{6}$/, {
      message: 'Invalid Bangladesh phone number',
    }),
  bloodGroup: z.enum(
    ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    'Invalid Birth Group',
  ),
  dateOfBirth: z
    .date('Invalid Date of Birth')
    .refine(
      (date) => date < birthDateThreshold,
      'You must be at least 12 years old to register',
    ),
  gender: z.enum(['male', 'female', 'intersex'], { error: 'Invalid Gender' }),
})

// step 2
export const locationInformationSchema = z
  .object({
    permanentDistrict: z
      .string('Permanent District must be provided')
      .min(1, 'Permanent District must be provided'),
    permanentUpazila: z
      .string('Permanent upazila must be provided')
      .min(1, 'Permanent upazila must be provided'),
    currentSameAsPermanent: z.boolean(),
    currentDistrict: z.string().optional(),
    currentUpazila: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.currentSameAsPermanent) {
      return
    }

    if (!data.currentDistrict) {
      ctx.addIssue({
        code: 'custom',
        path: ['currentDistrict'],
        message: 'Current District is required',
      })
    }

    if (!data.currentUpazila) {
      ctx.addIssue({
        code: 'custom',
        path: ['currentUpazila'],
        message: 'Current upazila is required',
      })
    }
  })

// step 3 (either brn or nid)
export const IDInformationSchema = z
  .object({
    idType: z.enum(['NID', 'BRN']),
    nidNumber: z.string().trim().optional(),
    nidImage1: imageFileSchema.optional(),
    nidImage2: imageFileSchema.optional(),
    brnNumber: z
      .string()
      .trim()
      .length(17, 'Birth Registration Number must be 17 digits')
      .optional(),
    brnDate: z.date().optional(),
    parentPhoneNumber: z
      .string()
      .trim()
      .regex(/^01[3-9]\d{2}-?\d{6}$/, {
        message: 'Invalid Bangladesh phone number',
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    // Conditional validation for NID
    if (data.idType === 'NID') {
      if (!data.nidNumber || data.nidNumber.length === 0) {
        ctx.addIssue({
          code: 'custom',
          message: 'NID Number is required',
          path: ['nidNumber'],
        })
      } else if (!/^\d+$/.test(data.nidNumber)) {
        ctx.addIssue({
          code: 'custom',
          message: 'NID must be digits',
          path: ['nidNumber'],
        })
      } else if (data.nidNumber.length !== 10 && data.nidNumber.length !== 17) {
        ctx.addIssue({
          code: 'custom',
          message: 'NID must be 10 or 17 digits long',
          path: ['nidNumber'],
        })
      }
      if (!data.nidImage1) {
        ctx.addIssue({
          code: 'custom',
          message: 'NID Images are required',
          path: ['nidImage1'],
        })
      } else if (!data.nidImage2) {
        ctx.addIssue({
          code: 'custom',
          message: 'Back of NID is required',
          path: ['nidImage2'],
        })
      }
    } else {
      if (!data.brnNumber || data.brnNumber.length === 0) {
        ctx.addIssue({
          code: 'custom',
          message: 'BRN Number is required',
          path: ['brnNumber'],
        })
      }
      if (!data.brnDate) {
        ctx.addIssue({
          code: 'custom',
          message: 'Invalid Input',
          path: ['brnDate'],
        })
      }
      if (!data.parentPhoneNumber || data.parentPhoneNumber.length === 0) {
        ctx.addIssue({
          code: 'custom',
          message: 'Parent Phone Number is required',
          path: ['parentPhoneNumber'],
        })
      }
    }
  })

// step 4
export const passwordSchema = z
  .object({
    password: z
      .string('A strong password is required')
      .min(8, 'Password must be at least 8 characters long')
      .max(32, 'Password must be at most 32 characters long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(
        /[^A-Za-z0-9]/,
        'Password must contain at least one special character',
      ),
    confirmPassword: z.string('Field cannot be empty').trim().min(8).max(32),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

// step 5
export const profilePictureSchema = z.object({
  profilePicture: imageFileSchema,
  agreeTerms: z.boolean(),
})

export const volunteerRegistrationFormSchema = personalInformationSchema
  .and(locationInformationSchema)
  .and(IDInformationSchema)
  .and(passwordSchema)
  .and(profilePictureSchema)

export type VolunteerRegistrationFormValue = z.infer<
  typeof volunteerRegistrationFormSchema
>
