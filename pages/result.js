import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Avatar,
  ChakraProvider,
  Text,
  useToast,
  Button,
  Container,
  Badge,
  Heading,
  Box,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import CommonError from "../components/CommonError";

const Result = () => {
  const toast = useToast();
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);
  const [isError, setIsError] = useState(false);
  const [apiData, setApiData] = useState({});
  const [errorMessage, setErrorMessage] = useState("잠시만 기다려주세요...");

  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [logo, setLogo] = useState("");
  const [testData, setTestData] = useState([]);
  const [score, setScore] = useState(0);

  const getApi = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = axios
        .get("https://api-v1.leaven.team/junharry-test/result/1", {
          headers: {
            "X-Access-Token": token,
          },
        })
        .then((Response) => {
          if (Response.data.code === "SUCCESS") {
            setIsLogged(true);
            setApiData(Response.data.data);
            console.log(Response.data.data);
          } else {
            toast({
              title: "오류",
              description: "API 호출 중 오류가 발생했습니다.",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
            setIsLogged(false);
            setIsError(true);
            setErrorMessage(Response.data.message || "오류가 발생했습니다.");
          }
        })
        .catch((error) => {
          toast({
            title: "오류",
            description: "API 호출 중 오류가 발생했습니다.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          setIsLogged(false);
          setIsError(true);
          setErrorMessage(
            error.response.data.message || "오류가 발생했습니다."
          );
        });
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  useEffect(() => {
    if (apiData.user_data) {
      setName(apiData.user_data.name);
      setDisplayName(apiData.user_data.display_name);
      setLogo(apiData.user_data.profile_image_url);
    }
    if (apiData.score) {
      setScore(apiData.score);
    }
    if (apiData.test_data) {
      setTestData(apiData.test_data);
    }
  }, [apiData]);

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
          {isLogged ? (
            <Container>
              <Flex
                justifyContent="space-between"
                alignItems="flex-end"
                mb={10}
              >
                <Box mt={5}>
                  <Avatar src={logo} size="lg" mb={2} />
                  <Flex alignItems="flex-end">
                    <Heading size="lg">{displayName}</Heading>
                    <Heading size="md" color="gray">
                      {name}
                    </Heading>
                  </Flex>
                </Box>
                <Flex alignItems="baseline">
                  <Heading
                    style={{
                      color: "#2599cb",
                    }}
                  >
                    {score}
                  </Heading>
                  <Heading size="sm">/15 점</Heading>
                </Flex>
              </Flex>

              <Box mt={16}>
                <Heading size="md" mb={8}>
                  📚 내 정답 확인하기
                </Heading>
                <Box mt={5}>
                  {testData.map((item, index) => {
                    return (
                      <Box key={index} my={5}>
                        <Heading size="sm">
                          {index + 1}. {item.question}
                          <Badge
                            colorScheme={
                              item.user_answer === item.correct_answer
                                ? "green"
                                : "red"
                            }
                          >
                            {item.user_answer === item.correct_answer
                              ? "맞았어요"
                              : "틀렸어요"}
                          </Badge>
                        </Heading>
                        <Box my={2}>
                          <Text className="font-leferi">
                            정답:{" "}
                            {
                              item.answers[0].find(
                                (answer) => answer.idx === item.correct_answer
                              ).content
                            }
                          </Text>
                          <Text className="font-leferi">
                            선택:{" "}
                            {
                              item.answers[0].find(
                                (answer) => answer.idx === item.user_answer
                              ).content
                            }
                          </Text>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
              <Flex justifyContent="center">
                <Link href="/home" passHref>
                  <Button colorScheme="purple" my={5} className="font-leferi">
                    홈으로 이동하기
                  </Button>
                </Link>
              </Flex>
            </Container>
          ) : isError ? (
            <CommonError errorTitle={errorMessage} showButton={true} />
          ) : (
            <Text className="font-leferi" textAlign="center">
              잠시만 기다려주세요...
            </Text>
          )}
        </ChakraProvider>
      </main>
    </>
  );
};

export default Result;
