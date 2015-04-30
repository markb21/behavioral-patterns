var newPolicy = function( sorter ){
	var that = {},
		mySorter = sorter;
	
	var chooseStrategy = function ( isTimeImportant, isMemoryImportant ){
		if( isTimeImportant === true && isMemoryImportant === false ){
			mySorter.setStrategy( createMergeSortIterative() );
		}
		else if( isTimeImportant === true && isMemoryImportant === true ){
			mySorter.setStrategy( createQuickSort() );
		}
		else{
			mySorter.setStrategy( createQuickSort() );
		}
	}

	var getSorter = function(){
		return mySorter;
	}
	
	that.chooseStrategy = chooseStrategy;
	that.getSorter = getSorter;
	
	return that;
}

var newSorter = function(){
	var that = {},
		spec = {};
	that.setStrategy =  function( strategy ){
			spec.currentStrategy = strategy;
		}
	that.sort = function( array ){
			try{
				return spec.currentStrategy.sort( array );
			}
			catch(e){
				console.error( e.message );
				console.error( "Please specify a sort strategy first using setStrategy([strategy]). [strategy] could be an instance of the following classes BubbleSort, BubbleSort2, InsertionSort, ..." );
			}
		}
	that.getStrategyName = function(){
			try{
				return spec.currentStrategy.getStrategyName();
			}
			catch(e){
				return "";
			}
		}
	return that;
};

/*
 * Bubble sort implementation in JavaScript
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

function createBubbleSort(){

	var that = {},
		spec = {};

	/**
	 * Swaps two values in an array.
	 * @param {Array} items The array containing the items.
	 * @param {int} firstIndex Index of first item to swap.
	 * @param {int} secondIndex Index of second item to swap.
	 * @return {void}
	 */
	spec.swap = function(items, firstIndex, secondIndex){
		var temp = items[firstIndex];
		items[firstIndex] = items[secondIndex];
		items[secondIndex] = temp;
	}

	/**
	 * A bubble sort implementation in JavaScript. The array
	 * is sorted in-place.
	 * @param {Array} items An array of items to sort.
	 * @return {Array} The sorted array.
	 */
	that.sort = function(items){

		var len = items.length,
			i, j, stop;

		for (i=0; i < len; i++){
			for (j=0, stop=len-i; j < stop; j++){
				if (items[j] > items[j+1]){
					spec.swap(items, j, j+1);
				}
			}
		}

		return items;
	}

	that.getStrategyName = function(){
		return "BubbleSort";
	}

	return that;
	
};

/*
 * Bubble sort implementation in JavaScript
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

function createBubbleSort2(){ 

	var that = {},
		spec = {};

	/**
	 * Swaps two values in an array.
	 * @param {Array} items The array containing the items.
	 * @param {int} firstIndex Index of first item to swap.
	 * @param {int} secondIndex Index of second item to swap.
	 * @return {void}
	 */
	spec.swap = function(items, firstIndex, secondIndex){
		var temp = items[firstIndex];
		items[firstIndex] = items[secondIndex];
		items[secondIndex] = temp;
	}
	 
	/**
	 * A bubble sort implementation in JavaScript. The array
	 * is sorted in-place. This uses two reversed loops that
	 * count down instead of counting up.
	 * @param {Array} items An array of items to sort.
	 * @return {Array} The sorted array.
	 */
	that.sort = function(items){
		var len = items.length,
			i, j;

		for (i=len-1; i >= 0; i--){
			for (j=len-i; j >= 0; j--){
				if (items[j] < items[j-1]){
					spec.swap(items, j, j-1);
				}
			}
		}
		
		return items;
	}

	that.getStrategyName = function(){
		return "BubbleSort2";
	}
	
	return that;
	
};

/*
 * Insertion sort implementation in JavaScript
 * Copyright (c) 2012 Nicholas C. Zakas
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of items software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and items permission notice shall be included in
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
 
function createInsertionSort(){
 
	var that = {};
 
	/**
	 * An insertion sort implementation in JavaScript. The array
	 * is sorted in-place.
	 * @param {Array} items An array of items to sort.
	 * @return {Array} The sorted array.
	 */
	that.sort = function(items){

		var len     = items.length,     // number of items in the array
			value,                      // the value currently being compared
			i,                          // index into unsorted section
			j;                          // index into sorted section
		
		for (i=0; i < len; i++) {
		
			// store the current value because it may shift later
			value = items[i];
			
			/*
			 * Whenever the value in the sorted section is greater than the value
			 * in the unsorted section, shift all items in the sorted section over
			 * by one. This creates space in which to insert the value.
			 */
			for (j=i-1; j > -1 && items[j] > value; j--) {
				items[j+1] = items[j];
			}

			items[j+1] = value;
		}
		
		return items;
	}
	
	that.getStrategyName = function(){
		return "InsertionSort";
	}
	
	return that;
	
};

/*
 * Iterative merge sort implementation in JavaScript
 * Copyright (c) 2009-2011 Nicholas C. Zakas
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
function createMergeSortIterative(){

	var that = {},
		spec = {};

	/**
	 * Merges two arrays in order based on their natural
	 * relationship.
	 * @param {Array} left The first array to merge.
	 * @param {Array} right The second array to merge.
	 * @return {Array} The merged array.
	 */
	spec.merge = function(left, right){
		var result = [];

		while (left.length > 0 && right.length > 0){
			if (left[0] < right[0]){
				result.push(left.shift());
			} else {
				result.push(right.shift());
			}
		}

		result = result.concat(left).concat(right);
		
		//make sure remaining arrays are empty
		left.splice(0, left.length);
		right.splice(0, right.length);
		
		return result;
	}

	/**
	 * Sorts an array in ascending natural order using
	 * merge sort.
	 * @param {Array} items The array to sort.
	 * @return {Array} The sorted array.
	 */
	that.sort = function(items){

		// Terminal condition - don't need to do anything for arrays with 0 or 1 items
		if (items.length < 2) {
			return items;
		}

		var work = [],
			i,
			len;

		for (i=0, len=items.length; i < len; i++){
			work.push([items[i]]);
		}
		work.push([]);  //in case of odd number of items

		for (var lim=len; lim > 1; lim = Math.floor((lim+1)/2)){
			for (var j=0,k=0; k < lim; j++, k+=2){
				work[j] = spec.merge(work[k], work[k+1]);
			}
			work[j] = [];  //in case of odd number of items
		}

		return work[0];
	}
	
	that.getStrategyName = function(){
		return "MergeSortIterative";
	}

	return that;
	
};

/*
 * Recursive merge sort implementation in JavaScript
 * Copyright (c) 2012 Nicholas C. Zakas
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

 function createMergeSortRecursiveInPlace(){
	 
	var that = {},
		spec = {};
	 
	/**
	 * Merges two arrays in order based on their natural
	 * relationship.
	 * @param {Array} left The first array to merge.
	 * @param {Array} right The second array to merge.
	 * @return {Array} The merged array.
	 */
	spec.merge = function(left, right){
		var result  = [],
			il      = 0,
			ir      = 0;

		while (il < left.length && ir < right.length){
			if (left[il] < right[ir]){
				result.push(left[il++]);
			} else {
				result.push(right[ir++]);
			}
		}

		return result.concat(left.slice(il)).concat(right.slice(ir));
	}

	/**
	 * Sorts an array in ascending natural order using
	 * merge sort.
	 * @param {Array} items The array to sort.
	 * @return {Array} The sorted array.
	 */
	that.sort = function(items){

		if (items.length < 2) {
			return items;
		}

		var middle = Math.floor(items.length / 2),
			left    = items.slice(0, middle),
			right   = items.slice(middle),
			params = spec.merge(that.sort(left), that.sort(right));
		
		// Add the arguments to replace everything between 0 and last item in the array
		params.unshift(0, items.length);
		items.splice.apply(items, params);
		return items;
	}
	
	that.getStrategyName = function(){
		return "MergeSortRecursiveInPlace";
	}
	
	return that;
	
};

/*
 * Recursive merge sort implementation in JavaScript
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

function createMergeSortRecursive(){
	 
	var that = {},
		spec = {};
	 
	/**
	 * Merges two arrays in order based on their natural
	 * relationship.
	 * @param {Array} left The first array to merge.
	 * @param {Array} right The second array to merge.
	 * @return {Array} The merged array.
	 */
	spec.merge = function(left, right){
		var result  = [],
			il      = 0,
			ir      = 0;

		while (il < left.length && ir < right.length){
			if (left[il] < right[ir]){
				result.push(left[il++]);
			} else {
				result.push(right[ir++]);
			}
		}

		return result.concat(left.slice(il)).concat(right.slice(ir));
	}

	/**
	 * Sorts an array in ascending natural order using
	 * merge sort.
	 * @param {Array} items The array to sort.
	 * @return {Array} The sorted array.
	 */
	that.sort = function(items){

		if (items.length < 2) {
			return items;
		}

		var middle = Math.floor(items.length / 2),
			left    = items.slice(0, middle),
			right   = items.slice(middle);

		return spec.merge(that.sort(left), that.sort(right));
	}
	
	that.getStrategyName = function(){
		return "MergeSortRecursive";
	}
	
	return that;
	
};

/*
 * Insertion sort implementation in JavaScript
 * Copyright (c) 2012 Nicholas C. Zakas
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of items software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and items permission notice shall be included in
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

function createQuickSort(){

	var that = {},
		spec = {};

	/**
	 * Swaps two values in an array.
	 * @param {Array} items The array containing the items.
	 * @param {int} firstIndex Index of first item to swap.
	 * @param {int} secondIndex Index of second item to swap.
	 * @return {void}
	 */
	spec.swap = function(items, firstIndex, secondIndex){
		var temp = items[firstIndex];
		items[firstIndex] = items[secondIndex];
		items[secondIndex] = temp;
	}

	spec.partition = function(items, left, right) {

		var pivot   = items[Math.floor((right + left) / 2)],  // pivot value is middle item
			i       = left,     // starts from left and goes right to pivot index
			j       = right;    // starts from right and goes left to pivot index


		// while the two indices don't match
		while (i <= j) {

			// if the item on the left is less than the pivot, continue right
			while (items[i] < pivot) {
				i++;
			}

			// if the item on the right is greater than the pivot, continue left
			while (items[j] > pivot) {
				j--;
			}

			// if the two indices still don't match, swap the values
			if (i <= j) {
				spec.swap(items, i, j);

				// change indices to continue loop
				i++;
				j--;
			}
		}

		// this value is necessary for recursion
		return i;
	}

	/**
	 * A quicksort implementation in JavaScript. The array
	 * is sorted in place.
	 * @param {Array} items An array of items to sort.
	 * @return {Array} The sorted array.
	 */
	that.sort = function( items, left, right ) {

		var index;

		// performance - don't sort an array with zero or one items
		if (items.length > 1) {

			// fix left and right values - might not be provided
			left = typeof left != "number" ? 0 : left;
			right = typeof right != "number" ? items.length - 1 : right;

			// split up the entire array
			index = spec.partition(items, left, right);

			// if the returned index
			if (left < index - 1) {
				that.sort(items, left, index - 1);
			}

			if (index < right) {
				that.sort(items, index, right);
			}

		}

		return items;
	}
	
	that.getStrategyName = function(){
		return "QuickSort";
	}
	
	return that;
	
};

/*
 * Selection sort implementation in JavaScript
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
 
function createSelectionSort(){
	 
	var that = {},
		spec = {};
	 
	/**
	 * Swaps two values in an array.
	 * @param {Array} items The array containing the items.
	 * @param {int} firstIndex Index of first item to swap.
	 * @param {int} secondIndex Index of second item to swap.
	 * @return {void}
	 */
	spec.swap = function(items, firstIndex, secondIndex){
		var temp = items[firstIndex];
		items[firstIndex] = items[secondIndex];
		items[secondIndex] = temp;
	}
	 
	/**
	 * A selection sort implementation in JavaScript. The array
	 * is sorted in-place.
	 * @param {Array} items An array of items to sort.
	 * @return {Array} The sorted array.
	 */
	that.sort = function(items){

		var len = items.length,
			min, i, j;

		for (i=0; i < len; i++){
		
			// set minimum to this position
			min = i;
			
			// check the rest of the array to see if anything is smaller
			for (j=i+1; j < len; j++){
				if (items[j] < items[min]){
					min = j;
				}
			}
			
			// if the minimum isn't in the position, swap it
			if (i != min){
				spec.swap(items, i, min);
			}
		}
		
		return items;
	}
	
	that.getStrategyName = function(){
		return "SelectionSort";
	}
	
	return that;
	
};