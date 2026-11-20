import { FolderOpen } from 'lucide-react'
import PagePlaceholder from '../components/common/PagePlaceholder'

export default function MyIdeas() {
  return (
    <PagePlaceholder
      icon={FolderOpen}
      title="My Ideas"
      description="Your own ideas, with edit and delete controls, will appear here in a later batch."
      isPrivate
    />
  )
}
