import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Field {
  id: number;
}

interface MessageState {
  message: Field[];
  messageData: { [key: number]: string };
  selectedOptions: { [key: number]: { value: string; label: string } };
}

const loadState = (versionId: string | null): MessageState => {
  try {
    if (!versionId) {
      return { message: [], messageData: {}, selectedOptions: {} };
    }
    const serializedState = localStorage.getItem(`${versionId}_messageState`);
    if (serializedState === null) {
      return { message: [], messageData: {}, selectedOptions: {} };
    }
    return JSON.parse(serializedState) as MessageState;
  } catch (err) {
    console.error('Error loading state:', err);
    return { message: [], messageData: {}, selectedOptions: {} };
  }
};

const versionId = localStorage.getItem('versionId');
const initialState: MessageState = loadState(versionId);

const messageCardSlice = createSlice({
  name: 'Message',
  initialState,
  reducers: {
    addNewMessageCard: {
      reducer: (state, action: PayloadAction<Field>) => {
        const { id } = action.payload;
        state.message.push({ id });
        state.messageData[id] = 'value';

        saveState(state);
      },
      prepare: (newCardId: number) => ({
        payload: { id: newCardId },
      }),
    },
    deleteMessageCard(state, action: PayloadAction<number>) {
      const idToRemove = action.payload;
      state.message = state.message.filter(
        (message_data) => message_data.id !== idToRemove
      );
      delete state.messageData[idToRemove];
      delete state.selectedOptions[idToRemove];
      saveState(state);
    },
    clearAllMessageCard(state) {
      state.message = [];
      state.messageData = {};
      state.selectedOptions = {};
      saveState(state);
    },
    setMessageData(state, action: PayloadAction<{ [key: number]: string }>) {
      const payload = action.payload;
      if (payload) {
        Object.entries(payload).forEach(([idStr, value]) => {
          const id = parseInt(idStr);
          state.messageData = {
            ...state.messageData,
            [id]: value as string,
          };
        });
        saveState(state);
      }
    },
    setMessageOption: (
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
    setMessageCards: (state, action: PayloadAction<MessageState>) => {
      state.message = action.payload?.message || [];
      state.messageData = action.payload?.messageData || {};
      state.selectedOptions = action.payload?.selectedOptions || {};
      saveState(state);
    },
  },
});

const saveState = (state: MessageState) => {
  try {
    const versionId = localStorage.getItem('versionId');
    const serializedState = JSON.stringify(state);
    localStorage.setItem(`${versionId}_messageState`, serializedState);
  } catch (error) {
    console.error('Error saving state:', error);
  }
};

export const {
  addNewMessageCard,
  deleteMessageCard,
  clearAllMessageCard,
  setMessageData,
  setMessageCards,
  setMessageOption,
} = messageCardSlice.actions;

export default messageCardSlice.reducer;
