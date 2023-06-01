import { Typography, Box, TextField, Link, Button } from "@mui/material";

import { loginUser } from "../../Store/Slices/UserData";
import { useDispatch } from "react-redux";

import {auth, db} from "../../config/firebase"
import {signInWithEmailAndPassword } from "firebase/auth"
import {doc, getDoc} from "firebase/firestore"

import { useState } from "react";
import {useNavigate} from 'react-router-dom'

export default function Login(props) {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [loginData, setLoginData] = useState({})



    // console.log(auth?.currentUser?.uid)

    const updateLoginData = (key, value) => {
        setLoginData({...loginData, [key]:value})
    }
    
    const LoginUser = async () => {
        console.log(loginData)

        try {

            const loginRes = await signInWithEmailAndPassword(auth, loginData.Email, loginData.Password )
            console.log(loginRes)
            const docRef = doc(db, "users", loginRes.user.uid)
            const docData = await getDoc(docRef)
            console.log(docData.data())
            dispatch(loginUser(docData.data()))
            alert("succesfullly signed in")
            navigate("/dashboard")
        }

        catch(err) {
            console.log(err.message)

        }


    }



    return <>

        <div id="loginPage">
            <div id='LPFormHeading'>
                <Typography
                    variant="h3"
                    component="h2"
                    gutterBottom
                >
                    Log In
                </Typography>
            </div>

            <div id="LPFormContent">
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 2, width: '30ch', marginTop: '10px' },
                    }}
                    noValidate
                    autoComplete="off"
                    marginTop="20px"
                >


                    <div>
                        <TextField
                            required
                            // id="standard-required"
                            id="login-email"
                            className="loginField"
                            label="Email"
                            variant="standard"
                            type="email"
                            onChange={(e) => updateLoginData("Email", e.target.value)}
                            value={loginData.Email}
                            // defaultValue="Ali"
                            // itemID="signup-email"
                        />
                    </div>

                    <div>
                        <TextField
                            required
                            // id="standard-required"
                            id="login-password"
                            className="loginField"
                            label="Password"
                            variant="standard"
                            type="password"
                            onChange={(e) => updateLoginData("Password", e.target.value)}
                            value={loginData.Password}
                            // defaultValue="123456"
                        // itemID="signup-password"
                        />
                    </div>

                    <Button variant="contained" color="primary" onClick={LoginUser} > Log In</Button>

                </Box>

            </div>

        </div>



        <hr />

        <Typography
            variant="body1"
        >
            New Customer?
            <Link href="/signup" color="primary" variant="subtitle1" underline="hover" sx={{fontWeight:"bold"}}> Signup</Link>
        </Typography>

    </>
}

