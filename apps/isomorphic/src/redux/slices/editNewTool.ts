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
    const versionId = localStorage.getItem('versionId');
    const serializedState = localStorage.getItem(
      `${versionId}_editNewToolState`
    );
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
  name: 'editNewTool',
  initialState,
  reducers: {
    addEditNewToolCard: {
      reducer: (state, action: PayloadAction<{ id: number; data: string }>) => {
        const { id, data } = action.payload;
        if (!state.newTools) {
          state.newTools = [];
        }
        if (!state.newToolData) {
          state.newToolData = {};
        }
        state.newTools.push({ id });
        state.newToolData[id] = data;
        // state.nextId++;
        saveState(state);
      },
      prepare: (newCard: { id: number; data: string }) => ({
        payload: newCard,
      }),
    },
    removeEditNewToolCard(state, action: PayloadAction<number>) {
      const idToRemove = action.payload;
      state.newTools = state.newTools.filter(
        (new_tool) => new_tool.id !== idToRemove
      );
      delete state.newToolData[idToRemove];
      saveState(state);
    },
    clearAllEditNewTool(state) {
      state.newTools = [];
      // state.nextId = 1;
      state.newToolData = {};
      saveState(state);
    },
    setEditNewToolData(
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
    setNewToolCards: (state, action: PayloadAction<NewToolState>) => {
      state.newTools = action.payload.newTools;
      state.newToolData = action.payload.newToolData;
      // state.nextId = action.payload.nextId;
      saveState(state);
    },
  },
});

const saveState = (state: NewToolState) => {
  try {
    const versionId = localStorage.getItem('versionId');
    const serializedState = JSON.stringify(state);
    localStorage.setItem(`${versionId}_editNewToolState`, serializedState);
  } catch (error) {
    console.error('Error saving state:', error);
  }
};

export const {
  addEditNewToolCard,
  removeEditNewToolCard,
  clearAllEditNewTool,
  setEditNewToolData,
  setNewToolCards,
} = cardsSlice.actions;

export default cardsSlice.reducer;
