import React from 'react';
import { EVENT_TYPES, EventTypeConfig } from '@/data/event-pricing';

interface EventTypeSelectorProps {
  selectedEventType: string;
  onSelect: (eventTypeId: string) => void;
}

export const EventTypeSelector: React.FC<EventTypeSelectorProps> = ({ selectedEventType, onSelect }) => {
  return (
    <div className="event-type-selector">
      <h2 className="section-title">Select Event Type</h2>
      <div className="event-cards">
        {EVENT_TYPES.map((type: EventTypeConfig) => (
          <button
            key={type.id}
            type="button"
            className={`event-card ${selectedEventType === type.id ? 'active' : ''}`}
            onClick={() => onSelect(type.id)}
          >
            {type.name}
          </button>
        ))}
      </div>
      <style jsx>{`
        .event-cards {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .event-card {
          flex: 1 1 150px;
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          background: #fff;
          cursor: pointer;
          text-align: center;
          font-weight: 600;
          transition: all 0.2s;
        }
        .event-card.active {
          border-color: var(--tp-theme-1);
          background: var(--tp-theme-1);
          color: #fff;
        }
      `}</style>
    </div>
  );
};
