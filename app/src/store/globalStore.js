import { create } from 'zustand';

const useGlobalStore = create(set => ({
  userId: '',
  accessLevel: undefined,
  name: '',
  email: '',
  phoneNumber: '',
  loyaltyPoints: undefined,
  reset: () =>
    set({
      userId: '',
      accessLevel: undefined,
      name: '',
      email: '',
      phoneNumber: '',
      loyaltyPoints: undefined
    })
}));

export default useGlobalStore;
