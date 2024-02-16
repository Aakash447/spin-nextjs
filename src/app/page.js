"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import "../spin-wheel.css";
import { useEffect, useRef, useState } from "react";

const box1ItemsOriginal = [
  "iPhone 15 a",
  "iPhone 14 a",
  "iPhone 13 a",
  "iPhone 12 a",
  "iPad a",
];

const box2ItemsOriginal = [
  "iPad mini a",
  "Macbook a",
  "Blender a",
  "Lunch Box a",
  "JBL Buds a",
];

export default function Home({
  box1Items = box1ItemsOriginal,
  box2Items = box2ItemsOriginal,
}) {
  // Get references to the modal, overlay, and buttons
  const modalRef = useRef();
  const overlayRef = useRef();
  const openModalBtnRef = useRef();
  const closeModalBtnRef = useRef();
  const numWrapRef = useRef()
  const [numWrapText,setNumWrapText] = useState('')
  const [dailySpinCountState,setDailySpinCountState] = useState(5)
  const [winningModalText,setWinningModalText] = useState('')

  // Function to open a modal
  function openModal(index = 0) {
    modalRef.current.style.display = "block";
    overlayRef.current.style.display = "block";
    // $(".num-wrap").text(index);
    setNumWrapText(index)
  }

  function updateDailySpinCount() {
    const count1 = document.getElementById("daily-spin-count-1");
    const count2 = document.getElementById("daily-spin-count-2");
    // $("#daily-spin-count-2").text(dailySpinCount);
    if(dailySpinCountState>=1){
      setDailySpinCountState(prev=> prev-1)
    }
    // count1.textContent = dailySpinCount;
    // count2.textContent = dailySpinCount;
  }

  // Function to close a modal
  function closeModal(index = 0) {
    const wheels = document.getElementById("wheel");

    modalRef.current.style.display = "none";
    overlayRef.current.style.display = "none";
  }

  function updateModalWinnings(winnings) {
    // $(".winning").text("You Won " + winnings);
    setWinningModalText(winnings)
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
  const boxRef = useRef();
  const mainboxRef = useRef();

  function spin() {
    // Play the sound
    // wheel.play();
    // Inisialisasi variabel

    let SelectedItem = "";

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
    if (sliceOne.includes(Hasil[0])) SelectedItem = box1Items[0] ;
    if (sliceTwo.includes(Hasil[0])) SelectedItem = box1Items[1] ;
    if (sliceThree.includes(Hasil[0])) SelectedItem = box1Items[2] ;
    if (sliceFour.includes(Hasil[0])) SelectedItem = box1Items[3] ;
    if (sliceFive.includes(Hasil[0])) SelectedItem = box1Items[4] ;
    if (sliceSix.includes(Hasil[0])) SelectedItem = box1Items[0] ;
    if (sliceSeven.includes(Hasil[0])) SelectedItem = box1Items[1] ;
    if (sliceEight.includes(Hasil[0])) SelectedItem = box1Items[2] ;
    if (sliceNine.includes(Hasil[0])) SelectedItem = box1Items[3] ;
    if (sliceTen.includes(Hasil[0])) SelectedItem = box1Items[4] ;
    // Proses
    boxRef.current.style.setProperty("transition", "all ease 6s"); // Reduce transition duration to 4 seconds
    boxRef.current.style.transform = "rotate(" + (Hasil[0] + 2160) + "deg"; // Rotate by 720 degrees for faster spin
    mainboxRef.current.classList.remove("animate");
    setTimeout(function () {
      mainboxRef.current.classList.add("animate");
    }, 6000);

    // Munculkan Alert
    setTimeout(function () {
      //  applause.play();
      openModal(SelectedItem);
      updateModalWinnings(SelectedItem);
     
      updateDailySpinCount();
    }, 5500);

    // Delay and set to normal state
    setTimeout(function () {
      boxRef.current.style.setProperty("transition", "initial");
      boxRef.current.style.transform = "rotate(90deg)";
    }, 7000);
  }

  return (
    <section>
      <div className="wrapper">
        <div className="container">
          <div
            ref={openModalBtnRef}
            onClick={openModal}
            className="heading openModalBtn"
          >
            <img src="../images/heading.png" alt="" />
          </div>
          <div className="total-winning">
            <div className="title">Total Winnings</div>
            <div className="counter" id="total-winning-counter">
              <div className="icon">
                <img src="images/medal-icon.svg" alt="" />
              </div>
              <div  className="num-wrap"> {numWrapText} </div>
            </div>
          </div>
          <div className="spinner">
            {/* <!-- <canvas id="wheel"></canvas> --> */}
            <div className="wheel" id="wheel">
              <div ref={mainboxRef} className="mainbox" id="mainbox">
                <div ref={boxRef} className="box" id="box">
                  <div className="box1">
                    {box1Items?.map((item, i) => {
                      return (
                        <span className={`font span${i + 1}`} key={i}>
                          <b>{item}</b>
                        </span>
                      );
                    })}
                  </div>
                  <div className="box2">
                    {box2Items?.map((item, i) => {
                      return (
                        <span className={`font span${i + 1}`} key={i}>
                          <b>{item}</b>
                        </span>
                      );
                    })}
                  </div>
                </div>
                <button className="spin" onClick={spin}></button>
              </div>
            </div>
          </div>
          <div className="daily-spin">
            <div className="count-wrap">
              <div className="count" id="daily-spin-count-1">
                0
              </div>
              <div className="count" id="daily-spin-count-2">
                {dailySpinCountState}
              </div>
            </div>
            <div className="title">Daily Spin Left</div>
          </div>
        </div>
        {/*  <div id="final-value">
      <p>Click On The Spin Button To Start</p>
    </div>  */}
      </div>
      <div ref={modalRef} className="modal">
        <div className="modal-content">
          <span
            ref={closeModalBtnRef}
            onClick={closeModal}
            className="closeModalBtn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M4.00548 2.82698L7.25893 6.08043L10.4955 2.84384C10.567 2.76775 10.6531 2.70687 10.7487 2.66487C10.8443 2.62287 10.9474 2.6006 11.0518 2.59941C11.2754 2.59941 11.4897 2.68821 11.6478 2.84628C11.8059 3.00435 11.8947 3.21873 11.8947 3.44227C11.8966 3.54561 11.8775 3.64826 11.8383 3.74392C11.7992 3.83958 11.7409 3.92623 11.6671 3.99856L8.38836 7.23516L11.6671 10.5139C11.806 10.6498 11.8875 10.8338 11.8947 11.028C11.8947 11.2516 11.8059 11.466 11.6478 11.624C11.4897 11.7821 11.2754 11.8709 11.0518 11.8709C10.9444 11.8754 10.8372 11.8574 10.7371 11.8182C10.637 11.7791 10.5461 11.7195 10.4702 11.6433L7.25893 8.38988L4.01391 11.6349C3.94269 11.7085 3.85761 11.7672 3.76358 11.8077C3.66955 11.8482 3.56842 11.8697 3.46605 11.8709C3.24251 11.8709 3.02812 11.7821 2.87005 11.624C2.71199 11.466 2.62318 11.2516 2.62318 11.028C2.62122 10.9247 2.64039 10.8221 2.67953 10.7264C2.71866 10.6307 2.77693 10.5441 2.85076 10.4717L6.12949 7.23516L2.85076 3.95642C2.71184 3.82052 2.63038 3.63648 2.62318 3.44227C2.62318 3.21873 2.71199 3.00435 2.87005 2.84628C3.02812 2.68821 3.24251 2.59941 3.46605 2.59941C3.66833 2.60194 3.86219 2.6837 4.00548 2.82698Z"
                fill="#F8F8F8"
              />
            </svg>
          </span>
          <h2 className="title">How to use winnings?</h2>
          <p>Use Winnings to get 5% extra gold on your gold purchase</p>
          <div className="winning">
            {/* You got{" "}
            <span className="win">
              <img src="images/medal-icon.svg" alt="" className="text" />
              <p id="modal-winnings">1</p>
            </span>{" "}
            Winnings */}
            {winningModalText}
          </div>
          <div className="btn-wrap">
            <button className="btn-red">USE WINNINGS</button>
          </div>
        </div>
      </div>
      <div className="overlay" ref={overlayRef}></div>
    </section>
  );
}
