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
    elem.style.height = 0 + "px";
  }
  return () => {
    if (timeOutFunc) {
      clearInterval(timeOutFunc);
    }
    else {
      if (elem.classList.contains("closedElement")) {
        elem.classList.remove("closedElement");
      }
      else {
        height = elem.offsetHeight;
      }
    }

    step = -step;
    const style = elem.style;
    const animation = () => {
      p += step;
      p = p > 1 ? 1 : p < 0 ? 0 : p;
      style.height = height * p + "px";
      style.borderBottomWidth = bbottom * p + "px";
      style.borderTopWidth = btop * p + "px";
      style.paddingTop = ptop * p + "px";
      style.paddingBottom = pbottom * p + "px";
      // style.opacity = p;

      if (p === 0 || p === 1) {
        clearInterval(timeOutFunc);
        timeOutFunc = false;
        if (p >= 1) {
          elem.style.height = "auto";
          //height = elem.offsetHeight;
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
  const pbottom = parseInt(data.getPropertyValue('padding-bottom'), 0);
  const ptop = parseInt(data.getPropertyValue('padding-top'), 0);
  const bbottom = parseInt(data.getPropertyValue('border-bottom-width'), 0);
  const btop = parseInt(data.getPropertyValue('border-top-width'), 0);
  return { pbottom, ptop, bbottom, btop };
};

export default animate;