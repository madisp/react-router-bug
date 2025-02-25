import React, { ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById('root')!)

// context

interface Counter {
  count: number
  increment: () => void
}

function createCounter(): Counter {
  const [count, setCount] = React.useState(0)
  return {
    count,
    increment: () => setCount(count + 1),
  }
}

const CounterContext = React.createContext<Counter>({
  count: -1,
  increment: () => {},
})
CounterContext.displayName = 'CounterContext'

const useCounter = (): Counter => React.useContext(CounterContext)

// 2 tiny components using the context

function Count (): ReactElement {
  const counter = useCounter()
  return <p>Count: {counter.count}</p>
}

function Increment (): ReactElement {
  const counter = useCounter()
  return <button onClick={() => { counter.increment() }}>Increment!</button>
}

function Layout (): ReactElement {
  const counter = createCounter()
  return <CounterContext.Provider value={counter}>
    <p>Alternative variant</p>
    <Count />
    <Increment />
  </CounterContext.Provider>
}

// default component using a route

function App (): ReactElement {
  const counter = createCounter()

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/alt" element={<Layout />} />
        <Route path="/" element={
          <CounterContext.Provider value={counter}>
            <Count />
            <Increment />
          </CounterContext.Provider>
        } />
      </>
    )
  )

  return <RouterProvider router={router} />
}

root.render(
  <React.StrictMode>
  <App />
  </React.StrictMode>
)
