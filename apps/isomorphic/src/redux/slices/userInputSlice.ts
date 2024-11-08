import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Field {
  id: number;
  url?: string;
}

interface InputState {
  userInput: { [key: number]: string };
  selectedOptions: { [key: number]: { value: string; label: string } };
  inputValue: { [key: string]: string };
  imageCards: { [key: number]: Field[] };
}

const initialState: InputState = {
  userInput: {},
  selectedOptions: {},
  inputValue: {},
  imageCards: {},
};

const loadState = (): InputState => {
  try {
    const serializedState = localStorage.getItem('userInputState');
    if (serializedState === null) {
      return initialState;
    }
    const parsedState = JSON.parse(serializedState) as InputState;

    if (!parsedState.selectedOptions) {
      parsedState.selectedOptions = {};
    }
    if (!parsedState.inputValue) {
      parsedState.inputValue = {};
    }
    if (!parsedState.imageCards) {
      parsedState.imageCards = {};
    }

    return parsedState;
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
    return initialState;
  }
};

const saveState = (state: InputState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(`userInputState`, serializedState);
  } catch (error) {
    console.log(error);
  }
};

const userInputSlice = createSlice({
  name: 'userInput',
  initialState: loadState(),
  reducers: {
    setUserInput: (
      state,
      action: PayloadAction<{ id: number; value: string }>
    ) => {
      const { id, value } = action.payload;
      state.userInput[id] = value;
      saveState(state);
    },
    addImageCard: {
      reducer: (
        state,
        action: PayloadAction<{ parentId: number; newCardId: number }>
      ) => {
        const { parentId, newCardId } = action.payload;
        if (!state.imageCards[parentId]) {
          state.imageCards[parentId] = [];
        }
        state.imageCards[parentId].push({ id: newCardId });
        // state.nextId++;
        saveState(state);
      },
      prepare: (parentId: number, newCardId: number) => ({
        payload: { parentId, newCardId },
      }),
    },
    setUrl: (
      state,
      action: PayloadAction<{ parentId: number; cardId: number; url: string }>
    ) => {
      const { parentId, cardId, url } = action.payload;
      const card = state.imageCards[parentId]?.find(
        (imageCard) => imageCard.id === cardId
      );
      if (card) {
        card.url = url;
        saveState(state);
      }
    },
    removeImageCard: (
      state,
      action: PayloadAction<{ parentId: number; id: number }>
    ) => {
      const { parentId, id } = action.payload;
      state.imageCards[parentId] = state.imageCards[parentId].filter(
        (imageCard) => imageCard.id !== id
      );
      saveState(state);
    },
    clearAllUserInputs: (state) => {
      state.userInput = {};
      state.selectedOptions = {};
      state.inputValue = {};
      state.imageCards = {};
      saveState(state);
    },
    removeUserData: (state, action: PayloadAction<number>) => {
      const idToRemove = action.payload;
      delete state.userInput[idToRemove];
      delete state.selectedOptions[idToRemove];
      delete state.imageCards[idToRemove];
      saveState(state);
    },
    setSelectedOption: (
      state,
      action: PayloadAction<{
        id: number;
        selectedOption: { value: string; label: string };
      }>
    ) => {
      const { id, selectedOption } = action.payload;
      state.selectedOptions[id] = selectedOption;
      saveState(state);
    },
    setInputValue: (
      state,
      action: PayloadAction<{ label: string; value: string }>
    ) => {
      const { label, value } = action.payload;
      state.inputValue[label] = value;
      saveState(state);
    },
    clearInputValues: (state) => {
      state.inputValue = {};
      state.imageCards = {};
      // state.nextId = 1;
      saveState(state);
    },
  },
});

export const {
  setUserInput,
  clearAllUserInputs,
  removeUserData,
  setSelectedOption,
  setInputValue,
  clearInputValues,
  addImageCard,
  setUrl,
  removeImageCard,
} = userInputSlice.actions;

export default userInputSlice.reducer;
