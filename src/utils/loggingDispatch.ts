import * as Redux from "redux";
import * as State from "../state";
 

/** A nice example of what javascript allows one to do without any worry. We can create our own dispatch function that uses the one
 * built in into Redux. This can then simply replace the built in dispatch function.
 * In this particular case, we will follow Gaeron and provide logging upon every dispatch. 
 * */
export const loggingDispatch = (store: Redux.Store<State.Model>) : ((action: State.ActionBase) => State.ActionBase) => {
    // Don't forget to call dispatch as a function, not as a store method; the latter results in infinite recursion)
    const {dispatch, getState} = store;    
    return (action: State.ActionBase) => {
        console.log('action:', action.type.toString());
        console.log("prev: ", getState());
        const res = dispatch(action);
        console.log("next: ", getState());
        return res;
    };
}
