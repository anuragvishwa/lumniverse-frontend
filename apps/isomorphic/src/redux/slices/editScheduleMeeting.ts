import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Field {
  id: number;
}

interface ScheduleMeetingState {
  scheduleMeeting: Field[];
  // nextId: number;
  scheduleData: { [key: number]: string };
}

const loadState = (): ScheduleMeetingState => {
  try {
    const versionId = localStorage.getItem('versionId');
    const serializedState = localStorage.getItem(
      `${versionId}_editScheduleMeetingState`
    );
    if (serializedState === null) {
      return { scheduleMeeting: [], scheduleData: {} };
    }
    return JSON.parse(serializedState) as ScheduleMeetingState;
  } catch (err) {
    console.error('Error loading state:', err);
    return { scheduleMeeting: [], scheduleData: {} };
  }
};

const initialState: ScheduleMeetingState = loadState();

const cardsSlice = createSlice({
  name: 'EditScheduleMeeting',
  initialState,
  reducers: {
    addEditScheduleMeetingCard: {
      reducer: (state, action: PayloadAction<Field>) => {
        const { id } = action.payload;
        if (!state.scheduleMeeting) {
          state.scheduleMeeting = [];
        }
        if (!state.scheduleData) {
          state.scheduleData = {};
        }
        // if (!state.nextId) {
        //   state.nextId = 1;
        // }
        state.scheduleMeeting.push({ id });
        state.scheduleData[id] = JSON.stringify({
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

    removeEditScheduleMeetingCard(state, action: PayloadAction<number>) {
      const idToRemove = action.payload;
      state.scheduleMeeting = state.scheduleMeeting.filter(
        (schedule_meeting) => schedule_meeting.id !== idToRemove
      );
      delete state.scheduleData[idToRemove];
      saveState(state);
    },
    clearAllEditScheduleMeeting(state) {
      state.scheduleMeeting = [];
      // state.nextId = 1;
      state.scheduleData = {};
      saveState(state);
    },
    setEditScheduleData(
      state,
      action: PayloadAction<{
        id: number;
        value: string;
      }>
    ) {
      const { id, value } = action.payload;
      state.scheduleData[id] = value;
      saveState(state);
    },
    setScheduleCards: (state, action: PayloadAction<ScheduleMeetingState>) => {
      state.scheduleMeeting = action.payload.scheduleMeeting;
      state.scheduleData = action.payload.scheduleData;
      // state.nextId = action.payload.nextId;
      saveState(state);
    },
  },
});

const saveState = (state: ScheduleMeetingState) => {
  try {
    const versionId = localStorage.getItem('versionId');
    const serializedState = JSON.stringify(state);
    localStorage.setItem(
      `${versionId}_editScheduleMeetingState`,
      serializedState
    );
  } catch (error) {
    console.error('Error saving state:', error);
  }
};

export const {
  addEditScheduleMeetingCard,
  removeEditScheduleMeetingCard,
  clearAllEditScheduleMeeting,
  setEditScheduleData,
  setScheduleCards,
} = cardsSlice.actions;

export default cardsSlice.reducer;
