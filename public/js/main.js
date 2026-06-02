document.querySelectorAll('.flash').forEach(el => {
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.5s';
    setTimeout(() => el.remove(), 500);
  }, 3500);
});

document.querySelectorAll('.case-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.case-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    document.querySelector('input[name="case_type"]').value = btn.dataset.value;
  });
});

document.querySelectorAll('form[data-confirm]').forEach(form => {
  form.addEventListener('submit', e => {
    if (!confirm(form.dataset.confirm)) e.preventDefault();
  });
});
