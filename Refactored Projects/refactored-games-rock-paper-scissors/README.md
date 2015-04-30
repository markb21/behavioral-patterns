# Rock-Paper-Scissors game
Old rock-paper-scissors snake game written in JavaScript.

## Refactoring
In code was introduced chain of responsibility pattern which simplified control flow and made it more readable. For each possible winning combination was created handler and then linked to each other via prototype chain.