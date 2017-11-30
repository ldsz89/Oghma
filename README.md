### Peaches4Lyfe

## Group Members
Dre Shannon
Sam Kroeger
Chaewon Yun
Julia Wopata

## The Problem

Dungeons & Dragons is a fun and exciting game, but there are a lot of elements that are neccessary to create a new character. This application helps a user create a new character, and guides them through the process without the lengthy rulebook.

## The Solution

The landing page of this site prompts you to create a new character, then directs you to the edit character page.

## Technologies

AngularJS, SASS, D&D API, Bootstrap, jQuery

## Who did what?

# Dre: linking API, organizing where the content loads
# Julia: managing local storage and user input
# Sam: front end, styling
# Chaewon: showing/hiding modals, fixing bugs, adding funtionality

# All: integrating pages, fixing bugs, collaboration. We all worked on various parts of other team member areas, but these were the items we officiallly assigned at the beginning

### Notable Items in the Project
- Users can easily create, edit, and delete characters
- Appealing UI
- Responsive UI based on user state
  - closing modals on sucess
  - green checkmark to indicate that your changes were saved
  - class="active" in navbar based on current page
  - When selecting Class/Ability/Race, the bottom information doesn't display until you've selected a class.
- Dynamic code
  - We used AngularJS to load information based upon the information of the activeCharacter
  - On the character detail page for a character that has already been created, the image loads dynamically based upon the class
  - If a user doesn't have a class selected yet, an empty stock image displays
