import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SwitchState {
  isSwitchOn: boolean;
  stopSliderValue: number;
  topP: number;
  temperature: number;
  max_tokens: number;
  frequency_penalty: number;
  presence_penalty: number;
  model: { value: string; label: string };
}

const initialState: SwitchState = {
  isSwitchOn: false,
  stopSliderValue: 50,
  topP: 0.1,
  temperature: 0.1,
  max_tokens: 1000,
  frequency_penalty: 0.1,
  presence_penalty: 0.1,
  model: { value: 'gpt-4o', label: 'gpt-4o' },
};

const loadState = (): SwitchState => {
  try {
    const serializedState = localStorage.getItem('switchState');
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState) as SwitchState;
  } catch (err) {
    return initialState;
  }
};

const saveState = (state: SwitchState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('switchState', serializedState);
  } catch (error) {
    console.log(error);
  }
};

const switchSlice = createSlice({
  name: 'switch',
  initialState: loadState(),
  reducers: {
    toggleSwitch(state) {
      state.isSwitchOn = !state.isSwitchOn;
      saveState(state);
    },
    setStopSlider(state, action: PayloadAction<number>) {
      state.stopSliderValue = action.payload;
      saveState(state);
    },
    setTopP(state, action: PayloadAction<number>) {
      state.topP = action.payload;
      saveState(state);
    },
    setTemperature(state, action: PayloadAction<number>) {
      state.temperature = action.payload;
      saveState(state);
    },
    setMaxTokens(state, action: PayloadAction<number>) {
      state.max_tokens = action.payload;
      saveState(state);
    },
    setFrequencyPenalty(state, action: PayloadAction<number>) {
      state.frequency_penalty = action.payload;
      saveState(state);
    },
    setPresencePenalty(state, action: PayloadAction<number>) {
      state.presence_penalty = action.payload;
      saveState(state);
    },
    setModel(state, action: PayloadAction<{ value: string; label: string }>) {
      state.model = action.payload;
      saveState(state);
    },
  },
});

export const {
  toggleSwitch,
  setStopSlider,
  setTopP,
  setTemperature,
  setMaxTokens,
  setFrequencyPenalty,
  setPresencePenalty,
  setModel,
} = switchSlice.actions;

export default switchSlice.reducer;

export const selectSwitchState = (state: any) => state.switch;
