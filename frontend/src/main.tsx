import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'

import { MantineProvider } from '@mantine/core'
import { DatesProvider } from '@mantine/dates'

// import dayjs from 'dayjs'
import 'dayjs/locale/th'

import './index.css'

// dayjs.locale('th')


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider
      theme={{
        fontFamily: 'Prompt, sans serif',
      }}
      withCSSVariables
      withGlobalStyles
      withNormalizeCSS
    >
      <DatesProvider settings={{locale: 'th', firstDayOfWeek: 0, labelSeparator:'ถึง' }}>

        <RouterProvider router={router} />
      </DatesProvider>
    </MantineProvider>
  </React.StrictMode>
)
