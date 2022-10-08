import React, {Dispatch, SetStateAction} from 'react';
import styled from "styled-components";
import {COLOR_PRIMARY, COLOR_RED, COLOR_SNOW_WHITE} from "../constant/colors";

const ChipContainer = styled.div(props => ({
    background: COLOR_PRIMARY,
    borderRadius: 18,
    color: COLOR_SNOW_WHITE,
    padding: "6px 6px 6px 12px",
    "& > button": {
        background: "transparent",
        border: 0,
        color: COLOR_RED,
        cursor: "pointer",
        marginLeft: 10
    }
}));

type Props = {
    element: string
    selectedElements: Array<string>
    setSelectedElements: Dispatch<SetStateAction<Array<string>>>
};

const Chip = ({element, selectedElements, setSelectedElements}: Props) => {
    const handleRemoveChip = () => {
        setSelectedElements(selectedElements?.filter(item => item !== element))
    }

    return (
        <ChipContainer>
            {element}
            <button onClick={handleRemoveChip}>X</button>
        </ChipContainer>
    );
};

export default Chip;
