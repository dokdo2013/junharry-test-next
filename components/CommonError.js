import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";

const CommonError = ({ errorTitle, errorMessage, showButton }) => {
  return (
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
        {errorTitle || "오류가 발생했어요"}
      </Heading>
      <Text fontSize="xl" mt={5} color={"gray.700"}>
        {errorMessage || ""}{" "}
      </Text>

      {showButton && (
        <Link href="/" passHref>
          <Button mt={10} colorScheme="purple">
            첫 화면으로 이동
          </Button>
        </Link>
      )}
    </Box>
  );
};

export default CommonError;
