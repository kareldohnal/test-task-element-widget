import React, {useState} from 'react';
import styled from "styled-components";
import {COLOR_SNOW_WHITE} from "./constant/colors";
import Chip from "./components/Chip";
import Button from "./components/Button";
import Dialog from "./components/Dialog";

const AppContainer = styled.div(props => ({
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    minHeight: "100vh",
    minWidth: "100vw"
}));

const WidgetContainer = styled.div(props => ({
    background: COLOR_SNOW_WHITE,
    borderRadius: 12,
    height: 200,
    padding: 20,
    position: "relative",
    width: 400,
}));

const ChipBoard = styled.div(props => ({
    display: "flex",
    gap: 10,
    marginBottom: 24,
}));

const StyledHeadline1 = styled.h1(props => ({
    marginTop: 10
}));

function App() {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false)
    const [selectedElements, setSelectedElements] = useState<string[]>([])
    const elements = [...Array(300).keys()].map(i => "Element " + (i + 1))

    const handleOpenDialog = () => {
        setDialogOpen(true)
    }

    return (
        <AppContainer>
            <WidgetContainer>
                <StyledHeadline1>
                    Select items
                </StyledHeadline1>
                <p>
                    {`You currently have ${selectedElements?.length} selected items.`}
                </p>
                <ChipBoard>
                    {selectedElements?.map((element: string) => {
                        return (
                            <Chip {...{element, selectedElements, setSelectedElements}} />
                        )
                    })}
                </ChipBoard>
                <Button onClick={handleOpenDialog}>Change my choice</Button>
                {dialogOpen && <Dialog {...{elements, selectedElements, setSelectedElements, setDialogOpen}} />}
            </WidgetContainer>
        </AppContainer>
    );
}

export default App;
