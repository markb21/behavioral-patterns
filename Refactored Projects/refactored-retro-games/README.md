# snake
Retro snake game written in JavaScript.

![Screenshot of Snake](snake/screenshot.png)

## Refactoring
In code was introduced command pattern which decouples boundary objects(keyboard keys) from implementation of action(particular commands) and separates them from entity objects(attributes that specify directions).
Refactoring made it easy to reuse the code for changing direction of snake e.g.: when multi player option would be introduced.

