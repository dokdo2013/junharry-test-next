import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import Link from "next/link";

const CommonSuccess = ({ successTitle, successMessage, showButton }) => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Box display="inline-block">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg={"green.500"}
          rounded={"50px"}
          w={"55px"}
          h={"55px"}
          textAlign="center"
        >
          <CheckIcon boxSize={"20px"} color={"white"} />
        </Flex>
      </Box>
      <Heading as="h2" size="lg" mt={6} mb={2}>
        {successTitle || "성공"}
      </Heading>
      <Text fontSize="xl" mt={5} color={"gray.700"}>
        {successMessage || ""}{" "}
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

export default CommonSuccess;
