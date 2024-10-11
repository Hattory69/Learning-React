export function taskListReducer(state, action) {
	let newState = state;
	switch (action.type) {
		case "clearItems":
			newState = { ...state, list: [], title: "Список задач" };
			break;
		case "addItem":
			newState = {
				...state,
				list: [
					...state.list,
					{
						id: Date.now(),
						title: "",
						isDone: false,
					},
				],
			};
			break;
		case "setItemTitle":
			if (!action.payload.isItem) {
				newState = { ...state, title: action.payload.title };
			} else {
				newState = {
					...state,
					list: state.list.map((item) => (item.id === action.payload.id ? { ...item, title: action.payload.title } : item)),
				};
			}
			break;
		case "setIsDone":
			if (action.payload.id) {
				newState = {
					...state,
					list: state.list.map((item) => (item.id === action.payload.id ? { ...item, isDone: !item.isDone } : item)),
				};
			} else {
				const allDone = state.list.every((item) => item.isDone);
				newState = {
					...state,
					list: state.list.map((item) => ({ ...item, isDone: !allDone })),
				};
			}
			break;
		case "handleTitleBlur":
		case "deleteItem":
			if (action.type === "handleTitleBlur" && action.payload.title !== "") {
				newState = state;
				break;
			}
			newState = {
				...state,
				list: state.list.filter((item) => item.id !== action.payload.id),
			};
			break;
		default:
			return state;
	}

	localStorage.setItem("taskList", JSON.stringify(newState.list));
	localStorage.setItem("taskListTitle", JSON.stringify(newState.title));
	return newState;
}
