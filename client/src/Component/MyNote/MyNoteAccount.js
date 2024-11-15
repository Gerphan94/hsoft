import React from "react";

function MyNoteAccount() {


    const accoountData = [
        { 'site': 'HCM', 'user': 'duyth1', 'password': 'VNaCrX3vMmY=', 'personel': 'ThS.BS Trần Hữu Duy', 'pin': '020657'  },
        { 'site': 'HCM', 'user': 'duyth1', 'password': 'VNaCrX3vMmY=', 'personel': 'ThS.BS Trần Hữu Duy', 'pin': '020657'  },

    ]

    return (
        <>
        <div className="px-10">
            <div className="text-left font-bold py-1">USER ACCOUNT</div>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Site</th>
                        <th>User</th>
                        <th>Pwd</th>
                        <th>Personel</th>
                        <th>Pin</th>
                        </tr>
                </thead>
                <tbody>
                    {accoountData.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.site}</td>
                            <td>{item.user}</td>
                            <td>{item.password}</td>
                            <td>{item.personel}</td>
                            <td>{item.pin}</td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>

        </div>

        </>
    )
   
}

export default MyNoteAccount;