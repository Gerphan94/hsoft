import React, { useEffect, useMemo, useState } from "react";
import PageHeader from "../PageHeader";
import ButtonMenu from "./ButtonMenu";
import { FcManager, FcCurrencyExchange, FcConferenceCall } from "react-icons/fc";

import PhieuTheoDoiKhangSinh from "./PhieuTheoDoiKhangSinh";

function DanhSachPhieu() {


    const menuList = useMemo(() => [
        { id: 'theodoikhangsinh', name: 'Theo dõi kháng sinh', icon: <FcManager /> },
    ], []);

    const [selectedMenu, setSelectedMenu] = useState('');

    const [title, setTitle] = useState('');

    useEffect(() => {


        setTitle(selectedMenu.name);


    }, [selectedMenu.id]);


    return (
       <>
        <PageHeader title="Danh sách phieu" ></PageHeader>
        <div className="flex justify-between items-center p-2">
            <div className="font-bold uppercase ">{title}</div>
            <div className="">
                <ButtonMenu menuData={menuList} setSelectedMenu={setSelectedMenu} />

            </div>
        </div>
        <div>
            {selectedMenu.id === 'theodoikhangsinh' && <PhieuTheoDoiKhangSinh /> }
        </div>
       </>
    );
}

export default DanhSachPhieu;