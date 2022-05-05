import React from 'react';
import {
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Logo } from '../Logo';

function Home() {
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Logo h="40vmin" pointerEvents="none" />
          <Text>
            Welcome to <Code fontSize="xl">detectr.io</Code>
          </Text>
          <Link
            color="teal.500"
            href="/events"
            fontSize="2xl"
            rel="noopener noreferrer"
          >
            See events
          </Link>
        </VStack>
      </Grid>
    </Box>
  );
}

export default Home;
