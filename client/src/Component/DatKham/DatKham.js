import React, { useState } from 'react';

import LichHenSai from './LichHenSai';
import AppointmentCreateModal from './TaoLichModal'
import styles from "../styles.module.css"



function DatKham({ site }) {

    const [modalShow, setModalShow]= useState(false);


    return (
        <>
        <div className='p-4 flex justify-between'>
        <div className="text-xl font-bold text-left">
            ĐẶT KHÁM
        </div>
        <button 
        className={`${styles.btn} ${styles.btnNew}`}
        onClick={() => setModalShow(true)}
        >Tạo lịch
        </button>
        </div>
        
        <LichHenSai site={site} />
        {modalShow &&
        <AppointmentCreateModal site={site} setModalShow={setModalShow}/>
        }
        

        </>
    )
}
export default DatKham;