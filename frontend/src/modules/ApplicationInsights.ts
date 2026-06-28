import { ApplicationInsights } from "@microsoft/applicationinsights-web";

const connectionString = import.meta.env
  .PUBLIC_APPLICATION_INSIGHTS_CONNECTION_STRING;

export const appInsights = connectionString
  ? new ApplicationInsights({
      config: {
        connectionString,
      },
    })
  : undefined;

if (appInsights) {
  appInsights.loadAppInsights();
  appInsights.trackPageView();
}
