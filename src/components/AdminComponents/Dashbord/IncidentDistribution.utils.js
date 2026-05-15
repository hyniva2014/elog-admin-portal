/**
 * Builds the HTML string for the ApexCharts custom tooltip.
 * Kept in a dedicated utility to separate template generation from component logic.
 */
export const buildTooltipHtml = ({ series, dataPointIndex, w, CHART_STYLES }) => {
  const category = w.globals.labels[dataPointIndex];
  const total = series.reduce((sum, s) => sum + (s[dataPointIndex] ?? 0), 0);

  const rows = w.globals.seriesNames
    .map((name, i) => {
      const val = series[i][dataPointIndex];
      if (val == null || val === 0) return "";
      const color = w.globals.colors[i];
      return `
        <div style="display:flex;align-items:center;gap:${CHART_STYLES.tooltipRowGap};padding:${CHART_STYLES.tooltipRowPadding};">
          <span style="width:${CHART_STYLES.tooltipDotSize};height:${CHART_STYLES.tooltipDotSize};border-radius:50%;background:${color};flex-shrink:0;display:inline-block;"></span>
          <span style="color:${CHART_STYLES.tooltipLabelColor};font-size:${CHART_STYLES.tooltipLabelFontSize};flex:1;">${name}:</span>
          <span style="color:${CHART_STYLES.tooltipValueColor};font-weight:${CHART_STYLES.tooltipValueFontWeight};font-size:${CHART_STYLES.tooltipValueFontSize};">${val}</span>
        </div>`;
    })
    .join("");

  return `
    <div style="background:${CHART_STYLES.tooltipBg};border:1px solid ${CHART_STYLES.tooltipBorder};border-radius:${CHART_STYLES.tooltipBorderRadius};padding:${CHART_STYLES.tooltipPadding};box-shadow:${CHART_STYLES.tooltipShadow};min-width:${CHART_STYLES.tooltipMinWidth};">
      <div style="font-weight:${CHART_STYLES.tooltipCategoryFontWeight};font-size:${CHART_STYLES.tooltipCategoryFontSize};color:${CHART_STYLES.tooltipCategoryColor};margin-bottom:${CHART_STYLES.tooltipCategoryMarginBottom};padding-bottom:${CHART_STYLES.tooltipCategoryPaddingBottom};border-bottom:1px solid ${CHART_STYLES.tooltipDivider};">
        ${category}
      </div>
      ${rows}
      <div style="display:flex;align-items:center;gap:${CHART_STYLES.tooltipRowGap};padding:${CHART_STYLES.tooltipTotalPaddingTop} 0 0;margin-top:${CHART_STYLES.tooltipTotalMarginTop};border-top:1px solid ${CHART_STYLES.tooltipDivider};">
        <span style="width:${CHART_STYLES.tooltipDotSize};height:${CHART_STYLES.tooltipDotSize};flex-shrink:0;display:inline-block;"></span>
        <span style="color:${CHART_STYLES.tooltipLabelColor};font-size:${CHART_STYLES.tooltipLabelFontSize};flex:1;font-weight:${CHART_STYLES.tooltipTotalFontWeight};">Total:</span>
        <span style="color:${CHART_STYLES.tooltipValueColor};font-weight:${CHART_STYLES.tooltipValueFontWeight};font-size:${CHART_STYLES.tooltipValueFontSize};">${total}</span>
      </div>
    </div>`;
};
