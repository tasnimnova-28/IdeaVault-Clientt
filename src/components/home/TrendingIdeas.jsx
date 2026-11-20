import { Link } from 'react-router-dom'
import SectionHeading from '../common/SectionHeading'
import IdeaCard from '../ideas/IdeaCard'
import { trendingIdeas } from '../../data/sampleIdeas'

export default function TrendingIdeas() {
  return (
    <section className="bg-base-100 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Trending ideas this week"
          description="The concepts getting the most attention and discussion from the community right now."
          action={
            <Link to="/ideas" className="btn btn-outline self-start sm:self-auto">
              View all ideas
            </Link>
          }
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trendingIdeas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      </div>
    </section>
  )
}
