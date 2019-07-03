const initialState = {
    scriptInfo: [],
};

function rootReducer(state = initialState, action){
    switch(action.type) {
        case 'INPUT_SCRIPT':
            return Object.assign({}, state, {
                scriptInfo: state.scriptInfo.concat(action.payload)
            })

        default:
            return state;
    }
};

export default rootReducer;