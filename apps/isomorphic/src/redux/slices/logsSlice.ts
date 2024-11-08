import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LogsState {
  isOpen: boolean;
  selectedRecord: any;
  logsData: any;
}

const initialState: LogsState = {
  isOpen: false,
  selectedRecord: null,
  logsData: [],
};

const logsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    setIsOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
    setSelectedRecord(state, action: PayloadAction<any>) {
      state.selectedRecord = action.payload;
    },
    setLogsData(state, action: PayloadAction<any>) {
      state.logsData = action.payload;
    },
  },
});

export const { setIsOpen, setSelectedRecord, setLogsData } = logsSlice.actions;
export default logsSlice.reducer;
