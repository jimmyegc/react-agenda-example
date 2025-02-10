import './App.css'
import CardSkeletonExample from './components/CardSkeletonExample/CardSkeletonExample'
import DynamicTable from './components/DynamicTable/DynamicTable'

function App() {

  return (<div>
    <h2>Examples</h2>    
    <WFCFormToolAgenda />
    <TabbedForm />
    <DynamicTable />
    <CardSkeletonExample />
  </div>)
}

export default App
