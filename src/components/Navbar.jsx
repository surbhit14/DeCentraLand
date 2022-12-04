import React from 'react'

function Navbar() {
    return (
        <nav class="flex items-center justify-between flex-wrap bg-slate-700 p-6 lg:h-20">
            <div class="flex items-center flex-shrink-0 text-white mr-6">
                <span class="font-semibold text-xl tracking-tight">Decentralized Land</span>
            </div>
            <div class="block lg:hidden">
                <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                </button>
            </div>
            <div class="w-full block flex-grow lg:flex lg:items-center bg-slate-700 lg:w-auto lg:px-10">
                <div class="text-sm lg:flex-grow">
                    <a href="/" class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white text-base mr-4">
                        Home
                    </a>
                    <a href="/nftlist" class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white text-base mr-4">
                        List
                    </a>
                    <a href="/ownednfts" class="block mt-4 lg:inline-block lg:mt-0 text-white text-base hover:text-white">
                        View Owned NFTs
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar