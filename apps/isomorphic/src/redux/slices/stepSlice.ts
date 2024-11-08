import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  email: string;
  name: string;
  lastname: string;
  companyName: string;
  companyURL: string;
  companyType: string;
  visitors: string;
  productType: string;
}

const getInitialState = (): FormState => {
  if (typeof window !== 'undefined') {
    const storedForm = localStorage.getItem('formData');
    if (storedForm) {
      try {
        const parsedForm = JSON.parse(storedForm);
        if (parsedForm && typeof parsedForm === 'object') {
          return parsedForm as FormState;
        }
      } catch (error) {
        console.error('Failed to parse localStorage formData:', error);
      }
    }
  }

  return {
    email: '',
    name: '',
    lastname: '',
    companyName: '',
    companyURL: '',
    companyType: '',
    visitors: '',
    productType: '',
  };
};

const initialState: FormState = getInitialState();

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormField: (
      state,
      action: PayloadAction<{ field: keyof FormState; value: string }>
    ) => {
      const { field, value } = action.payload;
      state[field] = value;

      if (typeof window !== 'undefined') {
        localStorage.setItem('formData', JSON.stringify(state));
      }
    },
    resetForm: (state) => {
      Object.assign(state, initialState);

      if (typeof window !== 'undefined') {
        localStorage.removeItem('formData');
      }
    },
  },
});

export const { updateFormField, resetForm } = formSlice.actions;
export default formSlice.reducer;
