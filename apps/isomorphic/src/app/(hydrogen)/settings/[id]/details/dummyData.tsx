export type Invoice = {
  clusterId: string;
  workloads: number;
  namespace: string;
  clusterStatus: string;
  totalCost: number;
  totalCpu: number;
  totalMemory: number;
  averageMemoryCost: number;
  averageCpuCost: number;
  appId: string;
};

export const loggedInDeviceData = [
  {
    id: '1',
    user: {
      name: 'Bennie Buckridge',
      email: 'Abner.Purdy@gmail.com',
      avatar:
        'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-09.webp',
    },
    email: 'Brycen_Cremin44@hotmail.com',
    status: 'Offline',
  },
  {
    id: '2',
    user: {
      name: 'Philip Muller',
      email: 'Modesto_Marks@gmail.com',
      avatar:
        'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-07.webp',
    },
    email: 'Hazle_Little10@hotmail.com',
    status: 'Offline',
  },
  {
    id: '3',
    user: {
      name: 'Viola Terry',
      email: 'Darlene17@gmail.com',
      avatar:
        'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-10.webp',
    },
    email: 'Jovany57@gmail.com',
    status: 'Offline',
  },
];
