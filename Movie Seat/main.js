const container = document.querySelector('.container');
const count = document.getElementById('count');
const total = document.getElementById('total');
const seats = document.querySelectorAll('.container .seat:not(.occupied)');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

populateUI();

// Storing Movie Data
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice',moviePrice);
}

// updating the count and the total
function updateCount() {
    const selectedSeats = document.querySelectorAll('.container .row .seat.selected');
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = +selectedSeatsCount * ticketPrice;
};

// Get Data from local storage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }

    const selectedMovieValue = localStorage.getItem('selectedMoviePrice');
    if (selectedMovieValue !== null) {
        ticketPrice = selectedMovieValue;
    }
}

// Update ticket Price when movie changes
movieSelect.addEventListener('change', (e) => {
    ticketPrice = e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateCount();
})

// Event listener on the unoccupied seats
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateCount();
    }
})


updateCount();