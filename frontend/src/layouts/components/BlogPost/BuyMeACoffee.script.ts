import { appInsights } from "../../../modules/ApplicationInsights";

const link = document.querySelector<HTMLAnchorElement>("#buy-me-a-coffee-link");

link?.addEventListener("click", () => {
  appInsights?.trackEvent(
    { name: "BuyMeACoffeeClicked" },
    {
      destination: link.href,
      sourcePath: window.location.pathname,
    },
  );
});
