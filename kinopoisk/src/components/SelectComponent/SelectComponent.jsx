import { Button, Tree, TreeSelect } from "antd";
import React, { useState } from "react";
import "./SelectComponent.css";
const { DirectoryTree } = Tree;

export function SelectComponent({ filterParams, setMovies, fetchedMovies }) {
	const [selectVal, setSelectVal] = useState();
	const [expandedKeys, setExpandedKeys] = useState([]);

	function filterMovieList(node, key) {
		const filteredList = fetchedMovies.filter((film) => {
			const field = film[node];

			if (Array.isArray(field)) {

				return field.some((item) => Object.values(item).includes(key));
			}

			return field == key;
		});
		setMovies(filteredList);
	}

	function onExpand(keys, { expanded, node }) {
		if (expanded) {
			setExpandedKeys([node.key]);
		} else {
			setExpandedKeys([]);
		}
	}

	function onSelect(key, info) {
		if (selectVal === key[0]) {
			setMovies(fetchedMovies);
			setSelectVal(null);
		} else {
			setSelectVal(key[0]);
			filterMovieList(info.node.section, key[0]);
		}
	}

	return (
		<>
			<Button onClick={() => setMovies(fetchedMovies)}> Сбросить фильтр</Button>

			<TreeSelect
				style={{
					width: "100%",
				}}
				dropdownStyle={{
					maxHeight: 400,
					overflow: "auto",
				}}
				placeholder='Please select'
				showSearch
				treeData={filterParams}
			/>
			<DirectoryTree
				className='selectComponent-menu'
				expandedKeys={expandedKeys}
				onSelect={onSelect}
				onExpand={onExpand}
				treeData={filterParams}
			/>
		</>
	);
}
