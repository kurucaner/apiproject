// THIS IS ALL JUST FOR TESTING CARDS

function createJokeCard() {
    const jokesCard = document.createElement(`div`);
    const jokesExtra = document.createElement(`div`);
    const jokesDiv = document.getElementById(`cards`);

    jokesCard.className = `card`;
    jokesDiv.appendChild(jokesCard);

    jokesExtra.className = `card-base`;
    jokesCard.appendChild(jokesExtra);
}

function init() {
    createJokeCard();
    createJokeCard();
    createJokeCard();
    createJokeCard();
    createJokeCard();
    createJokeCard();
    createJokeCard();
}

init();