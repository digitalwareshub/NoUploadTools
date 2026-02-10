/**
 * GA4 custom event helpers.
 * These fire only when gtag is available (i.e. GA_ID is set in production).
 */

type GtagEvent = {
  [key: string]: string | number | boolean | undefined;
};

function sendEvent(eventName: string, params: GtagEvent) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

// --- Tool Usage Events ---

export function trackToolStart(toolName: string) {
  sendEvent("tool_start", {
    tool_name: toolName,
    event_category: "engagement"
  });
}

export function trackToolComplete(
  toolName: string,
  details: {
    fileCount?: number;
    totalPages?: number;
    processingTimeMs?: number;
  } = {}
) {
  sendEvent("tool_complete", {
    tool_name: toolName,
    file_count: details.fileCount,
    total_pages: details.totalPages,
    processing_time_ms: details.processingTimeMs,
    event_category: "conversion"
  });
}

export function trackFileDownload(
  toolName: string,
  fileType: string,
  fileSizeKb?: number
) {
  sendEvent("file_download", {
    tool_name: toolName,
    file_type: fileType,
    file_size_kb: fileSizeKb,
    event_category: "conversion"
  });
}

// --- User Journey Events ---

export function trackFileSelected(
  toolName: string,
  fileCount: number,
  fileType?: string,
  fileSizeKb?: number
) {
  sendEvent("file_selected", {
    tool_name: toolName,
    file_count: fileCount,
    file_type: fileType,
    file_size_kb: fileSizeKb
  });
}

export function trackToolError(
  toolName: string,
  errorType: string,
  errorMessage?: string
) {
  sendEvent("tool_error", {
    tool_name: toolName,
    error_type: errorType,
    error_message: errorMessage
  });
}

// --- Engagement Events ---

export function trackFeatureUsed(toolName: string, feature: string) {
  sendEvent("feature_used", {
    tool_name: toolName,
    feature
  });
}
