import axios from 'axios';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const token = process.env.NEXT_PUBLIC_API_TOKEN;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

interface ConfigState {
  traincoreapiKeys: any; // Adjust type as needed
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ConfigState = {
  traincoreapiKeys: null,
  status: 'idle',
  error: null,
};

export const createNewConfig = createAsyncThunk(
  'configs/createNewConfig',
  async (args: any) => {
    let configData;

    // Check if data is passed as an object or individual fields
    if (args.configData) {
      configData = args.configData; // If passed as configData object
    } else {
      const { session, orgId, orgName, userId, name, commitMessage } = args;
      // Construct configData from individual fields
      configData = {
        name: session?.user.name,
        email: session?.user.email,
        orgId,
        orgName,
        orgSlug: 'my-org',
        environment: 'production',
        userId,
        role: 'admin',
        modelProviders: {
          [name]: {
            key: commitMessage,
            added: new Date().toISOString(),
          },
        },
        trainkoreApiKeys: [
          {
            name: 'API Key 1',
            secretKey: 'sk-zzzzzzzz',
            created: new Date(),
          },
        ],
        renewsOn: new Date().toISOString(),
      };
    }

    const response = await axiosInstance.post('/api/configs', configData);
    return response.data;
  }
);

// Define async thunk
export const fetchTraincoreApiKeys = createAsyncThunk(
  'configs/fetchTraincoreApiKeys',
  async (userId: string) => {
    const response = await axiosInstance.get(`/api/configs/user/${userId}`);
    console.log(response.data, 'data');
    return response.data;
  }
);

export const updateModelProviderKeys = createAsyncThunk(
  'configs/updateModelProviderKeys',
  async ({
    configId,
    name,
    commitMessage,
  }: {
    configId: string;
    name: string;
    commitMessage: string;
  }) => {
    const response = await axiosInstance.put(
      `/api/configs/${configId}/model-provider-keys`,
      {
        [name]: {
          key: commitMessage,
          added: new Date().toISOString(),
        },
      }
    );

    return response.data; // Assuming this is the updated `modelProviders` object
  }
);

export const createAPIModalKey = createAsyncThunk(
  'configs/createAPIModalKey',
  async ({
    configId,
    commitMessage,
  }: {
    configId: string;
    commitMessage: string;
  }) => {
    const response = await axiosInstance.post(
      `/api/configs/${configId}/trainkore-keys`,
      {
        name: commitMessage,
        secretKey: 'sk-1234567890abcdef',
      }
    );

    return response.data; // Assuming this is the updated `modelProviders` object
  }
);

export const deleteModelKey = createAsyncThunk(
  'configs/deleteModelKey',
  async ({
    configId,
    keyType,
    name,
  }: {
    configId: string;
    name?: string;
    keyType: any;
  }) => {
    const encodedApiKey = encodeURIComponent(name as string);
    const deleteEndpoint =
      keyType === 'trainkore'
        ? `/api/configs/${configId}/trainkore-keys/${encodedApiKey}`
        : `/api/configs/${configId}/model-provider-keys/${name}`;
    const response = await axiosInstance.delete(deleteEndpoint);
    return response.data;
  }
);

const configsSlice = createSlice({
  name: 'configs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTraincoreApiKeys.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTraincoreApiKeys.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.traincoreapiKeys = action.payload;
      })
      .addCase(fetchTraincoreApiKeys.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(updateModelProviderKeys.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateModelProviderKeys.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedProviders = action.payload;
        console.log(updatedProviders, 'create config');
        state.traincoreapiKeys.modelProviders = {
          ...state.traincoreapiKeys.modelProviders,
          ...updatedProviders,
        };
      })
      .addCase(updateModelProviderKeys.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(createNewConfig.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createNewConfig.fulfilled, (state, action) => {
        state.status = 'succeeded';

        state.traincoreapiKeys = {
          ...state.traincoreapiKeys,
          ...action.payload,
        };
      })
      .addCase(createNewConfig.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(deleteModelKey.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteModelKey.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload, 'delete response');
        state.traincoreapiKeys = {
          ...state.traincoreapiKeys,
          ...action.payload,
        };
      })
      .addCase(deleteModelKey.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      })
      // .addCase(createNew2Config.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(createNew2Config.fulfilled, (state, action) => {
      //   state.status = 'succeeded';

      //   state.traincoreapiKeys = {
      //     ...state.traincoreapiKeys,
      //     ...action.payload,
      //   };
      // })
      // .addCase(createNew2Config.rejected, (state, action) => {
      //   state.status = 'failed';
      //   state.error = action.error.message || 'Something went wrong';
      // })
      .addCase(createAPIModalKey.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createAPIModalKey.fulfilled, (state, action) => {
        state.status = 'succeeded';

        const updatedProviders = action.payload;

        if (Array.isArray(updatedProviders.trainkoreApiKeys)) {
          state.traincoreapiKeys.trainkoreApiKeys =
            updatedProviders.trainkoreApiKeys;
        } else {
          state.traincoreapiKeys.trainkoreApiKeys = [];
        }
      })
      .addCase(createAPIModalKey.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default configsSlice.reducer;
