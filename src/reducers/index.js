const initialState = {
    scriptInfo: [],
    divHeight: [],
};

function rootReducer(state = initialState, action){
    switch(action.type) {
        case 'INPUT_SCRIPT':
            
            return Object.assign({}, state, {
                scriptInfo: state.scriptInfo.concat(action.payload)
            })
        
        case 'INPUT_DIV_HEIGHT':
            return Object.assign({}, state, {
                divHeight: state.divHeight.concat(action.payload),
            })

        default:
            return state;
    }
};

export default rootReducer;