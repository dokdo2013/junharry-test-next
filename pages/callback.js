import Head from "next/head";
import Link from "next/link";
import router from "next/router";
import { ChakraProvider, Text, Button, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import axios from "axios";

export default function Callback() {
  const apiUrl = "http://api-v1.leaven.team/junharry-test";

  useEffect(() => {
    const code = window.location.search.split("=")[1].split("&")[0];
    getAxios(code);
  }, []);

  let count = 0;
  const getAxios = async (code) => {
    await axios
      .post(`${apiUrl}/auth`, {
        code,
      })
      .then((Response) => {
        if (Response.data.code === "SUCCESS") {
          localStorage.setItem("token", Response.data.data.token);
          router.push("/home");
        } else {
          console.log(Response);
          router.push("/loginFail?message" + Response.data.message);
        }
      })
      .catch((Error) => {
        console.log(Error);
        router.push("/LoginFail?message=" + Error.message);
      });
  };

  return (
    <div>
      <Head>
        <title>해리배치고사</title>
        <meta name="description" content="해리배치고사" />
        <link
          rel="icon"
          href="https://imagedelivery.net/lR-z0ff8FVe1ydEi9nc-5Q/c552441f-f764-4e67-cd3f-1621da181a00/500x500"
        />
      </Head>

      <main>
        <ChakraProvider>
          <Flex flexDir="column" alignItems="center" mt={5}>
            <Text className="font-leferi">
              잠시만 기다려주세요. 이 페이지가 계속 보이신다면 아래 버튼을
              눌러주세요
            </Text>
            <Link href="/" passHref>
              <Button mt={3} className="font-leferi">
                Home으로 이동
              </Button>
            </Link>
          </Flex>
        </ChakraProvider>
      </main>
    </div>
  );
}
