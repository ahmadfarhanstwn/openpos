import React, {useCallback, useEffect, useState} from 'react'
import { IUser } from '../../redux/api/types'
import { AppBar, Box, Button, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography, useTheme } from '@mui/material'
import FlexBetween from '../FlexBetween'
import { ArrowDropDownOutlined, Menu as MenuIcon, Notifications, Search, SettingsOutlined} from '@mui/icons-material'
import { useSignOutUserMutation } from '../../redux/api/authApi'
import { toast } from 'react-toastify'

interface INavbarProps {
    isSidebarOpen: boolean,
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>,
    user: IUser | null
}

const Navbar: React.FC<INavbarProps> = ({isSidebarOpen, setIsSidebarOpen, user}) => {
    const theme = useTheme()

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);

    const handleClick = (event: any) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    const [logoutUser, { isLoading, isSuccess, error, isError }] = useSignOutUserMutation()
    
    const handleSignOut = useCallback(() => {
        logoutUser()
    }, [logoutUser])

    useEffect(() => {
        if(isSuccess) {
            window.location.href = '/signin'
        }

        if (isError) {
            if (Array.isArray((error as any).data.error)) {
                (error as any).data.error.forEach((el: any) =>
                  toast.error(el.message, {
                    position: 'top-right',
                  })
                );
              } else {
                toast.error((error as any).data.message, {
                  position: 'top-right',
                });
              }
        }
    }, [isLoading])

    return (
        <AppBar sx={{position: 'static', background: 'none', boxShadow: 'none'}}>
            <Toolbar sx={{justifyContent: "space-between"}}>
                {/* LEFT SIDE */}
                <FlexBetween>
                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <MenuIcon />
                    </IconButton>
                    <FlexBetween 
                        bgcolor={theme.palette.background.default}
                        borderRadius="9px"
                        gap="3rem"
                        p="0.1 rem 1.5rem"
                    >
                        <InputBase placeholder="Search..." />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                </FlexBetween>
                {/* RIGHT SIDE */}
                <FlexBetween>
                    <IconButton>
                        <Notifications />
                    </IconButton>
                    <IconButton>
                        <SettingsOutlined />
                    </IconButton>
                    <FlexBetween>
                        <Button
                        onClick={handleClick}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            textTransform: "none",
                            gap: "1rem",
                        }}
                        >
                            {/* <Box
                                component="img"
                                alt="profile"
                                src={profileImage}
                                height="32px"
                                width="32px"
                                borderRadius="50%"
                                sx={{ objectFit: "cover" }}
                            /> */}
                            <Box textAlign="left">
                                <Typography
                                    fontWeight="bold"
                                    fontSize="0.85rem"
                                    sx={{ color: theme.palette.secondary.main }}
                                >
                                {user?.full_name}
                                </Typography>
                                <Typography
                                    fontSize="0.75rem"
                                    sx={{ color: theme.palette.secondary.main }}
                                >
                                {user?.role}
                                </Typography>
                            </Box>
                            <ArrowDropDownOutlined
                                sx={{ color: theme.palette.secondary.main, fontSize: "25px" }}
                            />
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={isOpen}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        >
                            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                        </Menu>
                    </FlexBetween>
                </FlexBetween>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar