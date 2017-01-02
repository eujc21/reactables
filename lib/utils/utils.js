export function getTop(el) {
  var element = el.getBoundingClientRect();
  var body = document.body;
  var doc = document.documentElement;

  var scrollTop = window.pageYOffset || doc.scrollTop || body.scrollTop;
  var clientTop = doc.clientTop || body.clientTop || 0;

  return element.top + scrollTop - clientTop;
}