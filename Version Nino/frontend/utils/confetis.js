/** @format */

//npm install js-confetti

/** @format */

import JSConfetti from "js-confetti";

export const confetti = () => {
    const confettiInstance = new JSConfetti();
    confettiInstance.addConfetti({
        emojis: ["G", "A", "G", "N", "A", "N", "T"],
    });
};
