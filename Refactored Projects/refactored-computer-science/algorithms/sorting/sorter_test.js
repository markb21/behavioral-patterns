var sorter = newSorter();

var currentOutput;
var unsorted_array;
var sorted_array;
var outputElement = document.getElementById("output");

function getNewUnsortedArray(){
	return [2,3,1];
}

outputElement.innerHTML += "<b class=\"green\">The array to sort is<br>" + getNewUnsortedArray() + "</b><br><br>";

sorter.setStrategy( createBubbleSort() );
unsorted_array = getNewUnsortedArray();
sorted_array = sorter.sort( unsorted_array );
outputElement.innerHTML += sorter.getStrategyName() + "<br>" + sorted_array + "<br><br>";

sorter.setStrategy( createBubbleSort2() );
unsorted_array = getNewUnsortedArray();
sorted_array = sorter.sort( unsorted_array );
outputElement.innerHTML += sorter.getStrategyName() + "<br>" + sorted_array + "<br><br>";

sorter.setStrategy( createInsertionSort() );
unsorted_array = getNewUnsortedArray();
sorted_array = sorter.sort( unsorted_array );
outputElement.innerHTML += sorter.getStrategyName() + "<br>" + sorted_array + "<br><br>";

sorter.setStrategy( createMergeSortIterative() );
unsorted_array = getNewUnsortedArray();
sorted_array = sorter.sort( unsorted_array );
outputElement.innerHTML += sorter.getStrategyName() + "<br>" + sorted_array + "<br><br>";

sorter.setStrategy( createMergeSortRecursiveInPlace() );
unsorted_array = getNewUnsortedArray();
sorted_array = sorter.sort( unsorted_array );
outputElement.innerHTML += sorter.getStrategyName() + "<br>" + sorted_array + "<br><br>";

sorter.setStrategy( createMergeSortRecursive() );
unsorted_array = getNewUnsortedArray();
sorted_array = sorter.sort( unsorted_array );
outputElement.innerHTML += sorter.getStrategyName() + "<br>" + sorted_array + "<br><br>";

sorter.setStrategy( createQuickSort() );
unsorted_array = getNewUnsortedArray();
sorted_array = sorter.sort( unsorted_array );
outputElement.innerHTML += sorter.getStrategyName() + "<br>" + sorted_array + "<br><br>";

sorter.setStrategy( createSelectionSort() );
unsorted_array = getNewUnsortedArray();
sorted_array = sorter.sort( unsorted_array );
outputElement.innerHTML += sorter.getStrategyName() + "<br>" + sorted_array + "<br><br>";

outputElement.innerHTML += "<b>Sorted with policy object:</b> <br><br>";

var policy = newPolicy( sorter );
policy.chooseStrategy( true, false );
unsorted_array = getNewUnsortedArray();
sorted_array = policy.getSorter().sort( unsorted_array );
outputElement.innerHTML += sorter.getStrategyName() + "<br>" + sorted_array + "<br><br>";

policy.chooseStrategy( true, true );
unsorted_array = getNewUnsortedArray();
sorted_array = policy.getSorter().sort( unsorted_array );
outputElement.innerHTML += sorter.getStrategyName() + "<br>" + sorted_array + "<br><br>";

policy.chooseStrategy();
unsorted_array = getNewUnsortedArray();
sorted_array = policy.getSorter().sort( unsorted_array );
outputElement.innerHTML += sorter.getStrategyName() + "<br>" + sorted_array + "<br><br>";