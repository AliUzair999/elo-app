import { Box, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getDocs, collection } from "firebase/firestore"
import { db } from "../../config/firebase"

export default function Women() {

    // Redux State of User
    const reduxUser = useSelector((state) => state.UserReducer)
    console.log(reduxUser)
    let uid = reduxUser.uid

    const [womenTotalAds, setWomenTotalAds] = useState([])
    console.log("before useEffect", womenTotalAds)
    const [done, setDone] = useState(false)
    const [search, setSearch] = useState("")

    const navigate = useNavigate()

    // const [adNumber, setAdNumber] = useState(1)

    // const changeAdNumber = () => {
    //     setAdNumber(adNumber + 1)
    // }
    // const resetAdNumber = () => {
    //     setAdNumber(1)
    // }

    let adNo = 1

    useEffect(() => {
        async function getWomenData() {

            let adsSnapshot = await getDocs(collection(db, "Women"))
            let arr = []
            let womenAdData;
            adsSnapshot.forEach((doc) => {
                womenAdData = doc.data()
                womenAdData.adId = doc.id;
                // console.log(womenAdData)
                arr.push(womenAdData)
            })
            setWomenTotalAds(arr)
            console.log("after useEffect", womenTotalAds)
            setDone(true)
        }
        getWomenData()
    }, [])

    const showAd = (adId) => {
        // console.log(adId)
        navigate(`/dashboard/ad-detail/Women/${adId}`)
    }


    // const favAds = useSelector((state) => state.FavoriteReducer.ads)
    // // console.log("favAds", favAds)


    if (!done) {
        return <p>Loading</p>
    }

    else {
        return <>
            {/* <div style={{marginTop:"160px"}}> 
        </div> */}
            <Box margin="0 auto" padding="10" textAlign='center'>
                <Typography variant="h4" component="h2" color="secondary">
                    Women's Collection
                </Typography>
            </Box>


            <div id="adComponent">

                {/* {console.log("after return", womenTotalAds)} */}
                {/* <p>Total ads are;  </p> */}

                {womenTotalAds.map((val, ind) => {

                    {
                        if (!search) {
                            return <>
                                {(ind % 3 == 0) && <div className="clearingDiv"></div>}
                                {/* {console.log((ind + 1) % 3)} */}
                                <div key={ind} className="adView" onClick={() => showAd(val.adId)} style={{ cursor: "pointer" }}  >

                                    <img src={val.ImagesURl[0]} alt="Product Image" style={{ width: "100%", height: "100%", margin: "0 auto", marginBottom: "10px" }} />

                                    <Typography variant="h6" color='primary' component='p' sx={{ textTransform: "uppercase" }} > {val.Name} </Typography>

                                    <Typography variant="text1" color='primary' component='p' sx={{ fontWeight: "bold" }}> PKR {val.Price}.00 </Typography>


                                    {/* <button onClick={() => dispatch(add(val))}>Add to Favorites</button> */}
                                </div>
                            </>

                        }

                        else if (val.title.toLowerCase().includes(search.toLowerCase())) {
                            return <>
                                <div id={"ad" + (ind + 1)} key={"ad" + (ind + 1)} onClick={() => showAd(val.adId)}>

                                    <p key={"adp" + (ind + 1)} id={"adp" + (ind + 1)}> <img alt={"adi" + (ind + 1)} src={val.imagesURL[0]} width={30} height={30} key={"adi" + (ind + 1)} id={"adi" + (ind + 1)} /> {val.title}
                                        <br /> price: USD.{val.price}</p>

                                </div>
                            </>
                        }
                    }


                })}


            </div>
        </>

    }
}