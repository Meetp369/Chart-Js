import React, { lazy, Suspense } from 'react'
import { Box, CircularProgress } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import { store, persistor } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import styles from './pages/appStyles.module.scss'

const DashBoard = lazy(async () => await import('./pages/DashBoard/DashBoard'))
const ChartConfigure = lazy(async () => await import('./pages/ChartConfiguration/ChartConfiguration'))

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Box className={styles.loader}><CircularProgress /></Box>} persistor={persistor}>
        <Suspense fallback={<Box className={styles.loader}><CircularProgress /></Box>}>
          <Routes>
            <Route path='/' element={<DashBoard />} />
            <Route path='/chart' element={<ChartConfigure />} />
          </Routes>
        </Suspense>
      </PersistGate>
    </Provider>
  )
}

export default App
