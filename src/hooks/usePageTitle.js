
import { useEffect } from 'react'

export default function usePageTitle(pageTitle) {
  useEffect(() => {
    document.title = pageTitle
      ? `IdeaVault | ${pageTitle}`
      : 'IdeaVault | Startup Idea Sharing Platform'
  }, [pageTitle])
}
