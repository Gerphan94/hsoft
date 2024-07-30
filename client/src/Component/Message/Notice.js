import React, { useEffect } from "react";

function Notice({ message, setModalshow, type }) {

    useEffect(() => {
        const timer = setTimeout(() => {
            setModalshow(false);
        }, 3000);

        // Cleanup the timer if the component is unmounted before the time is up
        return () => clearTimeout(timer);
    }, []);

    

    return (
        <div className="relative">
            <div class="origin-top-right right-1 absolute bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
                <div className="flex gap-4 items-center">
                    <strong class="font-bold">{message}</strong>
                    {/* <span class="block sm:inline">Something seriously bad happened.</span> */}
                    <span class=" top-0 bottom-0 right-0">
                        <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                    </span>

                </div>

            </div>
        </div>
    );


}
export default Notice;