import React, { FC, ReactElement } from "react";
import '../../assets/css/spinner.css'
import {useAbortController} from "../../Hooks/UseAbortController/UseAbortController";


interface Props {
    segments: Segment[];
    canSpin: boolean;
}

interface Segment {
    name: string,
    spin: number
}

export const Spinner: FC<Props> = (props: Props): ReactElement => {
    const [controller] = useAbortController(1);

    const getResult = (): void => {
        if (props.canSpin) {
            fetch("http://localhost:3001/api/spin/result", {
                method: "GET",
                signal: controller.signal,
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then((response: Response) => response.json())
                .then((result: Segment): void => spin(result))
                .catch((error: ErrorEvent): void => console.log(error.message));
        }
    }

    const spin = (result: Segment): void => {
            const spins = getRandomNumber(12);
            let deg = (spins * 360) + result.spin

            // @ts-ignore
            document.getElementById('wheel').style.transform = "rotate(" + deg + "deg)";
    }

    const getRandomNumber = (max: number) => Math.floor(Math.random() * max);

    return (
            <div id="main" className="main">
                <div id="wheel" className="wheel">
                    <div>
                        {props.segments.map((segment, index) =>
                            <span className={"span" + (index + 1)}><p>{segment.name}</p></span>
                        )}
                    </div>
                </div>

                <button className="spin" onClick={getResult} disabled={!props.canSpin}>Spin!</button>
            </div>
    );
}

export default Spinner;
