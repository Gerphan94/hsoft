import React from 'react';

import { FaBottleDroplet, FaJar, FaSyringe, FaPills } from "react-icons/fa6";
import { MdMoreHoriz } from "react-icons/md";
import { GiDrippingTube, GiPaperBagFolded } from "react-icons/gi";
import { BsBoxFill, BsHandbagFill } from "react-icons/bs";
import { FaPen } from "react-icons/fa";


const iconMapping = {
    'VIÊN': FaPills,
    'CHAI': FaBottleDroplet,
    'LỌ': FaJar,
    'ỐNG': GiDrippingTube,
    'GÓI': GiPaperBagFolded,
    'HỘP': BsBoxFill,
    'BƠMTIÊM': FaSyringe,
    'TÚI': BsHandbagFill,
    'BÚTTIÊM': FaPen
};

const ItemComponent = ({ dvt }) => {

    const formatDVT = dvt.toUpperCase().replace(/\s/g, '')
    const IconComponent = iconMapping[formatDVT] || MdMoreHoriz;
    return (
        <div className='text-[#304463]'>
            <IconComponent  />
        </div>
    );
};

export default ItemComponent;
