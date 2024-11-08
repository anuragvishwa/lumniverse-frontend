import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InputState {
  isEdit: boolean;
}

const initialState: InputState = {
  isEdit: false,
};

const loadState = (): InputState => {
  try {
    const serializedState = localStorage.getItem('extraStates');
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState) as InputState;
  } catch (err) {
    console.error('Error loading state:', err);
    return initialState;
  }
};

const saveState = (state: InputState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('extraStates', serializedState);
  } catch (error) {
    console.error('Error saving state:', error);
  }
};

const userInputSlice = createSlice({
  name: 'extraSlices',
  initialState: loadState(),
  reducers: {
    // setClickedSession(state, action: PayloadAction<any>) {
    //   state.clickedSession = action.payload;
    //   saveState(state);
    // },
    setIsEdit(state, action: PayloadAction<boolean>) {
      state.isEdit = action.payload;
      saveState(state);
    },
  },
});

export const { setIsEdit } = userInputSlice.actions;

export default userInputSlice.reducer;
