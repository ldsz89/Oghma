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
          "<div class='card text-center' >" +
          "<div class='card-content' onclick='requestClassDetail(&quot " + result.url + " &quot)' style='background-color: firebrick; color: white;'>" +
            result.name +
          "</div>" +
        "</div>" +
      "</div>");
    });
  });
}

function requestClassDetail(url, name) {
  requestResource(url, function(results) {
    var data = JSON.parse(results);
    $("#className").html("Class: "+ data.name );
    $("#hit_die").html("Hit Die: " + data.hit_die);
    $("#limit").html("(Limit " + data.proficiency_choices[0].choose  + ")");

    data.proficiencies.forEach(function(prof) {
      $("#proficiencies").append("<li ng-model='classInfo.proficiency' value=" + prof.name + ">" + prof.name + "</li>");
    });

    data.proficiency_choices[0].from.forEach(function(prof) {
      $("#skill_prof_choices").append(
        "<input ng-model='classInfo.skill' class='limit-checkbox' type='checkbox' name='skill_prof' value='" + prof.name + "' />" +
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
            "<div style='background-color: firebrick; color: white;' class='card-content' onclick='requestRaceDetail(&quot " + race.url + " &quot)'>" +
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
      "<div style='color: white;' class = col-lg-12 col-md-12>" +
        "<h2>Race: " + data.name + " <small>Speed: " + data.speed + "</small></h2>" +
        "<div id='ability_bonuses'></div>" +
        "<h4>Alignment: " + data.alignment + "</h4>" +
        "<h4>" + data.age + "</h4>" +
        "<h4>" + data.size + " <small>" + data.size_description + "</small></h4>" +
        "<div id='starting_proficiencies'></div>" +
        "<div id='languages' class='col-lg-12'></div>" +
        "<div id='traits' class='col-lg-12'></div>" +
      "</div>"
    );

    var abilities = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
    var count = 0;
    data.ability_bonuses.forEach(function(abl) {
      $("#ability_bonuses").append(
        "<div class='col-lg-2 col-md-2'>" +
          "<div class='card text-center'>" +
            "<div class='card-content'>" +
              abilities[count] +
              "<br>" +
              abl +
            "</div>" +
          "</div>" +
        "</div>"
      );

      count += 1;
    });

    $("#languages").append("<h4>Languages</h4>");

    data.languages.forEach(function(lang) {
      $("#languages").append(
        "<div class='col-lg-2 col-md-2'>" +
          "<div class='card text-center'>" +
            "<div class='card-content'>" +
              lang.name +
            "</div>" +
          "</div>" +
        "</div>"
      );
    });

    $("#languages").append("<br><h5>" + data.language_desc + "</h5>");

    $("#traits").append("<h4>Traits</h4>");

    data.traits.forEach(function(trait) {
      $("#traits").append(
        "<div class='col-lg-2 col-md-2'>" +
          "<div class='card text-center'>" +
            "<div class='card-content'>" +
              trait.name +
            "</div>" +
          "</div>" +
        "</div>"
      );
    });
  });
}
