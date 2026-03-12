import type { FormEvent } from 'react';
import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useMeetingStore } from '../../store/meetingStore';
import type { MeetingType } from '../../types/meeting';
import { MEETING_TYPE_LABELS } from '../../types/meeting';
import { today } from '../../utils/dates';

const DURATIONS = [30, 45, 60, 90];

interface MeetingLogProps {
  open: boolean;
  onClose: () => void;
}

const meetingTypes = Object.entries(MEETING_TYPE_LABELS) as [MeetingType, string][];

export function MeetingLog({ open, onClose }: MeetingLogProps) {
  const addMeeting = useMeetingStore((s) => s.addMeeting);
  const [date, setDate] = useState(today());
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState<MeetingType>('open');
  const [duration, setDuration] = useState(60);
  const [notes, setNotes] = useState('');
  const [attended, setAttended] = useState(true);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    addMeeting({ date, time, name, location, type, duration, notes, attended });
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title="Log Meeting">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-cream/50 font-sans mb-1.5">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-sacred-900/60 border border-cream/10 rounded-lg px-3 py-2 text-cream text-sm font-sans focus:outline-none focus:border-ember-400/50 focus:ring-1 focus:ring-ember-400/30 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-cream/50 font-sans mb-1.5">
              Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-sacred-900/60 border border-cream/10 rounded-lg px-3 py-2 text-cream text-sm font-sans focus:outline-none focus:border-ember-400/50 focus:ring-1 focus:ring-ember-400/30 transition-colors"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-cream/50 font-sans mb-1.5">
            Meeting Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Friday Night Recovery"
            className="w-full bg-sacred-900/60 border border-cream/10 rounded-lg px-3 py-2 text-cream text-sm font-sans placeholder:text-cream/30 focus:outline-none focus:border-ember-400/50 focus:ring-1 focus:ring-ember-400/30 transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-cream/50 font-sans mb-1.5">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Community Center, Room 204"
            className="w-full bg-sacred-900/60 border border-cream/10 rounded-lg px-3 py-2 text-cream text-sm font-sans placeholder:text-cream/30 focus:outline-none focus:border-ember-400/50 focus:ring-1 focus:ring-ember-400/30 transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-cream/50 font-sans mb-1.5">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as MeetingType)}
              className="w-full bg-sacred-900/60 border border-cream/10 rounded-lg px-3 py-2 text-cream text-sm font-sans focus:outline-none focus:border-ember-400/50 focus:ring-1 focus:ring-ember-400/30 transition-colors appearance-none"
            >
              {meetingTypes.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-cream/50 font-sans mb-1.5">
              Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full bg-sacred-900/60 border border-cream/10 rounded-lg px-3 py-2 text-cream text-sm font-sans focus:outline-none focus:border-ember-400/50 focus:ring-1 focus:ring-ember-400/30 transition-colors appearance-none"
            >
              {DURATIONS.map((d) => (
                <option key={d} value={d}>
                  {d} min
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-cream/50 font-sans mb-1.5">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any thoughts or reflections..."
            rows={3}
            className="w-full bg-sacred-900/60 border border-cream/10 rounded-lg px-3 py-2 text-cream text-sm font-sans placeholder:text-cream/30 focus:outline-none focus:border-ember-400/50 focus:ring-1 focus:ring-ember-400/30 transition-colors resize-none"
          />
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <div
            className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
              attended ? 'bg-sage' : 'bg-cream/15'
            }`}
            onClick={() => setAttended(!attended)}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                attended ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </div>
          <span className="text-sm text-cream/70 font-sans">Attended this meeting</span>
        </label>

        <div className="flex gap-3 pt-2">
          <Button variant="ghost" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            Log Meeting
          </Button>
        </div>
      </form>
    </Modal>
  );
}
