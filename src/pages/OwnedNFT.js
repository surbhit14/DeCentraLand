import React from 'react'
import Navbar from '../components/Navbar'
import NFTCard from '../components/NFTCard'

function OwnedNFT() {
    return (
        <>
            <Navbar />
            <div>
                <h1 className="text-2xl font-bold mx-10 mt-5 text-white">Owned Assets</h1>
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

export default OwnedNFT