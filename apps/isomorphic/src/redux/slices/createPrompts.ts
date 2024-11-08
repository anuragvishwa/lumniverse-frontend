import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL as string;
const token = process.env.NEXT_PUBLIC_API_TOKEN as string;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

interface Project {
  projId: string;
  name: string;
  orgId: string;
  [key: string]: any;
}

interface Load {
  versionId: string;
  projId: string;
  commit: string;
}

interface CreateProjectPayload {
  name: string;
  orgId: string;
  userId: string;
}

interface Option {
  value: string;
  label: string;
}

interface Field {
  id: number;
}

interface NewTool {
  newTools: any[];
  newToolData: Record<string, any>;
}

interface Cards {
  cards: Field[];
}

interface ParametersValue {
  isSwitchOn: boolean;
  stopSliderValue: number;
  topP: number;
  temperature: number;
  max_tokens: number;
  frequency_penalty: number;
  presence_penalty: number;
  model: Option;
}

interface Tools {
  tools: any[];
  toolsData: Record<string, any>;
}

interface UserInput {
  userInput: { [key: number]: string };
  selectedOptions: { [key: number]: { value: string; label: string } };
  inputValue: { [key: string]: string };
  imageCards: { [key: number]: Field[] };
}

interface UserInputData {
  promptCards: any[];
  // nextId: number;
  userInputData: Record<string, any>;
  selectedOptionsData: Record<string, any>;
  currentOrder: number;
  chatResponses: { [key: number]: string };
  chatOptions: { [key: number]: { value: string; label: string } };
  latency: { [key: number]: string };
  pricing: { [key: number]: string };
  token: { [key: number]: string };
}

export interface Version extends Document {
  versionId: string;
  projId: string;
  userInput: UserInput;
  userInputData: UserInputData;
  tools: Tools;
  getStocksPrice: any;
  scheduleMeeting: any;
  parametersValue: ParametersValue;
  commitMessage: string;
  cards: Cards;
  newTool: NewTool;
}

interface ProjectState {
  projects: Project[];
  name: string;
  errorMessage: string;
  successMessage: string;
  isLoading: boolean;
  selectedCard: any[];
  selectProj: any[];
  selectedOrgId: string | null;
  load: Load[];
  versions: Version[];
  getLoad: Load[];
  getVersions: Version[];
  selectedSession: string | null;
}

const initialState: ProjectState = {
  projects: [],
  name: '',
  errorMessage: '',
  successMessage: '',
  isLoading: false,
  selectedCard: [],
  selectProj: [],
  selectedOrgId: null,
  load: [],
  versions: [],
  getLoad: [],
  getVersions: [],
  selectedSession: null,
};

export const createProjects = createAsyncThunk(
  'prompts/createProjects',
  async (
    { orgId, userId }: { orgId: string; userId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(`/api/projects/org/${orgId}`);
      const projects: Project[] = response.data;

      let count = 1;
      let name = `prompts_${count}`;
      while (
        projects.find(
          (project: any) => project.name.toLowerCase() === name.toLowerCase()
        )
      ) {
        count++;
        name = `prompts_${count}`;
      }

      const createResponse = await axiosInstance.post(`/api/createproject`, {
        name,
        orgId,
        userId,
        role: 'default',
        collaborator: 'default',
        service: 'default',
        environment: 'default',
        price: 0,
      });

      return createResponse.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const fetchProjectsByUser = createAsyncThunk(
  'prompts/fetchProjectsByUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/projects/user/${userId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const deleteProject = createAsyncThunk(
  'prompts/deleteProject',
  async (projId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/api/projects/${projId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const selectProject = createAsyncThunk(
  'prompts/selectProject',
  async (projId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/Clusters/project/${projId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const loadPrompts = createAsyncThunk(
  'prompts/loadPrompts',
  async ({ projId, commit, versionId }: Load, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/api/projects/${projId}/loads`,
        {
          projId,
          commit,
          versionId,
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const getLoadPrompts = createAsyncThunk(
  'prompts/getLoadPrompts',
  async (projId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/projects/${projId}/loads`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const loadVersions = createAsyncThunk(
  'prompts/loadVersions',
  async (version: Partial<Version>, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/api/projects/${version.projId}/versions`,
        version
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const getLoadVersions = createAsyncThunk(
  'prompts/getLoadVersions',
  async (projId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/projects/${projId}/versions`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const projectSlice = createSlice({
  name: 'createPrompt',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    setSuccessMessage: (state, action: PayloadAction<string>) => {
      state.successMessage = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSelectedCard: (state, action: PayloadAction<any[]>) => {
      state.selectedCard = action.payload;
    },
    setSelectedSession: (state, action: PayloadAction<string | null>) => {
      state.selectedSession = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProjects.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = '';
        state.successMessage = '';
      })
      .addCase(
        createProjects.fulfilled,
        (state, action: PayloadAction<Project>) => {
          state.isLoading = false;
          state.successMessage = 'Project created successfully!';
          const createdProject = action.payload;
          state.projects = [...state.projects, action.payload];

          if (createdProject.orgId) {
            state.selectedOrgId = createdProject.orgId;
            localStorage.setItem('selectedOrgId', createdProject.orgId);
          }
        }
      )
      .addCase(createProjects.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      .addCase(fetchProjectsByUser.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = '';
        state.successMessage = '';
      })
      .addCase(
        fetchProjectsByUser.fulfilled,
        (state, action: PayloadAction<Project[]>) => {
          state.isLoading = false;
          state.projects = action.payload;
        }
      )
      .addCase(
        fetchProjectsByUser.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.errorMessage = 'Error fetching projects. Please try again.';
        }
      )
      .addCase(deleteProject.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = '';
        state.successMessage = '';
      })
      .addCase(
        deleteProject.fulfilled,
        (state, action: PayloadAction<{ projId: string }>) => {
          state.isLoading = false;
          state.successMessage = 'Project deleted successfully!';
          state.projects = state.projects.filter(
            (project) => project.projId !== action.payload.projId
          );
        }
      )
      .addCase(deleteProject.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.errorMessage =
          'Delete the clusters under this project before deleting the project.';
      })
      .addCase(selectProject.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(
        selectProject.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoading = false;
          state.selectProj = action.payload;
        }
      )
      .addCase(selectProject.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.errorMessage = 'Failed to fetch projects.';
      })
      .addCase(loadPrompts.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(loadPrompts.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.isLoading = false;
        state.load = action.payload;
      })
      .addCase(loadPrompts.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.errorMessage = 'Failed to fetch projects.';
      })
      .addCase(loadVersions.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(
        loadVersions.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoading = false;
          state.versions = action.payload;
        }
      )
      .addCase(loadVersions.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.errorMessage = 'Failed to fetch projects.';
      })
      .addCase(getLoadPrompts.pending, (state, action: PayloadAction<any>) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(
        getLoadPrompts.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoading = false;
          state.getLoad = action.payload;
        }
      )
      .addCase(getLoadPrompts.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.errorMessage = 'Failed to fetch load prompts.';
      })
      .addCase(getLoadVersions.pending, (state, action: PayloadAction<any>) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(
        getLoadVersions.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoading = false;
          state.getVersions = action.payload;
        }
      )
      .addCase(
        getLoadVersions.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.errorMessage = 'Failed to fetch load prompts.';
        }
      );
  },
});

export const {
  setName,
  setErrorMessage,
  setSuccessMessage,
  setIsLoading,
  setSelectedCard,
  setSelectedSession,
} = projectSlice.actions;

export const selectProjects = (state: { project: ProjectState }) =>
  state.project.projects;
export const selectProjectName = (state: { project: ProjectState }) =>
  state.project.name;
export const selectErrorMessage = (state: { project: ProjectState }) =>
  state.project.errorMessage;
export const selectSuccessMessage = (state: { project: ProjectState }) =>
  state.project.successMessage;
export const selectIsLoading = (state: { project: ProjectState }) =>
  state.project.isLoading;
export const selectSelectedCard = (state: { project: ProjectState }) =>
  state.project.selectedCard;
export const selectSelectedSession = (state: { project: ProjectState }) =>
  state.project.selectedSession;

export default projectSlice.reducer;
