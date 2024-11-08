import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Field {
  id: number;
  // type: 'userInputData';
}

interface CardsState {
  userInputData: { [key: number]: string };
  selectedOptionsData: { [key: number]: { value: string; label: string } };
  promptCards: Field[];
  // currentOrder: number;
  // chatResponses: { [key: number]: string };
  // chatOptions: { [key: number]: { value: string; label: string } };
  latency: { [key: number]: string };
  pricing: { [key: number]: string };
  token: { [key: number]: string };
  selectedModel: { [key: number]: string };
}

const loadState = (): CardsState => {
  try {
    const projId = localStorage.getItem('projId');
    const serializedState = localStorage.getItem(`${projId}_promptCardsState`);

    if (serializedState === null) {
      return {
        promptCards: [],
        userInputData: {},
        selectedOptionsData: {},
        // currentOrder: 1,
        // chatResponses: {},
        // chatOptions: {},
        latency: {},
        pricing: {},
        token: {},
        selectedModel: {},
      };
    }
    const parsedState = JSON.parse(serializedState) as CardsState;

    return {
      promptCards: parsedState.promptCards || [],
      userInputData: parsedState.userInputData || {},
      selectedOptionsData: parsedState.selectedOptionsData || {},
      // currentOrder: parsedState.currentOrder || 1,
      // chatResponses: parsedState.chatResponses || {},
      // chatOptions: parsedState.chatOptions || {},
      latency: parsedState.latency || {},
      pricing: parsedState.pricing || {},
      token: parsedState.token || {},
      selectedModel: parsedState.selectedModel || {},
    };
  } catch (err) {
    console.error('Error loading state:', err);
    return {
      promptCards: [],
      userInputData: {},
      selectedOptionsData: {},
      // currentOrder: 1,
      // chatResponses: {},
      // chatOptions: {},
      latency: {},
      pricing: {},
      token: {},
      selectedModel: {},
    };
  }
};

const initialState: CardsState = loadState();

const promptCardsSlice = createSlice({
  name: 'promptCards',
  initialState,
  reducers: {
    // addUserInputDataCard: (state, action) => {
    //   const newCardId = action.payload; // Get the ID passed from handleAddField
    //   state.promptCards.push({
    //     id: newCardId,
    //     type: 'userInputData',
    //     order: state.currentOrder,
    //   });
    //   state.currentOrder += 1;
    //   saveState(state);
    // },
    addUserInputDataCard: {
      reducer: (state, action: PayloadAction<Field>) => {
        state.promptCards.push(action.payload);
        // state.nextId++;
        saveState(state);
      },
      prepare: (newCardId: number) => ({
        payload: { id: newCardId },
      }),
    },
    // setChatResponses(state, action: PayloadAction<{ [key: number]: string }>) {
    //   const payload = action.payload;
    //   if (payload) {
    //     Object.entries(payload).forEach(([idStr, value]) => {
    //       const id = parseInt(idStr);
    //       state.chatResponses = {
    //         ...state.chatResponses,
    //         [id]: value as string,
    //       };
    //     });
    //     saveState(state);
    //   }
    // },
    setLatency(state, action: PayloadAction<{ [key: number]: string }>) {
      const payload = action.payload;
      if (payload) {
        Object.entries(payload).forEach(([idStr, value]) => {
          const id = parseInt(idStr);
          state.latency = {
            ...state.latency,
            [id]: value as string,
          };
        });
        saveState(state);
      }
    },
    setPricing(state, action: PayloadAction<{ [key: number]: string }>) {
      const payload = action.payload;
      if (payload) {
        Object.entries(payload).forEach(([idStr, value]) => {
          const id = parseInt(idStr);
          state.pricing = {
            ...state.pricing,
            [id]: value as string,
          };
        });
        saveState(state);
      }
    },
    setToken(state, action: PayloadAction<{ [key: number]: string }>) {
      const payload = action.payload;
      if (payload) {
        Object.entries(payload).forEach(([idStr, value]) => {
          const id = parseInt(idStr);
          state.token = {
            ...state.token,
            [id]: value as string,
          };
        });
        saveState(state);
      }
    },
    setSelectedModel(state, action: PayloadAction<{ [key: number]: string }>) {
      const payload = action.payload;
      if (payload) {
        Object.entries(payload).forEach(([idStr, value]) => {
          const id = parseInt(idStr);
          state.selectedModel = {
            ...state.selectedModel,
            [id]: value as string,
          };
        });
        saveState(state);
      }
    },
    // addChatCard: (state, action) => {
    //   const newCardId = action.payload;
    //   state.promptCards.push({
    //     id: newCardId,
    //     type: 'chatCard',
    //     order: state.currentOrder,
    //   });
    //   state.currentOrder += 1;
    //   saveState(state);
    // },
    removePromptCards(state, action: PayloadAction<number>) {
      const idToRemove = action.payload;
      state.promptCards = state.promptCards.filter(
        (promptCard) => promptCard.id !== idToRemove
      );

      saveState(state);
    },
    removeUserPromptsData: (state, action: PayloadAction<number>) => {
      const idToRemove = action.payload;
      delete state.userInputData[idToRemove];
      delete state.selectedOptionsData[idToRemove];
      saveState(state);
    },
    clearAllPromptCards(state) {
      state.promptCards = [];
      state.userInputData = {};
      state.selectedOptionsData = {};
      // state.currentOrder = 1;
      // state.chatOptions = {};
      // state.chatResponses = {};
      state.latency = {};
      state.pricing = {};
      state.token = {};
      saveState(state);
    },
    setUserInputData(state, action: PayloadAction<{ [key: number]: string }>) {
      const payload = action.payload;
      if (payload) {
        Object.entries(payload).forEach(([idStr, value]) => {
          const id = parseInt(idStr);
          state.userInputData = {
            ...state.userInputData,
            [id]: value as string,
          };
        });
        saveState(state);
      }
    },
    setSelectedOptionsData(
      state,
      action: PayloadAction<{ [key: number]: { value: string; label: string } }>
    ) {
      const payload = action.payload;
      if (payload) {
        Object.entries(payload).forEach(([idStr, selectedOption]) => {
          const id = parseInt(idStr);
          state.selectedOptionsData = {
            ...state.selectedOptionsData,
            [id]: selectedOption as { value: string; label: string },
          };
        });
        saveState(state);
      }
    },
    // setChatOptionsData(
    //   state,
    //   action: PayloadAction<{ [key: number]: { value: string; label: string } }>
    // ) {
    //   const payload = action.payload;
    //   if (payload) {
    //     Object.entries(payload).forEach(([idStr, chatOption]) => {
    //       const id = parseInt(idStr);
    //       state.chatOptions = {
    //         ...state.chatOptions,
    //         [id]: chatOption as { value: string; label: string },
    //       };
    //     });
    //     saveState(state);
    //   }
    // },
    setUserDataCard: (state, action: PayloadAction<CardsState>) => {
      state.promptCards = action.payload?.promptCards || [];
      // state.currentOrder = action.payload?.currentOrder || 1;
      state.userInputData = action.payload?.userInputData || {};
      // state.chatResponses = action.payload?.chatResponses || {};
      state.selectedOptionsData = action.payload?.selectedOptionsData || {};
      // state.chatOptions = action.payload?.chatOptions || {};
      state.latency = action.payload?.latency || {};
      state.token = action.payload?.token || {};
      saveState(state);
    },
  },
});

const saveState = (state: CardsState) => {
  try {
    const projId = localStorage.getItem('projId');
    const serializedState = JSON.stringify(state);
    localStorage.setItem(`${projId}_promptCardsState`, serializedState);
    // localStorage.setItem(`${projId}_chatResponses`, serializedState);
  } catch (error) {
    console.error('Error saving state:', error);
  }
};

export const {
  addUserInputDataCard,
  // addChatCard,
  removePromptCards,
  clearAllPromptCards,
  setUserInputData,
  setSelectedOptionsData,
  removeUserPromptsData,
  // setChatResponses,
  // setChatOptionsData,
  setUserDataCard,
  setLatency,
  setPricing,
  setToken,
  setSelectedModel,
} = promptCardsSlice.actions;

export default promptCardsSlice.reducer;
