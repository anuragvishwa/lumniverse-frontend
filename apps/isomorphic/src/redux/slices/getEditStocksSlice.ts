import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Field {
  id: number;
}

interface getStocksPriceState {
  getStocksPrice: Field[];
  // nextId: number;
  getStocksData: { [key: number]: string };
}

const loadState = (): getStocksPriceState => {
  try {
    const versionId = localStorage.getItem('versionId');
    const serializedState = localStorage.getItem(
      `${versionId}_getEditStocksPriceState`
    );
    if (serializedState === null) {
      return {
        getStocksPrice: [],
        // nextId: 1,
        getStocksData: {},
      };
    }
    return JSON.parse(serializedState) as getStocksPriceState;
  } catch (err) {
    console.error('Error loading state:', err);
    return {
      getStocksPrice: [],
      // nextId: 1,
      getStocksData: {},
    };
  }
};

const initialState: getStocksPriceState = loadState();

const cardsSlice = createSlice({
  name: 'getEditStocksPrice',
  initialState,
  reducers: {
    addEditGetStocksCard: {
      reducer: (state, action: PayloadAction<Field>) => {
        const { id } = action.payload;
        if (!state.getStocksPrice) {
          state.getStocksPrice = [];
        }
        if (!state.getStocksData) {
          state.getStocksData = {};
        }
        // if (!state.nextId) {
        //   state.nextId = 1;
        // }
        state.getStocksPrice.push({ id });
        state.getStocksData[id] = JSON.stringify({
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

    removeEditGetStocksCard(state, action: PayloadAction<number>) {
      const idToRemove = action.payload;
      state.getStocksPrice = state.getStocksPrice.filter(
        (get_stock_price) => get_stock_price.id !== idToRemove
      );
      delete state.getStocksData[idToRemove];
      saveState(state);
    },
    clearAllEditGetStocksPrice(state) {
      state.getStocksPrice = [];
      // state.nextId = 1;
      state.getStocksData = {};
      saveState(state);
    },
    setEditGetStocksData(
      state,
      action: PayloadAction<{
        id: number;
        value: string;
      }>
    ) {
      const { id, value } = action.payload;
      state.getStocksData[id] = value;
      saveState(state);
    },
    setGetStocksCards: (state, action: PayloadAction<getStocksPriceState>) => {
      state.getStocksPrice = action.payload.getStocksPrice;
      state.getStocksData = action.payload.getStocksData;
      // state.nextId = action.payload.nextId;
      saveState(state);
    },
  },
});

const saveState = (state: getStocksPriceState) => {
  try {
    const versionId = localStorage.getItem('versionId');

    const serializedState = JSON.stringify(state);
    localStorage.setItem(
      `${versionId}_getEditStocksPriceState`,
      serializedState
    );
  } catch (error) {
    console.error('Error saving state:', error);
  }
};

export const {
  addEditGetStocksCard,
  removeEditGetStocksCard,
  clearAllEditGetStocksPrice,
  setEditGetStocksData,
  setGetStocksCards,
} = cardsSlice.actions;

export default cardsSlice.reducer;
