// API Request function
function requestResource(url, onComplete) {
  var data = null;

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      // console.log(this.responseText);
      onComplete(this.responseText);
    }
  });

  xhr.open("GET", url);
  xhr.withCredentials = false;

  xhr.send(data);
}

// Classes
function requestClasses() {
  console.log("requestClasses");
  requestResource("http://www.dnd5eapi.co/api/classes/", function(results) {
    var data = JSON.parse(results);
    console.log("Classes returned");
    data.results.forEach(function(result) {
      $("#classModalContentInterior").append(
        "<div class='col-lg-2 col-md-2 col-sm-2'>" +
          "<div class='card text-center'>" +
          "<div class='card-content' onclick='requestClassDetail(&quot " + result.url + " &quot)' style='background-color: firebrick; color: white;'>" +
            result.name +
          "</div>" +
        "</div>" +
      "</div>");
    });
  });
}

function requestClassDetail(url) {
  console.log("Class clicked");
  console.log("URL: " + url);
  requestResource(url, function(results) {
    var data = JSON.parse(results);
    $("#classModalContentInfo").html(
      "<legend style='color: white;'> Class: " + data.name + "</legend>" +
      "<p style='color: white;'>Hit Die: " + data.hit_die + "</p>" +
      "<div class='col-lg-6 col-md-6 col-sm-6'>" +
        "<h3 style='color: white;'>Proficiencies</h3>" +
        "<div style='color: white;'>" +
          "<ul style='color: white;' id='proficiencies'></ul>" +
        "</div>" +
      "</div>" +
      "<div style='color: white;' class='col-lg-6 col-md-6 col-sm-6'>" +
        "<h3 style='color: white;'>Skill Proficiency Choices</h3>" +
        "<h5 style='color: white;'>(Limit " + data.proficiency_choices[0].choose + ")</h5>" +
        "<div style='color: white;' id='skill_prof_choices'></div>" +
      "</div>"
    );

    data.proficiencies.forEach(function(prof) {
      $("#proficiencies").append("<li>" + prof.name + "</li>");
    });

    data.proficiency_choices[0].from.forEach(function(prof) {
      $("#skill_prof_choices").append(
        "<input class='limit-checkbox' type='checkbox' name='skill_prof' value='" + prof.name + "' />" +
        "<label>" + prof.name + "</label><br />"
      );
    });
    var limit = data.proficiency_choices[0].choose;
    $("input.limit-checkbox").on('change', function(evt) {
      if ($(this).siblings(':checked').length >= limit) {
        this.checked = false;
      }
    });
  });
}

// Races

function requestRaces() {
  console.log("requestRaces");
  requestResource("http://www.dnd5eapi.co/api/races/", function(results) {
    var data = JSON.parse(results);
    data.results.forEach(function(race) {
      $("#raceModalContentInterior").append(
        "<div class='col-lg-2 col-md-2 col-sm-2'>" +
          "<div class='card text-center'>" +
            "<div class='card-content' onclick='requestRaceDetail(&quot " + race.url + " &quot)'>" +
              race.name +
            "</div>" +
          "</div>" +
        "</div>"
      );
    });
  });
}

function requestRaceDetail(url) {
  requestResource(url, function(results) {
    var data = JSON.parse(results);
    console.log(data);
    $("#raceModalContentInfo").html(
      "<div class = col-lg-12 col-md-12>" +
        "<h2>Race: " + data.name + " <small>Speed: " + data.speed + "</small></h2>" +
        "<div id='ability_bonuses'></div>" +
        "<h4>Alignment: " + data.alignment + "</h4>" +
        "<h4>" + data.age + "</h4>" +
        "<h4>" + data.size + " <small>" + data.size_description + "</small></h4>" +
        "<div id='starting_proficiencies'></div>" +
        "<div id='languages'></div>" +
        "<div id='traits'></div>" +
      "</div>"
    );

    var abilities = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
    data.ability_bonuses.forEach(function(abl) {
      $("#ability_bonuses").append(
        "<div class='col-lg-2 col-md-2'>" +
          "<div class='card text-center'>" +
            "<div class='card-content'>" +
              abl +
            "</div>" +
          "</div>" +
        "</div>"
      );
    });
  })
}
