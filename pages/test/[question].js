import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  ChakraProvider,
  Container,
  Progress,
  Flex,
  Text,
  Heading,
  Button,
  Box,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import axios from "axios";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const Test = () => {
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [qid, setQid] = useState(-1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [userAnswer, setUserAnswer] = useState(-1);

  const minQuestion = 1;
  const maxQuestion = 15;

  const verify = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.get(
        "http://localhost:9091/junharry-test/home",
        {
          headers: {
            "X-Access-Token": token,
          },
        }
      );
      if (response.data.code === "SUCCESS") {
        if (response.data.data.is_done) {
          router.push("/result");
        }
      }
    }
  };

  const getApi = async (qid) => {
    if (qid === -1) return;
    setIsLoading(true);
    const response = await axios.get(
      `http://localhost:9091/junharry-test/question/1/${qid}`,
      {
        headers: {
          "X-Access-Token": localStorage.getItem("token"),
          "X-CSRF-Token": localStorage.getItem("csrfToken"),
        },
      }
    );

    if (response.data.code === "SUCCESS") {
      setQuestion(response.data.data.question);
      setAnswers(shuffle(response.data.data.answers));
      setUserAnswer(response.data.data.answer);
      setIsLoaded(true);
      localStorage.setItem("csrfToken", response.data.data.csrfToken);
    }
    setIsLoading(false);
  };

  const end = async () => {
    setIsLoading(true);
    await onSubmit(15, "next", true);
    const response = await axios.post(
      "http://localhost:9091/junharry-test/end",
      {},
      {
        headers: {
          "X-Access-Token": localStorage.getItem("token"),
          "X-CSRF-Token": localStorage.getItem("csrfToken"),
        },
      }
    );

    if (response.data.code === "SUCCESS") {
      setIsLoading(false);
      router.push("/result");
    } else {
      toast({
        title: "실패",
        description: "해리배치고사 제출에 실패하였습니다.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  };

  const onSubmit = async (qid, direction, noAlert = false) => {
    if (qid === -1) return;
    if (userAnswer === -1) {
      toast({
        title: "정답을 선택해주세요.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    setIsLoading(true);
    const response = await axios.post(
      `http://localhost:9091/junharry-test/submit/1/${qid}/${userAnswer}`,
      {},
      {
        headers: {
          "X-Access-Token": localStorage.getItem("token"),
          "X-CSRF-Token": localStorage.getItem("csrfToken"),
        },
      }
    );

    if (response.data.code === "SUCCESS") {
      if (direction === "next") {
        if (qid < maxQuestion) {
          setQid(parseInt(qid) + 1);
          router.push(`/test/${parseInt(qid) + 1}`);
          toast({
            title: "[" + qid + "번] 정답이 저장되었어요",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom",
          });
          return;
        } else {
          if (!noAlert) {
            toast({
              title: "마지막 문제입니다. 제출 버튼을 눌러주세요.",
              status: "error",
              duration: 3000,
              isClosable: true,
              position: "bottom",
            });
          }
        }
      } else {
        if (qid > minQuestion) {
          setQid(parseInt(qid) - 1);
          router.push(`/test/${parseInt(qid) - 1}`);
          toast({
            title: "[" + qid + "번] 정답이 저장되었어요",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom",
          });
          return;
        } else {
          toast({
            title: "첫 번째 문제입니다.",
            status: "info",
            duration: 3000,
            isClosable: true,
            position: "bottom",
          });
        }
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!router.isReady) return;

    // codes using router.query
    const { question } = router.query;
    setQid(question);
  }, [router.isReady]);

  useEffect(() => {
    getApi(qid);
  }, [qid]);

  useEffect(() => {
    verify();
  }, []);

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
          <AlertDialog isOpen={isOpen} onClose={onClose}>
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader
                  fontSize="lg"
                  fontWeight="bold"
                  className="font-leferi"
                >
                  정말 제출하시겠습니까?
                </AlertDialogHeader>

                <AlertDialogBody className="font-leferi">
                  제출이 완료되면 선택한 정답을 수정할 수 없습니다.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button onClick={onClose} className="font-leferi">
                    취소
                  </Button>
                  <Button
                    className="font-leferi"
                    colorScheme="blue"
                    onClick={() => {
                      end();
                    }}
                    ml={3}
                  >
                    제출
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>

          {isLoaded ? (
            <div>
              <Container>
                <Flex alignItems="center" mt={3} mb={2}>
                  <div style={{ width: "100%", marginRight: "10px" }}>
                    <Progress
                      hasStripe
                      size="md"
                      value={(qid / 15) * 100}
                      my={3}
                      border="1px solid lightgrey"
                      borderRadius="5px"
                    />
                  </div>
                  <Text minW={50} textAlign="center" className="font-leferi">
                    {qid} / 15
                  </Text>
                </Flex>

                <Flex mb={10} justifyContent="space-between">
                  <Button
                    className="font-leferi"
                    onClick={() => onSubmit(qid, "prev")}
                    variant="outline"
                    colorScheme="purple"
                    maxW={200}
                    w="35%"
                    size="sm"
                    mr={2}
                    isLoading={isLoading}
                  >
                    <FaArrowLeft style={{ marginRight: "5px" }} />
                    이전 문제
                  </Button>
                  {parseInt(qid) === maxQuestion && (
                    <Button
                      className="font-leferi"
                      onClick={onOpen}
                      variant="solid"
                      size="sm"
                      colorScheme="purple"
                      maxW={200}
                      w="35%"
                      isLoading={isLoading}
                    >
                      제출
                    </Button>
                  )}
                  <Button
                    className="font-leferi"
                    onClick={() => onSubmit(qid, "next")}
                    variant="solid"
                    colorScheme="purple"
                    maxW={200}
                    size="sm"
                    w="35%"
                    ml={2}
                    isLoading={isLoading}
                  >
                    다음 문제
                    <FaArrowRight style={{ marginLeft: "5px" }} />
                  </Button>
                </Flex>

                <Heading size="sm" mb={3}>
                  문제 {qid}
                </Heading>
                <Heading size="md">{question}</Heading>
                <Flex mt={5} flexWrap="wrap" justifyContent="center">
                  {answers.map((answer, index) => {
                    return (
                      <Box w="50%" p={2} key={index}>
                        <Button
                          className="font-leferi"
                          w="100%"
                          h={20}
                          onClick={(e) => {
                            setUserAnswer(parseInt(e.target.dataset.value));
                          }}
                          data-value={answer.idx}
                          colorScheme="blue"
                          variant={
                            userAnswer === answer.idx ? "solid" : "outline"
                          }
                        >
                          {answer.content}
                        </Button>
                      </Box>
                    );
                  })}
                </Flex>
              </Container>
            </div>
          ) : (
            <Text textAlign="center">Loading...</Text>
          )}
        </ChakraProvider>
      </main>
    </>
  );
};

export default Test;
