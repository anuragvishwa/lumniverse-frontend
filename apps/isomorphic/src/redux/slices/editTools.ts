import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Field {
  id: number;
}

interface ToolsState {
  tools: Field[];
  // nextId: number;
  toolsData: { [key: number]: string };
}

const loadState = (): ToolsState => {
  try {
    const versionId = localStorage.getItem('versionId');

    const serializedState = localStorage.getItem(`${versionId}_editToolsState`);
    if (serializedState === null) {
      return { tools: [], toolsData: {} };
    }
    return JSON.parse(serializedState) as ToolsState;
  } catch (err) {
    console.error('Error loading state:', err);
    return { tools: [], toolsData: {} };
  }
};

const initialState: ToolsState = loadState();

const cardsSlice = createSlice({
  name: 'editTools',
  initialState,
  reducers: {
    addEditCard: {
      reducer: (state, action: PayloadAction<Field>) => {
        const { id } = action.payload;
        if (!state.tools) {
          state.tools = [];
        }
        if (!state.toolsData) {
          state.toolsData = {};
        }
        // if (!state.nextId) {
        //   state.nextId = 1; // Initialize nextId if it's null
        // }
        state.tools.push({ id });
        state.toolsData[id] = JSON.stringify({
          type: 'object',
          properties: {
            ticker_symbol: {
              type: 'string',
              name: 'Ticker Symbol',
              description: 'Ticker symbol of the stock',
            },
          },
          required: [],
        });
        // state.nextId++; // Increment nextId for the next card
        saveState(state);
      },
      prepare: (newCardId: number) => ({
        payload: { id: newCardId },
      }),
    },

    removeEditToolCard(state, action: PayloadAction<number>) {
      const idToRemove = action.payload;
      state.tools = state.tools.filter((tool) => tool.id !== idToRemove);
      delete state.toolsData[idToRemove];
      saveState(state);
    },
    clearAllEditTools(state) {
      state.tools = [];
      // state.nextId = 1;
      state.toolsData = {};
      saveState(state);
    },
    setEditToolsData(
      state,
      action: PayloadAction<{
        id: number;
        value: string;
      }>
    ) {
      const { id, value } = action.payload;
      state.toolsData[id] = value;
      saveState(state);
    },
    setToolsCards: (state, action: PayloadAction<ToolsState>) => {
      state.tools = action.payload.tools;
      state.toolsData = action.payload.toolsData;
      // state.nextId = action.payload.nextId;
      saveState(state);
    },
  },
});

const saveState = (state: ToolsState) => {
  try {
    const versionId = localStorage.getItem('versionId');

    const serializedState = JSON.stringify(state);
    localStorage.setItem(`${versionId}_editToolsState`, serializedState);
  } catch (error) {
    console.error('Error saving state:', error);
  }
};

export const {
  addEditCard,
  removeEditToolCard,
  clearAllEditTools,
  setEditToolsData,
  setToolsCards,
} = cardsSlice.actions;

export default cardsSlice.reducer;
