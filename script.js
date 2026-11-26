
// ===== ANIMATIONS AU DÉFILEMENT =====

const elements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    elements.forEach((element) => observer.observe(element));
} else {
    elements.forEach((element) => element.classList.add("visible"));
}

// ===== ANNÉE AUTOMATIQUE =====

document.querySelectorAll(".year").forEach((element) => {
    element.textContent = new Date().getFullYear();
});

// ===== QUIZ CYBERSAFE =====

const questions = [
    {
        question: "Tu reçois un message qui te demande ton mot de passe. Que fais-tu ?",
        answers: [
            "Je donne mon mot de passe",
            "Je vérifie le message et je ne partage jamais mon mot de passe",
            "Je transfère le message à tout le monde",
            "Je clique immédiatement sur le lien"
        ],
        correct: 1,
        explanation: "Un service sérieux ne doit pas te demander ton mot de passe par message."
    },
    {
        question: "Quel mot de passe est le plus sûr ?",
        answers: [
            "123456",
            "azerty",
            "Une longue phrase de passe unique",
            "Mon prénom"
        ],
        correct: 2,
        explanation: "Une phrase de passe longue et unique est plus difficile à deviner."
    },
    {
        question: "Que signifie la double authentification ?",
        answers: [
            "Utiliser deux pseudos",
            "Ajouter une deuxième vérification à la connexion",
            "Changer de téléphone",
            "Partager son compte"
        ],
        correct: 1,
        explanation: "La double authentification ajoute une vérification en plus du mot de passe."
    },
    {
        question: "Tu trouves une clé USB inconnue. Que fais-tu ?",
        answers: [
            "Je la branche pour voir son contenu",
            "Je la prête à un ami",
            "Je la laisse et je la remets à un adulte ou au responsable",
            "Je copie ses fichiers"
        ],
        correct: 2,
        explanation: "Un support inconnu peut contenir des fichiers dangereux."
    },
    {
        question: "Quel est le but du phishing ?",
        answers: [
            "Améliorer Internet",
            "Tromper une personne pour obtenir des informations",
            "Réparer un ordinateur",
            "Créer un mot de passe"
        ],
        correct: 1,
        explanation: "Le phishing utilise de faux messages ou sites pour piéger les internautes."
    },
    {
        question: "Pourquoi installer les mises à jour ?",
        answers: [
            "Pour corriger des failles et améliorer le système",
            "Pour supprimer Internet",
            "Pour partager ses données",
            "Pour désactiver la sécurité"
        ],
        correct: 0,
        explanation: "Les mises à jour corrigent notamment des problèmes de sécurité."
    },
    {
        question: "Que faire si un compte semble piraté ?",
        answers: [
            "Ignorer le problème",
            "Partager son mot de passe",
            "Demander de l'aide et sécuriser le compte depuis un appareil sûr",
            "Envoyer ses informations à un inconnu"
        ],
        correct: 2,
        explanation: "Il faut sécuriser le compte rapidement et demander de l'aide si nécessaire."
    },
    {
        question: "Que signifie le cadenas HTTPS dans un navigateur ?",
        answers: [
            "Le site est forcément honnête",
            "La connexion entre le navigateur et le site est chiffrée",
            "Le site ne contient aucune publicité",
            "Le site ne peut jamais être piraté"
        ],
        correct: 1,
        explanation: "HTTPS protège la connexion, mais ne garantit pas que le site est digne de confiance."
    }
];

const quiz = document.getElementById("quiz");

if (quiz) {
    let current = 0;
    let score = 0;
    let answered = false;

    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const feedbackElement = document.getElementById("feedback");
    const progressElement = document.getElementById("progress");
    const counterElement = document.getElementById("counter");
    const nextButton = document.getElementById("next");
    const startElement = document.getElementById("quiz-start");
    const gameElement = document.getElementById("quiz-game");
    const resultElement = document.getElementById("quiz-result");

    document.getElementById("start-quiz").addEventListener("click", () => {
        startElement.classList.add("hidden");
        gameElement.classList.remove("hidden");
        showQuestion();
    });

    function showQuestion() {
        answered = false;

        const item = questions[current];

        questionElement.textContent = item.question;
        counterElement.textContent = `Question ${current + 1} / ${questions.length}`;
        progressElement.style.width = `${(current / questions.length) * 100}%`;
        feedbackElement.textContent = "";
        nextButton.classList.add("hidden");
        optionsElement.innerHTML = "";

        item.answers.forEach((answer, index) => {
            const button = document.createElement("button");
            button.className = "quiz-option";
            button.textContent = answer;

            button.addEventListener("click", () => {
                if (answered) return;

                answered = true;

                const correct = index === item.correct;

                if (correct) {
                    score++;
                    feedbackElement.textContent = "✓ Bonne réponse ! " + item.explanation;
                    feedbackElement.style.color = "#5cf2b0";
                } else {
                    feedbackElement.textContent = "Pas tout à fait. " + item.explanation;
                    feedbackElement.style.color = "#ffb6a6";
                }

                Array.from(optionsElement.children).forEach((option, i) => {
                    option.disabled = true;

                    if (i === item.correct) {
                        option.style.borderColor = "#5cf2b0";
                    } else if (i === index) {
                        option.style.borderColor = "#ff8b8b";
                    }
                });

                nextButton.classList.remove("hidden");
            });

            optionsElement.appendChild(button);
        });
    }

    nextButton.addEventListener("click", () => {
        current++;

        if (current < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    });

    function showResult() {
        gameElement.classList.add("hidden");
        resultElement.classList.remove("hidden");

        document.getElementById("score").textContent =
            `${score} / ${questions.length}`;

        const message = document.getElementById("result-message");

        if (score === questions.length) {
            message.textContent = "Excellent ! Tu maîtrises les bases de la cybersécurité.";
        } else if (score >= 5) {
            message.textContent = "Bravo ! Tu as de bonnes connaissances. Continue à apprendre.";
        } else {
            message.textContent = "Continue à apprendre les bons réflexes avec CyberSafe !";
        }

        progressElement.style.width = "100%";
    }

    document.getElementById("restart").addEventListener("click", () => {
        current = 0;
        score = 0;
        resultElement.classList.add("hidden");
        startElement.classList.remove("hidden");
        progressElement.style.width = "0%";
    });
}
