/**
 * 
 * @param {HTMLElement} elem 
 * @param {string} cls 
 * @param {number} duration 
 */
const animate = function (elem, open, duration = 2, fps = 60) {
  elem.style.overflow = "hidden";
  const { ptop, pbottom, bbottom, btop } = getElemData(elem);
  const frameTime = 1000 / fps;
  let step = 1 / (duration * fps);
  let height = elem.offsetHeight;
  let timeOutFunc = false;
  let p = 1;

  if (!open) {
    p = 0;
    step = -step;
    elem.classList.add("closedElement");
  }
  return () => {
    if (timeOutFunc) {
      clearInterval(timeOutFunc);
    }
    else {
      if (elem.classList.contains("closedElement")) {
        elem.classList.remove("closedElement");
        elem.style.height = "auto";
        height = elem.offsetHeight;
        elem.style.height = 0 + "px";
      }
      else {
        height = elem.offsetHeight;
      }
    }

    step = -step;

    const animation = () => {
      p += step;
      elem.style.height = height * p + "px";
      elem.style.borderBottomWidth = bbottom * p + "px";
      elem.style.borderTopWidth = btop * p + "px";
      elem.style.paddingTop = ptop * p + "px";
      elem.style.paddingBottom = pbottom * p + "px";
      elem.style.opacity = p;

      if (1 < p || p < 0) {
        clearInterval(timeOutFunc);
        timeOutFunc = false;
        p = Math.round(p);
        if (p >= 1) {
          elem.style.height = "auto";
        }
        else {
          elem.classList.add("closedElement");
        }
      }
    };
    timeOutFunc = setInterval(animation, frameTime);
  };
};

/**
 * 
 * @param {HTMLElement} elem 
 */
const getElemData = (elem) => {
  const data = window.getComputedStyle(elem, null);
  const pbottom = parseInt(data.getPropertyValue('padding-bottom'));
  const ptop = parseInt(data.getPropertyValue('padding-top'));
  const bbottom = parseInt(data.getPropertyValue('border-bottom-width'));
  const btop = parseInt(data.getPropertyValue('border-top-width'));
  return { pbottom, ptop, bbottom, btop };
}

export default animate;