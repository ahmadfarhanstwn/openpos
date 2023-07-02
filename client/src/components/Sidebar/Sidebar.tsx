import React, { useEffect, useState } from 'react'
import { IUser } from '../../redux/api/Types/userTypes'
import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme,  } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import FlexBetween from '../FlexBetween'
import { ChevronLeft, ChevronRightOutlined } from '@mui/icons-material'
import { SidebarValueLists } from './SidebarValueLists'

interface SidebarProps {
    isNonMobile: boolean,
    drawerWidth: string,
    isSidebarOpen: boolean,
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>,
    user: IUser | null
}

const Sidebar: React.FC<SidebarProps> = (
    {
        isNonMobile, isSidebarOpen, drawerWidth, setIsSidebarOpen, user
    }
) => {
    const defaultTheme = useTheme()

    const [ currentActivePage, setCurrentActivePage ] = useState('')

    const { pathname } = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        setCurrentActivePage(pathname.substring(1))
    }, [pathname])

    return (
        <Box>
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant='persistent'
                    anchor='left'
                    sx={{
                        width: drawerWidth,
                        '& .MuiDrawer-paper': {
                            color: defaultTheme.palette.secondary.main,
                            backgroundColor: defaultTheme.palette.background.default,
                            boxSizing: 'border-box',
                            borderWidth: isNonMobile? 0 : '2px',
                            width: drawerWidth
                        }
                    }}
                >
                    <Box width="100%">
                        <Box m="1.5rem 2rem 2rem 3rem">
                            <FlexBetween color={defaultTheme.palette.secondary.main}>
                                <Box display="flex" alignItems="center" gap="0.5rem">
                                    <Typography variant='h4' fontWeight='bold'>
                                        Open POS
                                    </Typography>
                                </Box>
                                {!isNonMobile && (
                                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                        <ChevronLeft />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List>
                            {SidebarValueLists.map(({ text, icon}) => {
                                if(!icon) {
                                    return (
                                        <Typography key={text} sx={{m: "2.25rem 0 1rem 3rem"}}>
                                            {text}
                                        </Typography>
                                    )
                                }
                                const lcText = text.toLowerCase()
                                return (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton 
                                            onClick={() => {
                                                navigate(`/${lcText}`);
                                                setCurrentActivePage(lcText)
                                            }}
                                            sx={{
                                                backgroundColor: currentActivePage === lcText ? defaultTheme.palette.secondary.main : 'transparent',
                                                color: currentActivePage === lcText ? defaultTheme.palette.primary.main : defaultTheme.palette.secondary.main
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    ml: "2rem", 
                                                    color: currentActivePage === lcText ? defaultTheme.palette.primary.main : defaultTheme.palette.secondary.main
                                                }}
                                            >
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text}>
                                                {currentActivePage === lcText && (
                                                    <ChevronRightOutlined sx={{ml: "auto"}} />
                                                )}
                                            </ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Box>
                </Drawer>
            )}
        </Box>
    )
}

export default Sidebar