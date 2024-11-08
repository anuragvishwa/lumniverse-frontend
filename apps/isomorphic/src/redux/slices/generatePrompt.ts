// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
// const token = process.env.NEXT_PUBLIC_API_TOKEN;

// const axiosInstance = axios.create({
//   baseURL,
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });

// interface PromptState {
//   generatedPrompt: string;
//   isLoading: boolean;
//   error: string | null;
// }

// const initialState: PromptState = {
//   generatedPrompt: '',
//   isLoading: false,
//   error: null,
// };

// export const generatePrompt = createAsyncThunk(
//   'prompt/generate',
//   async (commitMessage: string, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post('/api/chatPrompt/generate', {
//         projId: localStorage.getItem('projId'),
//         versionId: localStorage.getItem('versionId'),
//         topic: commitMessage,
//         parametersValue: {
//           stopSliderValue: 50,
//           topP: 0.1,
//           temperature: 0.9,
//           max_tokens: 1000,
//           frequency_penalty: 0.1,
//           presence_penalty: 0.1,
//           model: {
//             value: 'gpt-4o',
//             label: 'gpt-4o',
//           },
//         },
//       });

//       if (response.data && response.data.generatedPrompt) {
//         return response.data.generatedPrompt;
//       } else {
//         return rejectWithValue('Unexpected response structure');
//       }
//     } catch (error: any) {
//       toast.error(error.response?.data || 'Error generating prompt');
//       return rejectWithValue(error.response?.data || 'Error generating prompt');
//     }
//   }
// );

// const promptSlice = createSlice({
//   name: 'prompt',
//   initialState,
//   reducers: {
//     resetPrompt(state) {
//       state.generatedPrompt = '';
//       state.isLoading = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(generatePrompt.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(
//         generatePrompt.fulfilled,
//         (state, action: PayloadAction<string>) => {
//           state.generatedPrompt = action.payload;
//           state.isLoading = false;
//         }
//       )
//       .addCase(
//         generatePrompt.rejected,
//         (state, action: PayloadAction<string>) => {
//           state.isLoading = false;
//           state.error = action.payload;
//         }
//       );
//   },
// });

// export const { resetPrompt } = promptSlice.actions;
// export default promptSlice.reducer;
