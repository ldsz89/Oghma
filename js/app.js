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
          basic: [],
          race: [],
          class: [],
          abilities: [],
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

    // A utility function for creating a new character
    // with the given characterName
    var createCharacter = function(characterName) {
      var newCharacter = Characters.newCharacter(characterName);
      $scope.characters.push(newCharacter);
      Characters.save($scope.characters);
      $scope.selectCharacter(newCharacter, $scope.characters.length - 1);
    };
    
    $scope.openCharacter = function(index){
      console.log(index);
      console.log("Testing");
      $scope.activeCharacter = $scope.characters[index];
      document.location.href = "create.html";
    };


    // Load or initialize characters
    $scope.characters = Characters.all();

    console.log($scope.characters);
    console.log(Characters.getLastActiveIndex());
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
      console.log("Saving basic info");
      if (!$scope.activeCharacter || !info) {
        return;
      }
      $scope.activeCharacter.basic = [];
      
      $scope.activeCharacter.basic.push({
        level: info.level,
        age: info.age,
        alignment: info.alignment,
        background: info.background
      });

      console.log("success!");
      Characters.save($scope.characters);
    };

    $scope.getClassInfo = function(url) {
      console.log("Getting class information");
      requestResource(url, function(results) {
          ChCtrl.activeClass = angular.fromJson(results);
          console.log("Active Class: " + ChCtrl.activeClass.name);
          $scope.$apply();
      });
    };

    $scope.addClass = function(attrClass) {
      console.log("Adding class info");
      // console.log(attrClass);
      if (!$scope.activeCharacter) {
        return;
      }
      $scope.activeCharacter.class = [];
       $scope.activeCharacter.class.push({
         class: ChCtrl.activeClass.name,
         proficiencies: ChCtrl.activeClass.proficiencies,
         hit_die: ChCtrl.activeClass.hit_die
       });
//      var addItem = {
//        class: ChCtrl.activeClass.name,
//        proficiencies: ChCtrl.activeClass.proficiencies,
//      }
//      $scope.activeCharacter.class = addItem;

      // Inefficient, but save all the projects
      console.log("Class info added");
      console.log($scope.activeCharacter);
      Characters.save($scope.characters);
    };

    $scope.getRaceInfo = function(url) {
      console.log("Getting race information");
      requestResource(url, function(results) {
        ChCtrl.activeRace = angular.fromJson(results);
        $scope.$apply();
      });
    }

    $scope.addRace = function(race) {
      console.log("Adding race info");
      if (!$scope.activeCharacter) {
        return;
      }
      
      $scope.activeCharacter.race = [];
       $scope.activeCharacter.race.push({
         race: ChCtrl.activeRace.name,
         languages: ChCtrl.activeRace.languages,
         ability_bonuses: ChCtrl.activeRace.ability_bonuses,
         traits: ChCtrl.activeRace.traits
       });
//      var addItem = {
//        race: ChCtrl.activeRace.name,
//        languages: ChCtrl.activeRace.languages,
//        ability_bonuses: ChCtrl.activeRace.ability_bonuses,
//        traits: ChCtrl.activeRace.traits
//      };
//      $scope.activeCharacter.race = addItem;

      console.log("Race info added");
      console.log($scope.activeCharacter);
      Characters.save($scope.characters);
    };

    //  $scope.newAttr = function() {
    //    $scope.characterModal.show();
    //  };

    //  $scope.closeNewTask = function() {
    //    $scope.characterModal.hide();
    //  }

    //  $scope.toggleCharacters = function() {
    //    $ionicSideMenuDelegate.toggleLeft();
    //  };

    //Called to archive selected projects
    //  $scope.archive = function() {
    //       var oldTasks = $scope.activeProject.tasks;
    //       $scope.activeProject.tasks = [];
    //       angular.forEach(oldTasks, function(todo) {
    //           if (!todo.done)
    //               $scope.activeProject.tasks.push(todo);
    //               Projects.save($scope.projects);
    //       });
    //   };

    //   $scope.archiveAll = function(index) {
    //       var oldTasks = $scope.projects[index].tasks;
    //       $scope.projects[index].tasks = [];
    //    };

    //Called to delete a selected project
    //   $scope.delete = function(index) {
    //       $scope.projects[index].remove = true;
    //       console.log(index);
    //       $scope.archiveAll(index);
    //
    //       var projects = $scope.projects;
    //       $scope.projects = [];
    //       angular.forEach(projects, function(todo) {
    //           if (!todo.remove)
    //               $scope.projects.push(todo);
    //               Projects.save($scope.projects);
    //       });
    //   };

    //  $scope.refresh = function(checked) {
    //      Projects.save($scope.projects);
    //  }

    // Try to create the first project, make sure to defer
    // this by using $timeout so everything is initialized
    // properly
    //  $timeout(function() {
    //    if($scope.characters.length == 0) {
    //      while(true) {
    //        var characterName = prompt('Your first project title:');
    //        if(characterName) {
    //          createCharacter(characterName);
    //          break;
    //        }
    //      }
    //    }
    //  }, 1000);

  })
