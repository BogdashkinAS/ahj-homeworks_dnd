import inLocalStorage from './inlocalstorage.js';
import outLocalStorage from './outlocalstorage.js';
import positionElement from './positionelement.js';

export default function Cards() {
    window.onload = function () {
        outLocalStorage();
      };
      
    const columnsContainer = document.querySelector(".board");
    
    columnsContainer.addEventListener("click", (e) => {
      const clickTarget = e.target;
    
      if (clickTarget.className === 'board') {
        return;
      };
    
      const column = clickTarget.closest(".column");
      const addCardLink = column.querySelector(".add-card-link");
      const columnCardsList = column.querySelector(".column-cards");
      const addCardSection = column.querySelector(".add-card-section");
      const textarea = column.querySelector(".textarea");
      const addCardButton = column.querySelector(".add-card-button");
      const cancelCardButton = column.querySelector(".cancel-card-button");
    
      if (clickTarget === addCardLink) {
        addCardSection.classList.remove("visually-hidden");
    
        addCardButton.addEventListener("click", () => {
          const cardContent = textarea.value.trim();
    
          if (cardContent) {
            const cardTemplate = `
                <div class="card" draggable="true"">
                <button type="button" class="delete-card-button">&#x2715;</button>
                  <p class="card-text">${cardContent}</p>
                </div>
              `;
    
            columnCardsList.insertAdjacentHTML("beforeend", cardTemplate);
    
            inLocalStorage();
    
            textarea.value = "";
            addCardSection.classList.add("visually-hidden");
          }
        });
    
        cancelCardButton.addEventListener("click", () => {
          textarea.value = "";
          addCardSection.classList.add("visually-hidden");
        });
      }
    
      const deleteCardButtons = column.querySelectorAll(".delete-card-button");
    
      deleteCardButtons.forEach((button) => {
        if (clickTarget === button) {
          const card = button.closest(".card");
          card.remove();
    
          inLocalStorage();
        }
      });
    });
    
    let actualElement;
    
    const body = document.querySelector('body');
    
    columnsContainer.addEventListener("dragstart", (e) => {
      actualElement = e.target;
    
      actualElement.classList.add("is-dragging");
    
      const droppables = document.querySelectorAll(".column-cards");
    
      droppables.forEach((elem) => {
        elem.addEventListener("dragover", (e) => {
          const bottomCard = positionElement(elem, e.clientY);
          const currentCard = document.querySelector(".is-dragging");
    
          if (!bottomCard) {
            elem.appendChild(currentCard);
          } else {
            elem.insertBefore(currentCard, bottomCard);
          }
    
          inLocalStorage();
          e.preventDefault();
        });
      });
    });
    
    columnsContainer.addEventListener("dragend", () => {

      actualElement.classList.remove("is-dragging");

    });
};
