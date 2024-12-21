import React from "react";
import PageHeader from "../PageHeader";
import MyNoteAccount from "./MyNoteAccount";
import Web  from "./Web";  
import NoteHsoft from "./NoteHsoft/NoteHsoft"; 
function MyNote() {
    return (
        <>
            <PageHeader title="My Note" ></PageHeader>
            <div className="px-4 py-2">
                <MyNoteAccount></MyNoteAccount>
                <Web></Web>
                <NoteHsoft></NoteHsoft>
            </div>

        
        </>
    )
}

export default MyNote;