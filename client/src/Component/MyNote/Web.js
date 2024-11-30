import React from "react";

function Web() {

    const accoountData = [
        { 'name': 'Web Dinh dưỡng HCM', 'link': 'http://172.20.9.16:6234/', 'user': 'itdev', 'password': 'dinhduongAbc@123!@#2024', },
    ]
    return (
        <>
            <div className="px-40 py-10">
                <div className="text-left font-bold py-1 uppercase">Website</div>
                <table>
                    <thead>
                        <tr>
                            <th>Tên</th>
                            <th>Link</th>
                            <th>User</th>
                            <th>Pwd</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accoountData.map((item, index) => (
                            <tr key={index}>
                               
                                <td>{item.name}</td>
                                <td>
                                    <a className="text-blue-600 hover:underline" href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a>
                                    </td>
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

export default Web;