let internalAlert = function (type, content, queue) {
  if (!(queue in this.handlers)) {
    return;
  }
  for (let handler of this.handlers[queue]) {
    handler.call(null, type, content);
  }
};

export class AlertCentre {
  handlers = {};

  success(content, queue = '_default') {
    return internalAlert.call(this, 'success', content, queue);
  }

  info(content, queue = '_default') {
    return internalAlert.call(this, 'info', content, queue);
  }

  warning(content, queue = '_default') {
    return internalAlert.call(this, 'warning', content, queue);
  }

  danger(content, queue = '_default') {
    return internalAlert.call(this, 'danger', content, queue);
  }

  on(queue, handler) {
    if (!(queue in this.handlers)) {
      this.handlers[queue] = [];
    }
    this.handlers[queue].push(handler);
  }

}