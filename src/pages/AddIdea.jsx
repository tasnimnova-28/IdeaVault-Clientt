import { PlusCircle } from 'lucide-react'
import PagePlaceholder from '../components/common/PagePlaceholder'

export default function AddIdea() {
  return (
    <PagePlaceholder
      icon={PlusCircle}
      title="Add Idea"
      description="The form for sharing a new startup idea is coming in a later batch."
      isPrivate
    />
  )
}
