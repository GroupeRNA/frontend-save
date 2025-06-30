import React, { useContext } from 'react'
import { SidebarContext } from '../context/sidebarContext'
import sidebar from '../data/constants/sidebar'
import { NavLink, useNavigate } from 'react-router-dom'

const Sidebar = () => {
    const navigate = useNavigate()
    const context = useContext(SidebarContext)

    const disconnect = () => {
        localStorage.clear();
        navigate("/")
    }

    return (
        <div className={`bg-white h-screen fixed shadow-lg transition-all duration-300 ${context.isClose ? "w-20" : "w-72"}`}>
            <a href="#" className="flex items-center p-4 border-b border-gray-200">
                <img 
                    className="h-12 w-12 object-cover border-br-20 -translate-y-1" 
                    src="" 
                    style={{ borderBottomRightRadius: "20px" }} 
                />
                {!context.isClose && <span className="ml-3 text-xl font-semibold">Notes</span>}
            </a>
            <ul className="p-4 space-y-2">
                {
                    sidebar.map((nav, key) => (
                        <li key={key}>
                            <NavLink 
                                to={nav.url}
                                className={({ isActive }) => 
                                    `flex items-center p-3 rounded-lg hover:bg-blue-50 ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700'}`
                                }
                            >
                                <i className={`${nav.icon} ${context.isClose ? 'text-xl' : 'mr-3'}`}></i>
                                {!context.isClose && <span>{nav.name}</span>}
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
            <div className="absolute bottom-5 left-1 right-1 px-2">
                <button 
                    onClick={disconnect}
                    className="flex items-center w-full p-3 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                    <i className="fa fa-sign-out transform -scale-x-100"></i>
                    {!context.isClose && <span className="ml-3">Déconnexion</span>}
                </button>
            </div>
        </div>
    )
}

export default Sidebar