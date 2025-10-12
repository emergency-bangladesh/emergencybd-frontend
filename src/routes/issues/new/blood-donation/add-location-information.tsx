import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useCallback } from 'react'
import { BloodDonationInfo } from './-info'
import { BloodDonationIssueStepper } from './-stepper'
import type { BloodDonationIssueFormValue } from '@/features/issue-reporting/blood-donation/form/form-schema'
import { useBloodDonationIssueForm } from '@/features/issue-reporting/blood-donation/form/use-blood-donation-issue-form'
import {
  FieldErrorInfo,
  FormComboBox,
  FormTextArea,
  FormTextInput,
} from '@/components/ui/form'
import { DISTRICT_WITH_UPAZILA_OR_THANA } from '@/constants'
import { BackButton } from '@/components/back-button'
import { validateBloodDonationLocationInformationStep } from '@/features/issue-reporting/blood-donation/form/form-step-validation'
import { NextButton } from '@/components/next-button'
import { useLanguage } from '@/integrations/language/use-language'

export const Route = createFileRoute(
  '/issues/new/blood-donation/add-location-information',
)({
  component: AddLocationInformationSection,
})

const districtOptions = DISTRICT_WITH_UPAZILA_OR_THANA.map((district) => ({
  value: district.name,
  label: district.name,
}))

const fieldNames = ['hospitalName', 'district', 'upazila', 'specialInstruction']
const title = {
  en: 'Add Location Information',
  bn: 'লোকেশন তথ্য দিন',
}
const hospitalNameLabel = {
  en: "Hospital's Name",
  bn: 'হাসপাতালের নাম',
}
const hostpitalNamePlaceholder = {
  en: 'Name of Hospital',
  bn: 'হাসপাতালের নাম',
}
const districtLabel = { en: 'District', bn: 'জেলা' }
const upazilaLabel = { en: 'Upazila/Thana', bn: 'উপজেলা/থানা' }
const specialInstructionLabel = {
  en: 'Special Instruction (within 10,000 characters)',
  bn: 'বিশেষ নির্দেশাবলী (১০,০০০ অক্ষরের মধ্যে)',
}
const specialInstructionPlaceholder = {
  en: 'Add instructions, if any',
  bn: 'নির্দেশনা যোগ করুন, যদি থাকে',
}

function AddLocationInformationSection() {
  const navigate = useNavigate()
  const form = useBloodDonationIssueForm()
  const { language } = useLanguage()

  async function handleNextButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    e.stopPropagation()

    const values = form.state.values
    const isValid = validateBloodDonationLocationInformationStep(values)

    if (!isValid) {
      fieldNames.forEach((fieldName) => {
        form.setFieldMeta(
          fieldName as keyof BloodDonationIssueFormValue,
          (prev) => ({
            ...prev,
            isTouched: true,
          }),
        )
      })

      await Promise.all(
        fieldNames.map((fieldName) =>
          form.validateField(
            fieldName as keyof BloodDonationIssueFormValue,
            'submit',
          ),
        ),
      )

      return
    }

    navigate({ to: '/issues/new/blood-donation/add-contact-information' })
  }

  const getAllUpazilaOrThana = useCallback((district: string | undefined) => {
    if (!district) return []

    const districtData = DISTRICT_WITH_UPAZILA_OR_THANA.find(
      (d) => d.name === district,
    )
    if (!districtData) return []

    return districtData.allUpazilaOrThana.map((u) => ({ value: u, label: u }))
  }, [])
  return (
    <>
      <BloodDonationIssueStepper currentStep={2} />
      <div id="title" className="text-center">
        <h3>{title[language]}</h3>
      </div>
      <BloodDonationInfo />
      <form id="form-fields" className="flex flex-col gap-6 w-full">
        <form.Field name="hospitalName">
          {(field) => (
            <div className="flex flex-col gap-1">
              <FormTextInput
                field={field}
                label={hospitalNameLabel[language]}
                placeholder={hostpitalNamePlaceholder[language]}
                id="hospitalName"
              />
              <FieldErrorInfo field={field} />
            </div>
          )}
        </form.Field>
        <div className="grid grid-cols-2 gap-3">
          <form.Field name="district">
            {(districtField) => (
              <div className="flex flex-col gap-1">
                <FormComboBox
                  field={districtField}
                  label={districtLabel[language]}
                  placeholder={
                    language === 'en' ? 'Select District' : 'জেলা নির্বাচন করুন'
                  }
                  id="permanentDistrict"
                  options={districtOptions}
                  searchPlaceholder={
                    language === 'en' ? 'Search districts' : 'জেলা খুঁজুন'
                  }
                  noResultsMessage={
                    language === 'en'
                      ? 'No districts found.'
                      : 'এমন কোনো জেলা নেই'
                  }
                  onChangeExtra={() =>
                    form.setFieldValue('upazila', undefined!)
                  }
                />
                <FieldErrorInfo field={districtField} />
              </div>
            )}
          </form.Field>
          <form.Subscribe selector={(state) => state.values.district}>
            {(district) => (
              <form.Field name="upazila">
                {(field) => (
                  <div className="flex flex-col gap-1">
                    <FormComboBox
                      field={field}
                      label={upazilaLabel[language]}
                      placeholder={
                        language === 'en'
                          ? 'Select Upazila/Thana'
                          : 'উপজেলা/থানা নির্বাচন করুন'
                      }
                      id="permanentUpazila"
                      options={getAllUpazilaOrThana(district)}
                      disabled={!district}
                      searchPlaceholder={
                        language === 'en'
                          ? 'Search Upazila/Thana'
                          : 'উপজেলা/থানা খুঁজুন'
                      }
                      noResultsMessage={
                        language === 'en'
                          ? 'No upazila found.'
                          : 'এমন কোনো উপজেলা নেই'
                      }
                    />
                    <FieldErrorInfo field={field} />
                  </div>
                )}
              </form.Field>
            )}
          </form.Subscribe>
        </div>

        <form.Field name="specialInstruction">
          {(field) => (
            <FormTextArea
              field={field}
              label={specialInstructionLabel[language]}
              placeholder={specialInstructionPlaceholder[language]}
              id="specialInstruction"
            />
          )}
        </form.Field>
        <div className="grid grid-cols-2 items-center w-full max-w-lg justify-center gap-3">
          <BackButton to="/issues/new/blood-donation/add-basic-information" />
          <NextButton onClick={handleNextButtonClick} />
        </div>
      </form>
    </>
  )
}
