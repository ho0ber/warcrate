function nextTime() {
    last_element = document.getElementById("last");
    next_element = document.getElementById("next");
    next = moment(last_element.value);
    var next_text = "";
    var current = false;
    for (var i = 0; i < 10; i++) {
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
  }
