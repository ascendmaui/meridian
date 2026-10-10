// Performance checking utilities
// This file can be used for custom performance checks

export function checkPerformanceMetrics(metrics) {
  // Example implementation
  const results = {};
  
  // Check First Contentful Paint (should be under 2s for good experience)
  if (metrics.firstContentfulPaint) {
    results.fcpPass = metrics.firstContentfulPaint < 2000; // 2 seconds
    results.fcpValue = metrics.firstContentfulPaint;
  }
  
  // Check Largest Contentful Paint (should be under 2.5s)
  if (metrics.largestContentfulPaint) {
    results.lcpPass = metrics.largestContentfulPaint < 2500; // 2.5 seconds
    results.lcpValue = metrics.largestContentfulPaint;
  }
  
  // Check Cumulative Layout Shift (should be under 0.1 for good experience)
  if (metrics.cumulativeLayoutShift) {
    results.clsPass = metrics.cumulativeLayoutShift < 0.1;
    results.clsValue = metrics.cumulativeLayoutShift;
  }
  
  return results;
}

export default { checkPerformanceMetrics };
