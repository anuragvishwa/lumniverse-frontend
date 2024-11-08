import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Field {
  id: number;
}

interface getStocksPriceState {
  getStocksPrice: Field[];
  // nextId: number;
  getStocksData: { [key: number]: string };
  clickedSession?: any;
}

const loadState = (): getStocksPriceState => {
  try {
    const serializedState = localStorage.getItem('getStocksPriceState');
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
  name: 'getStocksPrice',
  initialState,
  reducers: {
    addGetStocksCard: {
      reducer: (state, action: PayloadAction<Field>) => {
        const { id } = action.payload;
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
    removeGetStocksCard(state, action: PayloadAction<number>) {
      const idToRemove = action.payload;
      state.getStocksPrice = state.getStocksPrice.filter(
        (get_stock_price) => get_stock_price.id !== idToRemove
      );
      delete state.getStocksData[idToRemove];
      saveState(state);
    },
    clearAllGetStocksPrice(state) {
      state.getStocksPrice = [];
      // state.nextId = 1;
      state.getStocksData = {};
      saveState(state);
    },
    setGetStocksData(
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
    setClickedSession(state, action: PayloadAction<any>) {
      state.clickedSession = action.payload;
    },
  },
});

const saveState = (state: getStocksPriceState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('getStocksPriceState', serializedState);
  } catch (error) {
    console.error('Error saving state:', error);
  }
};

export const {
  addGetStocksCard,
  removeGetStocksCard,
  clearAllGetStocksPrice,
  setGetStocksData,
  setClickedSession,
} = cardsSlice.actions;

export default cardsSlice.reducer;
