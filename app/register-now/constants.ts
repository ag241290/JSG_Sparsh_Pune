import { UserCheck, Users, Trophy } from 'lucide-react'
import { Category, JerseySize } from './types'

export const categories: Category[] = [
  {
    id: 'male',
    name: 'Male',
    icon: UserCheck,
    color: 'bg-blue-600',
    hoverColor: 'hover:bg-blue-700',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-800',
    buttonGradient: 'from-blue-500 to-blue-600',
    ageRequirement: 'Born before 14 November 2013',
    fee: '₹800'
  },
  {
    id: 'female',
    name: 'Female',
    icon: Users,
    color: 'bg-pink-500',
    hoverColor: 'hover:bg-pink-600',
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-800',
    buttonGradient: 'from-pink-500 to-pink-600',
    ageRequirement: 'Born before 14 November 2013',
    fee: '₹800'
  },
  {
    id: 'kids',
    name: 'Kids',
    icon: Trophy,
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-800',
    buttonGradient: 'from-green-500 to-green-600',
    ageRequirement: 'Born on or after 14 November 2013 and before 14 November 2018',
    fee: '₹600'
  }
]

export const skillsets = ['Batsman', 'Bowler', 'All Rounder']

export const bowlingArms = ['Left Arm', 'Right Arm']

export const battingStyles = ['Left Handed', 'Right Handed']

export const genderOptions = ['Boy', 'Girl'] // Added for Kids category

export const jerseySizes: JerseySize[] = [
  { size: 'XXS', chest: '34', label: 'XXS (34) - Kids' },
  { size: 'XS', chest: '36', label: 'XS (36) - Kids/Adult' },
  { size: 'S', chest: '38', label: 'S (38) - Kids/Adult' },
  { size: 'M', chest: '40', label: 'M (40) - Adult' },
  { size: 'L', chest: '42', label: 'L (42) - Adult' },
  { size: 'XL', chest: '44', label: 'XL (44) - Adult' },
  { size: 'XXL', chest: '46', label: 'XXL (46) - Adult' },
  { size: 'XXXL', chest: '48', label: 'XXXL (48) - Adult' }
]