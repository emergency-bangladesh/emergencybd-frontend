export interface User {
  name: string
  uuid: string
  type: 'general_user' | 'volunteer'
  email: string
  phoneNumber: string
}
