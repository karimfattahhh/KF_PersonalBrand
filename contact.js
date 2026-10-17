const form = document.querySelector('#message-form');
const note = document.querySelector('#message-body');
const status = document.querySelector('#form-status');
note.addEventListener('input', () => {document.querySelector('#message-count').textContent = `${note.value.length.toLocaleString()} / 3,000`;});
function draft() {
 const data = new FormData(form);
 return {subject: `${data.get('topic')} — ${String(data.get('name')).trim()}`,
 body: `${String(data.get('message')).trim()}\n\nFrom: ${String(data.get('name')).trim()}\nReply to: ${String(data.get('email')).trim()}`};
}
form.addEventListener('submit', event => {
 event.preventDefault();
 if (!form.reportValidity()) return;
 const {subject,body} = draft();
 status.textContent = 'Your draft is ready. Please send it in your email app. If nothing opened, copy your note and email it to karimfattah14@gmail.com.';
 location.href = `mailto:karimfattah14@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
document.querySelector('#copy-note').addEventListener('click', async () => {
 if (!form.reportValidity()) return;
 const {subject,body} = draft();
 try {await navigator.clipboard.writeText(`To: karimfattah14@gmail.com\nSubject: ${subject}\n\n${body}`);status.textContent = 'Note copied. Paste it into an email to karimfattah14@gmail.com.';}
 catch {status.textContent = 'Copy is unavailable in this browser. You can select your message above and email it to karimfattah14@gmail.com.';}
});

const contactHeader = document.querySelector('.header');
function contactHeaderState(){contactHeader.classList.toggle('is-scrolled',scrollY > 24);}
window.addEventListener('scroll',contactHeaderState,{passive:true});
contactHeaderState();
