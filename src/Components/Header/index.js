import { AppBar, Tab, Tabs, Toolbar, Typography, TextField, Autocomplete, Stack, InputBase, Button, ButtonGroup, IconButton, useTheme, useMediaQuery, Menu, MenuItem } from "@mui/material"
import { styled, alpha } from '@mui/material/styles';
// import {SearchIcon, AddShoppingCartIcon} from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { useNavigate } from 'react-router-dom'

import React, { useState } from "react"
import logo from "../../images/logo.avif"
import DrawerComp from "../DrawerComp";
import { useDispatch, useSelector } from "react-redux";

import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { logoutUser } from "../../Store/Slices/UserData";


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    margin: "0 auto",
    width: '60%',

}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));


export default function Header() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const theme = useTheme()
    // console.log(theme)

    const isMatch = useMediaQuery((theme.breakpoints.down("md")))
    // console.log(isMatch)

    const reduxUserData = useSelector((state) => state.UserReducer)
    // console.log(reduxUserData)

    const [tabValue, setTabValue] = useState(0)
    const Pages = ["About-Us", "Men", "Women", "Deal of the Day"]

    // Working on SubMenu
    const [anchorEl, setAnchorEl] = useState(null)
    const openMenu = Boolean(anchorEl)
    const handleTabClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)

    }
    const handleTabClose = () => {
        setAnchorEl(null)
    }
    const handleCart = () => {
        if (reduxUserData.user){
            navigate('/dashboard/my-cart')
        }
        else{
            alert("please log in to view cart")
        }
    }

    return (
        <div>
            <React.Fragment>
                <AppBar>
                    <Toolbar>
                        {isMatch ? (<>
                            <DrawerComp />
                            <img src={logo} width="80px" height="50px" style={{ padding: "10px", margin: "0 auto" }} />
                            <Search style={{ float: 'right', marginRight: "0" }}>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Looking for something?"
                                />
                            </Search>
                        </>)
                            : (<>
                                <img src={logo} width="80px" height="50px" style={{ padding: "10px" }} />
                                {/* <Typography sx={{ marginLeft: "2%", }} variant="h5" component="h1">
                                    AU Collection
                                </Typography> */}

                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Looking for something?"
                                    />
                                </Search>

                                {(reduxUserData.user) ? <>
                                    <Typography variant="body1" component='h4' onClick={() => navigate('/dashboard/my-profile')}>
                                        Welcome {reduxUserData.FirstName}
                                    </Typography>
                                    <Button variant="contained" color="secondary" sx={{ marginLeft: "auto" }} onClick={() => {
                                        dispatch(logoutUser())
                                        signOut(auth)

                                    }}>Log Out</Button>

                                </>
                                    : <>
                                        <Button variant="contained" color="secondary" sx={{ marginLeft: "auto" }} onClick={() => navigate('/login')}>Login</Button>
                                        <Button variant="contained" color="secondary" sx={{ marginLeft: "0.5%" }} onClick={() => navigate('/signup')} > Signup</Button>
                                    </>}




                                <IconButton color="secondary" aria-label="add to shopping cart" sx={{ marginLeft: "0.5%" }} size="large" onClick={handleCart} >
                                    <AddShoppingCartIcon />
                                </IconButton>



                            </>)}

                    </Toolbar>

                    <Toolbar>

                        <Tabs
                            textColor="white"
                            sx={{ margin: "0 auto", }}
                            value={tabValue}
                            indicatorColor="secondary"
                            onChange={(e, value) => setTabValue(value)}
                        >
                            {/* {Pages.map((page, index) => {
                                <Tab label={page} key={index} />
                            }
                            )} */}


                            <Tab label="Home" onClick={() => navigate("/dashboard")} />
                            <Tab label="About ELO" onClick={() => navigate("/about")} />
                            <Tab
                                label="Men"
                                id="men-tab"
                                onClick={handleTabClick}
                            // aria-aria-controls={openMenu ? 'men-menu' : undefined}
                            // aria-haspopup='true'
                            // aria-aria-expanded={openMenu ? 'true' : undefined}
                            />
                            <Tab label="Women" onClick={() => navigate("/women")} />
                            <Tab label="Deal of the Day" onClick={() => navigate("/day-deal")} />
                        </Tabs>

                        <Menu
                            id="men-menu"
                            anchorEl={anchorEl}
                            open={openMenu}
                            MenuListProps={{
                                "aria-labelledby": "men-tab"
                            }}
                            onClose={handleTabClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right"
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right"
                            }}
                        >
                            <MenuItem onClick={() => {
                                navigate("/men")
                                handleTabClose()
                            }}>
                                Top
                            </MenuItem>
                            <MenuItem onClick={() => {
                                navigate("/men")
                                handleTabClose()
                            }}>
                                Bottom
                            </MenuItem>
                            <MenuItem onClick={() => {
                                navigate("/men")
                                handleTabClose()
                            }}>
                                Accesories
                            </MenuItem>
                        </Menu>

                    </Toolbar>
                </AppBar>

                {/* <AppBar>
                    
                </AppBar> */}
            </React.Fragment>





        </div>
    )
}



{/* <Stack spacing={2} sx={{ width:"40%" , margin: "0 auto" }}>
                            <Autocomplete
                                freeSolo
                                id="free-solo-2-demo"
                                disableClearable
                                // options={top100Films.map((option) => option.title)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Search input"
                                        InputProps={{
                                            ...params.InputProps,
                                            type: 'search',
                                        }}
                                    />
                                )}
                            />
                        </Stack> */}




{/* <Tabs textColor="white">
                            <Tab label="abc" />
                            <Tab label="abc" />
                        </Tabs> */}




