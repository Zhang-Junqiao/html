// ===== 1. 移动端汉堡菜单 =====
const navElement = document.querySelector('nav');
if (navElement) {
  const toggle = document.createElement('button');
  toggle.className = 'nav-toggle';
  toggle.setAttribute('aria-label', '切换导航');
  toggle.innerHTML = '☰';
  nav.parentNode.insertBefore(toggle, nav);

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.innerHTML = nav.classList.contains('open') ? '✕' : '☰';
  });
}

// ===== 2. 美食筛选（替代纯 CSS 筛选） =====
const filterButtons = document.querySelectorAll('.filter-btn-js');
if (filterButtons.length) {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // 更新按钮状态
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.category;
      const items = document.querySelectorAll('.food-item');

      items.forEach(item => {
        const match = category === 'all' || item.dataset.category === category;
        if (match) {
          item.style.display = 'block';
          // 触发重绘后添加动画类
          requestAnimationFrame(() => item.classList.add('show'));
        } else {
          item.classList.remove('show');
          item.style.display = 'none';
        }
      });
    });
  });
}

// ===== 3. 滚动时卡片渐入 =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.spot-card, .entry-card, .food-item').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ===== 4. 返回顶部按钮 =====
const backToTop = document.createElement('button');
backToTop.className = 'back-to-top';
backToTop.setAttribute('aria-label', '返回顶部');
backToTop.innerHTML = '↑';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== 5. Dynamic greeting on homepage =====
const greetingEl = document.getElementById('greeting');
if (greetingEl) {
  const hour = new Date().getHours();
  let greeting = '';
  if (hour < 6) greeting = 'Late night. Get some rest.';
  else if (hour < 12) greeting = 'Good morning! Where to today?';
  else if (hour < 18) greeting = 'Good afternoon. Time for tea?';
  else greeting = 'Good evening. Wuma Street night market is open.';

  greetingEl.textContent = greeting;
}