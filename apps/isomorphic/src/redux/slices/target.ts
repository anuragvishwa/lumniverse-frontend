import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Field {
  id: number;
}

interface TargetState {
  targetData: string;
}

const loadState = (): TargetState => {
  try {
    const versionId = localStorage.getItem('versionId');
    const serializedState = localStorage.getItem(`${versionId}_targetState`);
    if (serializedState === null) {
      return {
        targetData: '{}',
      };
    }
    return JSON.parse(serializedState) as TargetState;
  } catch (err) {
    console.error('Error loading state:', err);
    return {
      targetData: '{}',
    };
  }
};

const initialState: TargetState = loadState();

const targetSlice = createSlice({
  name: 'Target',
  initialState,
  reducers: {
    setTargetData(state, action: PayloadAction<string>) {
      state.targetData = action.payload;
      saveState(state);
    },
    // setTargetCard: (state, action: PayloadAction<TargetState>) => {
    //   state.target = action.payload.target;
    //   state.targetData = action.payload.targetData;
    //   saveState(state);
    // },
  },
});

const saveState = (state: TargetState) => {
  try {
    const versionId = localStorage.getItem('versionId');
    if (!versionId) {
      console.error('versionId is not set');
      return;
    }

    const serializedState = JSON.stringify(state);
    console.log('Attempting to save state:', serializedState); // Log the state being saved
    localStorage.setItem(`${versionId}_targetState`, serializedState);
    console.log('State saved successfully');
  } catch (error) {
    console.error('Error saving state:', error);
  }
};

export const { setTargetData } = targetSlice.actions;

export default targetSlice.reducer;
