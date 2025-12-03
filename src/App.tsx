import { Navigation } from '@/shared/routes/Navigation';
import { Toaster } from '@/shared/components/ui/sonner';
import { useState } from 'react'

function App() {
  return (
    <>
      <Navigation/>
      <Toaster />
    </>
  )
}

export default App
