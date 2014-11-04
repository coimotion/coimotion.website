ctrl.prev = function(pn) {
  pn = (pn <= 1 ? 1 : pn -= 1 );
  ctrl.callHandler('reqReloadBkCnt', pn );
};
ctrl.next = function(pn) {
  ctrl.callHandler('reqReloadBkCnt', pn + 1);
};
