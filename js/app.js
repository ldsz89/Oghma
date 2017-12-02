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
          inspiration: false,
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
      { "name": "Acrobatics", "url": "http://www.dnd5eapi.co/api/skills/1" },
      { "name": "Animal Handling", "url": "http://www.dnd5eapi.co/api/skills/2" },
      { "name": "Arcana", "url": "http://www.dnd5eapi.co/api/skills/3" },
      { "name": "Athletics", "url": "http://www.dnd5eapi.co/api/skills/4" },
      { "name": "Deception", "url": "http://www.dnd5eapi.co/api/skills/5" },
      { "name": "History", "url": "http://www.dnd5eapi.co/api/skills/6" },
      { "name": "Insight", "url": "http://www.dnd5eapi.co/api/skills/7" },
      { "name": "Intimidation", "url": "http://www.dnd5eapi.co/api/skills/8" },
      { "name": "Investigation", "url": "http://www.dnd5eapi.co/api/skills/9" },
      { "name": "Medicine", "url": "http://www.dnd5eapi.co/api/skills/10" },
      { "name": "Nature", "url": "http://www.dnd5eapi.co/api/skills/11" },
      { "name": "Perception", "url": "http://www.dnd5eapi.co/api/skills/12" },
      { "name": "Performance", "url": "http://www.dnd5eapi.co/api/skills/13" },
      { "name": "Persuasion", "url": "http://www.dnd5eapi.co/api/skills/14" },
      { "name": "Religion", "url": "http://www.dnd5eapi.co/api/skills/15" },
      { "name": "Sleight of Hand", "url": "http://www.dnd5eapi.co/api/skills/16" },
      { "name": "Stealth", "url": "http://www.dnd5eapi.co/api/skills/17" },
      { "name": "Survival", "url": "http://www.dnd5eapi.co/api/skills/18" }
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

    $scope.profSelection = [];

    $scope.toggleSelection = function(skill) {
      console.log(skill);
      var idx = $scope.profSelection.indexOf(skill);

      // Is currently selected
      if (idx > -1) {
        $scope.profSelection.splice(idx, 1);
      }
      else {
        $scope.profSelection.push(skill);
      }
      console.log($scope.profSelection);
    };

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
    console.log($scope.activeCharacter);

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

      $scope.activeCharacter.basic.mods = [
        calculateMod($scope.activeCharacter.basic.attributes.strength),
        calculateMod($scope.activeCharacter.basic.attributes.dexterity),
        calculateMod($scope.activeCharacter.basic.attributes.constitution),
        calculateMod($scope.activeCharacter.basic.attributes.intelligence),
        calculateMod($scope.activeCharacter.basic.attributes.wisdom),
        calculateMod($scope.activeCharacter.basic.attributes.charisma)
      ];

      console.log($scope.activeCharacter.basic);
      Characters.save($scope.characters);
    };

    function calculateMod(raw) {
      var mod;
      switch(raw) {
        case 0:
        case 1:
          mod = -5;
          break;
        case 2:
        case 3:
          mod = -4;
          break;
        case 4:
        case 5:
          mod = -3;
          break;
        case 6:
        case 7:
          mod = -2;
          break;
        case 8:
        case 9:
          mod = -1;
          break;
        case 10:
        case 11:
          mod = -0;
          break;
        case 12:
        case 13:
          mod = 1;
          break;
        case 14:
        case 15:
          mod = 2;
          break;
        case 16:
        case 17:
          mod = 3;
          break;
        case 18:
        case 19:
          mod = 4;
          break;
        case 20:
          mod = 5;
          break;
        default:
          mod = 0;
          break;
      }
      return mod;
    }

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
        var index = 0;
        angular.forEach(jsonResults.proficiency_choices[0].from, function(skill){
          var choice = skill.name.substring(7);
          jsonResults.proficiency_choices[0].from[index].name = choice;
          // jsonResults.proficiency_choices[0].from[index].is_prof = false;
          index++;
        });
        ChCtrl.activeClass = jsonResults;
        console.log(ChCtrl.activeClass);
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

      console.log(attrClass);
       $scope.activeCharacter.class = {
         class: ChCtrl.activeClass.name,
         proficiencies: ChCtrl.activeClass.proficiencies,
         hit_die: ChCtrl.activeClass.hit_die,
         proficiency_choices: $scope.profSelection
       }
       $scope.profSelection = [];

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

    $scope.changeInspiration = function(){
      console.log("Before: " + $scope.activeCharacter.inspiration);
      $scope.activeCharacter.inspiration = !$scope.activeCharacter.inspiration;
      console.log("After: " + $scope.activeCharacter.inspiration);
    };

    $scope.isProficient = function(prof) {
      return $scope.activeCharacter.class.proficiency_choices.indexOf(prof) !== -1;
    };
    // console.log($scope.activeCharacter.class.proficiency_choices.indexOf({"name": "Acrobatics", "url": "http://www.dnd5eapi.co/api/proficiencies/105"}) !== -1);
  })
