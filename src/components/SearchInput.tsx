import React, { useEffect, useState } from 'react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { getJobsCategories, getJobsCompanies } from '../services';
import { CategoriesJobs, CompaniesJobs } from '../models';

interface Props {
	inputSearch: string;
	setInputSearch: React.Dispatch<React.SetStateAction<string>>;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
	search: string;
	endpoint: string;
	setResultsCompanies: React.Dispatch<React.SetStateAction<CompaniesJobs>>;
	setResultsCategories: React.Dispatch<React.SetStateAction<CategoriesJobs>>;

	setPage: React.Dispatch<React.SetStateAction<number>>;
	setPerPage: React.Dispatch<React.SetStateAction<number>>;
	page: number;
	perPage: number;
}

export const SearchInput = ({
	inputSearch,
	setInputSearch,
	search,
	endpoint,
	setResultsCompanies,
	setResultsCategories,
	perPage,
	page,
}: Props) => {
	const [error, setError] = useState<unknown>();
	const [loading, setLoading] = useState(true);

	const companyResults = async (name: string) => {
		try {
			setLoading(false);
			const res = await getJobsCompanies(name, perPage, page);
			return res;
		} catch (error) {
			setError(error);
		}
	};

	const categoryResults = async (name: string) => {
		try {
			setLoading(false);

			const res = await getJobsCategories(name, perPage, page);
			return res;
		} catch (error) {
			setError(error);
		}
	};

	useEffect(() => {
		if (search) {
			if (endpoint === 'companies')
				companyResults(search).then((res) => {
					setResultsCategories({} as CategoriesJobs);
					setResultsCompanies(res);
				});

			if (endpoint === 'categories')
				categoryResults(search).then((res) => {
					setResultsCompanies({} as CompaniesJobs);

					setResultsCategories(res);
				});
		}
	}, [endpoint, search, page, perPage]);

	return (
		<>
			<InputGroup>
				<InputLeftElement pointerEvents="none" color={'secondary.500'} children={<BiSearchAlt2 />} />
				<Input
					type="search"
					placeholder={'Filtrar resultados...'}
					bg={'white'}
					borderColor={'primary.700'}
					_hover={{
						borderColor: 'primary.700',
					}}
					value={inputSearch}
					onChange={(e) => {
						setInputSearch(e.target.value);
					}}
				/>
			</InputGroup>
		</>
	);
};

{
	/* <Stack width={'100%'}>
				{resultsCategoriesJobs.data
					? resultsCategoriesJobs.data
							.filter((d) => {
								return d.attributes?.title.toLocaleLowerCase().includes(inputSearch.toLocaleLowerCase());
							})
							.map((d) => {
								return <Text key={d.id}>{d.attributes?.title}</Text>;
							})
					: null}

				{resultsCompanies.data
					? resultsCompanies.data
							.filter((d) => {
								return d.attributes?.title.toLocaleLowerCase().includes(inputSearch.toLocaleLowerCase());
							})
							.map((d) => {
								return <Text key={d.id}>{d.attributes?.title}</Text>;
							})
					: null}
			</Stack> */
}
