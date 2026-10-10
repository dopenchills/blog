import { trackEvent } from "../../../modules/ApplicationInsights";

const link = document.querySelector<HTMLAnchorElement>("#buy-me-a-coffee-link");

link?.addEventListener("click", () => {
  trackEvent(
    { name: "BuyMeACoffeeClicked" },
    {
      destination: link.href,
      sourcePath: window.location.pathname,
    },
  );
});
