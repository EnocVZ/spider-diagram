import React from "react";
export function TitleSelected({ title }) {
    return title != "" ? <span className="diagram-text-selected">{title}</span> : null;
}