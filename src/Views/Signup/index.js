import { useState } from "react";

import { Typography, Box, TextField, Link, Button } from "@mui/material";

import { auth, storage, db } from "../../config/firebase"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate } from "react-router-dom";


export default function Signup(props) {

    const navigate = useNavigate()

    const [data, setData] = useState({})
    // console.log("daya:", data)

    const updateData = (key, value) => {
        setData({ ...data, [key]: value })
    }



    const signupUser = async () => {
        console.log("signup data", data)

        try {
            const createRes = await createUserWithEmailAndPassword(auth, data.Email, data.Password)
            console.log(createRes)

            const uid = createRes.user.uid

            const profileImgRef = ref(storage, `Profile Images/${data.Email}`)
            const profileImgUpload = await uploadBytes(profileImgRef, data.ProfileImg[0])
            const profileImgUrl = await getDownloadURL(profileImgUpload.ref)
            console.log(profileImgUrl)

            data.profilePic = profileImgUrl
            data.uid = uid
            data.ProfileImg = []

            const docRes = await setDoc(doc(db, "users", uid), data)
            console.log(docRes)

            alert("successfully signedup")
            setData({ Email: "", ProfileImg: [], FirstName: "", LastName: "", Password: "" })

            navigate("/login")
        }

        catch (err) {
            console.log('Error:', err)
        }


    }

    return <>

        <div id="signupPage">
            <div id='SPFormHeading'>
                <Typography
                    variant="h3"
                    component="h2"
                    gutterBottom
                >
                    Create an Account
                </Typography>
            </div>

            <div id="SPFormContent">
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 2, width: '30ch', marginTop: '10px' },
                    }}
                    noValidate
                    autoComplete="off"
                    marginTop="20px"
                >
                    <div id="signup-firstName">
                        <TextField
                            required
                            className="signupField"
                            id="signup-firstName"
                            label="First Name"
                            variant="standard"
                            onChange={(e) => updateData("FirstName", e.target.value)}
                            value={data.FirstName}
                        // defaultValue="Ali"
                        // itemID="signup-name"

                        />
                    </div>

                    <div id="signup-lastName">
                        <TextField
                            required
                            className="signupField"
                            id="signup-lastName"
                            label="Last Name"
                            variant="standard"
                            onChange={(e) => updateData("LastName", e.target.value)}
                            value={data.LastName}
                        // defaultValue="Ali"
                        // itemID="signup-name"

                        />
                    </div>

                    <div>
                        <TextField
                            required
                            // id="standard-required"
                            id="signup-email"
                            className="signupField"
                            label="Email"
                            variant="standard"
                            type="email"
                            onChange={(e) => updateData("Email", e.target.value)}
                            value={data.Email}
                        // defaultValue="Ali"
                        // itemID="signup-email"
                        />
                    </div>

                    <div>
                        <TextField
                            required
                            // id="standard-required"
                            id="signup-password"
                            className="signupField"
                            label="Password"
                            variant="standard" onChange={(e) => updateData("Password", e.target.value)}
                            value={data.Password}
                            type="password"
                        // itemID="signup-password"
                        />
                    </div>

                    <div>
                        <TextField
                            required
                            // id="standard-required"
                            id="signup-file"
                            className="signupField"
                            label="Profile Picture"
                            variant="standard"
                            type="file"
                            onChange={(e) => updateData("ProfileImg", e.target.files)}
                        // itemID="signup-file"

                        />
                    </div>

                    <Button variant="contained" color="primary" onClick={signupUser} > Sign Up</Button>

                </Box>

            </div>
        </div>



        <hr />

        <Typography
            variant="body1"
        >
            Already have an account?
            <Link href="/login" color="primary" variant="subtitle1" underline="hover" sx={{ fontWeight: "bold" }}> Login</Link>
        </Typography>







        {/* <form>
        <div>
            <label for="name"  >Name:</label>
            <input type="text" id="name" name="name" />
        </div>

        <div>
            <label for="email"  >Email:</label>
            <input type="email" id="email" name="email" />
        </div>

        <div>
            <label for="pasword"  >Pasword:</label>
            <input type="pasword" id="pasword" name="pasword" />
        </div>

        <div>
            <label for="image"  >Image:</label>
            <input type="file" id="image" name="image" />
        </div>

    </form> */}

    </>
}

