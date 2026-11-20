import {
  Cpu,
  GraduationCap,
  HandHeart,
  HeartPulse,
  Landmark,
  Leaf,
  ShoppingBag,
  Sprout,
} from 'lucide-react'

export const categories = [
  { name: 'Technology', icon: Cpu, description: 'Software, AI tools and smart devices.' },
  { name: 'Health', icon: HeartPulse, description: 'Care, wellness and medical access.' },
  { name: 'Education', icon: GraduationCap, description: 'Better ways to teach and to learn.' },
  { name: 'Finance', icon: Landmark, description: 'Payments, savings and fair credit.' },
  { name: 'Agriculture', icon: Sprout, description: 'Farming, food supply and rural markets.' },
  { name: 'Sustainability', icon: Leaf, description: 'Recycling, clean energy and less waste.' },
  { name: 'E-commerce', icon: ShoppingBag, description: 'Online stores and local sellers.' },
  { name: 'Social Impact', icon: HandHeart, description: 'Community-first ideas that help people.' },
]

export function getCategory(name) {
  return categories.find((category) => category.name === name)
}
