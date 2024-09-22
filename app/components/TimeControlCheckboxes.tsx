import { useState } from "react";

type TimeControl = "bullet" | "blitz" | "rapid";

interface TimeControlCheckboxesProps {
  selectedTypes: Record<TimeControl, boolean>;
  onCheckboxChange: (type: TimeControl) => void;
}

export default function TimeControlCheckboxes({
  selectedTypes,
  onCheckboxChange,
}: TimeControlCheckboxesProps) {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={selectedTypes.bullet}
          onChange={() => onCheckboxChange("bullet")}
        />
        Bullet
      </label>
      <label>
        <input
          type="checkbox"
          checked={selectedTypes.blitz}
          onChange={() => onCheckboxChange("blitz")}
        />
        Blitz
      </label>
      <label>
        <input
          type="checkbox"
          checked={selectedTypes.rapid}
          onChange={() => onCheckboxChange("rapid")}
        />
        Rapid
      </label>
    </div>
  );
} 