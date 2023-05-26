import React, {FC, ReactElement} from "react";

interface Props {
}

export const Instructions: FC<Props> = (props: Props): ReactElement => {

    return (
        <>
            <div>
                <h1>Spin the Wheel and Discover Your Prizes!</h1>
                <p>Get ready for an exhilarating experience with our prize spinner. Take a spin and unveil fantastic
                    rewards, including exclusive discounts, both in percentage and monetary value, and beautiful flowers
                    to brighten your day. Each spin brings you closer to exciting surprises!</p>
                <br/>
                <h2>Here's how it works:</h2>
                <p>- Click the 'Spin Now' button to kick off the excitement.</p>
                <p>- Give the wheel a whirl and watch as it spins with anticipation.</p>
                <p>- Feel the excitement build as the wheel gradually slows down, revealing your prize.</p>
                <p>- Celebrate your win as the wheel lands on a generous discount or a stunning bouquet of flowers!</p>
                <br/>
                <br/>
                <p>But that's not all! Return every day to spin the wheel again and discover even more chances to save
                    big and bring joy with beautiful blooms. It's quick, it's entertaining, and it's absolutely free!
                    Don't miss out on this fantastic opportunity to win amazing discounts and delightful flowers. Start
                    spinning now!</p>
            </div>
        </>
    );
}
