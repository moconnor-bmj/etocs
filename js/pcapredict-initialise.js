(function (a, c, b, e) {
    a[b] = a[b] || {}; a[b].initial = { accountCode: "BRITI11313", host: "BRITI11313.pcapredict.com" };
    a[b].on = a[b].on || function () { (a[b].onq = a[b].onq || []).push(arguments) }; var d = c.createElement("script");
    d.async = !0; d.src = e; c = c.getElementsByTagName("script")[0]; c.parentNode.insertBefore(d, c)
})(window, document, "pca", "//BRITI11313.pcapredict.com/js/sensor.js");

//disable automatic language
pca.on("options", function (type, id, options) {
      if (type == "capture+") { 
          options.setCountryByIP = false;
      }
  });
