"use client";

import { useState } from "react";

export function FileField({
  accept,
  name,
  required,
}: {
  accept?: string;
  name: string;
  required?: boolean;
}) {
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <span className="file-field">
      <span className="file-field__button">Choose file</span>
      <span className="file-field__name">{fileName ?? "No file chosen"}</span>
      <input
        accept={accept}
        className="file-field__input"
        name={name}
        onChange={(event) => setFileName(event.target.files?.[0]?.name ?? null)}
        required={required}
        type="file"
      />
    </span>
  );
}
