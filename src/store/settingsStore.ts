import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Settings } from '../types/settings';

interface SettingsState extends Settings {
  updateSettings: (updates: Partial<Settings>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      userName: '',
      homeGroup: '',
      sobrietyDate: '',
      reminderTime: '09:00',

      updateSettings: (updates) =>
        set((state) => ({ ...state, ...updates })),
    }),
    {
      name: 'aa-settings',
    }
  )
);
