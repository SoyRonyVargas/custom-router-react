import { routes } from "./router/routes"
import { Suspense, lazy } from 'react'
import Router from "./router/router"
import Route from "./router/Route"

const LazyAboutPage = lazy( () => import("./pages/About"))

function App() {

  return (
    <main>
      <Suspense fallback={<p>Loading...</p>}>
        <Router routes={routes}>
          <Route path="/about" Component={LazyAboutPage} />
        </Router>
      </Suspense>
    </main>
  )
}

export default App
