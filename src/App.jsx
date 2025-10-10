import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { lazy, Suspense } from 'react'
import LazyMount from './components/LazyMount'

const Vision = lazy(() => import('./components/Vision'))
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs'))
const Services = lazy(() => import('./components/Services'))
const Projects = lazy(() => import('./components/Projects'))
const Team = lazy(() => import('./components/Team'))
const Contact = lazy(() => import('./components/Contact'))
const TechStrip = lazy(() => import('./components/TechStrip'))
const Footer = lazy(() => import('./components/Footer'))
const ScrollTop = lazy(() => import('./components/ScrollTop'))

function App() {
  return (
    <div className="app" id="top">
      <Navbar />
      {/* Global background animations */}
      <div className="bg-parallax" aria-hidden>
        <div className="bg-parallax__glow" />
        <div className="bg-parallax__grid" />
      </div>
      <main>
        {/* Sentinel at the very top for IntersectionObserver */}
        <div id="top-anchor" aria-hidden style={{ height: 1 }} />
        <Hero />
        <Suspense fallback={null}>
          <LazyMount>
            <TechStrip />
          </LazyMount>
        </Suspense>
        <Suspense fallback={null}>
          <LazyMount>
            <Vision />
          </LazyMount>
        </Suspense>
        <Suspense fallback={null}>
          <LazyMount>
            <WhyChooseUs />
          </LazyMount>
        </Suspense>
        <Suspense fallback={null}>
          <LazyMount>
            <Services />
          </LazyMount>
        </Suspense>
        <Suspense fallback={null}>
          <LazyMount>
            <Projects />
          </LazyMount>
        </Suspense>
        <Suspense fallback={null}>
          <LazyMount>
            <Team />
          </LazyMount>
        </Suspense>
        <Suspense fallback={null}>
          <LazyMount>
            <Contact />
          </LazyMount>
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <LazyMount>
          <ScrollTop />
        </LazyMount>
      </Suspense>
      <Suspense fallback={null}>
        <LazyMount>
          <Footer />
        </LazyMount>
      </Suspense>
    </div>
  )
}

export default App
