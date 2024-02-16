// Get references to the modal, overlay, and buttons
const modals = document.querySelectorAll(".modal");
const overlays = document.querySelectorAll(".overlay");
const openModalBtns = document.querySelectorAll(".openModalBtn");
const closeModalBtns = document.querySelectorAll(".closeModalBtn");

// Function to open a modal
function openModal(index) {
  modals[0].style.display = "block";
  overlays[0].style.display = "block";
  $(".num-wrap").text(index);
}
let dailySpinCount = 5;
function updateDailySpinCount() {
  const count1 = document.getElementById("daily-spin-count-1");
  const count2 = document.getElementById("daily-spin-count-2");
  $("#daily-spin-count-2").text(dailySpinCount);
  // count1.textContent = dailySpinCount;
  count2.textContent = dailySpinCount;
}
// Function to close a modal
function closeModal(index) {
  const wheels = document.getElementById("wheel");

  modals[index].style.display = "none";
  overlays[index].style.display = "none";
}

// Add event listeners to open modals
openModalBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    openModal(index);
  });
});


function updateModalWinnings(winnings) {
  $(".winning").text("You Won " + winnings);
}
// Add event listeners to close modals when clicking on the overlay
function shuffle(array) {
  var currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function spin() {
  // Play the sound
  // wheel.play();
  // Inisialisasi variabel
  const box = document.getElementById("box");
  const element = document.getElementById("mainbox");
  let SelectedItem = "";

  // Shuffle 450 karena class box1 sudah ditambah 90 derajat di awal. minus 40 per item agar posisi panah pas ditengah.
  // Setiap item memiliki 12.5% kemenangan kecuali item sepeda yang hanya memiliki sekitar 4% peluang untuk menang.
  // Item berupa ipad dan samsung tab tidak akan pernah menang.
  // let Sepeda = shuffle([2210]); //Kemungkinan : 33% atau 1/3
  let sliceOne = shuffle([1890, 2250, 2610]);
  let sliceTwo = shuffle([1850, 2210, 2570]); //Kemungkinan : 100%
  let sliceThree = shuffle([1810, 2170, 2530]);
  let sliceFour = shuffle([1770, 2130, 2490]);
  let sliceFive = shuffle([1750, 2110, 2470]);
  let sliceSix = shuffle([1630, 1990, 2350]);
  let sliceSeven = shuffle([1570, 1930, 2290]);
  let sliceEight = shuffle([1530, 1890, 2250]);
  let sliceNine = shuffle([1490, 1850, 2210]);
  let sliceTen = shuffle([1450, 1810, 2170]);
  // Bentuk acak
  let Hasil = shuffle([
    sliceOne[0],
    sliceTwo[0],
    sliceThree[0],
    sliceFour[0],
    sliceFive[0],
    sliceSix[0],
    sliceSeven[0],
    sliceEight[0],
    sliceNine[0],
    sliceTen[0],
  ]);
  // console.log(Hasil[0]);

  // Ambil value item yang terpilih
  if (sliceOne.includes(Hasil[0])) SelectedItem = "iPhone 15";
  if (sliceTwo.includes(Hasil[0])) SelectedItem = "iPhone 14";
  if (sliceThree.includes(Hasil[0])) SelectedItem = "iPhone 13";
  if (sliceFour.includes(Hasil[0])) SelectedItem = "iPhone 12";
  if (sliceFive.includes(Hasil[0])) SelectedItem = "iPad";
  if (sliceSix.includes(Hasil[0])) SelectedItem = "iPad mini";
  if (sliceSeven.includes(Hasil[0])) SelectedItem = "Macbook";
  if (sliceEight.includes(Hasil[0])) SelectedItem = "Blender";
  if (sliceNine.includes(Hasil[0])) SelectedItem = "Lunch Box";
  if (sliceTen.includes(Hasil[0])) SelectedItem = "JBL Buds";

  // Proses
  box.style.setProperty("transition", "all ease 6s"); // Reduce transition duration to 4 seconds
  box.style.transform = "rotate(" + (Hasil[0] + 2160) + "deg"; // Rotate by 720 degrees for faster spin
  element.classList.remove("animate");
  setTimeout(function () {
    element.classList.add("animate");
  }, 6000);

  // Munculkan Alert
  setTimeout(function () {
    //  applause.play();
    openModal(SelectedItem);
    updateModalWinnings(SelectedItem);
    if (dailySpinCount > 0) {
      dailySpinCount--;
    }
    updateDailySpinCount();
  }, 5500);

  // Delay and set to normal state
  setTimeout(function () {
    box.style.setProperty("transition", "initial")
    box.style.transform = "rotate(90deg)";
  }, 7000);
}
