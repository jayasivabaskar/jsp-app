/* eslint-disable no-console */
const logger = store => next => action => {
    console.group(action.type);
    console.log("%Previous application state", "color:magenta", store.getState());
    console.info("%Action", "color:blue", action);
    let result = next(action);
    console.log("%Next application state", "color:magenta", store.getState());
    console.groupEnd();

    return result;
};

export default logger;