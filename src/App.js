import React, { useState } from 'react';
import Menu from './components/Menu';
import ProjectForm from './components/ProjectForm';
import TasksView from './components/TasksView';
import Start from './components/start';

function App(){
const [reload, setReload] = useState(false);
const [keyObject, setKeyObject] = useState( null );
const [data, setData] = useState([]);
// const [titleTask, setTitleTask] = useState( null );
const [activeView, setActiveView] = useState('start'); //START,MAIN,TASK

const API_URL = "https://db-1-ebaad-default-rtdb.europe-west1.firebasedatabase.app/";
// const API_URL = "https://taskapp-e8f02-default-rtdb.europe-west1.firebasedatabase.app/";

console.log(data);

return (
  <>
  <div className='flex h-screen'>
    <Menu 
      data={data} 
      setData={setData} 
      reload={reload} 
      API={API_URL} 
      setKeyObject={setKeyObject} 
      // setTitleTask={setTitleTask} 
      setActiveView={setActiveView}
    />
    <div className='flex-1'>
      {activeView === 'start' && <Start setActiveView={setActiveView}/>}
      {activeView === 'project' && <ProjectForm data={data} reload={reload} setReload={setReload} API={API_URL} setActiveView={setActiveView} setKeyObject={setKeyObject}/>}
      {activeView === 'task' && <TasksView reload={reload} setReload={setReload} API={API_URL} keyObject={keyObject}/>}
    </div>
  </div>
  </>
  
);

}

export default App