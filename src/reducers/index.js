// Sample state & single reducer
const INITIAL_STATE = {
	eventName: "Webpack React Redux"
};

const reducerSample = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "FOO":
			return {
				...state,
				eventName: action.payload
			};
	}
	return state;
};

// Main reducers object
const reducers = {
	reducerA: reducerSample
};

export default reducers;
