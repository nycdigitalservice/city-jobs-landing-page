class NYCForm extends HTMLElement {
  connectedCallback() {
    if (this.isConnected) {
      this.formEl = this.querySelector('form');
      this.submitBtn = this.querySelector('button[type=submit]');
      this.requiredFields = Array.from(this.querySelectorAll('[required]'));
      // Store the forms action in case it needs to be reset
      this.defaultFormAction = this.formEl.action;


      // If form has required fields, add validation
      if (this.requiredFields.length > 0) {
        this.initFormValidation();
      }

      // If form has a data-action-setter attribute,
      // fetch the referred element and let it control the forms action
      if (this.formEl.dataset.actionSetter) {
        this.actionSetterEl = this.querySelector(`#${this.formEl.dataset.actionSetter}`)
        this.fieldValueToAction(this.actionSetterEl);
      }
    }
  }

  /**
   * Disable form submit button and enable when all required fields are valid
   * @returns {undefined}
   */
  initFormValidation() {
    this.submitBtn.setAttribute('disabled', '');

    // When any required field changes, get all valid fields.
    // When number of valid fields equals number of required fields,
    // enable submit button
    this.requiredFields.forEach(
      field => field.addEventListener('change', () => {
        const validFields = this.getValidFields(this.requiredFields);
        if (validFields.length === this.requiredFields.length) {
          this.submitBtn.removeAttribute('disabled');
        }
      })
    )
  }

  /*
   * @param {Array} An array of form fields
   * @returns {Array} An array of valid form fields
   */
  getValidFields(fields) {
    return fields.filter(field => this.checkFieldValidity(field));
  }

  /**
   * @param {HTMLElement} A form field element
   * @returns {boolean} True if the field is valid
   */
  checkFieldValidity(field) {
    return field.checkValidity();
  }

  /**
   * @param {HTMLElement} An element
   * @returns {boolean} True if the element is a select
   */
  isSelectEl(el) {
    return el.tagName.toLowerCase() === 'select';
  }

  /**
   * @param {string} A string of URL parameters
   * @returns {string} An HTML string of hidden input fields
   */
  urlParamStrToHiddenFields(params) {
    return params
      .split('&')
      .map(p => p.split('='))
      .map(([key, val]) =>
        `<input type="hidden" class="tmp-field" name="${key}" value="${val}" />`)
      .join('');
  }

  /**
   * Allow a field to set the action URL of the form
   * Curently only supports select fields
   * @param {HTMLElement} A form field element
   * @returns {undefined}
  */
  fieldValueToAction(fieldEl) {
    if (!fieldEl) throw new Error('NYCForm: No actionSetter element provided');
    // Save the fields name, since we are removing it to accomodate the new action URL
    this.actionSetterName = fieldEl.name;

    // When field changes, update form action URL
    fieldEl.onchange = evt => {
      // Reset the name attribute to default
      fieldEl.setAttribute('name', this.actionSetterName);
      this.formEl.setAttribute('action', this.defaultFormAction);

      // Remove any previously added hidden tmp fields
      this.formEl.querySelectorAll('.tmp-field').forEach(el => el.remove());

      // If field is a select, get the url from the selected option
      let { actionUrl } = this.isSelectEl(evt.target) ? evt.target.selectedOptions[0].dataset : evt.target.dataset;

      // If theres no provided URL use default form functionality
      if (!actionUrl) return;

      // Setting action URL including parameters doesnt work,
      // they need to be added as hidden fields
      if (actionUrl.includes('?')) {
        let [actionUrl, params] = url.split('?');
        const tmpHiddenFields = this.urlParamStrToHiddenFields(params);
        this.formEl.insertAdjacentHTML('beforeend', tmpHiddenFields);
      }

      // Remove the fields name so it isn't appended to the action URL
      fieldEl.removeAttribute('name');

      // Set the new action URL
      this.formEl.action = actionUrl;
    };
  }
}

if ('customElements' in window) {
  customElements.define("nyc-form", NYCForm);
}
