const urlParams = new URLSearchParams(window.location.search);
const page = urlParams.get('page');
const bordereau = urlParams.get('bordereau');
const date = urlParams.get('date');

if (page === '1') {
  // affichage de la page 1
  document.getElementById('page1').classList.remove('hide');
  // action de confirmation
  const form = document.querySelector('#form1');
  const selectBordereau = document.querySelector('select[name=bordereau]');
  const imgQRCode = document.getElementById('qr-code');
  const updateQRCode = () => {
    QRCode.toDataURL("./index.html?page=2&bordereau=" + selectBordereau.value, (err, url) => {
      imgQRCode.setAttribute('src', url);
    });
  }
  updateQRCode();
  selectBordereau.addEventListener('change', event => updateQRCode());
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (event.submitter.id === 'confirmDateButton') {
      window.location.href = "./index.html?page=2&bordereau=" + selectBordereau.value;  
    } else if (event.submitter.id === 'pdfButton') {
      window.location.href = "https://www.google.com";
    }
  });
} else if (page === '2') {
  // affichage de la page 2
  document.getElementById('page2').classList.remove('hide');
  // remplissage de la date du jour
  const inputDate = document.querySelector('input[name=date]');
  inputDate.value = new Date().toISOString().slice(0, 10);
  // action de confirmation
  const form = document.querySelector('#form2');
  form.addEventListener('submit', event => {
    event.preventDefault();
    window.location.href = "./index.html?page=3&bordereau=" + bordereau + "&date=" + inputDate.value;
  });
} else if (page === '3') {
  // affichage de la page 3
  document.getElementById('page3').classList.remove('hide');
  // remplissage du numéro de bordereau
  const spanBordereau = document.getElementById('bordereau');
  spanBordereau.innerHTML = bordereau;
  // remplissage de la date de réception
  const spanDate = document.getElementById('date');
  spanDate.innerHTML = date;
} else {
  document.getElementById('pageError').classList.remove('hide');
}