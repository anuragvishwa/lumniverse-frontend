import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Field {
  id: number;
}

const storedSession = JSON.parse(
  localStorage.getItem('clickedSession') ?? 'null'
) as any;

interface CardsState {
  cards: Field[];
  // nextId: number;
}

const initialState: CardsState = {
  cards: storedSession?.cards?.cards,
  // nextId: storedSession?.cards?.nextId,
};

export const loadState = (): CardsState => {
  try {
    const versionId = localStorage.getItem('versionId');
    const serializedState = localStorage.getItem(
      `${versionId}_editChatCardsState`
    );
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState) as CardsState;
  } catch (err) {
    console.error('Error loading state:', err);
    return initialState;
  }
};

const cardsSlice = createSlice({
  name: 'editChatCards',
  initialState: loadState(),
  reducers: {
    addEditChatCard: {
      reducer: (state, action: PayloadAction<Field>) => {
        state.cards.push(action.payload);
        // state.nextId++;
        saveState(state);
      },
      prepare: (newCardId: number) => ({
        payload: { id: newCardId },
      }),
    },
    removeEditChatCard(state, action: PayloadAction<number>) {
      const idToRemove = action.payload;
      state.cards = state.cards.filter((card) => card.id !== idToRemove);
      saveState(state);
    },
    clearAllEditChatCards(state) {
      state.cards = [];
      // state.nextId = 1;
      saveState(state);
    },
    setCards: (state, action: PayloadAction<CardsState>) => {
      state.cards = action.payload.cards;
      // state.nextId = action.payload.nextId;
      saveState(state);
    },
  },
});

const saveState = (state: CardsState) => {
  try {
    const versionId = localStorage.getItem('versionId');

    const serializedState = JSON.stringify(state);
    localStorage.setItem(`${versionId}_editChatCardsState`, serializedState);
  } catch (error) {
    console.error('Error saving state:', error);
  }
};

export const {
  addEditChatCard,
  removeEditChatCard,
  clearAllEditChatCards,
  setCards,
} = cardsSlice.actions;

export default cardsSlice.reducer;
