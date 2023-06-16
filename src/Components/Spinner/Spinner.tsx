import React, {FC, ReactElement, useState} from "react";
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
    const [open, setOpen] = useState<boolean>(false);
    const [segment, setSegment] = useState<Segment | null>(null);

    const [controller] = useAbortController(1);

    const wait = async (milliseconds: number) => {
        await new Promise(resolve => {
            return setTimeout(resolve, milliseconds)
        });
    };

    const getResult = async (): Promise<void> => {
        if (props.canSpin) {
            fetch("http://localhost:3001/api/spin/result", {
                method: "GET",
                signal: controller.signal,
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then((response: Response) => response.json())
                //@ts-ignore
                .then((result: Segment): void => {
                    spin(result);
                    setSegment(result);
                })
                .catch((error: ErrorEvent): void => console.log(error.message));
        }
    }

    const spin = async (result: Segment): Promise<void> => {
            const spins = getRandomNumber(12);
            let deg = (spins * 360) + result.spin

            // @ts-ignore
            document.getElementById('wheel').style.transform = "rotate(" + deg + "deg)";

            await wait(5000).then(() => {
                setOpen(true);
            });
    }

    const getRandomNumber = (max: number) => Math.floor(Math.random() * max);

    return (<>

            <dialog open={open}>
                <h2 className="title">Congratulations you've won {segment?.name} off!</h2>
                <p>Thank you for playing the daily prize wheel, this prize has been automatically added to your wallet.</p>
                <br />
                <p>Your daily spin will reset at midnight tonight, we hope to see you again tomorrow for another chance to win!</p>
                <button className='close-button' onClick={(): void => setOpen(false)}>Close</button>

            </dialog>

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
        </>
    );
}

export default Spinner;
