import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InputState {
  isFilterApplied: boolean;
  selected: string[]; // Change from string to string[]
  allConditionsTrue: boolean;
  editAllConditionsTrue: boolean;
  selectRating: string[];
  isSelected: boolean;
  isRating: boolean;
  versionId: string[];
  rating: string[];
}

const initialState: InputState = {
  isFilterApplied: false,
  selected: [], // Initialize as an empty array
  allConditionsTrue: false,
  editAllConditionsTrue: false,
  selectRating: [],
  isSelected: false,
  isRating: false,
  versionId: [],
  rating: [],
};

const isFilter = createSlice({
  name: 'isFilter',
  initialState: initialState,
  reducers: {
    setIsFilter(state, action: PayloadAction<boolean>) {
      state.isFilterApplied = action.payload;
    },
    setSelected(state, action: PayloadAction<string[]>) {
      // Change to accept an array
      state.selected = action.payload;
    },
    setAllConditionsTrue(state, action: PayloadAction<boolean>) {
      state.allConditionsTrue = action.payload;
    },
    setEditAllConditionsTrue(state, action: PayloadAction<boolean>) {
      state.editAllConditionsTrue = action.payload;
    },
    setSelectRating(state, action: PayloadAction<string[]>) {
      state.selectRating = action.payload;
    },
    setIsSelected(state, action: PayloadAction<boolean>) {
      state.isSelected = action.payload;
    },
    setIsRating(state, action: PayloadAction<boolean>) {
      state.isRating = action.payload;
    },
    setFormState(
      state,
      action: PayloadAction<Partial<Pick<InputState, 'versionId' | 'rating'>>>
    ) {
      const { versionId, rating } = action.payload;
      if (versionId !== undefined) {
        state.versionId = versionId;
      }
      if (rating !== undefined) {
        state.rating = rating;
      }
    },
    clearFormState(state) {
      state.versionId = [];
      state.rating = [];
    },
  },
});

export const {
  setIsFilter,
  setSelected,
  setAllConditionsTrue,
  setEditAllConditionsTrue,
  setSelectRating,
  setIsRating,
  setFormState,
  clearFormState,
  setIsSelected,
} = isFilter.actions;

export default isFilter.reducer;
