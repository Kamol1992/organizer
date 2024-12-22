import React, {useState, useEffect} from "react";
import axios from "axios";

const TaskForm = ( {reload, setReload, API, keyObject} ) => {

    const [data, setData] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isInvalid, setIsInvalid] = useState(false);

    


    const keyTask = keyObject;
    const [sendData, setSendData] = useState({
        id: 99,
        task: '',
        active: true
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        if(data.tasks){
          if(Object.values(data.tasks).some(d => d.task === value))
            {
              setErrorMessage("Nazwa już istnieje, Wybierz inną!");
              setIsInvalid(true);
              // alert('Nazwa już istnieje, Wybierz inną!');
            }else{
              setErrorMessage("");
              setIsInvalid(false);
            }
        }
        setSendData((prevData) => ({
          ...prevData,
          [name]: value
        }));
    }

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
    
    const addItem = async (e) => {
      if(isInvalid == false)
      {
        e.preventDefault();
        try {
          await axios.post(API+'/dataTasks/'+keyTask+'/tasks.json', sendData);
          setReload(!reload); // Zmieniamy stan `reload`, aby wywołać ponowne pobranie danych
          sendData.task = '';
        } catch (err) {
          console.error('Error adding item:', err);
        }
      }
      else{
        e.preventDefault();
        alert('Taka nazwa zadania już istnieje, zmień nazwę na inną!');
      }
      };

      return (
        <div>
            <div className="header-task p-2">
                <h2 className="text-2xl font-bold text-stone-800">Tasks</h2>
            </div>
            <div className="container-task-form flex items-start p-2">
                <form onSubmit={addItem}>
                    <div className="container-task__input flex flex-col">
                            <input
                                className="w-300 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                                type="text"
                                name="task"
                                value={sendData.task}
                                onChange={handleInputChange}
                                required
                            />
                            {errorMessage && <div style={{color: "red", marginTop: "5px"}}>{errorMessage}</div>}
                    </div>
                    <div className="button-add-task flex items-end">
                        <button type="submit" className="bg-slate-200 text-slate-900 px-4 py-2 ml-2 rounded mx-px" disabled={isInvalid}>Add Task</button>
                    </div>
                </form>
            </div>
        </div>
      )
}

export default TaskForm