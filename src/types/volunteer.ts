export interface VolunteerData {
  volunteer_uuid: string
  fullName: string
  phoneNumber: string
  emailAddress: string
  permanentUpazila: string
  permanentDistrict: string
  currentUpazila: string
  currentDistrict: string
  bloodGroup: string
  status: 'pending' | 'verified'
  profilePictureSrc: string
  issueResponses: number
  teamInformation?: { teamName: string; role: string; teamUuid: string }
  createdAt: Date
}
