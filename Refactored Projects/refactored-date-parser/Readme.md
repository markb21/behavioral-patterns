# date 
Date is an english language date parser for node.js and the browser. For examples and demos, see: [http://matthewmueller.github.io/date/](http://matthewmueller.github.io/date/)

## Refactoring
Long If statement in advance function was changed to call just first handler. All of the functions handling the input were changed to handlers and connected to each other by prototype chain.
Refactored projects may be a bit over engineered but serves as a good showcase how chain of responsibility can be applied.  