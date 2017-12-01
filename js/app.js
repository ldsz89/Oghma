angular.module('creatorApp', [])
  /**
   * The Characters factory handles saving and loading projects
   * from local storage, and also lets us save and load the
   * last active project index.
   */
  .factory('Characters', function() {
    return {
      all: function() {
        var characterString = window.localStorage['characters'];
        if (characterString) {
          return angular.fromJson(characterString);
        }
        return [];
      },
      save: function(characters) {
        window.localStorage['characters'] = angular.toJson(characters);
      },
      newCharacter: function(characterName) {
        // Add a new character
        return {
          name: characterName,
          basic: {},
          race: {},
          class: {},
          abilities: {},
          remove: false
        };
      },
      getLastActiveIndex: function() {
        return parseInt(window.localStorage['lastActiveCharacter']) || 0;
      },
      setLastActiveIndex: function(index) {
        window.localStorage['lastActiveCharacter'] = index;
      }
    }
  })

  .controller('CharacterCtrl', function($scope, $timeout, Characters) {

    var ChCtrl = this;
    // Classes to be loaded by API call
    ChCtrl.classList = [
      {className: "Barbarian", classURL: "http://www.dnd5eapi.co/api/classes/1"},
      {className: "Bard", classURL: "http://www.dnd5eapi.co/api/classes/2"},
      {className: "Cleric", classURL: "http://www.dnd5eapi.co/api/classes/3"},
      {className: "Druid", classURL: "http://www.dnd5eapi.co/api/classes/4"},
      {className: "Fighter", classURL: "http://www.dnd5eapi.co/api/classes/5"},
      {className: "Monk", classURL: "http://www.dnd5eapi.co/api/classes/6"},
      {className: "Paladin", classURL: "http://www.dnd5eapi.co/api/classes/7"},
      {className: "Ranger", classURL: "http://www.dnd5eapi.co/api/classes/8"},
      {className: "Rogue", classURL: "http://www.dnd5eapi.co/api/classes/9"},
      {className: "Sorcerer", classURL: "http://www.dnd5eapi.co/api/classes/10"},
      {className: "Warlock", classURL: "http://www.dnd5eapi.co/api/classes/11"},
      {className: "Wizard", classURL: "http://www.dnd5eapi.co/api/classes/12"}
    ];

    ChCtrl.activeClass = {name: "none"};

    ChCtrl.raceList = [
      {raceName: "Dwarf", raceURL: "http://www.dnd5eapi.co/api/races/1"},
      {raceName: "Elf", raceURL: "http://www.dnd5eapi.co/api/races/2"},
      {raceName: "Halfling", raceURL: "http://www.dnd5eapi.co/api/races/3"},
      {raceName: "Human", raceURL: "http://www.dnd5eapi.co/api/races/4"}
    ];

    ChCtrl.activeRace = {name: "none"};

    ChCtrl.skills = [
      "acrobatics",
      "animal_handling",
      "arcana",
      "athletics",
      "deception",
      "history",
      "insight",
      "intimidation",
      "investigation",
      "medicine",
      "nature",
      "perception",
      "performance",
      "persuasion",
      "religion",
      "sleight_of_hand",
      "stealth",
      "survival",
      "armor_class",
      "speed",
      "hp",
      "personality",
      "ideals",
      "bonds",
      "flaws",
      "feat",
      "language",
      "equipment",
      "spell"
    ];

    ChCtrl.alignments = [
      "Lawful good",
      "Lawful neutral",
      "Lawful evil",
      "Neutral good",
      "(True) neutral",
      "Neutral evil",
      "Chaotic good",
      "Chaotic neutral",
      "Chaotic evil"
    ];

    $scope.hideform1 = true;
    $scope.hideform2 = true;
    $scope.hideform3 = true;
    // A utility function for creating a new character
    // with the given characterName
    var createCharacter = function(characterName) {
      var newCharacter = Characters.newCharacter(characterName);
      $scope.characters.push(newCharacter);
      Characters.save($scope.characters);
      $scope.selectCharacter(newCharacter, $scope.characters.length - 1);
    };

    $scope.openCharacter = function(character, index){
      console.log(index);
      $scope.selectCharacter(character, index);
      document.location.href = "create.html";
    };

    $scope.openCharacterDetail = function(character, index) {
      $scope.selectCharacter(character, index);
      document.location.href = "character_detail.html";
    };

    $scope.delete = function(index){
      $scope.characters[index].remove = true;
      var characters = $scope.characters;
      $scope.characters = [];

      angular.forEach(characters, function(update) {
               if (!update.remove)
                   $scope.characters.push(update);
                   Characters.save($scope.characters);
           });
    };

    // Load or initialize characters
    $scope.characters = Characters.all();

    // Grab the last active, or the first character
    $scope.activeCharacter = $scope.characters[Characters.getLastActiveIndex()];

    $scope.remaining = function() {
      var count = 0;

      angular.forEach($scope.activeCharacter, function(listAttr) {
        count += listAttr.done ? 0 : 1;
      });

      return count;
    }
    // Called to create a new character
    $scope.newCharacter = function() {
      var characterName = document.getElementById("newCharacter").value;
      if (characterName) {
        createCharacter(characterName);
      }
      document.getElementById("newCharacter").value = "";
      document.location.href = "create.html";
    };

    // Called to select the given character
    $scope.selectCharacter = function(character, index) {
      $scope.activeCharacter = character;
      Characters.setLastActiveIndex(index);
    };

    $scope.requestResource = function(url) {
      console.log("URL: " + url);
      var data = null;

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
          // console.log(this.responseText);
          onComplete(this.responseText);
        }
      });

      xhr.open("GET", url);
      xhr.withCredentials = false;

      xhr.send(data);
    };

    $scope.addBasicInfo = function(info) {
      if (!$scope.activeCharacter || !info) {
        return;
      }

      $("#green_check").css("display", "inline");

      $scope.activeCharacter.basic = info;

      Characters.save($scope.characters);
      setTimeout(function(){
        $("#green_check").css("display:none");
        $("#green_check").fadeOut(1000);
      },1000);
    };

    $scope.addAttributes = function(attributes) {
      if (!$scope.activeCharacter || !attributes) {
        return;
      }

      $("#attr_green_check").css("display", "inline");
      
      setTimeout(function(){
        $("#attr_green_check").css("display:none");
        $("#attr_green_check").fadeOut(1000);
      },1000);
      
      $scope.activeCharacter.basic.attributes = {
        strength: attributes.strength + $scope.activeCharacter.race.ability_bonuses[0],
        dexterity: attributes.dexterity + $scope.activeCharacter.race.ability_bonuses[1],
        constitution: attributes.constitution + $scope.activeCharacter.race.ability_bonuses[2],
        intelligence: attributes.intelligence + $scope.activeCharacter.race.ability_bonuses[3],
        wisdom: attributes.wisdom + $scope.activeCharacter.race.ability_bonuses[4],
        charisma: attributes.charisma + $scope.activeCharacter.race.ability_bonuses[5],
      };
      console.log($scope.activeCharacter.basic.attributes);

      Characters.save($scope.characters);
    };

    $scope.random = function(limit) {
      return Math.floor(Math.random() * limit);
    }

    $scope.randomizeAttr = function() {
      $scope.activeCharacter.basic.attributes.strength = ($scope.random(5) + 1) + ($scope.random(5) + 1) + ($scope.random(5) + 1);
      $scope.activeCharacter.basic.attributes.dexterity = ($scope.random(5) + 1) + ($scope.random(5) + 1) + ($scope.random(5) + 1);
      $scope.activeCharacter.basic.attributes.constitution = ($scope.random(5) + 1) + ($scope.random(5) + 1) + ($scope.random(5) + 1);
      $scope.activeCharacter.basic.attributes.intelligence = ($scope.random(5) + 1) + ($scope.random(5) + 1) + ($scope.random(5) + 1);
      $scope.activeCharacter.basic.attributes.wisdom = ($scope.random(5) + 1) + ($scope.random(5) + 1) + ($scope.random(5) + 1);
      $scope.activeCharacter.basic.attributes.charisma = ($scope.random(5) + 1) + ($scope.random(5) + 1) + ($scope.random(5) + 1);
      Characters.save($scope.characters);
      console.log($scope.activeCharacter);
    }

    $scope.getClassInfo = function(url) {
      $scope.hideform1 = false;
      requestResource(url, function(results) {
        ChCtrl.activeClass = angular.fromJson(results);
        var jsonResults = angular.fromJson(results);
        var i = 0;
          angular.forEach(jsonResults.proficiency_choices[0].from, function(){
            var skill = jsonResults.proficiency_choices[0].from[i].name;
            var choice = skill.substring(7);
            jsonResults.proficiency_choices[0].from[i].name = choice;
            i++;
          });
        ChCtrl.activeClass = jsonResults;
          $scope.$apply();
      });
    };

// Add class attribute
    $scope.addClass = function(attrClass) {
      console.log("Adding class info");
      // console.log(attrClass);
      if (!$scope.activeCharacter) {
        return;
      }

       $scope.activeCharacter.class = {
         class: ChCtrl.activeClass.name,
         proficiencies: ChCtrl.activeClass.proficiencies,
         hit_die: ChCtrl.activeClass.hit_die
       }

      // Inefficient, but save all the projects
      console.log("Class info added");
      Characters.save($scope.characters);
    };

    $scope.getRaceInfo = function(url) {
        $scope.hideform2 = false;
      console.log("Getting race information");
      requestResource(url, function(results) {
        ChCtrl.activeRace = angular.fromJson(results);
        $scope.$apply();
      });
    }

    $scope.addRace = function(race) {
      if (!$scope.activeCharacter) {
        return;
      }

      $scope.activeCharacter.race = {
         race: ChCtrl.activeRace.name,
         languages: ChCtrl.activeRace.languages,
         ability_bonuses: ChCtrl.activeRace.ability_bonuses,
         traits: ChCtrl.activeRace.traits
       }

      Characters.save($scope.characters);
    };

    $scope.addPersonality = function(personality) {
      if (!$scope.activeCharacter || !personality) {
        return;
      }

       $("#personality_green_check").css("display", "inline");

      $scope.activeCharacter.personality = personality;

      setTimeout(function(){
        $("#personality_green_check").css("display:none");
        $("#personality_green_check").fadeOut(1000);
      },1000);
      Characters.save($scope.characters);
    };
  })
