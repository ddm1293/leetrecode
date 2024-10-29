import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PopUp from './PopUp.tsx'
import './index.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { tabsTheme } from './components/TabsTheme.ts';

const theme = extendTheme({
    components: {
        Tabs: tabsTheme
    }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ChakraProvider theme={theme}>
          <PopUp />
      </ChakraProvider>
  </StrictMode>,
)
