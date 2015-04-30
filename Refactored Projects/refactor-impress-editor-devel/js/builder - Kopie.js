var builder = (function () {

  'use strict';
    var observableElement = newObservableElement();
    // TODO: remove var state = {...}
  var state = {
    editing: false,
    $node: false,
    data: {
      x: 0,
      y: 0,
      z: 0, //new
      rotate: 0,
      rotateX: 0, //new
      rotateY: 0, //new
      scale: 0
    }
  },
    selection = [],
    config = {
      rotation: 0,
      rotateStep: 1,
      scaleStep: 0.02,
      visualScaling: 10,
      redrawFunction: false,
      setTransformationCallback: false
    },
    defaults = {
      x: 0,
      y: 0,
      z: 0, //new
      rotate: 0,
      scale: 1
    },
    mouse = {
      prevX: false,
      prevY: false,
      activeFunction: false
    },
    handlers = {},
    redrawTimeout,
    //nodes
    $menu, $controls, $overview, $sliders;

  selection.hasstate = function (s) {
   // console.log('Checking ' + s.$node.attr('id'));
    for (var i = 0; i < this.length; i++) {
      //console.log(this[i].$node.attr('id'))
      if (this[i].$node.attr('id') === s.$node.attr('id'))
        return true;
    }
    return false;
  }
  selection.pushstate = function (s) {
    //make a deep enough copy
    this.push({
      $node: s.$node,
      data: {
        x: s.data.x,
        y: s.data.y,
        rotate: s.data.rotate,
        scale: s.data.scale
      }
    });
    s.$node[0].classList.add('selected');
  }
  selection.move = function (x, y) {
    for (var i = 0; i < this.length; i++) {
      this[i].data.x = (this[i].data.x) ? (this[i].data.x) + x : x;
      this[i].data.y = (this[i].data.y) ? (this[i].data.y) + y : y;
    }
  }
  selection.scale = function (x) {
        console.log(this.length)
    for (var i = 0; i < this.length; i++) {
      this[i].data.scale -= -x * config.scaleStep * config.visualScaling / 10;
    }
  }
  selection.setScale = function (s) {
    for (var i = 0; i < this.length; i++) {
      this[i].data.scale = s;
    }
  }
  selection.rotate = function (x) {
    for (var i = 0; i < this.length; i++) {
      this[i].data.rotate -= -x * config.rotateStep % 360;
    }
  }
  selection.setRotate = function (r) {
    for (var i = 0; i < this.length; i++) {
      this[i].data.rotate = r;
    }
  }
  selection.setX = function (x) {
    for (var i = 0; i < this.length; i++) {
      this[i].data.x = x;
    }
  }
  selection.setY = function (y) {
    for (var i = 0; i < this.length; i++) {
      this[i].data.y = y;
    }
  }
  selection.clear = function () {
    for (var i = 0; i < this.length; i++) {
      this[i].$node[0].classList.remove('selected');
    }
    this.length = 0;
  }

  handlers.move = function (x, y) {
    var v = fixVector(x, y);
    if (selection.length > 1) {
      selection.move(v.x, v.y);
    }
      var state = observableElement.getState();
      var newState = {};

      newState.data.x = (state.data.x) ? (state.data.x) + v.x : v.x;
      newState.data.y = (state.data.y) ? (state.data.y) + v.y : v.y;

      observableElement.setState(newState);

  };
  handlers.scale = function (x) {
    if (selection.length > 1) {
      selection.scale(x);
    }

      var newState = {};

      newState.data.scale -= -x * config.scaleStep * config.visualScaling / 10;

      observableElement.setState(newState);

  };
  handlers.rotate = function (x) {
    if (selection.length > 1) {
      selection.rotate(x);
    }

      var newState = {};

      newState.data.rotate -= -x * config.rotateStep % 360;

      observableElement.setState(newState);
  };

  //new
  handlers.rotateX=function(x,y){
    var v = fixVector(x, y);

      var newState = {};

    // selection.length ???
      newState.data.rotateX += -v.y * config.rotateStep % 360; // added % 360
      newState.data.rotateY += v.x * config.rotateStep % 360;  // added % 360

      observableElement.setState(newState);
  };//new

  function init(conf) {

    config = $.extend(config, conf);

    if (config.setTransformationCallback) {
      config.setTransformationCallback(function (x) {
        // guess what, it indicates slide change too :)
        $controls.hide();

        //setting pu movement scale
        config.visualScaling = x.scale;
        //console.log(x.scale);
        //TODO: implement rotation handling for move
        config.rotation = ~~ (x.rotate.z);
        //console.log('rotate',x.rotate.z);
        //I don't see why I should need translation right now, but who knows...
      })
    }

    $('body').addClass('edit');
    $overview = $('#overview');

    // Main controls
    //$menu = $('<div id="builder-main"></div>');
   // $('<div class="builder-bt"></div>').appendTo($menu).text('Save').on('click', SaveContent); // TODO
   // $('<div class="builder-bt"></div>').appendTo($menu).text('Preview'); // TODO
   // $('<div class="builder-bt"></div>').appendTo($menu).text('Settings').on('click', openMyModal);
   // $('<div class="builder-bt"></div>').appendTo($menu).text('Overview').on('click', function () { config['goto']('overview'); });
   // $('<div class="builder-bt bt-delete"></div>').appendTo($menu).text('Delete').on('click', deleteContents);

    // Add slide
    //$('<span class="plus"></span>').wrap('<div class="bt-add-slide"></div>').text('+').parent().appendTo('body').on('click', addSlide);

    // Return to presentation 
    //$('<span></span>').wrap('<a href="#" class="back-button">◄ </a>').text('Your presentation').parent().appendTo('body').on('click', gotoPresentation);

    // Sliders 
    // $sliders = $('<div id="sliders"></div>');
    // $('<div class="sliders-button">Position</div>').appendTo($sliders);
    // $('<span>X: </span>').appendTo($sliders);
    // $('<input type="text" class="slidable" step="1" min="-Infinity" max="Infinity" placeholder="X">').attr('id', 'mx').addClass('bt-text').text('Edit').appendTo($sliders);
    // $('<span>Y: </span>').appendTo($sliders);
    // $('<input type="text" class="slidable" step="1" min="-Infinity" max="Infinity" placeholder="Y">').attr('id', 'my').addClass('bt-text').text('Edit').appendTo($sliders);
    // $('<span>Z: </span>').appendTo($sliders);
    // $('<input type="text" class="slidable" step="1" min="-Infinity" max="Infinity" placeholder="Z">').attr('id', 'mz').addClass('bt-text').text('Edit').appendTo($sliders);

    // $('<div class="sliders-button">Scale</div>').appendTo($sliders);
    // $('<span>S: </span>').appendTo($sliders);
    // $('<input type="text" class="slidable" step="0.01" min="-100" max="100" placeholder="Sz">').attr('id', 'ms').addClass('bt-text').text('Edit').appendTo($sliders);

    // $('<div class="sliders-button">Rotation</div>').appendTo($sliders);
    // $('<span>X: </span>').appendTo($sliders);
    // $('<input type="text" class="slidable" step="1" min="-360" max="360" placeholder="Rx">').attr('id', 'mrx').addClass('bt-text').text('Edit').appendTo($sliders);
    // $('<span>Y: </span>').appendTo($sliders);
    // $('<input type="text" class="slidable" step="1" min="-360" max="360" placeholder="Ry">').attr('id', 'mry').addClass('bt-text').text('Edit').appendTo($sliders);
    // $('<span>Z: </span>').appendTo($sliders);
    // $('<input type="text" class="slidable" step="1" min="-360" max="360" placeholder="Rz">').attr('id', 'mr').addClass('bt-text').text('Edit').appendTo($sliders);


   // $menu.appendTo('body');
   // $sliders.appendTo('body');

    $controls = $('<div class="builder-controls"></div>').hide();

  //  $('<div class="bt-delete"></div>').attr('title', 'Delete').click(deleteContents).appendTo($controls);
    $('<div class="bt-move border"></div>').attr('title', 'Move').data('func', 'move').appendTo($controls);
    $('<div class="bt-rotate border"></div>').attr('title', 'Rotate').data('func', 'rotate').appendTo($controls);
    $('<div class="bt-scale border"></div>').attr('title', 'Scale').data('func', 'scale').appendTo($controls);
    $('<div class="bt-rotateX"></div>').attr('title', 'RotateX').data('func', 'rotateX').appendTo($controls);

    //render the layout HTML
    dust.render('layout', {}, function(err,out){
      $('body').append(out)
      
      //initialize the layoutManager which manages the alignment panel
      var layoutManager = new LayoutManager(
      { 
        selection : selection,
        redrawFunction : config.redrawFunction
      }, jQuery);

      var thumbsManager = new ThumbManager(
      { 
        sels : {
          thumbsBarId: "#thumbs-bar",
          thumbsHolderId    : "#thumb-holder",
          thumbContainerClass  : "thumb",
          slideThumbClass : "thumb-step",
          dragBarId: "#thumbs-bar #dragbar"
        }
      }, jQuery);
    })


    //GIORGOS: Edw sou epistrefw sto slideRefId to id tou step
    // pou antistoixei sto thumb pou patithike
    // To mono pou prepei na kaneis einai na to kaneis highlight
    // kai pithanws na to valeis sto selection
    $(document).on('thumbmanager:thumb-clicked', function(event){
      console.log(event.originalEvent.detail.thumbId)
      console.log(event.originalEvent.detail.slideRefId)
    });

    //GIORGOS: Auto einai etoimo aplws sou exw console log
    // ta properties pou epistrefei to event. svhsta otan 
    // katalaveis ti ginetai
    $(document).on('thumbmanager:thumb-sorted', function(event){
      console.log(event.originalEvent.detail.thumbId)
      console.log(event.originalEvent.detail.slideRefId)
      console.log(event.originalEvent.detail.newIndex)

      var detail    = event.originalEvent.detail
      , thumbId     = detail.thumbId
      , slideRefId  = detail.slideRefId
      , newIndex    = detail.newIndex;


      //ignore overview slide
      if(newIndex>0){
        $("#"+slideRefId).insertAfter($(".step:not(#overview)").eq(newIndex-1))
      }else{
        $("#"+slideRefId).insertBefore($(".step:not(#overview)").eq(0))
      }

    });

    $('.button.save').on('click', function () { asqEditor.save(); });
    $('.button.overview').on('click', function () { config['goto']('overview'); });
    $('.button.back').on('click', gotoPresentation);
    $('.button.add').on('click', addSlide);
   

    // var links = "<ul>";
    // [].forEach.call(document.querySelectorAll(".step"), function( el, idx ){
    //     links += "<li><a href='#" + el.id + "'>Step " + idx + "</a></li>";
    // })
    // links += "</ul>";

    // $('<nav></nav>').html(links).appendTo(".timeline");


    // $("#my").attr("value",$(".active").attr("data-y") || 0);
    // $("#mz").attr("value",$(".active").attr("data-z") || 0);

    var showTimer;

    $controls.appendTo('body').on('mousedown', 'div', function (e) {
      e.preventDefault();
      mouse.activeFunction = handlers[$(this).data('func')];
      loadData();
      //console.log('loadata called')
      mouse.prevX = e.pageX;
      mouse.prevY = e.pageY;
      $(document).on('mousemove.handler1', handleMouseMove);
      return false;
    }).on('mouseenter', function () {
      clearTimeout(showTimer);
    });
    $(document).on('mouseup', function () {
      mouse.activeFunction = false;
      $(document).off('mousemove.handler1');
    });


    $('body').on('mouseenter', '.step', function (e) {
      var shift = (e.shiftKey == 1);
     // if ($(this).attr('id') !== 'overview') 
      var $t = $(this);
     // console.log($t.attr('id'))
      showTimer = setTimeout(function () {
        if (!mouse.activeFunction) {
          //show controls
            var newState = {};

            newState.$node = $t;
            observableElement.setState(newState);

            loadData();
            showControls(newState.$node);

            var state = observableElement.getState();

          // MULTIPLE SELECTION OF STEPS
          if (shift) {
            if (!selection.hasstate(state)) {
              selection.pushstate(state);
            }
          } else {
            selection.clear();
          }
        }
      }, 100);
      $t.data('showTimer', showTimer);
    }).on('mouseleave', '.step', function () {
      //not showing when not staying
      clearTimeout($(this).data('showTimer'));
    });


    // keep hover effect when leaving from a step
    // the user can see which element is selected
    $('body').on('mouseenter', '.step', function(e) {
      $('#impress').find('.hover').removeClass('hover');
      $(this).addClass('hover')
    }).on('mouseleave', '.step', function(){
      $(this).addClass('hover')
    });



    $(window).on('beforeunload', function () {
      return 'All changes will be lost';
    });

    config['goto']('start');

  }

  // PLUGIN
  jQuery.fn.slidingInput = function (opts) {

      var defaults = {
          step: 1, // Increment value
          min: 0, // Minimum value
          max: 100, // Maximum value
          tolerance: 2 // Mouse movement allowed within a simple click
      };

      return this.each(function () {
          var $el = $(this),
              options = $.extend({}, defaults, opts, this),
              distance = 0,
              initialValue = 0;

          function mouseDown() {
              distance = 0;

              // check for integer numbers
              if ($el.val() % 1 === 0) {
                initialValue = parseInt($el.val(), 10);
              }
              else {
                initialValue = parseFloat($el.val());
              }

              updateSync($el);

              $(document).on('mousemove', mouseMove).on('mouseup', mouseUp);

              return false;
          }

          function mouseMove(e) {

              var currentValue;
              if ($el.val() % 1 === 0) {
                currentValue = parseInt($el.val(), 10);
              }
              else {
                currentValue = parseFloat($el.val());
              }

             // var currentValue = parseInt($el.val(), 10),
               var event = e.originalEvent,
                  movementX = event.movementX || event.webkitMovementX || event.mozMovementX || 0,
                  movementY = event.movementY || event.webkitMovementY || event.mozMovementY || 0;              

              distance += (movementX - movementY) * options.step;

              $el.val(Math.min(options.max, Math.max(initialValue + distance, options.min)));

              updateSync($el);

          }

          function mouseUp() {
              $(document).off('mousemove mouseup');

              if (Math.abs(distance) < options.tolerance) {
                  $el.focus();
              }
          }

          $el.on('mousedown', mouseDown);
      });
  };


  function updateSync($el) {

      var newState = {};
    if($el.attr('id') == 'mx') {

        newState.data.x = $el.val();
      selection.setX(newState.data.x);
      redraw();
    }
    if ($el.attr('id') == 'my') {

        newState.data.y = $el.val();
      selection.setY(newState.data.y);
      redraw();
    }

    if ($el.attr('id') == 'mz') {

        newState.data.z = $el.val();
      // selection.setY(newState.data.y); // TO DO
      redraw();
    }

    if ($el.attr('id') == 'ms') {

        newState.data.scale = $el.val();
      selection.setScale(newState.data.scale);
      redraw();
    }

    if ($el.attr('id') == 'mr') {

        newState.data.rotate = $el.val();
      selection.setRotate(newState.data.rotate);
      redraw();
    }

    if ($el.attr('id') == 'mrx') {

        newState.data.rotateX = $el.val();
      //selection.setRotate(newState.data.rotate); //TO DO
      redraw();
    }

    if ($el.attr('id') == 'mry') {

        newState.data.rotateY = $el.val();
      //selection.setRotate(newState.data.rotate); //TO DO
      redraw();
    }

      observableElement.setState(newState);

  }


  var sequence = (function () {
    var s = 1;
    return function () {
      return s++;
    }
  })()

  var offset = (function () {
    var offset = 0;
    return function () {
      return offset+=1100;
    }
  })()

  function addSlide() {
    //console.log('add')
    //query slide id
    var id, $step;
    var seq = sequence();
    id = 'NewSlide' + seq;
    $step = $('<div class="step"></div>').html('<h1>This is a new step ' + seq + '</h1> <p>How about some contents?</p>');
    $step[0].id = id;
    $step[0].dataset.x = offset();
    $step[0].dataset.scale = 1;
    //console.log($('.step:last'))
    // works when the overview div is the first child of impress main div
    $step.insertAfter($('.step:last')); //not too performant, but future proof
    config.creationFunction($step[0]);
    // jump to the new slide to make some room to look around
    //config.showMenu();
    config.makeEditable(id);
    config['goto']($step[0]);

  }

  function showControls($where) {
    
    var top, left, pos = $where.offset();
    //not going out the edges (at least one way)
    top = (pos.top > 0) ? pos.top + (100 / config.visualScaling) : 0;
    left = (pos.left > 0) ? pos.left  + (100 / config.visualScaling) : 0;

    $controls.show().offset({
      top: top,
      left: left
    });

      var state = observableElement.getState();

    // difference between attr() and .val()
    $("#mx").val(state.data.x || 0);      
    $("#my").val(state.data.y || 0);
    $("#mz").val(state.data.z || 0);
    $("#mr").val(state.data.rotate || 0);
    $("#ms").val(state.data.scale || 0);
    $("#mrx").val(state.data.rotateX || 0);
    $("#mry").val(state.data.rotateY || 0);

  }

  // function SaveContent() {
  //   asqEditor.save()
  // }

  function deleteContents() {

      var state = observableElement.getState();

    var el = state.$node[0];
    if(el.getAttribute("id") !== "overview") {
      var r = confirm("Are you sure you want to delete this slide?");
      //console.log($(this))
      if (r == true) {
        config.deleteStep(el.getAttribute("id"));
        //console.log(  config)
        el.remove();
        // make showmenu not to display the deleted slides
        config.showMenu();
        config['goto']("overview");
      }
    }
  }


  // go to presentation mode 
  // remove the query from the url
  function gotoPresentation () {
    var re = /([^?]+).*/;
    var result = re.exec(document.location.href);
    document.location.href = result[1];
  }


  function loadData() {

      var state = observableElement.getState();
      var newState = {};

    //state.data=state.$node[0].dataset;
    //add defaults
      newState.data.x = parseFloat(state.$node[0].dataset.x) || defaults.x;
      newState.data.y = parseFloat(state.$node[0].dataset.y) || defaults.y;
      newState.data.z=parseFloat(state.$node[0].dataset.z) || defaults.z; //new
      newState.data.scale = parseFloat(state.$node[0].dataset.scale) || defaults.scale;
      newState.data.rotate = parseFloat(state.$node[0].dataset.rotate) || defaults.rotate;
      newState.data.rotateX=parseFloat(state.$node[0].dataset.rotateX) || defaults.rotate; //new
      newState.data.rotateY=parseFloat(state.$node[0].dataset.rotateY) || defaults.rotate; //new

      observableElement.setState(newState);

  }

    function Observer(){

        var hash = "";

        this.getHash = function(){

            // The hash may not change as soon as it is generated,
            // otherwise the Observer cannot be retrieved in a HashSet
            if(hash === ""){
                hash = randomHash();
            }
            return hash

        };
        this.update =  function(){ throw "Observable object does not implement update()" };

    }

    function newTextBoxObserver(){
        var that = new Observer();

        that.update = update;

        function update( observable ){
            var state = observable.getState();
            showControls(state.$node);
        }

        return that;
    }

    function newCanvasObserver(){
        var that = new Observer();

        function update( observable ){
            var state = observable.getState();

        }

        return that;
    }

    // Observables can be checked by using
    // instanceof Observable
    function Observable(my){

        this.getState =       function(){ throw "Observable object does not implement getState()" }
        this.setState =       function(){ throw "Observable object does not implement setState()" }
        this.notify =         function(){ throw "Observable object does not implement notify()" }

        this.addObserver = function (observer){
            my.observerSet.add(observer);
        }

        this.removeObserver = function (observer){
            my.observerSet.remove(observer);
        }

    }

    // Observers can be registered using the addObserver method.
    // Observers can be removed using the removeObserver method.
    function newObservableElement(){

        var observerSet = newHashSet(),
            my = {observerSet:observerSet};

        var that = new Observable(my),
            state = {
                editing: false,
                $node: false,
                data: {
                    x: 0,
                    y: 0,
                    z: 0, //new
                    rotate: 0,
                    rotateX: 0, //new
                    rotateY: 0, //new
                    scale: 0
                }
            };

        that.getState = getState;
        that.setState = setState;
        that.notify = notify;

        function getState(){
            // Maybe return a deep copy such that state cannot be tempered with from outside
            return state;
        }

        // Do not pass a state with a recursive structure like
        // state.recursiveAttribute = state
        // This will lead to an infinite loop
        function setState(newState){

            if(newState.editing !== "undefined"){
                state.editing = newState.editing;
            }
            if(newState.$node !== "undefined") {
                state.$node = newState.$node;
            }
            if(newState.data !== "undefined") {
                if (newState.data.x !== "undefined") {
                    state.data.x = newState.data.x;
                }
                if (newState.data.y !== "undefined") {
                    state.data.y = newState.data.y;
                }
                if (newState.data.z !== "undefined") {
                    state.data.z = newState.data.z;
                }
                if (newState.data.rotate !== "undefined") {
                    state.data.rotate = newState.data.rotate;
                }
                if (newState.data.rotateX !== "undefined") {
                    state.data.rotateX = newState.data.rotateX;
                }
                if (newState.data.rotateY !== "undefined") {
                    state.data.rotateY = newState.data.rotateY;
                }
                if (newState.data.scale !== "undefined") {
                    state.data.scale = newState.data.scale;
                }
            }

            that.notify();

        }

        function notify(){

            var iterator = observerSet.createIterator(),
                observer = iterator.next();

            while( observer !== undefined ){
                try{
                    observer.update(that);
                }
                catch(e){
                    throw "Obsever does not implement update()"
                }
                observer = iterator.next();
            }
        }

        return that;
    }

    function deepCopy(object){
        var objectCopy = {};
        deepUpdate( object, objectCopy );
        return objectCopy;
    }

// Updates the destination object with the data of the update object.
    // update is traversed in a breadth-first fashion and if a node
    // of the update object does not exist in the destination object
    // it is created. If the node already exists it is updated with the
    // node value of update.
    // TODO: Arrays that should be altered in just one position can not be handled yet,
    // except when the position is 0.
    function deepUpdate( update, destination ){

        var fifo = newFifoQueue(),
            currentNode,    // The current node in destination
            currentNodeNew, // The current node in update
            currentNodeDict,
            currentKeysNew,
            key;

        fifo.push( {node:destination, nodeNew:update} );

        while( fifo.getSize() > 0 ){

            currentNodeDict = fifo.pop();
            currentNode = currentNodeDict.node;
            currentNodeNew = currentNodeDict.nodeNew;
            currentKeysNew = Object.keys(currentNodeNew);

            if(currentKeysNew.length > 0) {
                // Non-leaf node in stateNew
                for(var i=0; i < currentKeysNew.length; i++){

                    key = currentKeysNew[i];
                    // Check whether the current node's child has children of its own
                    if(currentNodeNew[key] !== null && currentNodeNew[key] !== undefined && Object.keys(currentNodeNew[key]).length > 0){

                        // Child is a non-leaf node as well
                        // Step down further
                        if(   currentNodeNew[key] instanceof Array &&
                            !( currentNode[key]    instanceof Array ) ){
                            currentNode[key] = [];

                        }
                        else if(
                            currentNodeNew[key] instanceof Object &&
                            !( currentNode[key]    instanceof Object ))
                        {
                            currentNode[key] = currentNodeNew[key];
                        }

                        fifo.push( {node:currentNode[key], nodeNew:currentNodeNew[key]} );
                    }
                    else{
                        // Child is a leaf node
                        if(currentNodeNew[key] !== undefined){
                            currentNode[key] = currentNodeNew[key];
                        }
                    }

                }
            }

        }
    }

    function newFifoQueue(){

        var that = {},
            queue = [];

        that.pop = pop;
        that.push = push;
        that.getSize = getSize;

        function pop(){
            return queue.splice(0,1)[0];
        }
        function push(item){
            queue.push(item);
        }
        function getSize(){
            return queue.length;
        }
        return that;

    };

    function newHashSet(){

        var that = {},
            objectSet = {};

        that.add = add;
        that.remove = remove;
        that.contains = contains;
        that.createIterator = createIterator;

        function add(object){
            objectSet[object.getHash()] = object;
            console.log(objectSet);
        }

        function remove(object){
            delete objectSet[object.getHash()];
            console.log(objectSet);
        }

        function contains(object){
            return object.getHash() in objectSet;
        }



        function createIterator() {

            var that = {},
                currentIndex = 0,
                keys = Object.keys( objectSet );

            that.next = next;

            function next() {
                return objectSet[ keys[ currentIndex++ ] ];
            }

            return that;

        }

        return that;

    }

  function redraw() {
    clearTimeout(redrawTimeout);
    redrawTimeout = setTimeout(function () {
      //state.$node[0].dataset=state.data;

      if (selection.length > 1) {
        for (var i = 0; i < selection.length; i++) {
          selection[i].$node[0].dataset.x = selection[i].data.x;
          selection[i].$node[0].dataset.y = selection[i].data.y;
          selection[i].$node[0].dataset.rotate = selection[i].data.rotate;
          selection[i].$node[0].dataset.scale = selection[i].data.scale;

          config.redrawFunction(selection[i].$node[0]);
        }
      }

        var state = observableElement.getState();
        // clone state.$node since otherwise the state would already be altered, before calling setState()
        var newState = { $node:state.$node.clone() };

        newState.$node[0].dataset.scale = state.data.scale;
        newState.$node[0].dataset.rotate = state.data.rotate;
        newState.$node[0].dataset.rotateX = state.data.rotateX; //new
        newState.$node[0].dataset.rotateY = state.data.rotateY; //new
        newState.$node[0].dataset.x = state.data.x;
        newState.$node[0].dataset.y = state.data.y;
        newState.$node[0].dataset.z = state.data.z; //new

        observableElement.setState(newState);

      /**/
      //console.log(state.data,state.$node[0].dataset,state.$node[0].dataset===state.data);

      config.redrawFunction(state.$node[0]);
      showControls(state.$node);
      //console.log(['redrawn',state.$node[0].dataset]);
    }, 20);
  }

  function fixVector(x, y) {
    var result = {
      x: 0,
      y: 0
    },
      angle = (config.rotation / 180) * Math.PI,
      cs = Math.cos(angle),
      sn = Math.sin(angle);

    result.x = (x * cs - y * sn) * config.visualScaling;
    result.y = (x * sn + y * cs) * config.visualScaling;
    return result;
  }

  function handleMouseMove(e) {
    e.preventDefault();
    e.stopPropagation();

    var x = e.pageX - mouse.prevX,
      y = e.pageY - mouse.prevY;

    mouse.prevX = e.pageX;
    mouse.prevY = e.pageY;
    if (mouse.activeFunction) {
      mouse.activeFunction(x, y);
      redraw();
    }

    return false;
  }

  return {
    init: init
  };


})();


// PLUGINS

$(function () {

  // Initialise plugin
  $('.slidable').slidingInput();

  // Accepts options object that override defaults, but step/min/max on input override options
  /*
      $('.slidable').slidingInput({
          step: 1,
          min: 0,
          max: 100,
          tolerance: 2
      });
  */

  // copied from impress.js Copyright 2011-2012 Bartek Szopka (@bartaz)
  var pfx = (function() {
    var style = document.createElement('dummy').style,
            prefixes = 'Webkit Moz O ms Khtml'.split(' '),
            memory = {};
    return function(prop) {
        if (typeof memory[ prop ] === "undefined") {
            var ucProp = prop.charAt(0).toUpperCase() + prop.substr(1),
                    props = (prop + ' ' + prefixes.join(ucProp + ' ') + ucProp).split(' ');
            memory[ prop ] = null;
            for (var i in props) {
                if (style[ props[i] ] !== undefined) {
                    memory[ prop ] = props[i];
                    break;
                }
            }
        }
        return memory[ prop ];
    };
  }());

  function getTrans3D() {

    var prefix = (pfx('transform'));
    var trans = $("#impress div:first-child")[0].style['' + prefix + ''].match(/.+?\(.+?\)/g);
    var dico = {};
    for (var el in trans) {
        var ele = trans[el];
        var key = ele.match(/.+?\(/g).join("").match(/[a-zA-Z0-9]/g).join("");
        var value = ele.match(/\(.+\)/g)[0].split(",");
        if (value.length <= 1) {
            value = parseFloat(value[0].match(/-[0-9]+|[0-9]+/g)[0]);
            dico[key] = value;
        } else {
            dico[key] = {};
            for (val in value) {
                var vale = parseFloat(value[val].match(/-[0-9]+|[0-9]+/g)[0]);
                dico[key][val] = vale;
            }
        }
    }
    return dico;

  }

  // copied from impress.js Copyright 2011-2012 Bartek Szopka (@bartaz)
  // `translate` builds a translate transform string for given data.
  function translate(t) {
    return " translate3d(" + t.translate3d[0] + "px," + t.translate3d[1] + "px," + t.translate3d[2] + "px) ";
  };

  // copied from impress.js Copyright 2011-2012 Bartek Szopka (@bartaz)
  // `rotate` builds a rotate transform string for given data.
  // By default the rotations are in X Y Z order that can be reverted by passing `true`
  // as second parameter.
  function rotate(r, revert) {
    var rX = " rotateX(" + r.rotateX + "deg) ",
      rY = " rotateY(" + r.rotateY + "deg) ",
      rZ = " rotateZ(" + r.rotateZ + "deg) ";

    return revert ? rZ + rY + rX : rX + rY + rZ;
  };

  // copied from impress.js Copyright 2011-2012 Bartek Szopka (@bartaz)
  // `css` function applies the styles given in `props` object to the element
  // given as `el`. It runs all property names through `pfx` function to make
  // sure proper prefixed version of the property is used.
  function css  (el, props) {
    var key, pkey;
    for (key in props) {
      if (props.hasOwnProperty(key)) {
        pkey = pfx(key);
        if (pkey !== null) {
          el.style[pkey] = props[key];
        }
      }
    }
    return el;
  };


  $(document).mousewheel(function(event, delta, deltaX, deltaY) {

    // hack similar in the impress.js to deactivate all handlres when editing a step
    // TODO: not so efficient because of the parentNode
    var target = event.target;

    if (target.classList.contains('nicEdit-selected') || target.parentNode.classList.contains('nicEdit-selected')) {
      return;
    }

    var transform = getTrans3D();
    transform.translate3d[2] = transform.translate3d[2] + deltaY * 10;

    //set transfor and then
    //set transition to 0 for fast response. We don' need impress animations when zooming
    css($('#impress div:first-child')[0], {
      transform: rotate(transform, true) + translate(transform),
      transition: "all 0 ease 0" 
    })
  }); 

  // credits to https://github.com/clairezed/ImpressEdit 
  // compute the right angle for the position and rotation
  function angle (obj, e) {
      var alpha = obj.rotateX * 2 * Math.PI / 360;
      var beta = obj.rotateY * 2 * Math.PI / 360;
      var gamma = obj.rotateZ * 2 * Math.PI / 360;


      var dReal = {
          x: e.pageX - $("#impress").data('event').pos.x,
          y: e.pageY - $("#impress").data('event').pos.y
      };

      var scale = -1;

      var dVirtuel = {
          x: 0,
          y: 0,
          z: 0
      };

      //to rotate in Z
      dVirtuel.x += dReal.x * Math.cos(gamma) + dReal.y * Math.sin(gamma);
      dVirtuel.y += dReal.y * Math.cos(gamma) - dReal.x * Math.sin(gamma);
      dVirtuel.z += 0;

      //to rotate in X
      dVirtuel.x += dReal.x;
      dVirtuel.y += dReal.y * Math.cos(alpha);
      dVirtuel.z += -dReal.y * Math.sin(alpha);

      //to rotate in Y
      dVirtuel.x += dReal.x * Math.cos(beta);
      dVirtuel.y += dReal.y * Math.cos(beta) - dReal.y * Math.sin(beta);
      dVirtuel.z += dReal.x * Math.sin(beta);

      var dVirtuel = {
          x: 0,
          y: 0,
          z: 0
      };

      dVirtuel.x += dReal.x * (Math.cos(gamma) + Math.cos(beta)) + dReal.y * Math.sin(gamma);
      dVirtuel.y += dReal.y * (Math.cos(gamma) + Math.cos(alpha) + Math.cos(beta) - Math.sin(beta)) - dReal.x * Math.sin(gamma);
      dVirtuel.z += dReal.x * Math.sin(beta) - dReal.y * Math.sin(alpha);
      //
      dVirtuel.x *= scale;
      dVirtuel.y *= scale;
      dVirtuel.z *= scale;

      var object = {
        dVirtuelX : dVirtuel.x,
        dVirtuelY : dVirtuel.y,
        dVirtuelZ : dVirtuel.z

      }
      return object;
  }


  // copied from https://github.com/clairezed/ImpressEdit
  $(document).mousedown(function(event) {

    // hack similar in the impress.js to deactivate all handlres when editing a step
    // TODO: not so efficient because of the parentNode
    var target = event.target;

    if (target.classList.contains('nicEdit-selected') || target.parentNode.classList.contains('nicEdit-selected')) {
      return;
    }

    $("#impress").data('event', {
        pos: {
            x: event.pageX,
            y: event.pageY
        }
    });

    // hold the left click to move the viewport
    if (event.which === 1) {
      $(this).on('mousemove.moveView', function(event) {
        var transform = getTrans3D();
        var obj = angle(transform, event);

        transform.translate3d[0] = parseInt(transform.translate3d[0] - obj.dVirtuelX);
        transform.translate3d[1] = parseInt(transform.translate3d[1] - obj.dVirtuelY);
        transform.translate3d[2] = parseInt(transform.translate3d[2] - obj.dVirtuelZ);

        // update the old mouse position 
        $("#impress").data('event').pos.x = event.pageX;
        $("#impress").data('event').pos.y = event.pageY;
        
        css($('#impress div:first-child')[0], {
          transform: rotate(transform, true) + translate(transform),
          transition: "all 0 ease 0" 
        })

      });

    }

    // hold the middle mouse click to rotate the viewport
    if (event.which === 2) {

      $(this).on('mousemove.rotateView', function(event) {

        var transform = getTrans3D();
        var obj = angle(transform, event);

        transform.rotateX = parseInt(transform.rotateX - obj.dVirtuelX);
        transform.rotateY = parseInt(transform.rotateY - obj.dVirtuelY);
        transform.rotateZ = parseInt(transform.rotateZ - obj.dVirtuelZ);

        // update the old mouse position 
        $("#impress").data('event').pos.x = event.pageX;
        $("#impress").data('event').pos.y = event.pageY;
        
        css($('#impress div:first-child')[0], {
          transform: rotate(transform, true) + translate(transform),
          transition: "all 0 ease 0" 
        })

      });
    }

    // unbind handlers
    $(this).on("mouseup", function() {
      $('body').css('cursor', 'default');
      $(this).off(".moveView");
      $(this).off(".rotateView");
    });
   

  }); 


});

// From http://stackoverflow.com/questions/10726909/random-alpha-numeric-string-in-javascript
function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}
function randomHash(){
    return randomString(80, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_')
}