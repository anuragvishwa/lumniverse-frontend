import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Field {
  id: number;
}

interface VariableState {
  variable: Field[];
  versionId: string;
  variableData: { [key: number]: string };
  variableName: { [key: number]: string };
}

const loadState = (versionId: string | null): VariableState => {
  try {
    if (!versionId) {
      return {
        variable: [],
        variableData: {},
        variableName: {},
        versionId: '',
      };
    }
    const serializedState = localStorage.getItem(`${versionId}_variableState`);
    if (serializedState === null) {
      return {
        variable: [],
        variableData: {},
        variableName: {},
        versionId: versionId,
      };
    }
    return JSON.parse(serializedState) as VariableState;
  } catch (err) {
    console.error('Error loading state:', err);
    return { variable: [], variableData: {}, variableName: {}, versionId: '' };
  }
};

const versionId = localStorage.getItem('versionId');
const initialState: VariableState = loadState(versionId);

const variableCardSlice = createSlice({
  name: 'Variable',
  initialState,
  reducers: {
    addNewVariableCard: {
      reducer: (state, action: PayloadAction<Field>) => {
        const { id } = action.payload;
        state.variable.push({ id });
        state.variableData[id] = 'value';
        state.variableName[id] = 'variable';
        saveState(state);
      },
      prepare: (newCardId: number) => ({
        payload: { id: newCardId },
      }),
    },
    deleteVariableCard(state, action: PayloadAction<number>) {
      const idToRemove = action.payload;
      state.variable = state.variable.filter(
        (variable_data) => variable_data.id !== idToRemove
      );
      delete state.variableData[idToRemove];
      delete state.variableName[idToRemove];
      saveState(state);
    },
    clearAllVariableCards(state) {
      state.variable = [];
      state.variableData = {};
      state.variableName = {};
      saveState(state);
    },
    setVariableData(state, action: PayloadAction<{ [key: number]: string }>) {
      const payload = action.payload;
      if (payload) {
        Object.entries(payload).forEach(([idStr, value]) => {
          const id = parseInt(idStr);
          state.variableData = {
            ...state.variableData,
            [id]: value,
          };
        });
        saveState(state);
      }
    },
    setVariableName(state, action: PayloadAction<{ [key: number]: string }>) {
      const payload = action.payload;
      if (payload) {
        Object.entries(payload).forEach(([idStr, value]) => {
          const id = parseInt(idStr);
          state.variableName = {
            ...state.variableName,
            [id]: value,
          };
        });
        saveState(state);
      }
    },
    setVariableCards: (state, action: PayloadAction<VariableState>) => {
      state.variable = action.payload?.variable || [];
      state.variableData = action.payload?.variableData || {};
      state.variableName = action.payload?.variableName || {};
      saveState(state);
    },
  },
});

const saveState = (state: VariableState) => {
  try {
    const versionId = localStorage.getItem('versionId');
    const serializedState = JSON.stringify(state);
    localStorage.setItem(`${versionId}_variableState`, serializedState);
  } catch (error) {
    console.error('Error saving state:', error);
  }
};

export const {
  addNewVariableCard,
  deleteVariableCard,
  clearAllVariableCards,
  setVariableData,
  setVariableCards,
  setVariableName,
} = variableCardSlice.actions;

export default variableCardSlice.reducer;
