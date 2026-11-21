
import usePageTitle from '../hooks/usePageTitle'
import HeroSlider from '../components/home/HeroSlider'
import TrendingIdeas from '../components/home/TrendingIdeas'
import CategorySection from '../components/home/CategorySection'
import HowItWorks from '../components/home/HowItWorks'
import JoinCta from '../components/home/JoinCta'

export default function Home() {
  usePageTitle('Home')

  return (
    <>
      <HeroSlider />
      <TrendingIdeas />
      <CategorySection />
      <HowItWorks />
      <JoinCta />
    </>
  )
}
