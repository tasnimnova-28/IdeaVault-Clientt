import { MessagesSquare } from 'lucide-react'
import PagePlaceholder from '../components/common/PagePlaceholder'

export default function MyInteractions() {
  return (
    <PagePlaceholder
      icon={MessagesSquare}
      title="My Interactions"
      description="Ideas you have commented on will be listed here in a later batch."
      isPrivate
    />
  )
}
