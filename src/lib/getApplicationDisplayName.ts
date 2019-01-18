// Gets the display name of a JSX component for dev tools
import React from "react";

export default function getApplicationDisplayName(
    Component: React.ComponentType<any>
) {
    return Component.displayName || Component.name || "Unknown";
}
