import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { heroSlides } from '../../data/heroSlides'
import {
  CollaborationIllustration,
  IdeaSparkIllustration,
  InnovationIllustration,
} from './HeroIllustrations'

const visuals = {
  spark: IdeaSparkIllustration,
  innovation: InnovationIllustration,
  collaboration: CollaborationIllustration,
}

const AUTO_PLAY_MS = 7000

// Renders a router <Link> for pages and a plain <a> for same-page anchors
function CtaLink({ cta, className, children }) {
  if (cta.href) {
    return (
      <a href={cta.href} className={className}>
        {children}
      </a>
    )
  }
  return (
    <Link to={cta.to} className={className}>
      {children}
    </Link>
  )
}

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const goTo = useCallback((index) => {
    setCurrent((index + heroSlides.length) % heroSlides.length)
  }, [])

  // Auto-advance, unless paused or the visitor prefers reduced motion.
  // Depending on `current` restarts the timer after a manual click.
  useEffect(() => {
    if (isPaused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = setInterval(() => goTo(current + 1), AUTO_PLAY_MS)
    return () => clearInterval(timer)
  }, [current, isPaused, goTo])

  const slide = heroSlides[current]
  const Visual = visuals[slide.visual]

  return (
    <section
      aria-roledescription="carousel"
      aria-label="IdeaVault highlights"
      className="bg-base-200"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        <div
          key={slide.id}
          className="hero-slide grid items-center gap-10 lg:min-h-[26rem] lg:grid-cols-2 lg:gap-16"
          role="group"
          aria-roledescription="slide"
          aria-label={`Slide ${current + 1} of ${heroSlides.length}`}
          aria-live="polite"
        >
          <div>
            <h1 className="text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">{slide.headline}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-base-content/70">{slide.description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink cta={slide.primaryCta} className="btn btn-primary btn-lg">
                {slide.primaryCta.label}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </CtaLink>
              <CtaLink cta={slide.secondaryCta} className="btn btn-outline btn-lg">
                {slide.secondaryCta.label}
              </CtaLink>
            </div>
          </div>

          <div className="mx-auto aspect-[6/5] w-full max-w-lg rounded-[2rem] border border-base-300 bg-base-100 p-4 sm:p-6">
            <Visual />
          </div>
        </div>

        {/* Slide controls */}
        <div className="mt-10 flex items-center justify-between">
          <div className="flex items-center" role="group" aria-label="Choose a slide">
            {heroSlides.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Show slide ${index + 1}: ${item.tag}`}
                aria-current={index === current}
                className="group flex h-8 items-center px-1"
              >
                <span
                  className={`block h-2 rounded-full transition-all duration-300 ${
                    index === current ? 'w-10 bg-primary' : 'w-2 bg-base-300 group-hover:bg-primary/50'
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(current - 1)}
              className="btn btn-outline btn-circle btn-sm"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => goTo(current + 1)}
              className="btn btn-outline btn-circle btn-sm"
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
