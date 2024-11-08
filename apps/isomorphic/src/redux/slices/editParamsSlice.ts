import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EditParamsState {
  isSwitchOn: boolean;
  stopSliderValue: number;
  topP: number;
  temperature: number;
  max_tokens: number;
  frequency_penalty: number;
  presence_penalty: number;
  model: { value: string; label: string };
}

const storedSession = JSON.parse(
  localStorage.getItem('clickedSession') ?? 'null'
) as any;

const initialState: EditParamsState = {
  isSwitchOn: storedSession?.parametersValue?.isSwitchOn,
  stopSliderValue: storedSession?.parametersValue?.stopSliderValue,
  topP: storedSession?.parametersValue?.topP,
  temperature: storedSession?.parametersValue?.temperature,
  max_tokens: storedSession?.parametersValue?.max_tokens,
  frequency_penalty: storedSession?.parametersValue?.frequency_penalty,
  presence_penalty: storedSession?.parametersValue?.presence_penalty,
  model: storedSession?.parametersValue?.model,
};
const loadState = (): EditParamsState => {
  try {
    const versionId = localStorage.getItem('versionId');
    const serializedState = localStorage.getItem(
      `${versionId}_editParamsState`
    );
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState) as EditParamsState;
  } catch (err) {
    return initialState;
  }
};

const saveState = (state: EditParamsState) => {
  try {
    const versionId = localStorage.getItem('versionId');
    const serializedState = JSON.stringify(state);
    localStorage.setItem(`${versionId}_editParamsState`, serializedState);
  } catch (error) {
    console.log(error);
  }
};

const switchSlice = createSlice({
  name: 'editParams',
  initialState: loadState(),
  reducers: {
    setEditToggleSwitch(state) {
      state.isSwitchOn = !state.isSwitchOn;
      saveState(state);
    },
    setEditStopSlider(state, action: PayloadAction<number>) {
      state.stopSliderValue = action.payload;
      saveState(state);
    },
    setEditTopP(state, action: PayloadAction<number>) {
      state.topP = action.payload;
      saveState(state);
    },
    setEditTemperature(state, action: PayloadAction<number>) {
      state.temperature = action.payload;
      saveState(state);
    },
    setEditMaxTokens(state, action: PayloadAction<number>) {
      state.max_tokens = action.payload;
      saveState(state);
    },
    setEditFrequencyPenalty(state, action: PayloadAction<number>) {
      state.frequency_penalty = action.payload;
      saveState(state);
    },
    setEditPresencePenalty(state, action: PayloadAction<number>) {
      state.presence_penalty = action.payload;
      saveState(state);
    },
    setEditModel(
      state,
      action: PayloadAction<{ value: string; label: string }>
    ) {
      state.model = action.payload;
      saveState(state);
    },
  },
});

export const {
  setEditToggleSwitch,
  setEditStopSlider,
  setEditTopP,
  setEditTemperature,
  setEditMaxTokens,
  setEditFrequencyPenalty,
  setEditPresencePenalty,
  setEditModel,
} = switchSlice.actions;

export default switchSlice.reducer;

export const selectSwitchState = (state: any) => state.switch;
