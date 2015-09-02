import {bindable, inject} from 'aurelia-framework';
import {AlertCentre} from '../common/alert-centre';

let getAlertHtml = function (content) {
  return `<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
  ${content}`;
};

export class AlertCentreCustomAttribute {
  static inject = [Element, AlertCentre];

  constructor(element, alertCentre) {
    this.element = element;
    element.classList.add('alert-centre');
    this.alertCentre = alertCentre;
    this.init = false;
  }

  valueChanged(newValue) {
    if (newValue && !this.init) {
      this.alertCentre.on(newValue, this.showAlert.bind(this));
      this.init = true;
    }
  }

  showAlert(type, content) {
    let inner = getAlertHtml(content);
    let alertDiv = document.createElement('div');
    alertDiv.className = 'alert fade in alert-dismissible alert-' + type;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = inner;
    this.element.appendChild(alertDiv);
  }

}
