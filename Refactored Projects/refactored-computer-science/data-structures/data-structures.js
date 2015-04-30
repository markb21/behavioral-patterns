/*
 * Doubly Linked List implementation in JavaScript
 * Copyright (c) 2009 Nicholas C. Zakas
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
 
/**
 * A linked list implementation in JavaScript.
 * @class DoublyLinkedList
 * @constructor
 */
function DoublyLinkedList() {

    /**
     * Pointer to first item in the list.
     * @property _head
     * @type Object
     * @private
     */
    this._head = null;
    
    /**
     * Pointer to last item in the list.
     * @property _tail
     * @type Object
     * @private
     */    
    this._tail = null;
    
    /**
     * The number of items in the list.
     * @property _length
     * @type int
     * @private
     */    
    this._length = 0;
}

DoublyLinkedList.prototype = {

    //restore constructor
    constructor: DoublyLinkedList,    
    
    /**
     * Appends some data to the end of the list. This method traverses
     * the existing list and places the value at the end in a new item.
     * @param {variant} data The data to add to the list.
     * @return {Void}
     * @method add
     */
    add: function (data){
    
        //create a new item object, place data in
        var node = { 
                data: data, 
                next: null,
                prev: null
            };
    
        //special case: no items in the list yet
        if (this._length == 0) {
            this._head = node;
            this._tail = node;
        } else {
        
            //attach to the tail node
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
        }        
        
        //don't forget to update the count
        this._length++;
    
    },
	
    /**
     * Retrieves the data in the given position in the list.
     * @param {int} index The zero-based index of the item whose value 
     *      should be returned.
     * @return {variant} The value in the "data" portion of the given item
     *      or null if the item doesn't exist.
     * @method item
     */
    item: function(index){
    
        //check for out-of-bounds values
        if (index > -1 && index < this._length){
            var current = this._head,
                i = 0;
                
            while(i++ < index){
                current = current.next;            
            }
        
            return current.data;
        } else {
            return null;
        }
    },
    
    /**
     * Removes the item from the given location in the list.
     * @param {int} index The zero-based index of the item to remove.
     * @return {variant} The data in the given position in the list or null if
     *      the item doesn't exist.
     * @method remove
     */
    remove: function(index){
    
        //check for out-of-bounds values
        if (index > -1 && index < this._length){
        
            var current = this._head,
                i = 0;
                
            //special case: removing first item
            if (index === 0){
                this._head = current.next;
                
                /*
                 * If there's only one item in the list and you remove it,
                 * then this._head will be null. In that case, you should
                 * also set this._tail to be null to effectively destroy
                 * the list. Otherwise, set the previous pointer on the new
                 * this._head to be null.
                 */
                if (!this._head){
                    this._tail = null;
                } else {
                    this._head.prev = null;
                }
       
            //special case: removing last item
            } else if (index === this._length -1){
                current = this._tail;
                this._tail = current.prev;
                this._tail.next = null;
            } else {
        
                //find the right location
                while(i++ < index){
                    current = current.next;            
                }
            
                //skip over the item to remove
                current.prev.next = current.next;
                current.next.prev = current.prev;
            }
        
            //decrement the length
            this._length--;
        
            //return the value
            return current.data;            
        
        } else {
            return null;
        }
               
    
    },    
    
   /**
     * Returns the number of items in the list.
     * @return {int} The number of items in the list.
     * @method size
     */
    size: function(){
        return this._length;
    },
    
    /**
     * Converts the list into an array.
     * @return {Array} An array containing all of the data in the list.
     * @method toArray
     */
    toArray: function(){
        var result = [],
            current = this._head;
        
        while(current){
            result.push(current.data);
            current = current.next;
        }
        
        return result;
    },
    
    /**
     * Converts the list into a string representation.
     * @return {String} A string representation of the list.
     * @method toString
     */
    toString: function(){
        return this.toArray().toString();
    },
	
	createIterator: function(){
		return newLinkedListIterator( this );
	}
};

/*
 * Binary Search Tree implementation in JavaScript
 * Copyright (c) 2009 Nicholas C. Zakas
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * A binary search tree implementation in JavaScript. This implementation
 * does not allow duplicate values to be inserted into the tree, ensuring
 * that there is just one instance of each value.
 * @class BinarySearchTree
 * @constructor
 */
function BinarySearchTree() {
    
    /**
     * Pointer to root node in the tree.
     * @property _root
     * @type Object
     * @private
     */
    this._root = null;
}

BinarySearchTree.prototype = {

    //restore constructor
    constructor: BinarySearchTree,
    
    //-------------------------------------------------------------------------
    // Private members
    //-------------------------------------------------------------------------
	
    /**
     * Appends some data to the appropriate point in the tree. If there are no
     * nodes in the tree, the data becomes the root. If there are other nodes
     * in the tree, then the tree must be traversed to find the correct spot
     * for insertion. 
     * @param {variant} value The data to add to the list.
     * @return {Void}
     * @method add
     */
    add: function (value){
    
        //create a new item object, place data in
        var node = { 
                value: value, 
                left: null,
                right: null,
				parent: null
            },
            
            //used to traverse the structure
            current;
    
        //special case: no items in the tree yet
        if (this._root === null){
            this._root = node;
        } else {
            current = this._root;
            
            while(true){
            
                //if the new value is less than this node's value, go left
                if (value < current.value){
                
                    //if there's no left, then the new node belongs there
                    if (current.left === null){
                        current.left = node;
						node.parent = current;
                        break;
                    } else {                    
                        current = current.left;
                    }
                    
                //if the new value is greater than this node's value, go right
                } else if (value > current.value){
                
                    //if there's no right, then the new node belongs there
                    if (current.right === null){
                        current.right = node;
						node.parent = current;
                        break;
                    } else {                    
                        current = current.right;
                    }       
 
                //if the new value is equal to the current one, just ignore
                } else {
                    break;
                }
            }        
        }
    },
    
    /**
     * Determines if the given value is present in the tree.
     * @param {variant} value The value to find.
     * @return {Boolean} True if the value is found, false if not.
     * @method contains
     */
    contains: function(value){
    
        var found       = false,
            current     = this._root
            
        //make sure there's a node to search
        while(!found && current){
        
            //if the value is less than the current node's, go left
            if (value < current.value){
                current = current.left;
                
            //if the value is greater than the current node's, go right
            } else if (value > current.value){
                current = current.right;
                
            //values are equal, found it!
            } else {
                found = true;
            }
        }
        
        //only proceed if the node was found
        return found;

    },
    
    /**
     * Removes the node with the given value from the tree. This may require
     * moving around some nodes so that the binary search tree remains
     * properly balanced.
     * @param {variant} value The value to remove.
     * @return {void}
     * @method remove
     */
    remove: function(value){

        var found       = false,
            parent      = null,
            current     = this._root,
            childCount,
            replacement,
            replacementParent;

        //make sure there's a node to search
        while(!found && current){
        
            //if the value is less than the current node's, go left
            if (value < current.value){
                parent = current;
                current = current.left;
                
            //if the value is greater than the current node's, go right
            } else if (value > current.value){
                parent = current;
                current = current.right;
                
            //values are equal, found it!
            } else {
                found = true;
            }
        }
        
        //only proceed if the node was found
        if (found){
        
            //figure out how many children
            childCount = (current.left !== null ? 1 : 0) + (current.right !== null ? 1 : 0);
        
            //special case: the value is at the root
            if (current === this._root){
                switch(childCount){
                
                    //no children, just erase the root
                    case 0:
                        this._root = null;
                        break;
                        
                    //one child, use one as the root
                    case 1:
                        this._root = (current.right === null ? current.left : current.right);
						this._root.parent = null;
                        break;
                        
                    //two children, little work to do
                    case 2:

                        //new root will be the old root's left child...maybe
                        replacement = this._root.left;
                        
                        //find the right-most leaf node to be the real new root
                        while (replacement.right !== null){
                            replacementParent = replacement;
                            replacement = replacement.right;
                        }
         
                        //it's not the first node on the left
                        if (replacementParent !== null){
                        
                            //remove the new root from it's previous position
                            replacementParent.right = replacement.left;
                            
                            //give the new root all of the old root's children
                            replacement.right = this._root.right;
                            replacement.left = this._root.left;

                        } else {
                        
                            //just assign the children
                            replacement.right = this._root.right;
                        }
                        
                        //officially assign new root
                        this._root = replacement;
						this._root.parent = null;
                    
                    //no default
                
                }        

            //non-root values
            } else {
            
                switch (childCount){
                
                    //no children, just remove it from the parent
                    case 0:
                        //if the current value is less than its parent's, null out the left pointer
                        if (current.value < parent.value){
                            parent.left = null;
                            
                        //if the current value is greater than its parent's, null out the right pointer
                        } else {
                            parent.right = null;
                        }
                        break;

                    //one child, just reassign to parent
                    case 1:
                        //if the current value is less than its parent's, reset the left pointer
                        if (current.value < parent.value){
                            parent.left = (current.left === null ? current.right : current.left);
                            parent.left.parent = parent;
							
                        //if the current value is greater than its parent's, reset the right pointer
                        } else {
                            parent.right = (current.left === null ? current.right : current.left);
							parent.right.parent = parent;
                        }
                        break;    

                    //two children, a bit more complicated
                    case 2:

                        //reset pointers for new traversal
                        replacement = current.left;
                        replacementParent = current;

                        //find the right-most node
                        while(replacement.right !== null){
                            replacementParent = replacement;
                            replacement = replacement.right;                            
                        }

                        replacementParent.right = replacement.left;

                        //assign children to the replacement
                        replacement.right = current.right;
                        replacement.left = current.left;
                        
                        //place the replacement in the right spot
                        if (current.value < parent.value){
                            parent.left = replacement;
                            parent.left.parent = parent;
                        } else {
                            parent.right = replacement;
                            parent.right.parent = parent;
                        }                        
                                        
                    //no default
                
                
                }
            
            }
        
        }
        
    },
    
    /**
     * Returns the number of items in the tree. To do this, a traversal
     * must be executed.
     * @return {int} The number of items in the tree.
     * @method size
     */
    size: function(){
        var length = 0;
        
        this.traverse(function(node){
            length++;
        });
        
        return length;
    },
    
    /**
     * Converts the tree into an array.
     * @return {Array} An array containing all of the data in the tree.
     * @method toArray
     */
    toArray: function(){
        var result = [];
        
        this.traverse(function(node){
            result.push(node.value);
        });
        
        return result;
    },
    
    /**
     * Converts the list into a string representation.
     * @return {String} A string representation of the list.
     * @method toString
     */
    toString: function(){
        return this.toArray().toString();
    },
    
    /**
     * Traverses the tree and runs the given method on each node it comes
     * across while doing an in-order traversal.
     * @param {Function} process The function to run on each node.
     * @return {void}
     * @method traverse
     */
    traverse: function(process){
        
        //helper function
        function inOrder(node){
            if (node){
                
                //traverse the left subtree
                if (node.left !== null){
                    inOrder(node.left);
                }            
                
                //call the process method on this node
                process.call(this, node);
            
                //traverse the right subtree
                if (node.right !== null){
                    inOrder(node.right);
                }
            }        
        }
        
        //start with the root
        inOrder(this._root);    
    },
	
    /**
     * Benjamin Helgert
	 * Returns the successor of the given node or null if none exists.
     * @param {Object} node The node for which the successor is sought.
     * @return {Object} node The successor node or null.
     * @method successor
     */
	successorNode: function(node){
	
		if(node.right !== null){
			return this.minNode(node.right);
		}
		var p = node.parent;
		while( p !== null && node === p.right ){
			node = p;
			p = node.parent;
		}
		return p;
		
	},
	
    /**
     * Benjamin Helgert
	 * Returns the minimum node of the given subtree root.
     * @param {Object} node The root of the subtree for which the minimum is sought.
     * @return {Object} node The minimum node.
     * @method successor
     */
	minNode: function(node){
		
		// helper function
		function findMin(node){
			if( node.left !== null ){
				return findMin(node.left);
			}
			else{
				return node;
			}
		}
		
		return findMin( node );
		
	},
	
    /**
     * Benjamin Helgert
	 * Returns the value of the minimum node of the given subtree root.
     * @param {Object} node The root of the subtree for which the minimum is sought.
     * @return {Object} node The minimum node.
     * @method successor
     */
	min: function(node){
		return this.minNode(node).value;
	},
	
	createIterator: function(){
		return newBinarySearchTreeIterator(this);
	}
	
};


/*
 * Linked List implementation in JavaScript
 * Copyright (c) 2009 Nicholas C. Zakas
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * A linked list implementation in JavaScript. This is a more "classic"
 * approach that doesn't keep track of the number of items in the list
 * and instead calculates the size when necessary.
 * @class LinkedListClassic
 * @constructor
 */
function LinkedListClassic() {
    
    /**
     * Pointer to first item in the list.
     * @property _head
     * @type Object
     * @private
     */
    this._head = null;
}

LinkedListClassic.prototype = {

    //restore constructor
    constructor: LinkedListClassic,
    
    /**
     * Appends some data to the end of the list. This method traverses
     * the existing list and places the value at the end in a new item.
     * @param {variant} data The data to add to the list.
     * @return {Void}
     * @method add
     */
    add: function (data){
    
        //create a new item object, place data in
        var node = { 
                data: data, 
                next: null 
            },
            
            //used to traverse the structure
            current;
    
        //special case: no items in the list yet
        if (this._head === null){
            this._head = node;
        } else {
            current = this._head;
            
            while(current.next){
                current = current.next;
            }
           
            current.next = node;            
        }
    
    },
    
    /**
     * Retrieves the data in the given position in the list.
     * @param {int} index The zero-based index of the item whose value 
     *      should be returned.
     * @return {variant} The value in the "data" portion of the given item
     *      or null if the item doesn't exist.
     * @method item
     */
    item: function(index){
    
        //check for out-of-bounds values
        if (index > -1){
            var current = this._head,
                i = 0;
                
            while(i++ < index && current){
                current = current.next;            
            }
        
            return (current ? current.data : null);
        } else {
            return null;
        }
    },
    
    /**
     * Removes the item from the given location in the list.
     * @param {int} index The zero-based index of the item to remove.
     * @return {variant} The data in the given position in the list or null if
     *      the item doesn't exist.
     * @method remove
     */
    remove: function(index){
    
        //check for out-of-bounds values
        if (index > -1){
        
            var current = this._head,
                previous,
                i = 0;
                
            //special case: removing first item
            if (index === 0){
                this._head = current.next;
            } else {
        
                //find the right location
                while(i++ < index){
                    previous = current;
                    current = current.next;            
                }
            
                //skip over the item to remove
                previous.next = current.next;
            }
        
            //return the value
            return (current ? current.data : null);            
        
        } else {
            return null;
        }
    
    },
    
    /**
     * Returns the number of items in the list.
     * @return {int} The number of items in the list.
     * @method size
     */
    size: function(){
        var current = this._head,
            count   = 0;
            
        while(current){
            count++;
            current = current.next;            
        }
    
        return count;
    },
    
    /**
     * Converts the list into an array.
     * @return {Array} An array containing all of the data in the list.
     * @method toArray
     */
    toArray: function(){
        var result = [],
            current = this._head;
        
        while(current){
            result.push(current.data);
            current = current.next;
        }
        
        return result;
    },
    
    /**
     * Converts the list into a string representation.
     * @return {String} A string representation of the list.
     * @method toString
     */
    toString: function(){
        return this.toArray().toString();
    },
	createIterator: function(){
		return newLinkedListIterator( this );
	}
};

/*
 * Linked List implementation in JavaScript
 * Copyright (c) 2009 Nicholas C. Zakas
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * A linked list implementation in JavaScript.
 * @class LinkedList
 * @constructor
 */
function LinkedList() {

    /**
     * The number of items in the list.
     * @property _length
     * @type int
     * @private
     */
    this._length = 0;
    
    /**
     * Pointer to first item in the list.
     * @property _head
     * @type Object
     * @private
     */
    this._head = null;
}

LinkedList.prototype = {

    //restore constructor
    constructor: LinkedList,
    
    /**
     * Appends some data to the end of the list. This method traverses
     * the existing list and places the value at the end in a new item.
     * @param {variant} data The data to add to the list.
     * @return {Void}
     * @method add
     */
    add: function (data){
    
        //create a new item object, place data in
        var node = { 
                data: data, 
                next: null 
            },
            
            //used to traverse the structure
            current;
    
        //special case: no items in the list yet
        if (this._head === null){
            this._head = node;
        } else {
            current = this._head;
            
            while(current.next){
                current = current.next;
            }
           
            current.next = node;            
        }
        
        //don't forget to update the count
        this._length++;
    
    },
    
    /**
     * Retrieves the data in the given position in the list.
     * @param {int} index The zero-based index of the item whose value 
     *      should be returned.
     * @return {variant} The value in the "data" portion of the given item
     *      or null if the item doesn't exist.
     * @method item
     */
    item: function(index){
    
        //check for out-of-bounds values
        if (index > -1 && index < this._length){
            var current = this._head,
                i = 0;
                
            while(i++ < index){
                current = current.next;            
            }
        
            return current.data;
        } else {
            return null;
        }
    },
    
    /**
     * Removes the item from the given location in the list.
     * @param {int} index The zero-based index of the item to remove.
     * @return {variant} The data in the given position in the list or null if
     *      the item doesn't exist.
     * @method remove
     */
    remove: function(index){
    
        //check for out-of-bounds values
        if (index > -1 && index < this._length){
        
            var current = this._head,
                previous,
                i = 0;
                
            //special case: removing first item
            if (index === 0){
                this._head = current.next;
            } else {
        
                //find the right location
                while(i++ < index){
                    previous = current;
                    current = current.next;            
                }
            
                //skip over the item to remove
                previous.next = current.next;
            }
        
            //decrement the length
            this._length--;
        
            //return the value
            return current.data;            
        
        } else {
            return null;
        }
    
    },
    
    /**
     * Returns the number of items in the list.
     * @return {int} The number of items in the list.
     * @method size
     */
    size: function(){
        return this._length;
    },
    
    /**
     * Converts the list into an array.
     * @return {Array} An array containing all of the data in the list.
     * @method toArray
     */
    toArray: function(){
        var result = [],
            current = this._head;
        
        while(current){
            result.push(current.data);
            current = current.next;
        }
        
        return result;
    },
    
    /**
     * Converts the list into a string representation.
     * @return {String} A string representation of the list.
     * @method toString
     */
    toString: function(){
        return this.toArray().toString();
    },
	createIterator: function(){
		return newLinkedListIterator( this );
	}
};

function Iterator(){ 
	this.next = function(){
			throw "This iterator does not implement next()."
		}
};

// You can check whether some object is an Iterator by using 
// instanceof Iterator
function newLinkedListIterator( spec ){
	var that = new Iterator(),
		currentNode = null;
	
	that.next = function(){
		if(currentNode===null){
			currentNode = spec._head;
		}
		else{
			currentNode = currentNode.next;
		}
		return currentNode;
	}
	return that;
}

// You can check whether some object is an Iterator by using 
// instanceof Iterator
function newBinarySearchTreeIterator( spec ){
	var that = new Iterator(),
		currentNode = null;
	
	that.next = function(){
		if(currentNode===null){
			currentNode = spec.minNode(spec._root);
		}
		else{
			try{
				currentNode = spec.successorNode(currentNode);
			}
			catch(e){
				currentNode = null;
			}			
		}
		return currentNode;
	}
	return that;
}