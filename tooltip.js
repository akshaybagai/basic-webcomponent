class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._toolTipContainer;
    this._toolTipText = 'Dummy';

    //required to attach a shadow dome tree
    this.attachShadow({mode: "open"});

    //the styles are scoped to shadow dom
    this.shadowRoot.innerHTML = `
        <style>
            div {
                background-color: black;
                color: white;
            }
        </style>
        <slot>Slot Default</slot>
        <span>(?)</span>`
    ;
  }

  connectedCallback() {
    if (this.hasAttribute('text')) {
      this._toolTipText = this.getAttribute('text');
    }
    // const tooltipIcon = document.createElement('span');
    const tooltipIcon = this.shadowRoot.querySelector('span');
    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
    this.shadowRoot.appendChild(tooltipIcon);
  }

  //_ indicates that you should not call this method from outside
  _showTooltip(){
    this._toolTipContainer = document.createElement('div');
    this._toolTipContainer.textContent = this._toolTipText;
    this.shadowRoot.appendChild(this._toolTipContainer);
  }

  _hideTooltip(){
    this.shadowRoot.removeChild(this._toolTipContainer);
  }
}

customElements.define('uc-tooltip', Tooltip);
