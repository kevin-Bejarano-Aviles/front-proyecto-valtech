/* eslint-disable quotes */
import React from "react"
import types from "./types"
/* eslint-disable default-param-last */
const Reducer = (state={},action)=>{
    switch(action.type){
        case types.login:
            return{
                state:true
            }
        case types.logout:
            return{
                state:false
            }
        default:
            return state
    }
}

export default Reducer;