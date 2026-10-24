import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import './styles/constants.css'
import './styles/global.css'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={ <Layout /> }>
          <Route index element={ <Home /> } />
        </Route>
      </Routes>
    </>
  )
}

export default App