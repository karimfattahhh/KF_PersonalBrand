(() => {
 const archive = document.querySelector('.floating-archive');
 if (!archive || !('IntersectionObserver' in window)) return;
 new IntersectionObserver(entries => {
  archive.classList.toggle('is-visible', entries[0].isIntersecting);
 }, {threshold: .05}).observe(archive);
})();
