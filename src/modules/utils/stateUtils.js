export const handleChangeState = (setState, state, field, value) => {
  setState({ ...state, [field]: value });
};
