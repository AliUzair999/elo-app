import { useSelector, useDispatch } from "react-redux"

import { add, remove } from "../../Store/Actions/TestAction"
import { logoutUser } from "../../Store/Slices/UserData"

import { auth } from '../../config/firebase'

import { signOut } from 'firebase/auth'

import bgImage from "../../images/cover.jpg"

import { Box, List, ListItem, ListItemText, Typography } from "@mui/material"


export default function Dashboard(props) {
    const dispatch = useDispatch()
    const reduxState = useSelector((state) => state)
    console.log(reduxState)

    // console.log(auth?.currentUser?.uid)

    return <>

        <img src={bgImage} alt="bgImage" id="homeBgImg" />
        <br />
        <br />

        <div>
            <Typography variant="h4" component='h2' color="secondary" sx={{ textAlign: "center", fontWeight: "bolder" }}>Latest in Men's Collection</Typography>
        </div>

        <div>

        </div>




        {/* <h1>This is Dashboard PaAge</h1> */}
        <Box sx={{ marginLeft: "2rem", padding: "1rem" }}>
            <Typography variant="h6" color='secondary' component='h2'>
                This is Dashboard Page
            </Typography>
            <br />

            <Typography variant="text1" color='primary' component='p' sx={{ fontWeight: "bold" }}>
                Dashboard is under development. For the time being, feel free to explore the following functionalites;
                <List sx={{ listStyleType: 'decimal', marginLeft: "30px" }}>
                    
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText>Conditional Rendering Login/Logout Buttons</ListItemText>
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText>Protectied Routing - React Router Dom</ListItemText>
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText>Add to Favorite Functionality - React Redux</ListItemText>
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText>Cart Page with Empty Cart and Remove Item Actions</ListItemText>
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText>Individual Product Pages - Dynamic Routing</ListItemText>
                    </ListItem>

                </List>
                <br />

            </Typography>


            <Typography variant="text1" color='primary' component='p' sx={{ fontWeight: "bold" }}>
                Firebase is used in the project for the following functionalities;
                <List sx={{ listStyleType: 'disc', marginLeft: "30px" }}>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText>Authetication</ListItemText>
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText>Firestore Database</ListItemText>
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText>Storage</ListItemText>
                    </ListItem>
                </List>


            </Typography>
        </Box>



        {/* <p>Redux name value: {reduxState}</p> */}

        {/* <button onClick={() => { dispatch(add()) }}>Add Redux state</button>
        <button onClick={() => { dispatch(remove()) }}>Remove Redux state</button>
        <button onClick={() => {
            dispatch(logoutUser())
            signOut(auth)

        }}>Log out / Remove Redux User</button> */}


    </>
}

