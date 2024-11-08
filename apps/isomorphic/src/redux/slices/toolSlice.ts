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
    const serializedState = localStorage.getItem('toolsState');
    if (serializedState === null) {
      return {
        tools: [],
        //  nextId: 1,
        toolsData: {},
      };
    }
    return JSON.parse(serializedState) as ToolsState;
  } catch (err) {
    console.error('Error loading state:', err);
    return {
      tools: [],
      //  nextId: 1,
      toolsData: {},
    };
  }
};

const initialState: ToolsState = loadState();

const cardsSlice = createSlice({
  name: 'tools',
  initialState,
  reducers: {
    addCard: {
      reducer: (state, action: PayloadAction<Field>) => {
        const { id } = action.payload;
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
        // state.nextId++;
        saveState(state);
      },
      prepare: (newCardId: number) => ({
        payload: { id: newCardId },
      }),
    },
    removeToolCard(state, action: PayloadAction<number>) {
      const idToRemove = action.payload;
      state.tools = state.tools.filter((tool) => tool.id !== idToRemove);
      delete state.toolsData[idToRemove];
      saveState(state);
    },
    clearAllTools(state) {
      state.tools = [];
      // state.nextId = 1;
      state.toolsData = {};
      saveState(state);
    },
    setToolsData(
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
  },
});

const saveState = (state: ToolsState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('toolsState', serializedState);
  } catch (error) {
    console.error('Error saving state:', error);
  }
};

export const { addCard, removeToolCard, clearAllTools, setToolsData } =
  cardsSlice.actions;

export default cardsSlice.reducer;
