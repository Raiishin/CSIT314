import { create } from 'zustand';

const useGlobalStore = create(set => ({
  userId: '',
  accessLevel: undefined
}));

export default useGlobalStore;
