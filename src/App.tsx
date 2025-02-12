import { useQuery } from '@tanstack/react-query';
import './App.css'
//import { LoginForm } from './components/LoginForm/LoginForm'
//import CardSkeletonExample from './components/CardSkeletonExample/CardSkeletonExample'
//import DynamicTable from './components/DynamicTable/DynamicTable'
//import TableComponent from './components/TableComponent/TableComponent'
//import { UsersContainer } from './components/UsersContainer/UsersContainer'
//import { UsersList } from './components/UsersList/UsersList';
//import { withDataFetching } from './components/withDataFetching/withDataFetching';
//import { useToggle } from './hooks/useToggle';
//import { formatDate } from './utils/data/formatDate';

const getUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  return response.json();
}

// https://www.youtube.com/watch?v=tfftBVXtaLk&list=PLC8ntN5__iMLjmu27Ion7EkAYB9JqMoOy

function App() {
  // 1.- useState, useRef, useReducer, useContext
  // 2.- useMemo y useCallback
  // 3.- useEffect y useLayoutEffect
  //const [isOpen, toggleOpen] = useToggle(false);
  //const [isShow, toggleShow] = useToggle(false);
  //const UsersWithFetching = withDataFetching(UsersList, "https://jsonplaceholder.typicode.com/users");
  //const miFecha = formatDate(new Date());

  
  const { data } = useQuery({ queryKey: ['users'], queryFn: getUsers });
  console.log(data);
  
  console.log('render')

  return (<div>
    {/* <h2>Examples</h2>    
    <WFCFormToolAgenda />
    <TabbedForm />
    <DynamicTable />
    <CardSkeletonExample /> 
    <TableComponent />*/}
    {/* <UsersContainer />
    <LoginForm/> 
    {miFecha}
     <UsersWithFetching />    
    <button onClick={toggleOpen}>Toggle {isOpen ? 'close':'open'}</button>
    <button onClick={toggleShow}>Otro {isShow ? 'hide' : 'show'}</button>*/}
  </div>)
}

export default App
