import React from 'react'
import Features from '../../Components/OurFeatures/Features'
import FAQ from '../../Components/FAQ/FAQ'
import QuerySection from '../../Components/QuerySection/QuerySection'
import About from '../../Components/About/About'

function Home() {
  return (
    <div>
      <Features />
      <FAQ />
      <QuerySection />
      {/* <About /> */}
    </div>
  )
}

export default Home
