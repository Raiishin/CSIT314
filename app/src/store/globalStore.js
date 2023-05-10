import { create } from 'zustand';

const useGlobalStore = create(set => ({
  userId: ''
}));

export default useGlobalStore;
