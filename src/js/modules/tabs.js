const tabs = (headerSelector, tabsSelector, contentSelector, activeClass) => {
  const tabs = document.querySelectorAll(tabsSelector),
    header = document.querySelector(headerSelector),
    content = document.querySelectorAll(contentSelector);

  function hideTabContent() {
    content.forEach(item => {
      item.style.display = "none";
    });

    tabs.forEach(item => {
      item.classList.remove(activeClass);
    });
  }

  function showTabContrnt(tab = 0) {
    content[tab].style.display = "block";
    tabs[tab].classList.add(activeClass);
  }

  hideTabContent();
  showTabContrnt();

  header.addEventListener("click", e => {
    const target = e.target;
    if (
      target.classList.contains(tabsSelector.replace(/\./, "")) ||
      target.parentNode.classList.contains(tabsSelector.replace(/\./, ""))
    ) {
      tabs.forEach((item, i) => {
        if (target == item || target.parentNode == item) {
          hideTabContent();
          showTabContrnt(i);
        }
      });
    }
  });
};

export default tabs;
