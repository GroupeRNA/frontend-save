import { createContext, useState } from "react";
import Sidebar from "../components/sidebar";

export const SidebarContext = createContext()

const SidebarLayout = ({ children }) => {
    const [isClose, setIsClose] = useState(false)

    const handleClose = () => {
        setIsClose(!isClose)
    }

    return (
        <SidebarContext.Provider value={{ isClose, handleClose }}>
            <Sidebar/>
            {children}
        </SidebarContext.Provider>
    )
}

export default SidebarLayout