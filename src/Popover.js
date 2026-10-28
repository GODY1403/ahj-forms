export default class Popover {
  constructor(button, title, text) {
    this.button = button;
    this.popover = document.createElement('div');
    this.popover.className = 'popover';
    this.popover.id = 'popover';
    this.popover.setAttribute('role', 'tooltip');

    const header = document.createElement('h3');
    header.className = 'popover-title';
    header.textContent = title;
    const content = document.createElement('p');
    content.className = 'popover-content';
    content.textContent = text;
    this.popover.append(header, content);

    this.button.setAttribute('aria-expanded', 'false');
    this.button.addEventListener('click', () => this.toggle());
  }

  toggle() {
    if (this.popover.isConnected) {
      this.popover.remove();
      this.button.setAttribute('aria-expanded', 'false');
      this.button.removeAttribute('aria-describedby');
      return;
    }

    this.popover.style.left = '0px';
    this.popover.style.top = '0px';
    document.body.append(this.popover);
    const buttonRect = this.button.getBoundingClientRect();
    const popoverRect = this.popover.getBoundingClientRect();
    const left = buttonRect.left + window.scrollX
      + (buttonRect.width - popoverRect.width) / 2;
    const top = buttonRect.top + window.scrollY - popoverRect.height - 8;
    this.popover.style.left = `${left}px`;
    this.popover.style.top = `${top}px`;
    this.button.setAttribute('aria-expanded', 'true');
    this.button.setAttribute('aria-describedby', this.popover.id);
  }
}
