import React from 'react';
import {
  Box,
  Grid,
  Image,
  Container,
  useBreakpointValue
} from '@chakra-ui/react';
import {useEffect, useState} from 'react'
import { ColorModeSwitcher } from '../ColorModeSwitcher';



function Events() {
  const [eventData, setEventData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const maxW = useBreakpointValue({base: 'container.xl', sm: 'container.xl', md: 'container.xl', xl: 'container.xl', '2xl': '1600px'})

  useEffect(() => {
    setLoading(true)
    fetch('http://192.168.10.101:3001/events')
      .then((res) => res.json())
      .then((data) => {
        setEventData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <p>Loading...</p>
      </Grid>
    </Box>
  )

  if (!eventData) return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <p>No events to return</p>
      </Grid>
    </Box>
  )

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Container
          maxW={maxW}
          mt={2}
          pb={4}
          p={0}
          minH="100vh"
        >
          <Grid templateColumns={['repeat(1, 1fr)','repeat(1, 1fr)','repeat(2, 1fr)','repeat(3, 1fr)']} gap={4}>

              {console.log(eventData)}
              { 
                eventData.map((singleEvent) =>(
                  <Box maxW='lg' borderWidth='1px' borderRadius='lg' overflow='hidden'>
                    <Image src={singleEvent.image} alt={singleEvent.message} />

                    <Box p='6'>
                      <Box display='flex' alignItems='baseline'>
                        <Box
                          color='gray.500'
                          fontWeight='semibold'
                          letterSpacing='wide'
                          fontSize='xs'
                          textTransform='uppercase'
                          ml='2'
                        >
                          {singleEvent.date}
                        </Box>
                      </Box>

                      <Box
                        mt='1'
                        fontWeight='semibold'
                        as='h4'
                        lineHeight='tight'
                        isTruncated
                      >
                        {singleEvent.message}
                      </Box>

                    </Box>
                  </Box>
                ))
              }

          </Grid>
        </Container>
      </Grid>
    </Box>
  )

}

export default Events;
