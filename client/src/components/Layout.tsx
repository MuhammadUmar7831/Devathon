import React, { useEffect, useState } from 'react'
import Sidebar from './sidebar'
import Hamburger from 'hamburger-react'

export default function Layout({ children }) {

    const [isSidebarOpen, setSidebarOpen] = useState(true)
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    useEffect(() => {
        if (screenWidth < 768) {
            setSidebarOpen(false)
        }
        console.log(screenWidth > 768 || isSidebarOpen)
    }, [screenWidth])
    return (
        <div className='flex relative'>
            <span
                className={`absolute top-4 right-4 sm:hidden z-10 ${isSidebarOpen ? "text-white" : "text-gray-900"
                    }`}
            >
                <Hamburger toggled={isSidebarOpen} toggle={setSidebarOpen} />
            </span>
            {screenWidth > 768 || isSidebarOpen ? <Sidebar /> : <></>}
            {screenWidth > 768 || !isSidebarOpen ? children : <></>}
        </div>
    )
}
