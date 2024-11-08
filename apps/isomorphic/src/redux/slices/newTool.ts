import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Field {
  id: number;
}

interface NewToolState {
  newTools: Field[];
  // nextId: number;
  newToolData: { [key: number]: string };
}

const loadState = (): NewToolState => {
  try {
    const serializedState = localStorage.getItem('newToolState');
    if (serializedState === null) {
      return { newTools: [], newToolData: {} };
    }
    return JSON.parse(serializedState) as NewToolState;
  } catch (err) {
    console.error('Error loading state:', err);
    return { newTools: [], newToolData: {} };
  }
};

const initialState: NewToolState = loadState();

const cardsSlice = createSlice({
  name: 'newTool',
  initialState,
  reducers: {
    addNewToolCard: {
      reducer: (state, action: PayloadAction<{ id: number; data: string }>) => {
        const { id, data } = action.payload;
        state.newTools.push({ id });
        state.newToolData[id] = data;
        // state.nextId++;
        saveState(state);
      },
      prepare: (newCard: { id: number; data: string }) => ({
        payload: newCard,
      }),
    },
    removeNewToolCard(state, action: PayloadAction<number>) {
      const idToRemove = action.payload;
      state.newTools = state.newTools.filter(
        (new_tool) => new_tool.id !== idToRemove
      );
      delete state.newToolData[idToRemove];
      saveState(state);
    },
    clearAllNewTool(state) {
      state.newTools = [];
      // state.nextId = 1;
      state.newToolData = {};
      saveState(state);
    },
    setNewToolData(
      state,
      action: PayloadAction<{
        id: number;
        value: string;
      }>
    ) {
      const { id, value } = action.payload;
      state.newToolData[id] = value;
      saveState(state);
    },
  },
});

const saveState = (state: NewToolState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('newToolState', serializedState);
  } catch (error) {
    console.error('Error saving state:', error);
  }
};

export const {
  addNewToolCard,
  removeNewToolCard,
  clearAllNewTool,
  setNewToolData,
} = cardsSlice.actions;

export default cardsSlice.reducer;
