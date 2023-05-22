import { create } from 'zustand';

const useGlobalStore = create(set => ({
  userId: '',
  accessLevel: undefined,
  name: '',
  email: '',
  phoneNumber: '',
  loyaltyPoints: undefined,
  selectedMovieTitle: '',
  selectedMovieImageUrl: '',
  reset: () =>
    set({
      userId: '',
      accessLevel: undefined,
      name: '',
      email: '',
      phoneNumber: '',
      loyaltyPoints: undefined,
      selectedMovieTitle: '',
      selectedMovieImageUrl: ''
    })
}));

export default useGlobalStore;
