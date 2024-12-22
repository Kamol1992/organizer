import React, {useState, useEffect } from "react";
import axios from "axios";

const TaskForm = ( {reload, API, keyObject} ) => {

    const [data, setData] = useState([]);
    const [deleteKey, setDeleteKey] = useState()
    const keyTask = keyObject;

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(API+'/dataTasks/'+keyTask+'.json');
            setData(response.data);
          } catch(error){
            console.error('There was an error making the GET request!', error);
          }
        }
        fetchData();
      }, [reload, setData, keyObject]);

      const handleClickDelete = (key) => {
        axios.delete(`${API}/dataTasks/${keyTask}.json`)
          .then(response => {
            console.log("DELETED"); // Handle the response from the server
            window.location.reload();
          })
          .catch(error => {
            console.error('There was an error making the POST request!', error);
          });
        setDeleteKey(key);
        console.log(deleteKey);
        if(deleteKey){
          console.log(`${API}/dataTasks/${keyTask}.json`);
        }
      }


    return(
        <div className="header__container-task border-b-2 p-2">
            <div className="header-project flex justify-between p-2">
                <div className="header">
                    <h1 className="text-4xl font-bold text-stone-800">{data.titleProject}</h1>
                </div>
                <div className="button-delete-project">
                    <button  className={"bg-slate-200 text-slate-700 p-2 rounded mx-px"} onClick={()=>{handleClickDelete(keyTask)}}>Delete</button>
                </div>
            </div>
            {/*===Data==== */}
            <div className="data-project text-slate-600 p-2">
                <p>{data.date}</p>
            </div>
            {/*===Description=== */}
            <div className="description-project text-stone-600 p-2">
                <p>{data.descriptionProject}</p>
            </div>
        </div>
    )

}

export default TaskForm