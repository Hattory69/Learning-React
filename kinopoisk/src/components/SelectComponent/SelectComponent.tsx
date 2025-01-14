import { Button, ConfigProvider, Tree } from "antd";
import { Key } from "antd/es/table/interface";
import type { EventDataNode } from "antd/es/tree";
import React, { useState } from "react";
import { IMenuItem } from "~helperFunctions/createMenuData";
import { IMovie } from "~types/types";
import "./selectComponent.css";
const { DirectoryTree } = Tree;

interface ISelectComponent {
	filterParams: IMenuItem[];
	setMovies: React.Dispatch<React.SetStateAction<IMovie[]>>;
	fetchedMovies: IMovie[];
}

export function SelectComponent({ filterParams, setMovies, fetchedMovies }: ISelectComponent) {
	const [selectVal, setSelectVal] = useState<number | string>();
	const [expandedKeys, setExpandedKeys] = useState<(number | string)[]>([]);

	function filterMovieList(node: keyof IMovie, key: string | number) {
		const filteredList = fetchedMovies.filter((movie) => {
			const field = movie[node];

			if (Array.isArray(field)) {
				return field.some((item) => Object.values(item).includes(key));
			}

			return field == key;
		});
		setMovies(filteredList);
	}

	function onExpand(expandedKeys: Key[], { expanded, node }: { expanded: boolean; node: EventDataNode<IMenuItem> }) {
		setExpandedKeys(expanded ? [node.key] : []);
	}

	function onSelect(selectedKeys: Key[], info: { node: EventDataNode<IMenuItem> }) {
		if (typeof selectedKeys[0] === 'bigint') return;

		if (selectVal === selectedKeys[0]) {
			setMovies(fetchedMovies);
			setSelectVal("");
		} else {
			setSelectVal(selectedKeys[0]);
			filterMovieList(info.node.section as keyof IMovie, selectedKeys[0]);
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
			<Button className="selectComponent-clearBtn" onClick={() => setMovies(fetchedMovies)}>
				Сбросить фильтр
			</Button>

			<DirectoryTree
				className="selectComponent-menu"
				expandedKeys={expandedKeys}
				onSelect={onSelect}
				onExpand={onExpand}
				treeData={filterParams}
			/>
		</ConfigProvider>
	);
}
