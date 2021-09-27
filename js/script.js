// Плавный переход к блокам
const anchors = document.querySelectorAll('a[href^="#"]')

// Цикл по всем ссылкам
for(let anchor of anchors) {
  anchor.addEventListener("click", function(e) {
    e.preventDefault() // Предотвратить стандартное поведение ссылок
    // Атрибут href у ссылки, если его нет то перейти к body (наверх не плавно)
    const goto = anchor.hasAttribute('href') ? anchor.getAttribute('href') : 'body'
    // Плавная прокрутка до элемента с id = href у ссылки
    if (iconMenu.classList.contains('_active')){
      document.body.classList.remove('_lock');
      iconMenu.classList.remove('_active');
      menuBody.classList.remove('_active')

    }
    document.querySelector(goto).scrollIntoView({
      behavior: "smooth",
      block: "start"
    })

  })
}



// прилипающее меню
function getBodyScrollTop() {
  var offset = self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
  if (offset > 300) {
    document.querySelector('#header').className = "header";
  }
  if (offset > screen.height - 300) {
    document.querySelector('#header').className = "fixed";
  }
}
window.addEventListener("scroll", getBodyScrollTop);



// Табы

var $tabs = function (target) {
var
  _elemTabs = (typeof target === 'string' ? document.querySelector(target) : target),
  _eventTabsShow,
  _showTab = function (tabsLinkTarget) {
    var tabsPaneTarget, tabsLinkActive, tabsPaneShow;
    tabsPaneTarget = document.querySelector(tabsLinkTarget.getAttribute('href'));
    tabsLinkActive = tabsLinkTarget.parentElement.querySelector('.menu-btn--active');
    tabsPaneShow = tabsPaneTarget.parentElement.querySelector('.menu-content--active');
    // если следующая вкладка равна активной, то завершаем работу
    if (tabsLinkTarget === tabsLinkActive) {
      return;
    }
    // удаляем классы у текущих активных элементов
    if (tabsLinkActive !== null) {
      tabsLinkActive.classList.remove('menu-btn--active');
    }
    if (tabsPaneShow !== null) {
      tabsPaneShow.classList.remove('menu-content--active');
    }
    // добавляем классы к элементам (в завимости от выбранной вкладки)
    tabsLinkTarget.classList.add('menu-btn--active');
    tabsPaneTarget.classList.add('menu-content--active');
    document.dispatchEvent(_eventTabsShow);
  },
  _switchTabTo = function (tabsLinkIndex) {
    var tabsLinks = _elemTabs.querySelectorAll('.menu-btn');
    if (tabsLinks.length > 0) {
      if (tabsLinkIndex > tabsLinks.length) {
        tabsLinkIndex = tabsLinks.length;
      } else if (tabsLinkIndex < 1) {
        tabsLinkIndex = 1;
      }
      _showTab(tabsLinks[tabsLinkIndex - 1]);
    }
  };

_eventTabsShow = new CustomEvent('menu-content', { detail: _elemTabs });

_elemTabs.addEventListener('click', function (e) {
  var tabsLinkTarget = e.target;
  // завершаем выполнение функции, если кликнули не по ссылке
  if (!tabsLinkTarget.classList.contains('menu-btn')) {
    return;
  }
  // отменяем стандартное действие
  e.preventDefault();
  _showTab(tabsLinkTarget);
});

return {
  showTab: function (target) {
    _showTab(target);
  },
  switchTabTo: function (index) {
    _switchTabTo(index);
  }
}

};

$tabs('.tabs');
document.querySelector('.menu-btn').click();



// Анимация при скроле
const animItems = document.querySelectorAll('.anim-items');

if (animItems.length > 0) {
  window.addEventListener('scroll', animOnScroll);
  function animOnScroll() {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (animItemHeight > window.innerHeight){
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
        animItem.classList.add('active');
      } else {
        // if (!animItem.classList.contains('class')){};
        animItem.classList.remove('active');
      }
    }
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft}
  }
  setTimeout(() => {
    animOnScroll();
  }, 300)
}


// меню бургер

const iconMenu = document.querySelector('.header-burger');
const menuBody = document.querySelector('.nav');
if (iconMenu){
 
  iconMenu.addEventListener("click", function(e){
    document.body.classList.toggle('_lock');
    iconMenu.classList.toggle('_active');
    menuBody.classList.toggle('_active')
  });
}









