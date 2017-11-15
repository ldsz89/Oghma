angular.module('creatorApp', [])
/**
 * The Projects factory handles saving and loading projects
 * from local storage, and also lets us save and load the
 * last active project index.
 */
.factory('Characters', function() {
  return {
    all: function() {
      var characterString = window.localStorage['characters'];
      if(characterString) {
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
        title: characterName,
        qualities: [],
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

  // A utility function for creating a new character
  // with the given characterName
  var createCharacter = function(characterName) {
    var newCharacter = Characters.newCharacter(characterName);
    $scope.characters.push(newCharacter);
    Characters.save($scope.characters);
    $scope.selectCharacter(newCharacter, $scope.characters.length-1);
  }


  // Load or initialize projects
  $scope.characters = Characters.all();

  console.log($scope.characters);
  console.log(Characters.getLastActiveIndex());
  // Grab the last active, or the first project
  $scope.activeCharacter = $scope.characters[Characters.getLastActiveIndex()];

  $scope.remaining = function(){
      var count = 0;

      angular.forEach($scope.activeCharacter.qualities, function(listAttr){
         count += listAttr.done ? 0 : 1;
      });

      return count;
  }
  // Called to create a new project
  $scope.newCharacter = function() {
      var characterName = document.getElementById("newCharacter").value;
      if(characterName) {
        createCharacter(characterName);
      }
      document.getElementById("newCharacter").value = "";
      document.location.href = "dashboard.html";
  };

  // Called to select the given project
  $scope.selectCharacter = function(character, index) {
    $scope.activeCharacter = character;
    Characters.setLastActiveIndex(index);
//    $ionicSideMenuDelegate.toggleLeft(false);
  };

//  // Create our modal
//  $ionicModal.fromTemplateUrl('new-character.html', function(modal) {
//    $scope.characterModal = modal;
//  }, {
//    scope: $scope
//  });

  $scope.addClass = function(attrClass) {
    if(!$scope.activeCharacter || !attr) {
      return;
    }
    $scope.activeCharacter.qualities.push({
      class: attrClass.class,
      proficiencies: attrClass.proficiencies,
      customProf: attrClass.customProf,
    });
//    $scope.characterModal.hide();

    // Inefficient, but save all the projects
    Characters.save($scope.characters);
//    attr.class = "";
//    task.title = "";
//    task.class = "";
//    task.due = "";
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
  $timeout(function() {
    if($scope.characters.length == 0) {
      while(true) {
        var characterName = prompt('Your first project title:');
        if(characterName) {
          createCharacter(characterName);
          break;
        }
      }
    }
  }, 1000);

})
