import type { ApplicationInsights } from "@microsoft/applicationinsights-web";

const connectionString = import.meta.env
  .PUBLIC_APPLICATION_INSIGHTS_CONNECTION_STRING;

let appInsights: ApplicationInsights | undefined;
let initialization: Promise<ApplicationInsights | undefined> | undefined;

function initializeApplicationInsights() {
  if (!connectionString) return Promise.resolve(undefined);

  return (initialization ??= import("@microsoft/applicationinsights-web").then(
    ({ ApplicationInsights }) => {
      appInsights = new ApplicationInsights({
        config: {
          connectionString,
          // Keep pagehide/visibilitychange flushing without the deprecated unload event.
          disablePageUnloadEvents: ["unload"],
        },
      });
      appInsights.loadAppInsights();
      appInsights.trackPageView();
      return appInsights;
    },
  ));
}

export function scheduleApplicationInsights() {
  if (!connectionString) return;

  const initialize = () => {
    void initializeApplicationInsights().catch((error) => {
      console.warn("Application Insights could not be initialized", error);
    });
  };
  const schedule = () => {
    // Keep the SDK and its requests out of the initial page load.
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(initialize, { timeout: 2000 });
    } else {
      window.setTimeout(initialize, 0);
    }
  };

  if (document.readyState === "complete") {
    schedule();
  } else {
    window.addEventListener("load", schedule, { once: true });
  }
}

export function trackEvent(
  ...args: Parameters<ApplicationInsights["trackEvent"]>
) {
  // A click before idle initialization should still be tracked.
  void initializeApplicationInsights()
    .then((insights) => insights?.trackEvent(...args))
    .catch((error) => {
      console.warn("Application Insights event could not be tracked", error);
    });
}
