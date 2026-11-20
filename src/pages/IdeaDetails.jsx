import { FileText } from 'lucide-react'
import { useParams } from 'react-router-dom'
import PagePlaceholder from '../components/common/PagePlaceholder'

export default function IdeaDetails() {
  const { id } = useParams()

  return (
    <PagePlaceholder
      icon={FileText}
      title={`Idea #${id}`}
      description="The full idea page with problem, solution and comments is coming in a later batch."
      isPrivate
    />
  )
}
