import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
		const [ inputValue, setInputValue ] = useState ('');
		const [ tasks, setTasks] = useState ([]);
		function deleteTask(id) {
			setTasks(tasks.filter((task,index) =>{
				return index !== id;
			}))
		}
	return (
		<>
			<h1 className="text-center">todos</h1>
			<div className="libreta verticalLines">
				<form 
				onSubmit={ (e) =>{
					e.preventDefault()
					setTasks([...tasks,inputValue])
					setInputValue ("")
				} }
				action="" method="get">
					<div className="form-group">   
						<input 
						type="text" className="form-control" id="toDoItem" aria-describedby="emailHelp" placeholder="What needs to be done?" onChange={e => setInputValue(e.target.value)} value={inputValue} /> 
					</div>	
				</form>
				<ol className="listItemClass">
					{tasks.map((task,i)=>{
						return <li key={i}>{task} <button onClick={() => {deleteTask(i)}} type="button" class="btn btn-danger justify-content-end">X</button>
						</li>
					})}		
				</ol>
				<hr />
				<p>{tasks.length === 0 ? "No tasks, add a task" : tasks.length + " item left"}</p>
			</div>
		</>
	); 	
};

export default Home;
