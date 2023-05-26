const express = require("express");

const PORT = process.env.PORT || 3001;

const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/get-segments", (req, res) => {
    res.json([
        {name: "Free!", spin: 0},
        {name: "Free!", spin: 180},
        {name: "20%", spin: 90},
        {name: "25%", spin: 270},
        {name: "£5", spin: 45},
        {name: "15%", spin: 135},
        {name: "10%", spin: 315},
        {name: "£5", spin: 225}
    ]);
});

app.get("/api/can-spin", (req, res) => {
    res.json({canSpin: true, message: "Enjoy your daily spin!"});
});

app.get("/api/spin/result", (req, res) => {
    const values = [
        { name: "Free!", spin: 0, percentage: 2 },
        { name: "Free!", spin: 180, percentage: 2 },
        { name: "20%", spin: 90, percentage: 20 },
        { name: "25%", spin: 270, percentage: 20 },
        { name: "£5", spin: 45, percentage: 8 },
        { name: "15%", spin: 135, percentage: 20 },
        { name: "10%", spin: 315, percentage: 20 },
        { name: "£5", spin: 225, percentage: 8 }
    ];

    // Calculate the total percentage
    const totalPercentage = values.reduce((sum, value) => sum + value.percentage, 0);

    // Generate a random number between 0 and totalPercentage
    const randomNum = Math.random() * totalPercentage;

    // Find the value corresponding to the random number
    let accumulatedPercentage = 0;
    for (const value of values) {
        accumulatedPercentage += value.percentage;
        if (randomNum < accumulatedPercentage) {
            return res.json(value);
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
