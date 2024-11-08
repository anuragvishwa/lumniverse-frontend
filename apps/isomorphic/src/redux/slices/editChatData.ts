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

const storedSession = JSON.parse(
  localStorage.getItem('clickedSession') ?? 'null'
) as any;

const initialState: InputState = {
  userInput: storedSession?.userInput?.userInput || {},
  selectedOptions: storedSession?.userInput?.selectedOptions || {},
  inputValue: storedSession?.userInput?.inputValue || {},
  imageCards: storedSession?.userInput?.imageCards || {},
};

console.log(initialState, 'initialState');

const loadState = (): InputState => {
  try {
    const versionId = localStorage.getItem('versionId');
    const serializedState = localStorage.getItem(
      `${versionId}_editUserInputState`
    );
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
    const versionId = localStorage.getItem('versionId');
    const serializedState = JSON.stringify(state);
    localStorage.setItem(`${versionId}_editUserInputState`, serializedState);
  } catch (error) {
    console.log(error);
  }
};

const editUserInputSlice = createSlice({
  name: 'editUserInput',
  initialState: loadState(),
  reducers: {
    setEditUserInput: (
      state,
      action: PayloadAction<{ [key: number]: string }>
    ) => {
      const payload = action.payload;
      Object.entries(payload).forEach(([idStr, value]) => {
        const id = parseInt(idStr);
        state.userInput = {
          ...state.userInput,
          [id]: value as string,
        };
      });
      saveState(state);
    },
    clearAllEditUserInputs: (state) => {
      state.userInput = {};
      state.selectedOptions = {};
      state.inputValue = {};
      state.imageCards = {};
      saveState(state);
    },
    removeEditUserData: (state, action: PayloadAction<number>) => {
      const idToRemove = action.payload;
      delete state.userInput[idToRemove];
      delete state.selectedOptions[idToRemove];
      delete state.imageCards[idToRemove];
      saveState(state);
    },
    setEditSelectedOption: (
      state,
      action: PayloadAction<{ [key: number]: { value: string; label: string } }>
    ) => {
      const payload = action.payload;
      Object.entries(payload).forEach(([idStr, selectedOption]) => {
        const id = parseInt(idStr);
        state.selectedOptions = {
          ...state.selectedOptions,
          [id]: selectedOption as { value: string; label: string },
        };
      });
      saveState(state);
    },
    setEditInputValue: (
      state,
      action: PayloadAction<{ label: string; value: string }>
    ) => {
      const { label, value } = action.payload;

      if (!state.inputValue) {
        state.inputValue = {};
      }

      if (label) {
        state.inputValue[label] = value;
        saveState(state);
      } else {
        console.error('Label is undefined');
      }
    },
    clearEditInputValues: (state) => {
      state.inputValue = {};
      saveState(state);
    },
    addEditImageCard: {
      reducer: (
        state,
        action: PayloadAction<{ parentId: number; newCardId: number }>
      ) => {
        const { parentId, newCardId } = action.payload;
        if (!state.imageCards) {
          state.imageCards = {};
        }
        if (!state.imageCards[parentId]) {
          state.imageCards[parentId] = [];
        }
        state.imageCards[parentId].push({ id: newCardId });
        saveState(state);
      },
      prepare: (parentId: number, newCardId: number) => ({
        payload: { parentId, newCardId },
      }),
    },
    setEditUrl: (
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
    removeEditImageCard: (
      state,
      action: PayloadAction<{ parentId: number; id: number }>
    ) => {
      const { parentId, id } = action.payload;
      state.imageCards[parentId] = state.imageCards[parentId].filter(
        (imageCard) => imageCard.id !== id
      );
      saveState(state);
    },
    setImageCards: (state, action: PayloadAction<InputState>) => {
      state.imageCards = action.payload.imageCards;
      saveState(state);
    },
    setEditUserInputCard: (state, action: PayloadAction<InputState>) => {
      state.userInput = action.payload.userInput;
      state.imageCards = action.payload.imageCards;
      state.inputValue = action.payload.inputValue;
      state.selectedOptions = action.payload.selectedOptions;
      // state.nextId = action.payload.nextId;
      saveState(state);
    },
  },
});

export const {
  setEditUserInput,
  clearAllEditUserInputs,
  removeEditUserData,
  setEditSelectedOption,
  setEditInputValue,
  clearEditInputValues,
  addEditImageCard,
  setEditUrl,
  removeEditImageCard,
  setImageCards,
  setEditUserInputCard,
} = editUserInputSlice.actions;

export default editUserInputSlice.reducer;
