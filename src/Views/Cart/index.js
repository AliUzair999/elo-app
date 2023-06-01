import { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"

// import { db } from "../../config/firebase"
// import { doc, getDoc } from "firebase/firestore"
import { Button, ButtonGroup, Typography } from "@mui/material";

import CartTable from "../../Components/CartTable";

import { emptyCart } from "../../Store/Slices/CartSlice";
import { useDispatch, useSelector } from "react-redux";


export default function Cart() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentUid = useSelector(state =>state.UserReducer.uid) 
    const cartAvailable = useSelector((state) => state.CartReducer[currentUid])
    console.log(cartAvailable)
    console.log(useSelector((state) => state))

    return <>

        <div>
            <div id="CPHeading" className="m-4 p-4 ">
                <Typography variant="h4" component='h2'>
                    Shopping Cart
                    <hr id="CPHeadingHr" />
                </Typography>
            </div>

            {cartAvailable ? <>
                <div className="m-4 p-2">
                <CartTable />
            </div>

            <div className="mx-auto mt-8 w-2/12" >
                <Button variant="contained" color="secondary" className="p-2" size="large" onClick={()=> dispatch(emptyCart({currentUID:currentUid}))}> Empty Cart</Button>
            </div>
            </> 
            : <Typography variant="text1" component="p">You cart is Empty</Typography>
            }

            
        </div>


    </>
}

