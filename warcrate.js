function loadCookie() {
  last_element = document.getElementById("last");
  var cook = readCookie("last");
  console.log("Loaded cookie: "+ cook)
  last_element.value = cook;
}

function nextTime(updated) {
  last_element = document.getElementById("last");
  next_element = document.getElementById("next");
  next = moment(last_element.value);
  if (!next.isValid())
    return;
  setCookie("last",last_element.value,30)
  var next_text = "";
  var current = false;
  for (var i = 0; i < 32; i++) {
    next = next.add(45, 'minutes');
    if (next > moment() && !current ) {
      current = true
      next_text += "➤ "
    } else {
      next_text += "  "
    }
    next_text += next.format("hh:mm A") + " (" + next.fromNow() + ')\n';
  }
  next_element.innerHTML = next_text
  // console.log(typeof(v))
}

function setNow() {
  var now = new Date();
  var offset = now.getTimezoneOffset() * 60000;
  var adjustedDate = new Date(now.getTime() - offset);
  var formattedDate = adjustedDate.toISOString().substring(0,16); // For minute precision
  var datetimeField = document.getElementById("last");
  datetimeField.value = formattedDate;
  nextTime(true);
}

function setCookie(cookieName,cookieValue,nDays) {
  var today = new Date();
  var expire = new Date();
  if (nDays==null || nDays==0) nDays=1;
  expire.setTime(today.getTime() + 3600000*24*nDays);
  document.cookie = cookieName+"="+escape(cookieValue)
      + ";expires="+expire.toGMTString();
}

function readCookie(cookieName) {
  var theCookie=""+document.cookie;
  var ind=theCookie.indexOf(cookieName+"=");
  if (ind==-1 || cookieName=="") return "";
  var ind1=theCookie.indexOf(";",ind);
  if (ind1==-1) ind1=theCookie.length; 
  return unescape(theCookie.substring(ind+cookieName.length+1,ind1));
}