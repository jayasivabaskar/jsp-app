// Context update...
export default function(state = {}, action) {
    switch (action.type) {
        case "CONTEXT_UPDATE_ACTION":
            return Object.assign({}, state, action.event);
        case "CLEAR_CONTEXT_ACTION":
            return (state = {});
        default:
            return state;
    }
}