"use client";
import React, { useState } from "react";

// prop type
type IProps = {
  item: {id:number;question: string; answer: string};
  isFirst?: boolean;
};

export default function FaqItem({ item, isFirst = false }: IProps) {
  const [isOpen, setIsOpen] = useState(isFirst);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`accordion-items ${isOpen ? 'is-active' : ''}`}>
      <h2 className="accordion-header">
        <button
          className={`accordion-buttons ${!isOpen ? 'collapsed' : ''}`}
          type="button"
          onClick={toggleAccordion}
          aria-expanded={isOpen}
          aria-controls={`collapse-${item.id}`}
        >
          <span className="accordion-question">{item.question}</span>
          <span className={`accordion-icon ${isOpen ? 'open' : ''}`}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path 
                className="icon-line icon-line-vertical"
                d="M10 4V16" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
              <path 
                className="icon-line icon-line-horizontal"
                d="M4 10H16" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
            </svg>
          </span>
        </button>
      </h2>
      <div
        id={`collapse-${item.id}`}
        className={`accordion-collapse ${isOpen ? 'show' : 'collapse'}`}
        aria-labelledby={`heading-${item.id}`}
      >
        <div className="accordion-body">
          <p>{item.answer}</p>
        </div>
      </div>
    </div>
  );
}
