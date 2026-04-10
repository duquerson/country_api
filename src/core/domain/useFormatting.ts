// Consistent number formatting utility
export function useFormatting() {
    const formatNumber = (num: number) =>
        new Intl.NumberFormat('en-US').format(num);
    return { formatNumber };
}

export const formatNumber = (num: number) =>
    new Intl.NumberFormat('en-US').format(num);
