import "../styles/globals.css";
import "../styles/Fonts.css";
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://5d862f387f2f4dc79a22d6cc173db5fc@o1217331.ingest.sentry.io/6592967",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
