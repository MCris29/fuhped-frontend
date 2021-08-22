import "@/styles/globals.css";
import { AuthProvider } from "@/lib/auth";
import Head from "next/head";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import theme from "@/styles/theme";
import { Router } from "next/router";
import NProgress from "nprogress";

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function App({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <Head>
          <title>Fuhped</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;
