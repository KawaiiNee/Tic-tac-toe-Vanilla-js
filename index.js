
const boxes = document.querySelectorAll(".btn");
const gameWinner = document.querySelector(".game-status");
const container = document.querySelector(".container");

let isFirst = true;

function userTurn(element) {
	if (element.innerText === '') {
		if (isFirst) {
			element.innerText = "×";
			isFirst = false;

			element.style = "animation: text-animation .5s cubic-bezier(.57,.05,0,1.21); color: red";
		}

		else if (!isFirst) {
			element.innerText = "O";
			isFirst = true;

			element.style = "font-size: 5rem";
			element.style = "color: #00ff00";
			element.style = "animation: text-animation .5s cubic-bezier(.57,.05,0,1.21); color: #00ff00; font-size: 5rem";
		}
	}
}

function isMatch(arr) {
	if (arr[0].innerText !== '') {
		if (arr[0].innerText === arr[1].innerText && arr[0].innerText === arr[2].innerText)
			return true;
		if (arr[0].innerText === arr[3].innerText && arr[0].innerText === arr[6].innerText)
			return true;
		if (arr[0].innerText === arr[4].innerText && arr[0].innerText === arr[8].innerText)
			return true;
	}
	if (arr[1].innerText !== '') {
		if (arr[1].innerText === arr[4].innerText && arr[1].innerText === arr[7].innerText) 
			return true;
	}
	if (arr[2].innerText !== '') {
		if (arr[2].innerText === arr[4].innerText && arr[2].innerText === arr[6].innerText) 
			return true;
		if (arr[2].innerText === arr[5].innerText && arr[2].innerText === arr[8].innerText) 
			return true;
	}
	if (arr[3].innerText !== '') {
		if (arr[3].innerText === arr[4].innerText && arr[3].innerText === arr[5].innerText) 
			return true;
	}
	if (arr[6].innerText !== '') {
		if (arr[6].innerText === arr[7].innerText && arr[6].innerText === arr[8].innerText) 
			return true;
	}

	return false;
}


const isNotFullBoard = (arr) => Array.from(arr).some((box) => {
		return box.innerText === '';
	})



const continueGame = () => {
	return window.confirm("Wanna play again?");
}

function reset(arr) {
	arr.forEach((box) => {
		// reset each box innerText when game resets or start
		box.innerText = "";
		box.style = "animation: btn-animation 1s cubic-bezier(.57,.05,0,1.21) forwards;";

		setTimeout(() => {
			box.style = "transition: background-color 200ms, transform 300ms;";
		}, 1250)


	})

	gameWinner.innerText = "";
	gameWinner.style = "animation: ";

}


function allClear() {
	container.style = "animation: board-shrink 1.5s cubic-bezier(.57,.05,0,1.21) forwards;";
	// container.remove();
	// put the remove function inside a settimeout to give the animation time to animate

	setTimeout(() => {
		container.remove()
		document.body.innerText = "THANK YOU FOR PLAYING!"
	}, 1510)
}


function haveWinner(arr) {
	if (!(isNotFullBoard(arr))) {
		gameWinner.innerText = "DRAW";
		return true;
	}

	if (isMatch(arr)) {
		gameWinner.innerText = "YOU WON!";
		gameWinner.style = "animation: game-status-animation 1500ms ease-in-out infinite";
		return true;
	}

	return false;

	// if have a winner scale all the boxes except center then shrink them
	// make a css key frames animation for it
}


const handleGame = () => {
	reset(boxes);
	boxes.forEach(element => {
		element.addEventListener("click", () => {
			if (!isMatch(boxes) && isNotFullBoard(boxes)) {
				userTurn(element);
			}

			if (haveWinner(boxes)) {
				setTimeout(() => {
					if (continueGame()) {
						handleGame();
					}
					else {
						reset(boxes);
						allClear();
					}
				}, 1250)
			}
		})
	})

}

handleGame();





















