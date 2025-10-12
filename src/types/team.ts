export type TeamData = {
  uuid: string
  name: string
  expirationDate: Date
  leaderUuid: string
  coLeaderUuid?: string
  membersCount: number
  createdAt: Date
  lastUpdated: Date
}

export type TeamPlanData = {
  planUuid: string
  title: string
  description: string
  teamUuid: string
  workingDistrict: string
  workingUpazila: string
  startDate: Date
  endDate: Date
  createdAt: Date
  lastUpdated: Date
}
