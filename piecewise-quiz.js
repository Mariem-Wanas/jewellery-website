let score = 0;
let answeredQuestions = new Set();

function checkAnswer(questionNum, correctAnswer, tolerance = 0) {
    const inputElement = document.getElementById(`q${questionNum}`);
    const resultElement = document.getElementById(`result${questionNum}`);
    const solutionElement = document.getElementById(`solution${questionNum}`);
    const userAnswer = parseFloat(inputElement.value);

    if (isNaN(userAnswer)) {
        resultElement.textContent = "Please enter a valid number!";
        resultElement.className = "result show incorrect";
        return;
    }

    const isCorrect = tolerance > 0 
        ? Math.abs(userAnswer - correctAnswer) <= tolerance
        : userAnswer === correctAnswer;

    if (isCorrect) {
        resultElement.textContent = "✓ Correct! Well done!";
        resultElement.className = "result show correct";
        
        if (!answeredQuestions.has(questionNum)) {
            score++;
            answeredQuestions.add(questionNum);
            updateScore();
        }
    } else {
        resultElement.textContent = `✗ Incorrect. The correct answer is ${correctAnswer}`;
        resultElement.className = "result show incorrect";
    }

    solutionElement.classList.remove('hidden');
    inputElement.disabled = true;
}

function updateScore() {
    document.getElementById('score').textContent = score;
}

function resetQuiz() {
    score = 0;
    answeredQuestions.clear();
    updateScore();

    for (let i = 1; i <= 6; i++) {
        const inputElement = document.getElementById(`q${i}`);
        const resultElement = document.getElementById(`result${i}`);
        const solutionElement = document.getElementById(`solution${i}`);

        if (inputElement) {
            inputElement.value = '';
            inputElement.disabled = false;
        }
        if (resultElement) {
            resultElement.className = 'result';
            resultElement.textContent = '';
        }
        if (solutionElement) {
            solutionElement.classList.add('hidden');
        }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.answer-input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const questionNum = parseInt(this.id.replace('q', ''));
                const button = this.nextElementSibling;
                if (button) {
                    button.click();
                }
            }
        });
    });
});
