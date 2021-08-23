const JOKES_API = "https://official-joke-api.appspot.com";

function setJokeCards() {
    const setup = document.querySelectorAll(`.setup`);
    const punchline = document.querySelectorAll(`.puncline`);
    let i = 0;

    for(card of setup) {
        fetch(`${JOKES_API}/random_joke`)
        .then(response => response.json())
        .then(joke => {
            card.textContent = joke.setup;
            punchline[i].textContent = joke.punchline;
            i++;
        });
    }
}

function init() {
    setJokeCards();
}

init();