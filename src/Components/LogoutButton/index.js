import { useDispatch } from "react-redux"

import { logoutUser } from "../../Store/Slices/UserData"

import { auth } from "../../config/firebase"
import { signOut } from "firebase/auth"


export default function LogoutButton() {

    const dispatch = useDispatch()
    dispatch(logoutUser())
    signOut(auth)
    alert("succesfully SSigned Out")
    
    // return <>
    // {
    // }
    // </>
}