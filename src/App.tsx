import './App.css'
import TabbedForm from './components/TabbedForm/TabbedForm'
import { WFCFormToolAgenda } from './components/WFCFormToolAgenda/WFCFormToolAgenda'

function App() {

  return (<div>
    <h2>Agenda</h2>
    <WFCFormToolAgenda />
    <TabbedForm />
  </div>)
}

export default App
