import Tasks from "./Tasks";
import TaskForm from "./TaskForm";
import TaskInfo from "./TaskInfo";

const TasksView = ( {reload, setReload, API, keyObject} ) => {

      return (
        <>
            <div className="container flex flex-col justify-center h-screen pr-20 pl-5">
                <div className="container-task pr-20 pl-5">
                    <div className="App">
                        <TaskInfo reload={reload} API={API} keyObject={keyObject}/>
                        <TaskForm reload={reload} setReload={setReload} API={API} keyObject={keyObject}/>
                        <Tasks reload={reload} setReload={setReload} API={API} keyObject={keyObject}/>
                    </div>
                </div>
            </div>
        </>
    )
 
}


export default TasksView;