export interface RegistrationFormData {
  parentName: string
  fullName: string
  mobileNumber: string
  dateOfBirth: string
  skillset: string
  bowlingArm: string
  battingStyle: string
  photo: File | null
  cricHeroesLink: string
  jerseyName: string
  jerseyNumber: string
  jerseySize: string
  cricketExperience?: string
  gender?: string // Added for Kids category - Boy/Girl
}

export interface PaymentData {
  transactionId: string
  transactionScreenshot: File | null
}

export interface FieldErrors {
  [key: string]: string
}

export interface Category {
  id: string
  name: string
  icon: any
  color: string
  hoverColor: string
  bgColor: string
  textColor: string
  buttonGradient: string
  ageRequirement: string
  fee: string
}

export interface JerseySize {
  size: string
  chest: string
  label: string
}

export interface ValidationResult {
  isValid: boolean
  errors: FieldErrors
}