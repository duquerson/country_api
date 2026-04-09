// Composable para formateo consistente de números
export function useFormatting() {
    const formatNumber = (num: number) =>
        new Intl.NumberFormat('en-US').format(num);
    return { formatNumber };
}
