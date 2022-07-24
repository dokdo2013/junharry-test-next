import Link from "next/link";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  ChakraProvider,
  Box,
  Flex,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

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
          <Box textAlign="center" py={10} px={6}>
            <Box display="inline-block">
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                bg={"red.500"}
                rounded={"50px"}
                w={"55px"}
                h={"55px"}
                textAlign="center"
              >
                <CloseIcon boxSize={"20px"} color={"white"} />
              </Flex>
            </Box>
            <Heading as="h2" size="lg" mt={6} mb={2}>
              로그인에 실패했어요
            </Heading>
            <Text fontSize="xl" mt={5} color={"gray.700"}>
              {errorMessage}{" "}
            </Text>

            <Link href="/" passHref>
              <Button mt={10} colorScheme="purple">
                홈으로 이동
              </Button>
            </Link>
          </Box>
        </ChakraProvider>
      </main>
    </>
  );
};

export default LoginFail;
