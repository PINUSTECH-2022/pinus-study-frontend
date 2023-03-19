import styled from "styled-components";
import { API_URL, Colors } from "../constants";
import MyModules, { ModuleComponent } from "../components/MyModules";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Module } from "../features/modules/moduleSlice";
import { Link } from "react-router-dom";


const ModulePageWrapper = styled.div`
    display: grid;
    grid-template-columns: 8.5fr 1.5fr;
    grid-column-gap: 1em;
    padding: 2em;
`

const ModuleGridWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 1em;
    grid-row-gap: 1em;
`

const ResultsHeadingDiv = styled.div`
    margin-bottom: 1em;
`

const ResultsHeading = styled.span`
    font-family: "Poppins", "sans-serif";
    font-weight: 600;
    font-size: 2.25em;
    color: ${Colors.white};
`

const ResultsHeadingItalic = styled(ResultsHeading)`
    font-style: italic;
`

const MyModulesDiv = styled.div`
    display: grid;
    align-items: center;
    padding: calc(2em + 20px);
`

const Pages = styled.div`
    width: 100%;

`
const SearchModulesPage = () => {
    const { keyword } = useParams();

    const [searchResults, setSearchResults] = useState<Module[]>([]);
    const [noModulesFound, setNoModulesFound] = useState<Boolean>(true);

    const queryDatabase = (page?: number) => {
        fetch(API_URL + `/module`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                keyword: keyword? keyword.toUpperCase() : "",
                page: page? page : 1,
            }),
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.module_list !== null) {
                setSearchResults(data.module_list)
                setNoModulesFound(false);
            } else {
                setNoModulesFound(true);
            }
        });
    }

    useEffect(() => {
        queryDatabase(1);
    }, [])

    return (
        <div>
            <ModulePageWrapper>
                <div>
                    <ResultsHeadingDiv>
                        <ResultsHeading>Results for </ResultsHeading>
                        <ResultsHeadingItalic>'{keyword}'</ResultsHeadingItalic>
                    </ResultsHeadingDiv>
                    <ModuleGridWrapper>
                        {noModulesFound
                            ? null
                            : searchResults.map(module => {
                                return (
                                    <Link to={`/module/${module.Id.toLocaleLowerCase()}`} style={{ textDecoration: 'none' }}>
                                        <div key={module.Id}>
                                            <ModuleComponent>{module.Id}</ModuleComponent>
                                       </div>
                                    </Link>
                                )
                        })}
                </ModuleGridWrapper>
                    </div>
                <MyModulesDiv>
                    <MyModules/>
                </MyModulesDiv>
            </ModulePageWrapper>
        </div>
    )
}

export default SearchModulesPage;