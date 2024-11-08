import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExpandedKeysState {
  expandedKeys: { [key: string]: boolean };
}

const initialState: ExpandedKeysState = {
  expandedKeys: {},
};

const expandedKeysSlice = createSlice({
  name: 'expandedKeys',
  initialState,
  reducers: {
    setExpandedKeys(state, action: PayloadAction<{ [key: string]: boolean }>) {
      // Always merge the new key state into the existing state
      state.expandedKeys = { ...state.expandedKeys, ...action.payload };
    },
  },
});

export const { setExpandedKeys } = expandedKeysSlice.actions;
export default expandedKeysSlice.reducer;
