import React from "react";
import PageHeader from "../PageHeader";
import MyNoteAccount from "./MyNoteAccount";

function MyNote() {
    return (
        <>
            <PageHeader title="My Note" ></PageHeader>
            <div className="px-4 py-2">
                <MyNoteAccount></MyNoteAccount>
            </div>

        
        </>
    )
}

export default MyNote;