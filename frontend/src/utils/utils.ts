// src/utils/utils.ts
export const truncateText = (text: string | null | undefined, maxLength: number = 30): string => {
    if (!text) {
        return "";
    }
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength) + "[...]";
};
