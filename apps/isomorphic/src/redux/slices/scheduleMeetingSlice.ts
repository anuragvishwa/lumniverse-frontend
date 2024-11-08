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
    const serializedState = localStorage.getItem('scheduleMeetingState');
    if (serializedState === null) {
      return {
        scheduleMeeting: [],
        //  nextId: 1,
        scheduleData: {},
      };
    }
    return JSON.parse(serializedState) as ScheduleMeetingState;
  } catch (err) {
    console.error('Error loading state:', err);
    return { scheduleMeeting: [], scheduleData: {} };
  }
};

const initialState: ScheduleMeetingState = loadState();

const cardsSlice = createSlice({
  name: 'scheduleMeeting',
  initialState,
  reducers: {
    addScheduleMeetingCard: {
      reducer: (state, action: PayloadAction<Field>) => {
        const { id } = action.payload;
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
    removeScheduleMeetingCard(state, action: PayloadAction<number>) {
      const idToRemove = action.payload;
      state.scheduleMeeting = state.scheduleMeeting.filter(
        (schedule_meeting) => schedule_meeting.id !== idToRemove
      );
      delete state.scheduleData[idToRemove];
      saveState(state);
    },
    clearAllScheduleMeeting(state) {
      state.scheduleMeeting = [];
      // state.nextId = 1;
      state.scheduleData = {};
      saveState(state);
    },
    setScheduleData(
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
  },
});

const saveState = (state: ScheduleMeetingState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('scheduleMeetingState', serializedState);
  } catch (error) {
    console.error('Error saving state:', error);
  }
};

export const {
  addScheduleMeetingCard,
  removeScheduleMeetingCard,
  clearAllScheduleMeeting,
  setScheduleData,
} = cardsSlice.actions;

export default cardsSlice.reducer;
