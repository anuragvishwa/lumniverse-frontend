import { configureStore } from '@reduxjs/toolkit';
import logsReducer from './slices/logsSlice';
import switchReducer from './slices/promptsSlice';
import chatReducer from './slices/chatSlice';
import promptReducer from './slices/userInputSlice';
import promptsCardReducer from './slices/promptsCardSlice';
import toolReducer from './slices/toolSlice';
import getStocksPriceReducer from './slices/getStocksPriceSlice';
import scheduleMeetingReducer from './slices/scheduleMeetingSlice';
import editParamsReducer from './slices/editParamsSlice';
import editChatCardReducer from './slices/editChat';
import editUserInputReducer from './slices/editChatData';
import extraReducer from './slices/extraSlices';
import editToolReducer from './slices/editTools';
import editGetStockReducer from './slices/getEditStocksSlice';
import editScheduleReducer from './slices/editScheduleMeeting';
import newToolReducer from './slices/newTool';
import editNewToolReducer from './slices/editNewTool';
import createPromptReducer from './slices/createPrompts';
import isFilterReducer from './slices/isFilter';
import variableReducer from './slices/variable';
import messageReducer from './slices/message';
import targetReducer from './slices/target';
import datasetReducer from './slices/dataset';
import configsReducer from './slices/configSlice';
import expandedReducer from './slices/expandSlice';
import formReducer from './slices/stepSlice';

const store = configureStore({
  reducer: {
    logs: logsReducer,
    switch: switchReducer,
    chat: chatReducer,
    prompts: promptReducer,
    promptCards: promptsCardReducer,
    tools: toolReducer,
    getStocksPrice: getStocksPriceReducer,
    scheduleMeeting: scheduleMeetingReducer,
    editParameters: editParamsReducer,
    editChatCards: editChatCardReducer,
    editUserInput: editUserInputReducer,
    extraStates: extraReducer,
    editTools: editToolReducer,
    editGetStocks: editGetStockReducer,
    editSchedule: editScheduleReducer,
    newTool: newToolReducer,
    editNewTool: editNewToolReducer,
    project: createPromptReducer,
    isFilter: isFilterReducer,
    variable: variableReducer,
    message: messageReducer,
    target: targetReducer,
    projectState: datasetReducer,
    configs: configsReducer,
    expanded: expandedReducer,
    // generatePrompt: generatePromptReducer,
    form: formReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
