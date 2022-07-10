const initialData = {
    bookings:[]
}



export const bookingsReducer = (state=initialData,action)=>{
    switch(action.type){

        case 'GET_ALL_BOOKINGS' :{
            return{
                bookings:action.payload
            }
        }

        default: return state
    }
} 

