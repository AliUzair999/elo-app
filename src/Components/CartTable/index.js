import { addToCart } from "../../Store/Slices/CartSlice";
import { useDispatch, useSelector } from "react-redux"
import { deleteCartItem } from "../../Store/Slices/CartSlice";

import { useNavigate } from "react-router-dom"

import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';

export default function CartTable() {

    const reduxState = useSelector((state) => state)
    // console.log(reduxState)
    const currentUid = reduxState.UserReducer.uid
    // console.log(currentUid)
    const reduxCart = useSelector((state) => state.CartReducer)
    // console.log(reduxCart)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    return <>
        <TableContainer component={Paper}>
            <Table aria-label="Cart Table" className="text-3xl" >
                <TableHead  >
                    <TableRow >
                        <TableCell sx={{color:"#f90", fontweight:"bold", fontSize:"24px"}}>Products</TableCell>
                        <TableCell></TableCell>
                        <TableCell sx={{color:"#f90", fontweight:"bold", fontSize:"24px"}}>Price</TableCell>
                        <TableCell sx={{color:"#f90", fontweight:"bold", fontSize:"24px"}}>Quantity</TableCell>
                        <TableCell sx={{color:"#f90", fontweight:"bold", fontSize:"24px"}}>Total</TableCell>
                        <TableCell></TableCell>
                    </TableRow>

                </TableHead>
                <TableBody>
                    {reduxCart[currentUid].map((val, ind) => {

                        return <TableRow key={ind} >
                            <TableCell className="w-[150px] h-[200]" ><img src={val.ImagesURl[0]} alt="profile" /></TableCell>
                            <TableCell sx={{fontSize:"20px", color:"#1770b5", fontWeight:"300"}}>{val.Name}</TableCell>
                            <TableCell sx={{fontSize:"16px", fontWeight:"500"}}>{val.Price}.00</TableCell>
                            <TableCell sx={{fontSize:"16px", fontWeight:"500"}}>Quantity</TableCell>
                            <TableCell sx={{fontSize:"16px", fontWeight:"500"}}>Total</TableCell>
                            <TableCell sx={{fontSize:"16px", fontWeight:"500"}}> <IconButton onClick={()=> dispatch(deleteCartItem({...val, currentUID:currentUid}))}><DeleteIcon/></IconButton></TableCell>
                        </TableRow>

                    })}


                </TableBody>
            </Table>
        </TableContainer>

    </>
}