ctrl.prev = function(pn) {
  pn = (pn <= 1 ? 1 : pn -= 1 );
  ctrl.callHandler('reqReloadPaper', pn );
};
ctrl.next = function(pn) {
  ctrl.callHandler('reqReloadPaper', pn + 1);
};
