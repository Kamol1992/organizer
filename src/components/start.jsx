import Logo from './../img/logo.png'
export default function start({setActiveView}){

    const handleClickStart = () => {
        setActiveView('project');
      }

    return(
        <div className="container flex flex-col justify-center items-center h-screen">
            <div className="container-start pr-20 pl-5 ">
                <div className='logo__container-start p-2 flex flex-col items-center'>
                    <img className="size-40" src={Logo} alt="Opis obrazka" />
                    
                </div>
                <div className='content__container-start flex flex-col items-center p-2'>
                    <h2 className="text-2xl font-bold text-stone-800">No Project Selected</h2>
                    <p className="text-stone-600 p-2">SelectTest a project or get started with a new one</p>
                </div>
                <div className="button-create-project__container-start flex flex-col items-center p-2">
                    <button id='btnAdd' className="bg-slate-700 text-white p-4 rounded mx-px" onClick={() =>handleClickStart()}>Create new project</button>
                </div>
                
            </div>
        </div>
    );
}