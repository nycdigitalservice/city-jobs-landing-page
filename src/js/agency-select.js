import agencies from './constants/agencies.ts';

const agencySelectFormEl = document.getElementById('agency-select-form');
const agencySelectEl = document.getElementById('agency-select');

const isValidUrl = urlString =>{
  var inputElement = document.createElement('input');
  inputElement.type = 'url';
  inputElement.value = urlString;

  if (!inputElement.checkValidity()) {
    return false;
  } else {
    return true;
  }
};

export const buildAgencySelect = () => {
  // Agency Select
  const buildOptionEl = ({ value, name }) => {
    const optionAttributes = isValidUrl(value) ? `value="" data-action-url="${value}"` : `value="${value}"`
    return `<option ${optionAttributes}>${name}</option>`
  };

  agencySelectEl.innerHTML = `<option selected disabled value="">Select an option</option>${agencies.map(buildOptionEl).join('')}`;

};

export const selectValueToAction = ({  selectEl, defaultName = '', defaultAction = ''  }) => {
  // When select field changes, update form action URL
  const parentForm = selectEl.closest('form');
  selectEl.onchange = evt => {
    const url = evt.target.value;
    console.log(evt.target.validity);

    // Reset the name attribute to default
    selectEl.setAttribute('name', defaultName);
    parentForm.setAttribute('action', defaultAction);

    // Remove any previously added hidden tmp fields
    parentForm.querySelectorAll('.tmp-field').forEach(el => el.remove());

    // If this isn't a URL, use default form functionality
    if (!url.includes('http')) return;

    // Setting action URL including parameters doesnt work,
    // they need to be added as hidden fields
    if (url.includes('?')) {
      const [_, params] = url.split('?');
      const args = params
            .split('&')
            .map(p => p.split('='))
            .map(([key, val]) =>
              `<input type="hidden" class="tmp-field" name="${key}" value="${val}" />`).join('');

      parentForm.insertAdjacentHTML('beforeend', args);
    }

    selectEl.removeAttribute('name');
    parentForm.action = evt.target.value
  };
}

export const agencySelectHandleChange = () => {
  // When select field changes, update form action URL
  agencySelectEl.onchange = evt => {
    const url = evt.target.value;
    // Remove any previously added hidden tmp fields
    agencySelectFormEl.querySelectorAll('.tmp-field').forEach(el => el.remove());
    // Setting action URL with parameters doesnt work,
    // they need to be added as hidden fields
    if (url.includes('?')) {
      const [_, params] = url.split('?');
      const args = params
            .split('&')
            .map(p => p.split('='))
            .map(([key, val]) =>
              `<input type="hidden" class="tmp-field" name="${key}" value="${val}" />`).join('');

      agencySelectFormEl.insertAdjacentHTML('beforeend', args);
    }
    agencySelectFormEl.action = evt.target.value
  };
}
