import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from 'react';
import styled from "styled-components";
import Chip from "./Chip";
import Button from "./Button";
import {COLOR_GREY, COLOR_ORANGE, COLOR_SNOW_WHITE} from "../constant/colors";

const DialogContainer = styled.div(props => ({
    background: COLOR_SNOW_WHITE,
    borderRadius: 12,
    position: "absolute",
    top: "50%",
    left: "50%",
    padding: 20,
    transform: "translate(-50%, -50%)",
    width: 400,
}));

const StyledHeadline1 = styled.h1(props => ({
    marginTop: 10,
}));

const CloseButton = styled.button(props => ({
    background: COLOR_ORANGE,
    border: 0,
    borderRadius: 3,
    cursor: "pointer",
    height: 20,
    position: "absolute",
    right: 20,
    top: 20,
    width: 20,
}));

const UtilityBar = styled.div(props => ({
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
    "& input": {
        marginLeft: 4
    },
    "& select": {
        marginLeft: 4
    },
}));

const Checklist = styled.div(props => ({
    background: COLOR_GREY,
    borderRadius: 6,
    display: "flex",
    flexDirection: "column",
    gap: 6,
    height: 200,
    overflow: "scroll",
    padding: 12,
}));

const ChipBoard = styled.div(props => ({
    display: "flex",
    flexDirection: "column",
    height: 100,
    "& div": {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        marginBottom: 24,
    }
}));

const Controls = styled.div(props => ({
    display: "flex",
    gap: 12,
}));

type Props = {
    elements: Array<string>
    selectedElements: Array<string>
    setSelectedElements: Dispatch<SetStateAction<Array<string>>>
    setDialogOpen: Dispatch<SetStateAction<boolean>>
};

const Dialog = ({elements, selectedElements, setSelectedElements, setDialogOpen}: Props) => {
    const [searchString, setSearchString] = useState<string>("")
    const [filter, setFilter] = useState<undefined | string>(undefined)
    const [filteredElements, setFilteredElements] = useState<Array<string>>(elements)
    const [newSelection, setNewSelection] = useState<Array<string>>(selectedElements)

    useEffect(() => {
        let elementsToFilter = elements
        const regExpNumber = /\d+/;
        searchString !== "" && (elementsToFilter = elementsToFilter.filter(item => item.toLowerCase().includes(searchString.toLowerCase())))
        filter && (elementsToFilter = elementsToFilter.filter(item => Number(item.match(regExpNumber)) > Number(filter)))
        setFilteredElements(elementsToFilter)
    }, [elements, searchString, filter])

    const handleCloseDialog = () => {
        setDialogOpen(false)
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchString(e.target.value)
    }

    const handleFilter = (e: ChangeEvent<HTMLSelectElement>) => {
        e.target.value === "undefined" ? setFilter(undefined) : setFilter(e.target.value)
    }

    const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? setNewSelection([...newSelection, e.target.value])
            : setNewSelection(newSelection?.filter(item => item !== e.target.value))
    }

    const handleSave = () => {
        setSelectedElements(newSelection)
        setDialogOpen(false)
    }

    const handleCancel = () => {
        setDialogOpen(false)
    }

    return (
        <DialogContainer>
            <StyledHeadline1>
                Select items
            </StyledHeadline1>
            <CloseButton onClick={handleCloseDialog}>
                X
            </CloseButton>
            <UtilityBar>
                <div>
                    Search
                    <input type={"text"} onChange={handleSearch}/>
                </div>
                <div>
                    Filter
                    <select onChange={handleFilter}>
                        <option value="undefined">{"No filter"}</option>
                        <option value="10">{">10"}</option>
                        <option value="50">{">50"}</option>
                        <option value="100">{">100"}</option>
                    </select>
                </div>
            </UtilityBar>
            <Checklist>
                {
                    filteredElements.map((element) => {
                        let elementWithoutSpaces = element.replace(/ +/g, "");
                        return (
                            <div key={elementWithoutSpaces}>
                                <input
                                    disabled={!newSelection.includes(element) && newSelection?.length >= 3}
                                    checked={newSelection.includes(element)}
                                    id={elementWithoutSpaces}
                                    name={elementWithoutSpaces}
                                    onChange={handleSelect}
                                    type="checkbox"
                                    value={element}
                                />
                                <label htmlFor={elementWithoutSpaces}>{element}</label>
                            </div>
                        )
                    })
                }
            </Checklist>
            <ChipBoard>
                <p>
                    Current selected items:
                </p>
                <div>
                    {newSelection?.map((element: string) => {
                        return (
                            <Chip selectedElements={newSelection}
                                  setSelectedElements={setNewSelection} {...{element}} />
                        )
                    })}
                </div>
            </ChipBoard>
            <Controls>
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={handleCancel}>Cancel</Button>
            </Controls>
        </DialogContainer>
    )
        ;
};

export default Dialog;
