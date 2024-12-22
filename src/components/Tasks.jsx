import React, { useEffect, useState} from "react";
import axios from "axios";

const Tasks = ({reload, setReload, API, keyObject}) => {

    const keyTask = keyObject;

    const [data, setData] = useState([]);
    const [deleteKey, setDeleteKey] = useState();
    const [updateActive, setUpdateActive] = useState();


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(API+'/dataTasks/'+keyTask+'/tasks.json');
            setData(response.data);
          } catch(error){
            console.error('There was an error making the GET request!', error);
          }
        }
        fetchData();
      }, [reload, setData, keyObject]);

      useEffect(() => {
        axios.delete(`${API}/dataTasks/${keyTask}/tasks/${deleteKey}.json`)
          .then(response => {
            console.log("DELETED"); // Handle the response from the server
            setReload(!reload);
            // setDeleteData(response);
          })
          .catch(error => {
            console.error('There was an error making the POST request!', error);
          });
      }, [deleteKey]);
      

      const handleClickDelete = (key) => {
        setDeleteKey(key);
        if(deleteKey){
          console.log(`${API}/dataTasks/${keyTask}/tasks/${deleteKey}.json`);
        }
      }

      const handleClickDone = (key, active) => {

        console.log(key);
        setUpdateActive(active);
          try {
            axios.patch(`${API}/dataTasks/${keyTask}/tasks/${key}/active.json`, { active } ).then(response => {
              setReload(!reload);
              // console.log(Object.values(data).every(task => task.active.active == false));
            });
          } catch (error) {
            console.error("Wystąpił błąd podczas aktualizacji danych:", error);
          }
      }

      return (
        <>
            <div className="container-tasks p-10">
              <div className="task text-stone-600">
              <ul>{data ? Object.entries(data).map(([key, val])=>(
                  <div className={`flex justify-between py-2`}>
                      <li key={val.id} style={{textDecoration: val.active.active === false ? "line-through" : "none"}}>{val.task}</li>
                      {val.active.active !== false ? <button onClick={() => handleClickDone(key, false) } className={`bg-slate-200 text-slate-900 py-2 px-2 rounded mx-px`}>Done</button>: <button></button>}
                      <button key={key} onClick={() => handleClickDelete(key) } className={`bg-slate-200 text-slate-900 py-2 px-2 rounded mx-px`}>X</button>
                  </div>
              )): 'Brak Tasków'}</ul>
              </div>
            </div>
        </>
      )
}

export default Tasks
