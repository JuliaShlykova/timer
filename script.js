const btnStart = document.querySelector('#btn-start');
const form = document.querySelector('form');
const btnStop = document.querySelector('#btn-stop');
const userMinutes = document.querySelector('#minutes');
const displayMinutes = document.querySelector('#timer-minutes');
const displaySeconds = document.querySelector('#timer-seconds');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');

const wave = document.querySelector('.wave');

let beatInput = new Audio('./assets/audio/water-drip.mp3');
let beatOutput = new Audio('./assets/audio/water-drip-double.mp3');

const TimeInterval = (minutes) => {
  let timeLeft = minutes * 60;
  wave.style['animation-duration'] = timeLeft + 's';
  wave.classList.add('moving');
  const interval = setInterval(() => {
    if (timeLeft === 0 ) {
      wave.classList.remove('moving');
      clearInterval(interval);
      btnStart.disabled = false;
      btnStop.disabled = true;
      beatOutput.play();
    }
    let minutesLeft = Math.floor(timeLeft/60);
    displayMinutes.textContent = ((minutesLeft < 10)?'0':'') + minutesLeft;
    displaySeconds.textContent = ((timeLeft - minutesLeft*60 < 10)?'0':'') + (timeLeft - minutesLeft*60);
    document.title = displayMinutes.textContent + ':' + displaySeconds.textContent;
    timeLeft--;
    }, 1000);
  return () => {clearInterval(interval)};
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (e.currentTarget.checkValidity()) {
    beatInput.play();
    const minutes = Number(userMinutes.value);
    const cleanup = TimeInterval(minutes);
    btnStart.disabled = true;
    btnStop.disabled = false;
    btnStop.addEventListener('click', () => {
      cleanup();
      wave.classList.remove('moving');
      displayMinutes.textContent = displaySeconds.textContent = '00';
      btnStart.disabled = false;
      btnStop.disabled = true;
      document.title = 'Timer';
    })
  }
})

const api_url ="./assets/quotes.json";

async function changeQuote(url)  {
  const response = await fetch(url);
  const data = await response.json();
  quote.textContent = data[0].quote;
  author.textContent = data[0].author;
  setInterval(() => {
    let i = Math.floor(Math.random() * data.length);
    quote.textContent = data[i].quote;
    author.textContent = data[i].author;
  }, 60 * 1000);
}



changeQuote(api_url);
