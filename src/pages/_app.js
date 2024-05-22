import "../styles/globals.css";
import wrapper from "@/redux/store";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { useAuth, AuthProvider } from "../../components/authContext";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <AuthProvider>
      <AuthChecker>
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </AuthChecker>
    </AuthProvider>
  );
}

const AuthChecker = ({ children }) => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (
      !user &&
      !router.pathname.startsWith("/signup") &&
      !router.pathname.startsWith("/signin") &&
      router.pathname !== "/404"
    ) {
      router.replace("/signin");
    }
  }, [user, router]);

  return children;
};

const LayoutWrapper = ({ children }) => {
  const router = useRouter();
  const showLayout =
    !router.pathname.startsWith("/signup") &&
    !router.pathname.startsWith("/signin") &&
    !router.pathname.startsWith("/404");

  return showLayout ? <Layout>{children}</Layout> : children;
};

export default wrapper.withRedux(MyApp);
