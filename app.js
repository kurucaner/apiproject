const JOKES_API = "https://v2.jokeapi.dev/joke/Any?safe-mode&type=twopart";

const setup = document.querySelector(`.setup`);
const punchline = document.querySelector(`.puncline`);

function setJokeCard() {
    fetch(`${JOKES_API}`)
    .then(response => response.json())
    .then(joke => {
        setup.textContent = joke.setup;
        punchline.textContent = joke.delivery;
        setup.dataset.lastId = 1;
        setup.dataset.currentId = joke.id;
    });
};

function changeCard() {
    const next = document.querySelector(`button.button1`);
    const prev = document.querySelector(`button.button2`);

    next.addEventListener(`click`, () => {
        fetch(`${JOKES_API}`)
        .then(response => response.json())
        .then(joke => {
            console.log(joke.id)
            setup.textContent = joke.setup;
            punchline.textContent = joke.delivery;
            setup.dataset.lastId = setup.dataset.currentId;
            setup.dataset.currentId = joke.id;
        });
    });

    prev.addEventListener(`click`, () => {
        fetch(`${JOKES_API}&idRange=${setup.dataset.lastId}`)
        .then(response => response.json())
        .then(joke => {
            console.log(joke.id)
            setup.textContent = joke.setup;
            punchline.textContent = joke.delivery;
            setup.dataset.lastId = setup.dataset.currentId;
            setup.dataset.currentId = joke.id;
        });
    });


};

function init() {
    setJokeCard();
    changeCard();
};

init();