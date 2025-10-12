import z from 'zod'

export const teamCreationFormSchema = z.object({
  teamName: z
    .string('Team name is required')
    .trim()
    .min(3, 'Team name must be at least 3 characters long'),
  expirationDate: z.date('A valid date is required'),
  coLeaderEmail: z.email('Invalid email address').optional(),
})

export type TeamCreationFormValue = z.infer<typeof teamCreationFormSchema>
