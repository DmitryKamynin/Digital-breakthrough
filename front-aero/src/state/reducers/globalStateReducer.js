import { GET_SUCCES, ERROR, OPEN_CHANGE_FORM, CLOSE_CHANGE_FORM, OPEN_CREATE_FORM, CLOSE_CREATE_FORM, OPEN_COMMENTS, CLOSE_COMMENTS } from '../../constants' 

export const globalStateReducer = (currentState, { type, data, unit, person, issue, id }) => {
    switch (type) {
        case 'DELETE_PERSONS':
            {const state = {...currentState};
            const ID = state.persons.findIndex(item => id === item.id);
            state.persons.splice(ID, 1)
            return state;}
        case 'DELETE_UNITS':
            {const state = {...currentState};
            const ID = state.units.findIndex(item => id === item.id);
            state.units.splice(ID, 1)
            return state;}
        case 'DELETE':
            {const state = {...currentState};
            const ID = state.issues.findIndex(item => id === item.id);

            state.issues.splice(ID, 1);
            return state;}
        case 'CHANGE_PERSON':
            {const state = {...currentState};
            const ID = state.persons.findIndex(item => person.id === item.id);
            state.persons[ID] = person;
            return state;}
        case 'CREATED_PERSON':
            {const state = {...currentState};
            state.persons.push(person)
            return state;}
        case 'CHANGE_UNITS':
            {const state = {...currentState};
            const ID = state.units.findIndex(item => unit.id === item.id);
            state.units[ID] = unit;
            return state;}
        case 'CREATED_UNITS':
            {const state = {...currentState};
            state.units.push(unit)
            return state;}
        case 'CHANGE':
            {const state = {...currentState};
            const ID = state.issues.findIndex(item => issue.id === item.id);
            state.issues[ID] = issue;
            return state;}
        case 'CREATED':
            {const state = {...currentState};
            state.issues.push(issue)
            return state;}
        case CLOSE_COMMENTS:
            return {
                ...currentState, 
                comments: false,
            }
        case OPEN_COMMENTS:
            return {
                ...currentState, 
                comments: true,
            }
        case CLOSE_CREATE_FORM:
            return {
                ...currentState, 
                create_form: false,
            }
        case OPEN_CREATE_FORM:
            return {
                ...currentState, 
                create_form: true,
            }
        case CLOSE_CHANGE_FORM:
            return {
                ...currentState, 
                change_form: false,
            }
        case OPEN_CHANGE_FORM:
            return {
                ...currentState, 
                change_form: true,
                id,
            }
        case GET_SUCCES:
            return {
                ready: true,
                issues: data[0].data,
                units: data[1].data,
                persons: data[2].data,
            }
        case ERROR:
            return {
                ready: true,
                issues: [],
                units: [],
                persons: [],
            }
        default:
          throw new Error('Error in Reducer');
    }
}