import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuid } from 'uuid';
import type { Meeting } from '../types/meeting';

interface MeetingState {
  meetings: Meeting[];
  addMeeting: (meeting: Omit<Meeting, 'id'>) => void;
  updateMeeting: (id: string, updates: Partial<Meeting>) => void;
  deleteMeeting: (id: string) => void;
  quickLogToday: () => void;
}

export const useMeetingStore = create<MeetingState>()(
  persist(
    (set, get) => ({
      meetings: [],

      addMeeting: (meeting) =>
        set((state) => ({
          meetings: [{ ...meeting, id: uuid() }, ...state.meetings],
        })),

      updateMeeting: (id, updates) =>
        set((state) => ({
          meetings: state.meetings.map((m) =>
            m.id === id ? { ...m, ...updates } : m
          ),
        })),

      deleteMeeting: (id) =>
        set((state) => ({
          meetings: state.meetings.filter((m) => m.id !== id),
        })),

      quickLogToday: () => {
        const { addMeeting, meetings } = get();
        const todayStr = new Date().toISOString().split('T')[0];
        const alreadyLogged = meetings.some(
          (m) => m.date === todayStr && m.attended
        );
        if (!alreadyLogged) {
          addMeeting({
            date: todayStr,
            time: new Date().toTimeString().slice(0, 5),
            name: 'Meeting',
            location: '',
            type: 'open',
            duration: 60,
            notes: '',
            attended: true,
          });
        }
      },
    }),
    {
      name: 'aa-meetings',
    }
  )
);

export function getAttendedDates(meetings: Meeting[]): string[] {
  return meetings.filter((m) => m.attended).map((m) => m.date);
}
