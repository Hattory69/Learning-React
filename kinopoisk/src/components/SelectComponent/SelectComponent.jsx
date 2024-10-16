import { Button, ConfigProvider, Tree } from "antd";
import React, { useState } from "react";
import "./selectComponent.css";
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
		<ConfigProvider
			theme={{
				token: {
					colorText: "white",
					colorBgBase: "#030027",
					colorBgContainer: "#030027",
				},
			}}
		>
			<Button
				className='selectComponent-clearBtn'
				onClick={() => setMovies(fetchedMovies)}
			>
				Сбросить фильтр
			</Button>

			<DirectoryTree
				className='selectComponent-menu'
				expandedKeys={expandedKeys}
				onSelect={onSelect}
				onExpand={onExpand}
				treeData={filterParams}
			/>
		</ConfigProvider>
	);
}
