import Head from "next/head";
import Link from "next/link";
import router from "next/router";
import { useState, useEffect } from "react";
import {
  ChakraProvider,
  Flex,
  Text,
  Button,
  Alert,
  AlertIcon,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import axios from "axios";

const Home = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDone, setIsDone] = useState(true);
  const [userName, setUserName] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.get(
        "http://api-v1.leaven.team/junharry-test/home",
        {
          headers: {
            "X-Access-Token": token,
          },
        }
      );
      if (response.data.code === "SUCCESS") {
        setIsLogin(true);
        setIsLoaded(true);
        if (response.data.data.is_done) {
          setIsDone(true);
        } else {
          setIsDone(false);
        }
        setUserName(response.data.data.user.display_name);
      } else {
        setIsLogin(false);
        setIsLoaded(true);
        setIsDone(false);
      }
    } else {
      setIsLogin(false);
      setIsLoaded(true);
      setIsDone(true);
    }
  };

  const startTest = () => {
    // api 보내서 시작 체크
    axios
      .post(
        "http://api-v1.leaven.team/junharry-test/start/1",
        {},
        {
          headers: {
            "X-Access-Token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        if (response.data.code === "SUCCESS") {
          // set csrf token
          localStorage.setItem("csrfToken", response.data.data.csrf_token);
          router.push("/test/1");
        } else {
          alert(
            "해리배치고사를 시작할 수 없어요. 자세한 내용은 관리자에게 문의해주세요."
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
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

      <main id="home">
        <ChakraProvider>
          <Modal
            closeOnOverlayClick={false}
            isOpen={isOpen}
            onClose={onClose}
            className="font-leferi"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader className="font-leferi">
                해리배치고사 시작
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Alert status="info">
                  <AlertIcon />
                  <Text className="font-leferi-bold">
                    아래 유의사항을 꼭 읽어주세요!
                  </Text>
                </Alert>
                <UnorderedList mt={3}>
                  <ListItem mb={2}>
                    <Text className="font-leferi">
                      이용자의 행동로그가 기록되며, 이를 통해 부정행위를
                      감지합니다.
                    </Text>
                  </ListItem>
                  <ListItem mb={2}>
                    <Text className="font-leferi">
                      부정행위가 감지되면 응시결과와 무관하게 이벤트 참여
                      대상에서 제외될 수 있습니다.
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text className="font-leferi">
                      모든 문제에 대해 정답을 선택한 뒤, 반드시{" "}
                      <span className="font-leferi-bold">제출</span> 버튼을
                      눌러야 결과가 반영됩니다.
                    </Text>
                  </ListItem>
                </UnorderedList>
              </ModalBody>

              <ModalFooter className="font-leferi">
                <Button onClick={onClose} mr={3}>
                  잠시 뒤에 할래요
                </Button>
                <Button colorScheme="purple" onClick={startTest}>
                  배치고사 시작!
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {isLoaded ? (
            <Flex flexDir="column" alignItems="center" mt={5} p={2}>
              {isLogin ? (
                <Flex
                  flexDir="column"
                  alignItems="center"
                  mt={5}
                  textAlign="center"
                >
                  <Heading size="md" mt={10}>
                    안녕하세요,{" "}
                    <span
                      style={{
                        color: "#2599cb",
                      }}
                    >
                      {userName}
                    </span>
                    님!
                  </Heading>
                  {isDone ? (
                    <Heading mt={5} size="lg" textAlign="center">
                      이미{" "}
                      <span
                        style={{
                          color: "#2599cb",
                        }}
                      >
                        해리배치고사
                      </span>
                      를 응시했어요.
                      <br />
                      순위는 7월 26일 방송에서 확인해요!
                    </Heading>
                  ) : (
                    <Heading mt={5} size="lg">
                      아래 버튼을 눌러{" "}
                      <span
                        style={{
                          color: "#2599cb",
                        }}
                      >
                        해리배치고사
                      </span>
                      를 시작해주세요
                    </Heading>
                  )}
                  <Flex mt={6}>
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
                    {isDone ? (
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
                    ) : (
                      <Button
                        mt={6}
                        className="font-leferi"
                        size="lg"
                        colorScheme="purple"
                        onClick={onOpen}
                      >
                        해리배치고사 시작!
                      </Button>
                    )}
                  </Flex>
                </Flex>
              ) : (
                <Flex flexDir="column" alignItems="center" mt={5}>
                  <Text className="font-leferi">로그인이 필요합니다.</Text>
                  <Link href="/login" passHref>
                    <Button mt={3} className="font-leferi" colorScheme="purple">
                      로그인하러 가기
                    </Button>
                  </Link>
                </Flex>
              )}
            </Flex>
          ) : (
            <Flex flexDir="column" alignItems="center" mt={5}>
              <Text className="font-leferi">잠시만 기다려주세요.</Text>
            </Flex>
          )}
        </ChakraProvider>
      </main>
    </>
  );
};

export default Home;
