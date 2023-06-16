import React, {FC, ReactElement, useEffect, useState} from 'react';
import Spinner from "./Components/Spinner/Spinner";
import '../src/assets/css/grid.css'
import '../src/assets/css/dialog.css'
import {Instructions} from "./Components/Instructions/Instructions";
import {useAbortController} from "./Hooks/UseAbortController/UseAbortController";

interface Segment {
    name: string,
    spin: number
}

const App = (): ReactElement<FC> => {
    const [canSpin, setCanSpin] = useState<boolean>(false);
    const [segments, setSegments] = useState<Segment[]>([]);

    const [segmentController, canSpinController] = useAbortController(2);

    useEffect((): void => {
        getSegments();
        getCanSpin();
    }, []);

    const getSegments = (): void => {
        fetch("http://localhost:3001/api/get-segments", {
            method: "GET",
            signal: segmentController.signal,
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response: Response) => response.json())
            .then((data: Segment[]): void => setSegments(data))
            .catch((error: ErrorEvent): void => console.log(error.message));
    }

    const getCanSpin = (): void => {
        fetch("http://localhost:3001/api/can-spin", {
            method: "GET",
            signal: canSpinController.signal,
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response: Response) => response.json())
            .then((data: {canSpin: boolean, message: string}): void => setCanSpin(data.canSpin))
            .catch((error: ErrorEvent): void => console.log(error.message));
    }

    return (
        <div className="container">
            <div className="wrapper">
                <Instructions/>
                <Spinner segments={segments} canSpin={canSpin} />
            </div>
        </div>
    )
}

export default App;
