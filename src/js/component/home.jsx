import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState('');
	const [tasks, setTasks] = useState([]);
	function deleteTask(id) {
		const filtrado = tasks.filter((task, index) => {
			return index !== id;
		})
		putToDos(filtrado)
	}
	// POST

	const endpoint = 'https://assets.breatheco.de/apis/fake/todos/user/frako23'

	async function postToDos() {
		const response = await fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify([])
		});
	}


	// GET
	useEffect(() => {
		getToDos()
	}, [])
	async function getToDos() {
		let response = await fetch(endpoint)
		if (!response.ok) {
			const data = await response.json();
			if (data.msg.includes("first call the POST method")) {
				postToDos()
				return
			}
		} else {
			const data = await response.json();
			if (data[0].label !== "sample task") {
				setTasks(data);
			}
		}
	}


	// PUT
	async function putToDos(tasks) {
		const rawResponse = await fetch(endpoint, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(tasks)
		});

	}

	getToDos()

	// DELETE
	async function deleteToDos() {
		const rawResponse = await fetch(endpoint, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
		});
		postToDos();
		setTasks([])

	}

	return (
		<>
			<h1 className="text-center">todos</h1>
			<div className="libreta verticalLines">
				<form
					onSubmit={(e) => {
						e.preventDefault()
						const tareas = [...tasks, { label: inputValue, done: false }]
						setTasks(tareas)
						putToDos(tareas)
						setInputValue("")
					}}
					action="" method="get">
					<div className="form-group">
						<input
							type="text" className="form-control" id="toDoItem" aria-describedby="emailHelp" placeholder="What needs to be done?" onChange={e => setInputValue(e.target.value)} value={inputValue} />
					</div>
				</form>
				<ol className="listItemClass">
					{tasks.map((task, i) => {
						return <li key={i}>{task.label} <button onClick={() => { deleteTask(i) }} type="button" className="btn btn-danger justify-content-end boton">X</button>
						</li>
					})}
				</ol>
				<hr />
				<p>{tasks.length === 0 ? "No tasks, add a task" : tasks.length + " item left"} <button onClick={() => { deleteToDos() }} type="button" className="btn btn-danger eliminador">Eliminar Lista</button></p>

			</div>

		</>
	);
};

export default Home;
