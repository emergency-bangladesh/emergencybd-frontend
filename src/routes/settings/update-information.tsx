import { createFileRoute } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import z from 'zod'
import { useCallback, useMemo } from 'react'
import { toast } from 'sonner'

import {
  FieldErrorInfo,
  FormAvatarUpload,
  FormComboBox,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { DISTRICT_WITH_UPAZILA_OR_THANA } from '@/constants'
import { useVolunteerQuery } from '@/queries/use-volunteer-query'
import { useAuth } from '@/features/auth/use-auth'
import { fetchBackend } from '@/lib/fetch-backend'
import { uploadProfilePic } from '@/features/volunteer-registration/actions/register-volunteer'
import { Loader } from '@/components/ui/loader'
import { RequireAuth } from '@/components/require-auth'

export const Route = createFileRoute('/settings/update-information')({
  component: UpdateInformationComponent,
})

function UpdateInformationComponent() {
  return (
    <RequireAuth allowedUserTypes={['volunteer']}>
      <div className="flex justify-center items-center max-w-lg w-full md:w-lg flex-col gap-8 mx-auto p-5">
        <div id="title" className="text-center">
          <h3 className="text-2xl font-bold">Update Personal Information</h3>
          <small className="text-muted-foreground">
            We are currently letting <strong>only volunteers</strong> to update
            their information. They can now (for v0.1) update their{' '}
            <strong>current location and profile picture</strong> only. We shall
            update it on later releases
          </small>
        </div>

        <VolunteerUpdateForm />
      </div>
    </RequireAuth>
  )
}

const volunteerUpdateSchema = z
  .object({
    currentDistrict: z.string().min(1, 'District is required').optional(),
    currentUpazila: z.string().min(1, 'Upazila is required').optional(),
    profilePicture: z.instanceof(File).optional(),
  })
  .refine(
    (data) => {
      if (data.currentDistrict) {
        return !!data.currentUpazila
      }
      return true
    },
    {
      message: 'Upazila is required if district is selected',
      path: ['currentUpazila'],
    },
  )
  .refine(
    (data) => {
      if (data.currentUpazila) {
        return !!data.currentDistrict
      }
      return true
    },
    {
      message: 'District is required if upazila is selected',
      path: ['currentDistrict'],
    },
  )

function VolunteerUpdateForm() {
  const { user } = useAuth()
  const { data: volunteerData } = useVolunteerQuery(user!.uuid)

  console.log({ volunteerData })

  const form = useForm({
    defaultValues: {
      currentDistrict: volunteerData?.currentDistrict,
      currentUpazila: volunteerData?.currentUpazila,
      profilePicture: undefined,
    } as z.infer<typeof volunteerUpdateSchema>,
    onSubmit: async ({ value }) => {
      try {
        if (value.currentDistrict && value.currentUpazila) {
          await fetchBackend(`/volunteers/update`, 'PATCH', {
            current_district: value.currentDistrict,
            current_upazila: value.currentUpazila,
          })
          toast.success('Information Updated')
        }
        if (value.profilePicture) {
          uploadProfilePic(user!.uuid, value.profilePicture)
          toast.success('Profile Picture Updated')
        }
      } catch (err) {
        toast.error('Something went wrong', {
          description: (err as Error).message,
        })
        console.error(err)
      }
    },
    validators: {
      onChange: volunteerUpdateSchema,
    },
  })

  const districtOptions = useMemo(
    () =>
      DISTRICT_WITH_UPAZILA_OR_THANA.map((district) => ({
        value: district.name,
        label: district.name,
      })),
    [],
  )

  const getAllUpazilaOrThana = useCallback((district: string | undefined) => {
    if (!district) return []

    const districtData = DISTRICT_WITH_UPAZILA_OR_THANA.find(
      (d) => d.name === district,
    )
    if (!districtData) return []

    return districtData.allUpazilaOrThana.map((u) => ({ value: u, label: u }))
  }, [])

  return (
    <form
      id="form-fields"
      className="flex flex-col justify-start gap-6 w-full"
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <small> Select profile picture to update: </small>
      <form.Field name="profilePicture">
        {(field) => (
          <div className="flex flex-col gap-1">
            <FormAvatarUpload
              field={field}
              buttonLabel="Upload Profile Picture"
              initialAvatarSrc={volunteerData?.profilePictureSrc}
            />
            <FieldErrorInfo field={field} />
          </div>
        )}
      </form.Field>
      <small className="mt-6"> Update current location: </small>
      <div className="grid grid-cols-2 gap-3">
        <form.Field name="currentDistrict">
          {(districtField) => (
            <div className="flex flex-col gap-1">
              <FormComboBox
                field={districtField}
                label="Current District"
                placeholder="Select District"
                id="currentDistrict"
                options={districtOptions}
                searchPlaceholder="Search districts..."
                noResultsMessage="No districts found."
                onChangeExtra={() =>
                  form.setFieldValue('currentUpazila', undefined)
                }
              />
              <FieldErrorInfo field={districtField} />
            </div>
          )}
        </form.Field>
        <form.Subscribe selector={(state) => state.values.currentDistrict}>
          {(currentDistrict) => (
            <form.Field name="currentUpazila">
              {(field) => (
                <div className="flex flex-col gap-1">
                  <FormComboBox
                    field={field}
                    label="Current upazila"
                    placeholder="Select upazila"
                    id="currentUpazila"
                    options={getAllUpazilaOrThana(currentDistrict)}
                    disabled={!currentDistrict}
                    searchPlaceholder="Search"
                    noResultsMessage="No upazila found."
                  />
                  <FieldErrorInfo field={field} />
                </div>
              )}
            </form.Field>
          )}
        </form.Subscribe>
      </div>

      <form.Subscribe
        selector={(state) => {
          return {
            canSubmit: state.canSubmit,
            isSubmitting: state.isSubmitting,
          }
        }}
      >
        {({ canSubmit, isSubmitting }) => (
          <Button
            type="submit"
            className="w-full"
            disabled={!canSubmit || isSubmitting}
          >
            {isSubmitting && <Loader />}
            Save Changes
          </Button>
        )}
      </form.Subscribe>
      <form.Subscribe>
        {(state) => {
          console.log(state)
          return <> </>
        }}
      </form.Subscribe>
    </form>
  )
}
