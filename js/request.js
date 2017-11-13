function requestResource(url) {
  var data = null;

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });

  // xhr.open("GET", "http://www.dnd5eapi.co/api/classes/");
  xhr.open("GET", url);
  xhr.withCredentials = false;

  xhr.send(data);
}
