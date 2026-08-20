import React from 'react';
import { EVENT_TYPES, EventTypeConfig } from '@/data/event-pricing';

interface EventTypeSelectorProps {
  selectedEventType: string;
  onSelect: (eventTypeId: string) => void;
}

const EVENT_ICONS: Record<string, string> = {
  wedding: '💍',
  burial: '🕊️',
  inauguration: '🏛️',
  convocation: '🎓',
  namingCeremony: '👶',
  show: '🎤',
  other: '✨',
};

const EVENT_DESCRIPTIONS: Record<string, string> = {
  wedding: 'Wedding coverage packages with albums, frames, videography & drone options.',
  burial: 'Dignified and respectful memorial & funeral service coverage.',
  inauguration: 'Official ceremonies, corporate inaugurations & executive events.',
  convocation: 'Graduation ceremonies, academic milestones & celebrations.',
  namingCeremony: 'Welcoming your new baby with memorable family portraits & coverage.',
  show: 'Concerts, festivals, live stage shows, performances & red carpets.',
  other: 'Birthdays, corporate dinners, anniversaries & custom events.',
};

export const EventTypeSelector: React.FC<EventTypeSelectorProps> = ({
  selectedEventType,
  onSelect,
}) => {
  return (
    <div className="event-type-selector-wrapper">
      <div className="text-center mb-30">
        <h3 className="event-picker-title">Select Your Event Type</h3>
        <p className="event-picker-subtitle">
          Choose the kind of event you want Lum Studios to capture
        </p>
      </div>

      <div className="event-types-grid">
        {EVENT_TYPES.map((type: EventTypeConfig) => {
          const isSelected = selectedEventType === type.id;
          const isWedding = type.id === 'wedding';

          return (
            <div
              key={type.id}
              className={`event-type-card ${isSelected ? 'active' : ''} ${
                isWedding ? 'featured-card' : ''
              }`}
              onClick={() => onSelect(type.id)}
            >
              {isWedding && <span className="event-badge">Fixed Packages</span>}
              {!isWedding && <span className="event-badge quote-badge">Custom Quote</span>}

              <div className="event-icon">{EVENT_ICONS[type.id] || '📷'}</div>
              <h4 className="event-name">{type.name}</h4>
              <p className="event-desc">{EVENT_DESCRIPTIONS[type.id]}</p>

              <div className="event-select-indicator">
                <span className="radio-circle">
                  {isSelected && <span className="radio-dot" />}
                </span>
                <span className="select-text">
                  {isSelected ? 'Selected' : 'Select'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .event-type-selector-wrapper {
          width: 100%;
        }
        .event-picker-title {
          font-size: 26px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 8px;
        }
        .event-picker-subtitle {
          font-size: 15px;
          color: #666;
          margin-bottom: 25px;
        }
        .event-types-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
          gap: 20px;
          margin-bottom: 25px;
        }
        .event-type-card {
          position: relative;
          background: #ffffff;
          border: 2px solid #e9ecef;
          border-radius: 14px;
          padding: 24px 20px;
          cursor: pointer;
          transition: all 0.25s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .event-type-card:hover {
          border-color: #B7C435;
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
        }
        .event-type-card.active {
          border-color: #B7C435;
          background: #fbfdf3;
          box-shadow: 0 8px 25px rgba(183, 196, 53, 0.18);
        }
        .event-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 3px 8px;
          border-radius: 20px;
          background: rgba(183, 196, 53, 0.2);
          color: #6d7807;
        }
        .event-badge.quote-badge {
          background: #f0f0f0;
          color: #666;
        }
        .event-icon {
          font-size: 38px;
          margin-bottom: 12px;
          line-height: 1;
        }
        .event-name {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 8px;
        }
        .event-desc {
          font-size: 13px;
          color: #666;
          line-height: 1.45;
          margin-bottom: 16px;
          flex-grow: 1;
        }
        .event-select-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 600;
          color: #666;
        }
        .event-type-card.active .event-select-indicator {
          color: #6d7807;
        }
        .radio-circle {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 2px solid #ccc;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .event-type-card.active .radio-circle {
          border-color: #B7C435;
        }
        .radio-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #B7C435;
        }
        @media (max-width: 768px) {
          .event-types-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
export default EventTypeSelector;
