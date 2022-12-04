import React from 'react'
import Navbar from '../components/Navbar'
import NFTCard from '../components/NFTCard'

function Home() {
  return (
    <>
      <Navbar />
      <div>
        <h1 className="text-2xl font-bold mx-10 mt-5 text-white">List of Assets</h1>
        <section className="pb-10">
          <div className="grid lg:grid-cols-3 grid-cols-1 md:px-4">
            <NFTCard />
            <NFTCard />
            <NFTCard />
            <NFTCard />
            <NFTCard />
            <NFTCard />
          </div>
        </section>
      </div>
    </>
  )
}

export default Home