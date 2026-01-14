import React from 'react'
import Hero from '../../Components/Hero'
import FAQ from '../../Components/FAQ'
import QuerySection from '../../Components/QuerySection'
import About from '../../Components/About'

function Home() {
  return (
    <div>
      <Hero />
      <FAQ />
      <QuerySection />
      {/* <About /> */}
    </div>
  )
}

export default Home
