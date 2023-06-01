import { Typography, Box, TextField, Button, FormControl, InputLabel, MenuItem, Select, FormHelperText } from "@mui/material"

import { useState } from "react"

import {storage, db} from "../../config/firebase"
import {getDownloadURL, ref, uploadBytes} from "firebase/storage"
import {collection, addDoc} from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import {useSelector} from "react-redux"
import { add } from "../../Store/Actions/TestAction"


export default function CreateAd(props) {

    const navigate = useNavigate()
    const reduxUserData = useSelector((state) => state.UserReducer)
    // console.log(reduxUserData) 
    const uid = reduxUserData.uid
    

    const [adData, setAdData] = useState({Category: "", listing: "", Uid: uid})
    // console.log(adData)

    const updateAdData = (key, value) => {
        setAdData({ ...adData, [key]: value })
    }

    let ImagesURl = [];

    const createNewAd = async () => {
        console.log(adData)

        try {
            

            for (let i = 0; i < adData.Images.length; i++) {
                let imageRef = ref(storage, "Ads/" + adData.Name + [i])
                let imageUpload = await uploadBytes(imageRef, adData.Images[i])
                let imageURL = await getDownloadURL(imageUpload.ref)
                console.log(imageURL)
                ImagesURl.push(imageURL)
            }

            adData.ImagesURl = ImagesURl
            delete adData.Images
            
            const docCollection = adData.Category
            const docRef = await addDoc(collection(db, docCollection), adData)
            console.log(docRef)

            alert("successfully Posted")

            setAdData({ Name: "", Description: "", Price: "", ImagesURl: [], Category:"", listing: ""  })
            ImagesURl = []

            // navigate("/dashboard")

        }
        catch (e) {
            console.log(e.message)
        }



    }

    return <>

        <div id="createAdPage">
            <div id='CAFormHeading'>
                <Typography
                    variant="h4"
                    component="h2"
                    gutterBottom
                >
                    Add a new article
                </Typography>
            </div>

            <div id="CAFormContent">
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
                        <FormControl required sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="createAd-category">Category</InputLabel>
                            <Select
                                labelId="createAd-category"
                                // id="demo-simple-select-required"
                                value={adData.Category}
                                label="Select Category *"
                                onChange={(e) => updateAdData("Category", e.target.value)}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="Men">Men</MenuItem>
                                <MenuItem value="Women">Women</MenuItem>
                            </Select>
                            <FormHelperText>Required</FormHelperText>
                        </FormControl>
                    </div>

                    {/* <div>
                        <FormControl required sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="createAd-listing">listing</InputLabel>
                            <Select
                                labelId="createAd-listing"
                                // id="demo-simple-select-required"
                                value={adData.listing}
                                label="Select Listing *"
                                onChange={(e) => updateAdData("listing", e.target.value)}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="Top">Top</MenuItem>
                                <MenuItem value="Bottom">Bottom</MenuItem>
                                <MenuItem value="Accessories">Accessories</MenuItem>
                            </Select>
                            <FormHelperText>Required</FormHelperText>
                        </FormControl>
                    </div> */}

                    <div>

                        <TextField
                            required
                            className="createAdField"
                            id="createAd-name"
                            label="Item Name"
                            variant="standard"
                            onChange={(e) => updateAdData("Name", e.target.value)}
                            value={adData.Name}
                        />
                    </div>

                    <div>

                        <TextField
                            required
                            className="createAdField"
                            id="createAd-description"
                            label="Item Description"
                            variant="standard"
                            onChange={(e) => updateAdData("Description", e.target.value)}
                            value={adData.Description}
                        />
                    </div>

                    <div>
                        <TextField
                            required
                            id="createAd-email"
                            className="createAdField"
                            label="Price"
                            variant="standard"
                            type="number"
                            onChange={(e) => updateAdData("Price", e.target.value)}
                            value={adData.Price}
                        />
                    </div>

                    {/* <div>
                        <TextField
                            required
                            id="createAd-file"
                            className="createAdField"
                            label="Item Images"
                            variant="standard"
                            type="file"
                            onChange={(e) => updateAdData("Images", e.target.files)}
                            multiple
                        />
                    </div> */}

                    <input
                        type="file"
                        placeholder="Item Images"
                        id="createAd-file"
                        multiple
                        onChange={(e) => updateAdData("Images", e.target.files)}
                        style={{ borderBottom: "2px solid black", margin: "20px 0 40px 15px", width: "30ch", fontSize: "16px" }}
                    ></input>
                    <br />

                    <Button variant="contained" color="primary" onClick={createNewAd} > Create An Ad</Button>

                </Box>

            </div>
        </div>


    </>
}

