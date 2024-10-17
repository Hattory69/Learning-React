import { useCallback, useState } from "react";
import { fetchData } from "../data/fetchData";

export const useFetch = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	const handleFetch = useCallback(async (searchType, resultAmount, searchData) => {
		setLoading(true);
		setError(null);

		try {
			const result = await fetchData(searchType, resultAmount, searchData);
			setData(result);
		} catch (error) {
			setError(error.message.includes("403") ? "Ошибка 403: Доступ запрещен. Проверьте ваш API-ключ." : `${error.message}`);
		} finally {
			setLoading(false);
		}
	}, []);

	return { loading, error, data, handleFetch };
};
