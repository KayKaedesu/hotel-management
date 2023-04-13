import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'

import { MantineProvider } from '@mantine/core'

import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider
      theme={{
        fontFamily: 'Prompt, sans serif',
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
)
