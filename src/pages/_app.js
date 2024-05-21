// import "../styles/globals.css";
// import wrapper from "@/redux/store";
// import Layout from "../../components/Layout";
// import { useRouter } from "next/router";

// function MyApp({ Component, pageProps }) {
//   const router = useRouter();

//   const showLayout =
//     !router.pathname.startsWith("/signup") &&
//     !router.pathname.startsWith("/signin");

//   return (
//     <>
//       {showLayout && (
//         <Layout>
//           <Component {...pageProps} />
//         </Layout>
//       )}
//       {!showLayout && <Component {...pageProps} />}
//     </>
//   );
// }

// export default wrapper.withRedux(MyApp);

import "../styles/globals.css";
import wrapper from "@/redux/store";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import ErrorPage from "next/error";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const showLayout =
    !router.pathname.startsWith("/signup") &&
    !router.pathname.startsWith("/signin") &&
    !router.pathname.startsWith("/404");

  return (
    <>
      {showLayout ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

export default wrapper.withRedux(MyApp);
