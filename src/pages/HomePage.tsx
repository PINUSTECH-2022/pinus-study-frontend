import styled from "styled-components";
import { API_URL, Colors} from "../constants";
import Background from "../components/Background";
import MyModules, { MyModulesGuest, ModuleComponentWrapper }  from "../components/MyModules";
import NavigationBar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/users/userSlice";

const HomePageWrapper = styled.div`
    display: grid;
    grid-template-columns: 8.5fr 1.5fr;
    grid-column-gap: 1em;
    padding: 2em;
`

const Heading = styled.span`
    font-family: "Poppins", "sans-serif";
    font-weight: 600
    font-size: 2.25em;
    color: ${Colors.black};
`

const PopularModulesWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 1em;
    grid-row-gap: 1em;
    margin-top: 1em;
    margin-bottom: 1em;
`

const DisplayWrapper = styled.span`
    font-family: "Poppins", "sans-serif";
    font-weight: 600;
    font-size: 2em;
`

const WelcomeMessage = styled.span`
    background-color: ${Colors.white};
    border-radius: 20px;
    padding: 1.25em;
    display: flex;
    align-items: center; /* Add alignment for flexbox */
    justify-content: center; /* Add alignment for flexbox */
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 0.75em;
    margin-top: 1em;
    margin-bottom: 1em;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1); /* Add a subtle box shadow */
    transition: transform 0.2s ease-in-out; /* Add a smooth transition effect */
    cursor: pointer; /* Add pointer cursor for interactivity */

    &:hover {
        transform: translateY(-2px); /* Add a slight hover effect */
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Add a slightly darker box shadow on hover */
    }
`

const MyModulesDiv = styled.div`
    display: grid;
    margin: 1em;
`

const HomePage = () => {
    const user = useSelector(selectUser);
    const [modules, setModules] = useState<any[]>([{Id: "CS1231"}, {Id: "CS5234"}]);

    const isLoggedIn = () => {
        return user.Id !== 0 && user.Token !== "";
    }

    useEffect(() => {
        fetch(API_URL + `/module`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                keyword: "",
                page: 1,
            }),
        }).then(response => response.json())
        .then(data => {
            const sortedModules = [...data.module_list].sort((a, b) => b.SubscriberCount - a.SubscriberCount);
            setModules(sortedModules);
        });
    }, []);

    return (
        <div>
            <NavigationBar/>
            <Background>
                <HomePageWrapper>
                    <div>
                        <DisplayWrapper>
                            <Heading>Popular Modules</Heading><br></br>
                            <PopularModulesWrapper>
                                {modules.map(module => (
                                    <ModuleComponentWrapper key={module.Id} moduleCode={module.Id} />
                                ))}
                            </PopularModulesWrapper>
                            <Heading>What is PINUS Study?</Heading>
                            <WelcomeMessage>
                                PINUS Study is a platform built for PINUSians where they can interact and open a discussion thread for modules.
                                <br /><br />
                                New to PINUS Study? Check out this guide on how to use it.
                                Have something you want to improve? Fill in this feedback form.
                                <br /><br />
                                Have fun studying!
                            </WelcomeMessage>
                        </DisplayWrapper>
                    </div>
                    <MyModulesDiv>
                        {isLoggedIn() ? <MyModules /> : <MyModulesGuest />}
                    </MyModulesDiv>
                </HomePageWrapper>
            </Background>
        </div>
    )
}

export default HomePage;
