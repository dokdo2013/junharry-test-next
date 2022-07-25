import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ChakraProvider } from "@chakra-ui/react";
import CommonError from "../components/CommonError";

const LoginFail = () => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!router.isReady) return;

    // codes using router.query
    const { message } = router.query;
    setErrorMessage(message);
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>해리배치고사</title>
        <meta name="description" content="해리배치고사" />
        <link
          rel="icon"
          href="https://imagedelivery.net/lR-z0ff8FVe1ydEi9nc-5Q/c552441f-f764-4e67-cd3f-1621da181a00/500x500"
        />
      </Head>

      <style jsx global>{`
        body {
          background: #edf2f7;
        }
      `}</style>

      <main>
        <ChakraProvider>
          <CommonError
            errorTitle="로그인에 실패했어요"
            errorMessage={errorMessage}
            showButton={true}
          />
        </ChakraProvider>
      </main>
    </>
  );
};

export default LoginFail;
