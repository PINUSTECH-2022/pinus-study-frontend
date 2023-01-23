import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import { Colors } from "../constants";
import SearchIcon from "@mui/icons-material/Search";

// STYLED COMPONENTS

const NavbarContainer = styled.div`
    background-color: ${Colors.dark_grey};
    color: white;
    width: calc(100% - 4rem);
    min-width: auto;
    max-width: auto;
    float: left;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    gap: 1rem;
    padding: 1rem 2rem;
    position: fixed;
    z-index: 1020;
    top: 0;
    font-family: "Poppins", sans-serif;
`;

const Logo = styled.img`
    width: 40px;
    height: 40px;
`;

const SubDivision = styled.div`
    display: flex;
    gap: 3rem;
    align-items: center;
`;

const Buttons = styled(SubDivision)`
    gap: 1rem;
`;

const LoginButton = styled.span`
    font-size: 15px;
    padding: 0.6rem 1.6rem;
    font-weight: 500;
    border-radius: 30px;
    border-color: ${Colors.white};
    border-width: 1px;
    border-style: solid;
    color: ${Colors.white};
    text-decoration: "none";
`;

const SignUpButton = styled.span`
    font-size: 15px;
    padding: 0.6rem 1.6rem;
    background-color: ${Colors.red};
    font-weight: 500;
    border-radius: 30px;
    color: white;
    text-decoration: "none";
`;

const SearchBarContainer = styled.span`
    padding: 0.6rem 1rem;
    background: ${Colors.white};
    border-radius: 25px;
    align-items: center;
    display: flex;
    gap: .5rem;
`;

const SearchBar = styled.input`
    font-family: "Poppins", sans-serif;
    font-size: 15px;
    border: none;
    background: ${Colors.white};
    color: ${Colors.dark_grey};
    width: 30rem;
    :focus {
        outline: none;
    }
    ::placeholder {
        color: ${Colors.light_grey};
        font-style: italic;
    }
`;

const NavigationBar = () => {
    const [query, setQuery] = useState("");

    const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
        setQuery(e.currentTarget.value);
    };

    return (
        <NavbarContainer>
            <SubDivision>
                <Link to="/">
                    <Logo src={logo} />
                </Link>
                <SearchBarContainer>
                    <SearchIcon color="disabled" />
                    <SearchBar
                        type="text"
                        value={query}
                        onChange={onChange}
                        placeholder="Search modules here..."
                    />
                </SearchBarContainer>
            </SubDivision>
            <Buttons>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <LoginButton>Login</LoginButton>
                </Link>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <SignUpButton>Sign Up</SignUpButton>
                </Link>
            </Buttons>
        </NavbarContainer>
    );
};

export default NavigationBar;
