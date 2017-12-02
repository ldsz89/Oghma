# Peaches4Lyfe

[Link to website -- www.oghma.me/oghma/](http://www.oghma.me/oghma/)

### Group Members
#### Dre Shannon
#### Sam Kroeger
#### Chaewon Yun
#### Julia Wopata

## The Problem

Dungeons & Dragons is a fun and exciting game, but there are a lot of elements that are neccessary to create a new character. This application helps a user create a new character, and guides them through the process without the lengthy rulebook.

## The Solution

To solve this problem we've created a website that automates much of the procress of creating a character for a player. We've cut out the lore and tedious details that would turn away new players and presented just the information that's relevant to them. This was accomplished using a single controller, information gathered from a D&D 5e API, and local storage to save each character created.

## Technologies

AngularJS, SASS, [D&D API](http://www.dnd5eapi.co/), Bootstrap, jQuery

## Who did what?

#### Dre:
Linking API, organizing where the content loads
#### Julia:
Managing local storage and user input
#### Sam:
Front end, styling
#### Chaewon:
Showing/hiding modals, fixing bugs, adding funtionality

#### All:
Integrating pages, fixing bugs, collaboration. We all worked on various parts of other team member areas, but these were the items we officiallly assigned at the beginning

## Notable Items in the Project
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
  
## Tips
- Utilize the documentation for libraries. Some errors are caused by not completely understanding some functionality in a library. After readng some information on an element or method it can be easier to solve your problem.
- An important element to tackling this project was understanding the structure of the elements being returned from our calls to the Dungeons and Dragons API. A tip is to do a console.log of the element so you can examine the structure.

## Tutorial
![Landing Page](/image/Screenshots/DND1.png)

After going to www.oghma.me/oghma/ click the GO! button to input the name of your first character.

![Edit Character](/image/Screenshots/DND3.png)

After confirming the name, you'll be taken to the Edit Character page that will allow you to input all of the relevent information about your new character including name, class, race, etc...

![Class Selection](/image/Screenshots/DND4.png)
![Race Selection](/image/Screenshots/DND5.png)

After confirming all of the information, click the Done button in the sidebar on the left side of the screen.

![Character Details 1](/image/Screenshots/DND7.png)
![Character Details 2](/image/Screenshots/DND8.png)

You will then be taken to your new characer's information page. From here you can see all of the information you've selected. If there is something you want to edit about that character, click the Edit Character link in the sidebar on the left side of the screen.

![Character Dashboard](/image/Screenshots/DND6.png)

To see all of your characters, click the Dashboard link at the top of the sidebar. From here you can access a character's information page by clicking their name. To edit a character, hover over their name and click the edit (pencil) button. To delete a character, hover over their name and click the delete (trash) button.
