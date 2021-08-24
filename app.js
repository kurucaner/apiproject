const JOKES_API = `https://v2.jokeapi.dev/joke/Any?safe-mode&type=twopart`;
const USER_DATA = `http://localhost:3000`;

const setup = document.querySelector(`.setup`);
const punchline = document.querySelector(`.puncline`);

function setJokeCard() {
  fetch(`${JOKES_API}`)
    .then((response) => response.json())
    .then((joke) => {
      setup.textContent = joke.setup;
      punchline.textContent = joke.delivery;
      setup.dataset.lastId = 1;
      setup.dataset.currentId = joke.id;
    });
}

function changeCard() {
  const next = document.querySelector(`button.button1`);
  const prev = document.querySelector(`button.button2`);

  next.addEventListener(`click`, () => {
    fetch(`${JOKES_API}`)
      .then((response) => response.json())
      .then((joke) => {
        setup.textContent = joke.setup;
        punchline.textContent = joke.delivery;
        setup.dataset.lastId = setup.dataset.currentId;
        setup.dataset.currentId = joke.id;
      });
  });

  prev.addEventListener(`click`, () => {
    fetch(`${JOKES_API}&idRange=${setup.dataset.lastId}`)
      .then((response) => response.json())
      .then((joke) => {
        setup.textContent = joke.setup;
        punchline.textContent = joke.delivery;
        setup.dataset.lastId = setup.dataset.currentId;
        setup.dataset.currentId = joke.id;
      });
  });
}

function createButtons() {
  const cardFront = document.querySelector(`.flip-card-front`);
  const cardBack = document.querySelector(`.flip-card-back`);
  const cardBase = document.createElement(`div`);
  const like = document.createElement(`div`);
  const dislike = document.createElement(`div`);
  const comment = document.createElement(`form`);

  cardBase.class = `flip-card-base`;
  like.id = `like-button`;
  dislike.id = `dislike-button`;
  comment.id = `comment-form`;

  like.textContent = `♥`;
  dislike.textContent = `✖`;

  like.addEventListener("click", () => {
    fetch(`${USER_DATA}/likes`)
      .then((response) => response.json())
      .then((jokes) => {
        const filter = jokes.filter(
          (joke) => joke.id === setup.dataset.currentId
        );
        if (filter.length > 0) {
          fetch(`${USER_DATA}/likes/${setup.dataset.currentId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ likes: ++filter[0].likes }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Success:", data);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        } else if (filter.length === 0) {
          fetch(`${USER_DATA}/likes`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: setup.dataset.currentId, likes: 1 }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Success:", data);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      });
  });

  dislike.addEventListener("click", () => {
    fetch(`${USER_DATA}/likes`)
      .then((response) => response.json())
      .then((jokes) => {
        const filter = jokes.filter(
          (joke) => joke.id === setup.dataset.currentId
        );
        if (filter.length > 0) {
          fetch(`${USER_DATA}/likes/${setup.dataset.currentId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ likes: --filter[0].likes }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Success:", data);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        } else if (filter.length === 0) {
          fetch(`${USER_DATA}/likes`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: setup.dataset.currentId, likes: -1 }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Success:", data);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      });
  });

  cardBase.append(like, dislike, comment);
  cardBack.appendChild(cardBase);
  cardFront.appendChild(cardBase.cloneNode(true));
}

function init() {
  setJokeCard();
  changeCard();
  createButtons();
}

init();

// ** MUSIC PLAYER STARTS **
var isChrome =
  /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
if (!isChrome) {
  $("#iframeAudio").remove();
} else {
  $("#playAudio").remove(); // just to make sure that it will not have 2x audio in the background
}
// ** MUSIC PLAYER ENDS **
