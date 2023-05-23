class NYCClearInputButton extends HTMLElement {
  connectedCallback() {
    if (this.isConnected) {
      try {
        this.setAttribute('role', 'button');
        this.setAttribute('tabindex', '0');

        const { target } = this.dataset;
        if (!target) throw new Error('NYCClearInputButton: no data-target supplied');

        const input = this.parentNode.querySelector(`#${target}`);
        if (!input) throw new Error(`NYCClearInputButton: supplied input doesn't exist`);

        // Capturing mousedown prevents focus from leaving input
        this.addEventListener('mousedown', evt => evt.preventDefault());

        // Capture enter press for keyboard users
        this.addEventListener('keyup', evt => (evt.keyCode === 13 && (input.value = '')));

        this.addEventListener('click', evt => {
          evt.preventDefault();
          input.value = '';
        });
      } catch (err) {
        console.error(err);
      }
    }
  }
}

if ('customElements' in window) {
  customElements.define("nyc-clear-input-button", NYCClearInputButton);
}
