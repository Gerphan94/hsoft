import React from "react";

function MyNoteAccount() {


    const accoountData = [
        { 'site': 'HCM', 'user': 'duyth1', 'password': 'dev3', 'personel': 'ThS.BS Trần Hữu Duy', 'pin': '020657'  },
        { 'site': 'HN', 'user': 'namnst', 'password': 'abc@123', 'personel': 'TBSCKII. Ngô Sỹ Thanh Nam', 'pin': '898989'  },
    ]
    return (
        <>
        <div className="px-40 py-10">
            <div className="text-left font-bold py-1">USER ACCOUNT</div>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Site</th>
                        <th>User</th>
                        <th>Pwd</th>
                        <th  className="text-left py-1">Personel</th>
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
                            <td className="text-left">{item.personel}</td>
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