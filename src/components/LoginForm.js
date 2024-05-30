import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  useColorMode,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  IconButton,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import DarkModeToggle from "./DarkModeToggle";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      onLogin(); // Call onLogin passed from props
    } else {
      alert("Invalid credentials");
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={8}
      p={8}
      bg={bgColor}
      color={textColor}
      borderRadius="lg"
      boxShadow="lg"
      borderWidth="1px"
      borderColor={borderColor}
    >
      <VStack spacing={4} align="stretch">
        <Heading size="lg" textAlign="center">
          Login Form
        </Heading>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            bg={useColorModeValue("white", "gray.700")}
            color={textColor}
            border="1px solid"
            borderColor={borderColor}
            _hover={{ borderColor: "blue.500" }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              bg={useColorModeValue("white", "gray.700")}
              color={textColor}
              border="1px solid"
              borderColor={borderColor}
              _hover={{ borderColor: "blue.500" }}
            />
            <InputRightElement>
              <IconButton
                variant="ghost"
                size="sm"
                onClick={handleTogglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
                icon={showPassword ? <HiEyeOff /> : <HiEye />}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          onClick={handleLogin}
          w="100%"
          bg={useColorModeValue("blue.500", "blue.300")}
          color="white"
          _hover={{ bg: useColorModeValue("blue.600", "blue.400") }}
        >
          Login
        </Button>
        <DarkModeToggle
          toggleColorMode={toggleColorMode}
          colorMode={colorMode}
        />
        <Box textAlign="center" mt={2} fontSize="sm">
          {colorMode === "light" ? "Light" : "Dark"}
        </Box>
      </VStack>
    </Box>
  );
};

export default LoginForm;
