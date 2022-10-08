import React from 'react';
import styled from "styled-components";
import {COLOR_ORANGE} from "../constant/colors";

const StyledButton = styled.button(props => ({
    background: COLOR_ORANGE,
    border: 0,
    borderRadius: 12,
    cursor: "pointer",
    padding: "6px 12px",
}));

type Props = {
    children: JSX.Element | string,
    onClick: (() => boolean) | (() => void)
};

const Button = ({children, onClick}: Props) => {
    return (
        <StyledButton onClick={onClick}>
            {children}
        </StyledButton>
    );
};

export default Button;
