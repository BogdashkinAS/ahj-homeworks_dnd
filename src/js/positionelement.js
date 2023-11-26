//!функция для определения позиции перетаскивания карточки

export default function positionElement(elem, mouseY) {
    const notActualElements = elem.querySelectorAll(".card:not(.is-dragging)");
    //console.log(notActualElements);
  
    let closestCard = null;
    let closestOffset = Number.NEGATIVE_INFINITY;
  
    notActualElements.forEach((e) => {
      const { top } = e.getBoundingClientRect();
  
      const offset = mouseY - top;
  
      if (offset < 0 && offset > closestOffset) {
        closestOffset = offset;
        closestCard = e;
      }
    });
  
    return closestCard;
  }