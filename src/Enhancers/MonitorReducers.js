const round = number => Math.random(number * 100) / 100;

const monitorReducersEnhancer = createStore => (reducer, initialState, enhancer) => {
    const monitorReducers = (state, action) => {
        const start = performance.now();
        const newState = reducer(state, action);
        const end = performance.now();
        const diff = round(end - start);
        // eslint-disable-next-line no-console
        console.log("%Reducer process time in seconds:", "color:green", diff);

        return newState;
    };

    return createStore(monitorReducers, initialState, enhancer);
};

export default monitorReducersEnhancer;