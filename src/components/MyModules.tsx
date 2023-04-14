import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { Colors } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLogin } from '../redux/features/modal/modal';
import { selectUser } from '../redux/features/users/userSlice';
import { getUserDetailsRequest } from '../requests';

export const ModuleComponent = styled.div`
    cursor: pointer;
    width: 12.5vw; /* 75% of 15vw */
    height: 7.5vw; /* 75% of 8vw */
    border: none;
    border-radius: 20px;
    background-color: ${Colors.black};
    color: ${Colors.white};
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 1.2em; /* 75% of 1.25em */
    padding: 0.5vw 1vw; /* 75% of original padding */
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s ease, color 0.3s ease;

    :hover {
        background-color: ${Colors.red};
        color: ${Colors.white};
    }

    @media (max-width: 768px) {
        width: 67.5vw; /* 75% of 90vw */
        height: 9vw; /* 75% of 12vw */
        font-size: 0.75em; /* 75% of 1em */
        padding: 0.75vw 1.5vw; /* 75% of original padding */
    }
`

const MyModulesContainer = styled.div`
    background-color: ${Colors.white};
    border-radius: 20px;
    width: 17.5vw;
    max-width: 17.5vw;
    height: 30vh;
    max-height: 70vh;
    padding: 1.5em;
    display: flex;
    flex-direction: column;
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

const MyModulesHeading = styled.span`
    font-family: "Poppins", "sans-serif";
    font-weight: 600;
    color: ${Colors.dark_grey};
    font-size: 1.625em;
`

export const MyModulesText = styled.span`
    padding: 1.25em;
    display: flex;
    justify-content: center; /* Added to center the text horizontally */
    align-items: center; /* Added to center the text vertically */
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 1.25em;
    font-style: italic;
`;

const MyModulesChildren = styled.div<{marginTop? : string}>`
    background-color: ${Colors.yellow};
    border-radius: 20px;
    color: ${Colors.white};
    cursor: pointer;
    font-family: "Poppins", "sans-serif";
    font-weight: 600;
    font-size: 2.25em;
    padding: 0.25em 0.5em 0.25em 0.5em;
    margin-top: ${props => props.marginTop? props.marginTop : "0.375em"};
    margin-bottom: 0.375em;
    :hover {
        background-color: ${Colors.yellow_accent};
        color: ${Colors.white_accent};
    }
`

const Scrollable = styled.div`
    margin-top: 0.75em;
    overflow-y: scroll;
    height: 60vh;
`

export const ModuleComponentWrapper = ({ moduleCode }: { moduleCode: string }) => {  
  const handleButtonClick = () => {
    // Redirect to the desired URL on button click
    window.location.href = "/module/" + moduleCode 
  };

  return (
    <ModuleComponent onClick={handleButtonClick}>
      {moduleCode}
    </ModuleComponent>
  );
};

const MyModulesChildrenWrapper = ({ moduleCode }: { moduleCode: string }) => {  
    const handleButtonClick = () => {
      // Redirect to the desired URL on button click
      window.location.href = "/module/" + moduleCode 
    };
  
    return (
      <MyModulesChildren onClick={handleButtonClick}>
        {moduleCode}
      </MyModulesChildren>
    );
  };

export const MyModulesGuest = () => {
  const dispatch = useDispatch();

  return (
    <MyModulesContainer>
      <MyModulesHeading>My Modules</MyModulesHeading>
      <MyModulesText>
        <div>
          <span style={{color: `${Colors.blue}`, cursor: 'pointer'}} onClick={() => dispatch(toggleLogin(true))}>Log in</span> to access your subscribed modules.</div>
      </MyModulesText>
    </MyModulesContainer>
  );
}

export const MyModules = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserDetailsRequest(user.Id, dispatch);
  }, [])

  return (
    <MyModulesContainer>
      <MyModulesHeading>My Modules</MyModulesHeading>
      <Scrollable>
        {user.Modules.map(moduleCode => <MyModulesChildrenWrapper moduleCode={moduleCode}/>)}
      </Scrollable>
    </MyModulesContainer>
  );
}

export default MyModules;
