Strategy Pattern:

All of the sorting algorithms are now combined in one single sorter.js
which implements a Sorter class that allows for several sorting strategies
to be used.

Iterator Pattern:

o Implemented a "successor" method for binary search tree.
o A specific Iterator class for each data structure now exists
and an abstract Iterator that the specific Iterator inherits from.
o Objects can be checked via "instanceof Iterator" before using the next() method.
o When the next() method of an iterator is called but not implemented
and exception is thrown, stating that next() is not implemented.

Improvements by applying Iterator Pattern:

o None of the data structures could be iterated before, except for the option
of creating an array from the tree and then iterate over its elements it.
The Iterator spares the user from the need to create a new data structure
in order to iterate.