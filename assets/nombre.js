export function hasFullName(value){const parts=String(value||"").trim().split(/[\s,]+/u).filter(Boolean);return parts.length>=2&&parts.every(part=>/\p{L}/u.test(part))}
