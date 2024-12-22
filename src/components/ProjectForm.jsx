import React, {useState, useEffect} from "react";
import axios from "axios";


const ProjectForm = ( {data, reload, setReload, API, setActiveView, setKeyObject} ) => {

    const [errorMessage, setErrorMessage] = useState("");
    const [isInvalid, setIsInvalid] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [sendData, setSendData] = useState({
        id: "4",
        titleProject: "",
        descriptionProject: "",
        date: "",
        tasks: {
        //   id: 1,
        //   task: "",
        //   active: true
        },
        active: true
    });

    const handleInputChange = (e) => {
        let {name, value} = e.target;
        if(data){
          if(Object.values(data).some(d => d.titleProject === sendData.titleProject))
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

    const addItem = async (e) => {
      if(isInvalid == false)
      {
        e.preventDefault();
        console.log(e.target.value);
        try {
          await axios.post(API+'/dataTasks.json', sendData);
          setReload(!reload); // Zmieniamy stan `reload`, aby wywołać ponowne pobranie danych
          console.log(data);
        } catch (err) {
          console.error('Error adding item:', err);
        }
      }
      else{
        e.preventDefault();
        alert('taka nazwa projektu już istnieje, zmień na inną!');
      }

      };

      useEffect(() => {
        const fetchUpdatedData = async () => {
          try {
            const response = await axios.get(`${API}/dataTasks.json`);
            // setCurrentData(response.data); // Przypisujemy dane
            console.log("Pobrane dane po dodaniu:", response.data);
            const keys = Object.keys(response.data);
            const lastKey = keys[keys.length - 1];
            console.log(lastKey);
            setKeyObject(lastKey);
            setActiveView('task');
          } catch (err) {
            console.error('Error fetching updated data:', err);
          }
        };
    
        if (reload) {
          fetchUpdatedData();
        }
      }, [reload, API]);

const inputStyle = 'w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500';
      return (
        <div className="container flex flex-col justify-center items-center h-screen">
            <div className="container-project pr-20 pl-5 ">
                <div className="container-project-form flex flex-col items-start">
                    <form onSubmit={addItem}>
                    <div className="buttons-container flex justify-end p-2 py-10">
                                <button className="bg-slate-200 text-slate-900 py-4 px-6 rounded mx-px">Cancel</button>
                                <button className={`bg-slate-900 text-white py-4 px-6 rounded mx-px ${isInvalid ? 'opacity-50 cursor-not-allowed':''}`} disabled={isInvalid}>Save</button>
                            </div>
                        <div>
                            <label className="text-stone-600 uppercase font-bold" for="username">Title</label>
                                <input
                                    className={`${inputStyle}`}
                                    type="text"
                                    name="titleProject"
                                    value={sendData.titleProject}
                                    onChange={handleInputChange}
                                    required
                                />
                                {errorMessage && <div style={{color: "red", marginTop: "5px"}}>{errorMessage}</div>}
                        </div>
                        <div>
                            <label className="text-stone-600 uppercase font-bold" for="username">Description</label>
                                <input
                                    className={inputStyle}
                                    type="text"
                                    name="descriptionProject"
                                    value={sendData.descriptionProject}
                                    onChange={handleInputChange}
                                    required
                                />
                        </div>
                        <div>
                            <label className="text-stone-600 uppercase font-bold" for="username">Due Date</label>
                                <input
                                    className={inputStyle}
                                    type="date"
                                    name="date"
                                    value={sendData.date}
                                    onChange={handleInputChange}
                                    required
                                />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
 
}

export default ProjectForm;
