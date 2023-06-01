const initialState = { name: "ali" }

export default function TestReducer(state = initialState, action) {

    switch (action.type) {
        case "add":
            return { ...state, name: "uzair" }
        case "remove":
            return { ...state, name: null }
        default :
            return state
    }
}
    
    