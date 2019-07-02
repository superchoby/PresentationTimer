const initialState = {
    script: [],
};

function rootReducer(state = initialState, action){
    switch(action.type) {
        case 'INPUT_SCRIPT':
            return Object.assign({}, state, {
                script: state.script.concat(action.payload)
            })

        default:
            return state;
    }
};

export default rootReducer;