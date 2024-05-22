import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../components/authContext";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.replace("/signin");
      }
    }, [user, router]);

    if (!user) {
      return null; // Or you can return a loading spinner or placeholder
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
