import Head from "next/head";
import { ChakraProvider, Heading, Flex, Button, Text } from "@chakra-ui/react";
import { FaTwitch } from "react-icons/fa";

export default function Index() {
  const goTwitch = () => {
    const url = "https://id.twitch.tv/oauth2/authorize";
    const clientId = "7xz9p74u0tqjc8fdwmw51v9z9hqia7";
    const redirectUri = "http://localhost:3000/callback";
    const responseType = "code";
    const scope = "user:read:follows+user:read:subscriptions+user:read:email";
    const state = "";
    const queryString = `?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&state=${state}`;
    window.location.href = url + queryString;
  };

  return (
    <div id="bg">
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
          <Flex
            height="100vh"
            flexDir="column"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Flex flexDir="column" alignItems="center">
              <Text color="white" className="font-leferi" mb={2}>
                해리 방송 1주년 기념
              </Text>
              <Heading size="2xl" color="white">
                해리배치고사
              </Heading>
            </Flex>
            <Button
              className="font-leferi"
              leftIcon={<FaTwitch />}
              size="lg"
              colorScheme="purple"
              onClick={goTwitch}
            >
              Twitch Login
            </Button>
          </Flex>
        </ChakraProvider>
      </main>

      <footer></footer>
    </div>
  );
}
