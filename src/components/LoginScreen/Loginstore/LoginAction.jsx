export const _setLoginDetails = (state, action) => {
  state.loginDetails = action.payload;
};

export const _setLoginPermissions = (state, action) => {
  state.permissions = action.payload;
};
