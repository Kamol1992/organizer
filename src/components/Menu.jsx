import React, { useEffect, useState } from "react";
import axios from "axios";


const Menu = ({data, setData, reload, API, setKeyObject, setActiveView}) =>{


useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(API+'/dataTasks.json');
      setData(response.data);
    } catch(error){
      console.error('There was an error making the GET request!', error);
    }
  }
  fetchData();
}, [reload, setData]);

const handleClickMenu = (key) => {
  setKeyObject(key);
  // setTitleTask(title);
  setActiveView('task');

  // const allTasksInactive = Object.values(data).every((project) =>
  //   Object.values(project['-ODaWQ8Trqmm1Wv4nhOm'].tasks).every(
  //     (task) => task.active && task.active.active === false
  //   )
  // );
  
  // console.log(allTasksInactive);
}

const handleClickAddProject = () => {
  setActiveView('project');
}




return (
  <>
  <div className="bg-gray-800 text-white w-64 px-8 rounded-r-md">
    <div className="p-4">
        <h1 className="text-xl font-semibold">Your Project</h1>
    </div>
        <div>
            <button id="btnAdd" className="bg-slate-700 text-white p-4 rounded mx-px" onClick={handleClickAddProject}>+ Add Project</button>
        </div>
    <ul>
      {data ? Object.entries(data).map(([key,item]) => (
        <div key={key}>
          <button key={item.id} onClick={() => handleClickMenu(key)} className="bg-slate-700 block px-4 py-2 text-sm rounded mx-px block px-4 py-2 text-sm hover:bg-gray-700 w-20 rounded mx-px size-50">{item.titleProject}</button>
          <div>{}</div>
        </div> 
      )): 'Brak zadań do wykonania'}
    </ul>
  </div>
  </>
  
);
}

export default Menu;