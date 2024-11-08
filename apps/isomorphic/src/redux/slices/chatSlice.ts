import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Field {
  id: number;
}

interface CardsState {
  cards: Field[];
  // nextId: number;
}

const loadState = (): CardsState => {
  try {
    const serializedState = localStorage.getItem('cardsState');
    if (serializedState === null) {
      return { cards: [] };
    }
    return JSON.parse(serializedState) as CardsState;
  } catch (err) {
    console.error('Error loading state:', err);
    return { cards: [] };
  }
};

const initialState: CardsState = loadState();

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: {
      reducer: (state, action: PayloadAction<Field>) => {
        state.cards.push(action.payload);
        // state.nextId++;
        saveState(state);
      },
      prepare: (newCardId: number) => ({
        payload: { id: newCardId },
      }),
    },
    removeCard(state, action: PayloadAction<number>) {
      const idToRemove = action.payload;
      state.cards = state.cards.filter((card) => card.id !== idToRemove);
      saveState(state);
    },
    clearAllCards(state) {
      state.cards = [];
      // state.nextId = 1;
      saveState(state);
    },
  },
});

const saveState = (state: CardsState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cardsState', serializedState);
  } catch (error) {
    console.error('Error saving state:', error);
  }
};

export const { addCard, removeCard, clearAllCards } = cardsSlice.actions;

export default cardsSlice.reducer;
