import {setupNavbar, setActiveNav } from './navbar.js';

document.addEventListener("DOMContentLoaded", () => {
   console.log("index.js fired...");
   setupNavbar();
 
   renderContent(currentRoute(), setActiveNav);
 
   document.addEventListener('click', clickEvent => {
     const hashLink = clickEvent.target.closest('a[href^="#"]');
     if (!hashLink) return;
     requestAnimationFrame(() => renderContent(currentRoute(), setActiveNav));
   });
 
   window.addEventListener('hashchange', () =>
     renderContent(currentRoute(), setActiveNav)
   );
 });

function currentRoute() {
  return (location.hash || '#home').slice(1);
}

