import type { LostAndFoundFormValue } from '../form/form-schema'
import { compressProfileImage } from '@/integrations/image-compression/image-compressor'
import { fetchBackend } from '@/lib/fetch-backend'

type LostAndFoundIssueCreatePayload = {
  full_name: string
  emergency_phone_number: string
  name_of_person: string
  age_of_person: number
  last_seen_location: string
  details: string
  district: string
  upazila: string
  blood_group: string | undefined
  occupation: string | undefined
  phone_number: string
  email_address: string
}

async function createLostAndFoundIssueOnServer(
  payload: LostAndFoundIssueCreatePayload,
): Promise<{ issue_uuid: string }> {
  const res = await fetchBackend('/issues/lost_and_found/new', 'POST', payload)
  const data = await res.json()
  return data.data
}

export async function uploadLostAndFoundImages(
  issue_uuid: string,
  images: Array<File>,
) {
  const compressedImages: Array<File> = []
  for (const image of images) {
    const compressedImage = await compressProfileImage(image)
    compressedImages.push(compressedImage)
  }

  const formData = new FormData()
  formData.append('issue_uuid', issue_uuid)
  for (const img of compressedImages) {
    formData.append('images', img, img.name)
  }

  const response = await fetchBackend(
    '/file-upload/issue/lost-and-found',
    'POST',
    formData,
    'multipart/form-data',
  )
  const data = await response.json()
  return data.data
}

export async function reportLostAndFoundIssue(value: LostAndFoundFormValue) {
  const payload: LostAndFoundIssueCreatePayload = {
    full_name: value.fullName,
    emergency_phone_number: value.emergencyContactNumber,
    name_of_person: value.personsName,
    age_of_person: value.age,
    last_seen_location: value.lastSeenLocation,
    details: value.details,
    district: value.district,
    upazila: value.upazila,
    blood_group: value.bloodGroup,
    occupation: value.occupation,
    phone_number: value.phoneNumber,
    email_address: value.emailAddress,
  }
  const { issue_uuid } = await createLostAndFoundIssueOnServer(payload)
  await uploadLostAndFoundImages(issue_uuid, value.images)

  return { issue_uuid }
}
