// Efeito de scroll suave

const linksDoMenu = document.querySelectorAll('.nav-menu__navegacao a[href^="#"]');

linksDoMenu.forEach(link => link.addEventListener('click', handleClickScroll))

function handleClickScroll (element) {
	element.preventDefault();
	const sectionOffsetTop = getScrollTopByHref(element.target);
	smoothScrollTo(0, sectionOffsetTop, 500);
} 

function getScrollTopByHref (element) {
	const elementId = element.getAttribute('href');
	return document.querySelector(elementId).offsetTop;
}

function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== 'undefined' ? duration : 400;

  // Easing function
  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60); // 60 fps
};