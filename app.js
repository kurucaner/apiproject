const JOKES_API = `https://v2.jokeapi.dev/joke/Any?safe-mode&type=twopart`;
const NO_FILTER = `https://v2.jokeapi.dev/joke`;
const REQUIRED_FILTER = `?safe-mode&type=twopart`;
let CURRENT_FILTER = `https://v2.jokeapi.dev/joke/Any?safe-mode&type=twopart`;
const USER_DATA = `http://localhost:3000`;

const setup = document.querySelector(`.setup`);
const punchline = document.querySelector(`.puncline`);
const jokeType = document.querySelector(`.joke-type`);
const filterItems = [`Any`, `Most Likes DOES NOT WORK`, `Programming`, `Misc`, `Pun`, `Spooky`, `Christmas`];

function setJokeCard() {
  fetch(`${JOKES_API}`)
    .then((response) => response.json())
    .then((joke) => {
      setup.textContent = joke.setup;
      punchline.textContent = joke.delivery;
      setup.dataset.lastId = 1;
      setup.dataset.currentId = joke.id;
      jokeType.textContent = `Joke Type: ${joke.category}`;

      fetch(`${USER_DATA}/likes`)
        .then(response => response.json())
        .then(count => {
            const filter = count.filter(wanted => wanted.id === setup.dataset.currentId);
            if (filter.length > 0) {
                document.getElementById(`joke-rating`).textContent = `Rating: ${filter[0].likes}`;
            } else {
                document.getElementById(`joke-rating`).textContent = `Rating: 0`;
            }
        });
    });
};

function changeJokeCard() {
  const next = document.querySelector(`button.button1`);
  const prev = document.querySelector(`button.button2`);

  next.addEventListener(`click`, () => {
    fetch(`${CURRENT_FILTER}`)
      .then((response) => response.json())
      .then((joke) => {
        setup.textContent = joke.setup;
        punchline.textContent = joke.delivery;
        setup.dataset.lastId = setup.dataset.currentId;
        setup.dataset.currentId = joke.id;
        jokeType.textContent = `Joke Type: ${joke.category}`;

        fetch(`${USER_DATA}/likes`)
        .then(response => response.json())
        .then(count => {
            const filter = count.filter(wanted => wanted.id === setup.dataset.currentId);
            if (filter.length > 0) {
                document.getElementById(`joke-rating`).textContent = `Rating: ${filter[0].likes}`;
            } else {
                document.getElementById(`joke-rating`).textContent = `Rating: 0`;
            }
        });
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
        jokeType.textContent = `Joke Type: ${joke.category}`;

        fetch(`${USER_DATA}/likes`)
        .then(response => response.json())
        .then(count => {
            const filter = count.filter(wanted => wanted.id === setup.dataset.currentId);
            if (filter.length > 0) {
                document.getElementById(`joke-rating`).textContent = `Rating: ${filter[0].likes}`;
            } else {
                document.getElementById(`joke-rating`).textContent = `Rating: 0`;
            }
        });
      });
  });
};

function createCardButtons() {
  const cardFront = document.querySelector(`.flip-card-front`);
  const cardBack = document.querySelector(`.flip-card-back`);

  const cardBase = document.createElement(`div`);

  const like = document.createElement(`div`);
  const dislike = document.createElement(`div`);
  const rating = document.createElement(`div`);

  cardBase.className = `flip-card-base`;
  like.id = `like-button`;
  dislike.id = `dislike-button`;
  rating.id = `joke-rating`;

  like.textContent = `♥`;
  dislike.textContent = `✖`;
  rating.textContent = `NaN`;

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
              document.getElementById(`joke-rating`).textContent = `Rating: ${data.likes}`;
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
              document.getElementById(`joke-rating`).textContent = `Rating: ${data.likes}`;
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
              document.getElementById(`joke-rating`).textContent = `Rating: ${data.likes}`;
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
              document.getElementById(`joke-rating`).textContent = `Rating: ${data.likes}`;
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      });
  });

  cardBase.append(dislike, rating, like);
  cardBack.appendChild(cardBase);
//   cardFront.appendChild(cardBase.cloneNode(true));
};

function createFilterButtons() {
    const hero = document.querySelector(`.hero`);
    const filterButton = document.createElement(`button`);
    const filterList = document.createElement(`div`);
    const p1 = document.createElement(`p`);
    const p2 = document.createElement(`p`);
    const p3 = document.createElement(`p`);
    const p4 = document.createElement(`p`);
    const p5 = document.createElement(`p`);
    const p6 = document.createElement(`p`);
    const p7 = document.createElement(`p`);
    const pArray = [p1, p2, p3, p4, p5, p6, p7];

    filterList.append(p1, p2, p3, p4, p5, p6, p7);
    hero.append(filterButton, filterList);

    filterButton.className = `filter-button`;
    filterButton.textContent = `FILTER`;
    filterList.className = `filter-hidden`;
    [p1.textContent, p2.textContent, p3.textContent, p4.textContent, p5.textContent, p6.textContent, p7.textContent] = [...filterItems];

    filterButton.addEventListener(`click`, () => {
        if (filterList.className === `filter-visible`) {
            filterList.className = `filter-hidden`;
        } else {
            filterList.className = `filter-visible`;
        }
    });
};

function setFilter() {
    const pNode = document.querySelector(`.hero`).lastChild.children;
    const pArray = Array.from(pNode);

    pArray.forEach(p => {
        p.addEventListener(`click`, () => {
          if(p.textContent !== `Most Likes DOES NOT WORK`) {
            CURRENT_FILTER = `${NO_FILTER}/${p.textContent}${REQUIRED_FILTER}`;
          } else {
            console.log(`error: Most Likes is not finished`);
          };
        });
    });
};

function init() {
    setJokeCard();
    createCardButtons();
    createFilterButtons();
    setFilter();
    changeJokeCard();
};

init();

// ** MUSIC PLAYER STARTS **
document.addEventListener('click', musicPlay);
function musicPlay() {
    // document.getElementById('playAudio').play();
    // document.removeEventListener('click', musicPlay);
}
// ** MUSIC PLAYER ENDS **
