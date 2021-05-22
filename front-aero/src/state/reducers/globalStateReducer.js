import { GET_SUCCES, ERROR } from '../../constants' 

export const globalStateReducer = (currentState, { type, data, units, persons, isues }) => {
    switch (type) {
        case GET_SUCCES:
            return {
                ready: true,
                issues: data[0].data,
                units: data[1].data,
                persons: data[2].data,
            }
        case ERROR:
            return {
                ready: false,
            }
        default:
          throw new Error('Error in authReducer');
    }
}