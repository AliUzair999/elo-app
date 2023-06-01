import {useSelector} from "react-redux"

export default function Profile(props) {

    const reduxstate = useSelector((state) => state.TestReducer.name)
    console.log(reduxstate)

    return <>
    <h1>This is My Profile Page</h1>

    <p>Redux state value {reduxstate}</p>
    
    </>
}

