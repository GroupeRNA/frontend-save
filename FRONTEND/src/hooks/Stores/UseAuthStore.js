import create from 'zustand';

export const useAuthStore = create((set) => ({
    transcripions: [],
    currentTranscription: null,
    loading:false,
    error:null,
    setTranscriptions: (transcripions) => set({ transcripions }),
}));