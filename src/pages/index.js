// pages/index.js

import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the signup page
    router.push("/signup");
  }, []);

  // This component doesn't render anything directly
  return null;
};

export default Home;
