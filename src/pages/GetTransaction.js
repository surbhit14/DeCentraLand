import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

function GetTransaction() {
    // Covalent API Get transactions for a given address
    const [data, setData] = React.useState(null);
    const url = "https://api.covalenthq.com/v1/1/address/0x5a55fe7C4E1Eb4a14a2208FFeFDe42f7df2aA599/transactions_v2/?quote-currency=USD&format=JSON&block-signed-at-asc=false&no-logs=false&key=ckey_56cc686436a7424c8bf8d03ab0c"
    useEffect(() => {
        axios.get(url).then((response) => {
            setData(response.data);
        });
    }, []);
    console.log(data);

    return (
        <div>
            <h1>Get Transaction</h1>
        </div>

        // Display the data in a table
        // <div className="container">
        //     <table className="table table-striped">
        //         <thead>
        //             <tr>
        //                 <th>Block Height</th>
        //                 <th>From Address</th>
        //                 <th>To Address</th>
        //                 <th>Value</th>
        //                 <th>Gas Used</th>
        //                 <th>Gas Price</th>
        //                 <th>Gas Fee</th>
        //                 <th>Nonce</th>
        //                 <th>Hash</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {data.data.items.map((item, index) => (
        //                 <tr key={index}>
        //                     <td>{item.block_height}</td>
        //                     <td>{item.from_address}</td>
        //                     <td>{item.to_address}</td>
        //                     <td>{item.value}</td>
        //                     <td>{item.gas_used}</td>
        //                     <td>{item.gas_price}</td>
        //                     <td>{item.gas_fee}</td>
        //                     <td>{item.nonce}</td>
        //                     <td>{item.tx_hash}</td>
        //                 </tr>
        //             ))}
        //         </tbody>
        //     </table>
        // </div>



    )
}

export default GetTransaction