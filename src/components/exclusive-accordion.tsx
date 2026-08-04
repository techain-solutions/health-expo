"use client";

import { useState } from "react";

type AccordionItem = {
  title: string;
  text: string;
};

export function ExclusiveAccordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div className="accordion__item" key={item.title}>
          <button
            aria-controls={`accordion-panel-${index}`}
            aria-expanded={openIndex === index}
            id={`accordion-trigger-${index}`}
            onClick={() => setOpenIndex((current) => current === index ? -1 : index)}
            type="button"
          >
            {item.title}
          </button>
          {openIndex === index ? <div aria-labelledby={`accordion-trigger-${index}`} id={`accordion-panel-${index}`} role="region">{item.text}</div> : null}
        </div>
      ))}
    </div>
  );
}
