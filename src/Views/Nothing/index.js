import {useSelector} from "react-redux"

export default function Nothing(props) {

    const reduxstate = useSelector((state) => state.TestReducer.name)
    console.log(reduxstate)

    return <>
    <h1>This is My Nothing Page</h1>

    <p>Redux state value {reduxstate}</p>
    
    </>
}

