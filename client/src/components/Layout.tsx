import React, { useState } from 'react'
import {Box, useMediaQuery} from '@mui/material'
import { useSelector } from 'react-redux'
import { iUserState } from '../redux/features/userSlice'
import Sidebar from './Sidebar/Sidebar'
import Navbar from './Navbar/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    const isNonMobile = useMediaQuery("(min-width: 600px)")
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const userData = useSelector((state: iUserState) => state.user)

    return (
        <Box display={isNonMobile? 'flex' : 'block'} height="100%" width="100%">
            <Sidebar drawerWidth='250px' isNonMobile={isNonMobile} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} user={userData} />
            <Box flexGrow={1}>
                <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} user={userData} />
                <Outlet />
            </Box>
        </Box>
    )
}

export default Layout