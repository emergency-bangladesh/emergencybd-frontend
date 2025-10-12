import { createFileRoute, useNavigate } from '@tanstack/react-router'
import React, { useMemo } from 'react'
import { VolunteerRegistrationStepper } from './-stepper'
import type { VolunteerRegistrationFormValue } from '@/features/volunteer-registration/form/form-schema'
import { useVolunteerRegistrationForm } from '@/features/volunteer-registration/form/use-volunteer-registration-form'
import { FieldErrorInfo, FormTextInput } from '@/components/ui/form'
import { validateFormStepIDInformation } from '@/features/volunteer-registration/form/form-step-validation'
import { BackButton } from '@/components/back-button'
import { FileUpload } from '@/components/ui/file-upload'
import { NextButton } from '@/components/next-button'

export const Route = createFileRoute('/registration/volunteer/nid-information')(
  {
    component: NidInformationFormSection,
  },
)

function NidInformationFormSection() {
  const volunteerRegistrationForm = useVolunteerRegistrationForm()
  const navigate = useNavigate()

  volunteerRegistrationForm.setFieldValue('idType', 'NID')
  volunteerRegistrationForm.setFieldValue('brnDate', undefined)
  volunteerRegistrationForm.setFieldValue('parentPhoneNumber', undefined)
  volunteerRegistrationForm.setFieldValue('brnNumber', undefined)

  const fieldNames = useMemo(() => ['nidNumber', 'nidImage1', 'nidImage2'], [])

  async function handleNextButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    e.stopPropagation()

    const values = volunteerRegistrationForm.state.values
    const isValid = validateFormStepIDInformation(values)

    if (!isValid) {
      fieldNames.forEach((fieldName) => {
        volunteerRegistrationForm.setFieldMeta(
          fieldName as keyof VolunteerRegistrationFormValue,
          (prev) => ({
            ...prev,
            isTouched: true,
          }),
        )
      })

      await new Promise((resolve) => setTimeout(resolve, 0)) // flush touch state

      await Promise.all(
        fieldNames.map((fieldName) =>
          volunteerRegistrationForm.validateField(
            fieldName as keyof VolunteerRegistrationFormValue,
            'submit',
          ),
        ),
      )

      return
    }

    navigate({ to: '/registration/volunteer/set-password' })
  }

  return (
    <>
      <VolunteerRegistrationStepper currentStep={4} />
      <div id="title" className="text-center">
        <h3>Add NID Information</h3>
        <p>Add your NID number along with the image as proof</p>
      </div>
      <form id="form-fields" className="flex flex-col gap-6 w-full">
        <volunteerRegistrationForm.Field name="nidNumber">
          {(field) => (
            <div className="flex flex-col gap-1">
              <FormTextInput
                field={field}
                label="NID Number"
                placeholder="Your 10 or 17 digit NID number"
                id="nidNumber"
              />
              <FieldErrorInfo field={field} />
            </div>
          )}
        </volunteerRegistrationForm.Field>
        <volunteerRegistrationForm.Field name="nidImage1">
          {(nidImage1Field) => (
            <volunteerRegistrationForm.Field name="nidImage2">
              {(nidImage2Field) => {
                function setFilesToFields(files: Array<File>) {
                  nidImage1Field.handleChange(files[0])
                  nidImage2Field.handleChange(files[1])
                }
                return (
                  <div className="flex flex-col gap-1">
                    <FileUpload
                      maxFiles={2}
                      title="Upload NID"
                      description="Upload the front & back of your NID as proof"
                      acceptedTypes={['image/jpeg', 'image/png', 'image/webp']}
                      onFilesChange={setFilesToFields}
                      {...(!!nidImage1Field.state.value &&
                        !!nidImage2Field.state.value && {
                          initialFiles: [
                            nidImage1Field.state.value,
                            nidImage2Field.state.value,
                          ],
                        })}
                    />
                    <FieldErrorInfo field={nidImage1Field} />
                    <FieldErrorInfo field={nidImage2Field} />
                  </div>
                )
              }}
            </volunteerRegistrationForm.Field>
          )}
        </volunteerRegistrationForm.Field>

        <div className="grid grid-cols-2 items-center w-full max-w-lg justify-center gap-3">
          <BackButton to="/registration/volunteer/select-id-type" />
          <NextButton onClick={handleNextButtonClick} />
        </div>
      </form>
    </>
  )
}
