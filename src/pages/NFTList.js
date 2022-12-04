import React from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar';

function NFTList() {
    const [formInput, updateFormInput] = useState({
        price: "",
        name: "",
        description: "",
    });
    return (
        <>
            <Navbar />
            <div className="flex justify-center">
                <div className="w-1/2 flex flex-col pb-12">
                    <input
                        placeholder="Asset Name"
                        className="mt-8 border rounded p-4"
                        onChange={(e) =>
                            updateFormInput({ ...formInput, name: e.target.value })
                        }
                    />
                    <textarea
                        placeholder="Asset Description"
                        className="mt-2 border rounded p-4"
                        onChange={(e) =>
                            updateFormInput({ ...formInput, description: e.target.value })
                        }
                    />
                    <input
                        placeholder="Asset Price in Eth"
                        className="mt-2 border rounded p-4"
                        onChange={(e) =>
                            updateFormInput({ ...formInput, price: e.target.value })
                        }
                    />

                    <input
                        type="file"
                        name="Asset"
                        className="my-4"
                    // onChange={onChange}
                    />

                    <button
                        // onClick={listNFTForSale}
                        className="font-bold mt-4 bg-gray-800 text-white rounded p-4 shadow-lg"
                    >
                        Create NFT
                    </button>
                </div>
            </div>
        </>
    )
}

export default NFTList