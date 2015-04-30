Observer Pattern:
We use an Observer pattern to synchronize different views of the same state.
First view: Text boxes showing x,y,z coordinates, rotation angles, ... as numbers on the left
Second view: Elements positioned at those coordinates with their respective angles, ...
In the original version it was not possible that one changes the values by typing into
the text boxes. With the observer pattern it is now possible

Iterator Pattern:
o Implemented a simple HashSet for JavaScript objects and an iterator for this set implementation.
o The HashSet is used by the Observable to iterate over all Observers when notifying.