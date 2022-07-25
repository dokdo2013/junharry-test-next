import { useState, useEffect } from "react";
import { ChakraProvider, Flex, Button } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import CommonSuccess from "../../components/CommonSuccess";

const End = () => {
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

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
          <CommonSuccess
            successTitle="해리배치고사 응시를 완료했어요!"
            showButton={false}
          />

          <Flex mt={6} justifyContent="center">
            <Button
              mt={6}
              mr={2}
              colorScheme="purple"
              className="font-leferi"
              size="lg"
              variant="outline"
              onClick={logout}
            >
              로그아웃
            </Button>
            <Link href="/result" passHref>
              <Button
                mt={6}
                className="font-leferi"
                size="lg"
                colorScheme="purple"
              >
                해리배치고사 결과 보기
              </Button>
            </Link>
          </Flex>
        </ChakraProvider>
      </main>
    </>
  );
};

export default End;
