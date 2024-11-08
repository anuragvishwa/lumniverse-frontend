import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
const generateUUID = () => uuidv4();

export const initialProjects: Project[] = [
  {
    uuid: generateUUID(),
    variableState: {
      variable: [],
      variableData: {},
      variableName: {},
    },
    messageState: {
      message: [],
      messageData: {},
      selectedOptions: {},
    },
    targetState: {
      targetData: '',
    },
  },
  {
    uuid: generateUUID(),
    variableState: {
      variable: [],
      variableData: {},
      variableName: {},
    },
    messageState: {
      message: [],
      messageData: {},
      selectedOptions: {},
    },
    targetState: {
      targetData: '',
    },
  },
];

interface VariableState {
  variable: { id: number }[];
  variableData: { [key: number]: string };
  variableName: { [key: number]: string };
}

interface MessageState {
  message: { id: number }[];
  messageData: { [key: number]: string };
  selectedOptions: { [key: number]: { value: string; label: string } };
}

interface TargetState {
  targetData: string;
}

interface Project {
  uuid: string;
  variableState: VariableState;
  messageState: MessageState;
  targetState: TargetState;
}
const selectedDatasetVersionId = localStorage.getItem(
  'selectedDatasetVersionId'
);
export const loadProjectsFromLocalStorage = (): Project[] => {
  const storedProjects = localStorage.getItem(
    `projectsState_${selectedDatasetVersionId}`
  );
  if (storedProjects) {
    return JSON.parse(storedProjects) as Project[];
  }
  return initialProjects;
};

const initialState = loadProjectsFromLocalStorage();

const projectsSlice = createSlice({
  name: 'projectState',
  initialState,
  reducers: {
    setProjectState: (state, action: PayloadAction<Project[]>) => {
      return action.payload;
    },
  },
});

export const { setProjectState } = projectsSlice.actions;
export default projectsSlice.reducer;
