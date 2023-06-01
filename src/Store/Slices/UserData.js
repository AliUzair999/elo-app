import { createSlice } from "@reduxjs/toolkit"

const initialState = { user: false }

const userData = createSlice({
    name: "user",
    initialState,
    // reducers: {
    //     loginUser(state, action) {
    //         state = action.payload
    //         // state.user = true
    //     },
    //     logoutUser(state) {
    //         // state = {}
    //         state.user = false
    //     },
    // },
    reducers: {
        loginUser: {
            reducer: (state, action) => {
                try {
                    console.log(action.payload)
                    return state = {...action.payload, user:true}
                }
                catch (err) {
                    console.log(err)
                }
            }
        },

        logoutUser(state) {
            return state = initialState
        }

    },


})

export const { loginUser, logoutUser } = userData.actions

export default userData.reducer