const initialState = {
  result: null,
};

const resultreducer = (state = initialState, action) => {
  if (action.type === "UPDATE") {
    return Object.assign({}, state, {
        result: action.result
    });
  } else {
    return state;
  }
};

export default resultreducer;
