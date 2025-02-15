var total = 0;
var addList = [0.05, 0.10, 0.20, 0.50, 1, 2, 5, 10, 20, 50];
var typeAmounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function updateTotal() {
    const totalElement = document.getElementById("total");
    totalElement.textContent = "€" + total.toFixed(2);
    totalElement.classList.remove("animate-total");
    void totalElement.offsetWidth;
    totalElement.classList.add("animate-total");
}

function updateTypeAmounts() {
    const countElements = document.getElementsByClassName("count");
    for (let i = 0; i < countElements.length; i++) {
        if (countElements[i].textContent !== typeAmounts[i].toString()) {
            countElements[i].textContent = typeAmounts[i];
            countElements[i].classList.remove("animate-count");
            void countElements[i].offsetWidth;
            countElements[i].classList.add("animate-count");
        }
    }
}

// Add click handlers to all denomination boxes
const boxes = document.getElementsByClassName("denomination-box");
for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", function(e) {
        total = parseFloat((total + addList[i]).toFixed(2));
        typeAmounts[i]++;
        updateTotal();
        updateTypeAmounts();
    });

    // Add right-click handler
    boxes[i].addEventListener("contextmenu", function(e) {
        e.preventDefault(); // Prevent the context menu from appearing
        if (typeAmounts[i] > 0) { // Only decrease if there's something to decrease
            total = parseFloat((total - addList[i]).toFixed(2));
            typeAmounts[i]--;
            updateTotal();
            updateTypeAmounts();
        }
    });
}

window.addEventListener("keydown", function(e) {
    if (/^[0-9]$/.test(e.key)) {
        if (e.key == "0") {
            total = parseFloat((total + addList[9]).toFixed(2));
            typeAmounts[9]++;
        } else {
            const index = parseInt(e.key) - 1;
            total = parseFloat((total + addList[index]).toFixed(2));
            typeAmounts[index]++;
        }
        updateTotal();
        updateTypeAmounts();
    }
});