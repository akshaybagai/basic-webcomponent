class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._toolTipContainer;
  }

  connectedCallback() {
    const tooltipIcon = document.createElement('span');
    tooltipIcon.textContent = ' (?)';
    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
    this.appendChild(tooltipIcon);
  }

  //_ indicates that you should not call this method from outside
  _showTooltip(){
    this._toolTipContainer = document.createElement('div');
    this._toolTipContainer.textContent = 'This is a tool tip';
    this.appendChild(this._toolTipContainer);
  }

  _hideTooltip(){
    this.removeChild(this._toolTipContainer);
  }
}

customElements.define('uc-tooltip', Tooltip);
