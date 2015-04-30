// since this works with selectors this object must be called
// after the dom has loaded

function LayoutManager (options, $){
  this.options = options;

  this.alignment = {
      horizontal : '' ,
      vertical : ''
    }

  // external function that will redraw the slides
  , this.redrawFunction = function(){}

  // the objects that holds the html nodes to align
  ,this.selection = []

  , $rowIcon = $('.alignment-row').find('a')
  , $columnIcon = $('.alignment-column').find('a')
  , icons = {

      vertical : {
        left : "img/AlignColumnLeft.png",
        center: "img/AlignColumnCenter.png",
        right: "img/AlignColumnRight.png",
      },

      horizontal : {
        top : "img/AlignRowTop.png",
        center: "img/AlignRowCenter.png",
        bottom: "img/AlignRowBottom.png",
      }
     
  };

  LayoutManager.prototype.validateAndSetOptions = function (options){
    if (options == null || options == undefined){
      throw new Error("layoutManager.js: You should pass the redrawFunction and the selection array as options")
    }

    if(!(options.selection instanceof Array)){
      throw new Error("layoutManager.js: selection should be an array");
    }

    if (!options.redrawFunction || typeof options.redrawFunction != "function"){
      throw new Error("layoutManager.js: redrawFunction should be a function")
    }
    
    this.selection      = options.selection;
    this.redrawFunction = options.redrawFunction;
  }

  LayoutManager.prototype.init = function(){
    this.validateAndSetOptions(this.options)

    //initiate center-center alignment
    this.onAlignmentCircleClick($('#center-center'))
    this.setUpListeners();
  }

  // update align icons
  LayoutManager.prototype.setAlignIcons = function() {
    $columnIcon.css( 'background-image', 'url("'+ icons.vertical[this.alignment.vertical] +'")' );
    $rowIcon.css( 'background-image', 'url("'+ icons.horizontal[this.alignment.horizontal] +'")' );
  }

  // update alignment data
  LayoutManager.prototype.onAlignmentCircleClick = function($target){
    $('.circle-dot').removeClass('active');
    $target.addClass('active');

    //store alignment setting
    this.alignment.horizontal = $target.data("horizontal"),
    this.alignment.vertical = $target.data("vertical")

    this.setAlignIcons();
  }

  // mouse and keyboard listeners
  LayoutManager.prototype.setUpListeners = function(){
    var that=this;
    $(document)
    .on('click',".circle-dot", function(event){
      event.preventDefault();
      that.onAlignmentCircleClick($(event.target));
    })
    .on('keyup', "#horizontal-spacing", function(event){
      var value = $(this).val();
    })
    .on('keyup', "#vertical-spacing", function(event){
      var value = $(this).val();
    })
    .on('keyup', "#grid-value", function(event){
      var value = $(this).val();
      that.layoutInGrid(value);
    })
    .on('keyup', "#circle-value", function(event){
      var value = $(this).val();
      that.layoutInCircle(value);
    })
    .on('mousedown',".icon-holder a", function(event){
      event.preventDefault();
      $(event.target)
        .css("opacity", 0.7)
        .parent().css("opacity", 0.7)
    })
    .on('mouseup',".icon-holder a", function(event){
      event.preventDefault();
      $(event.target)
        .css("opacity", 1)
        .parent().css("opacity", 1)
    })
    .on('mouseout',".icon-holder a", function(event){
      event.preventDefault();
      $(event.target)
        .css("opacity", 1)
        .parent().css("opacity", 1)
    })
    .on('mousedown mousewheel', '.sidebar', function(event) {
      event.stopPropagation(); // prevent all the handlers of viewport
    })
    .on('click', '.alignment-row', function(event) {
      event.preventDefault();
      that.alignHorizontally();
    })
    .on('click', '.alignment-column', function(event) {
      event.preventDefault();
      that.alignVertically();
    })
    .on('click', '.spread-row', function(event) {
      event.preventDefault();
      that.spreadHorizontally();
    })
    .on('click', '.spread-column', function(event) {
      event.preventDefault();
      that.spreadVertically();
    })
    .on('click', '.offset-horizontal', function(event) {
      event.preventDefault();
      that.offsetHorizontally();
    })
    .on('click', '.offset-vertical', function(event) {
      event.preventDefault();
      that.offsetVertically();
    })
    .on('click', '.grid-holder', function(event) {
      event.preventDefault();
      that.layoutInGrid();
    })
    .on('click', '.circle-holder', function(event) {
      event.preventDefault();
      that.layoutInCircle();
    });
  }

 
  LayoutManager.prototype.alignHorizontally = function(){
    // do stuff
    console.log("I will align horizontally this selection")
    console.log(this.selection)



    if (this.selection.length<2) {
      console.log("Need two or more selected objects");
      return;
    }

    //calculateY is going to be a function that calculates the
    // Y coordinate for each element based on the horizontal 
    // alignement setting
    var calculateY

    // targetY is going to hold the targetY for the top, center, or bottom
    // of each slide based on the horizontal alignment setting
    , targetY;

    switch(this.alignment.horizontal){
      case "top":
        targetY = (this.selection[0].data.y - this.selection[0].$node.eq(0).height()/2); 
        calculateY = function(obj, targetY){
          return (targetY + (obj.$node.eq(0).height()/2));
        }
        break;
      case "center":
        targetY = this.selection[0].data.y; 
        calculateY = function(obj, targetY){
          return (targetY);
        }
        break;
      case "bottom":
        targetY = (this.selection[0].data.y + this.selection[0].$node.eq(0).height()/2); 
        calculateY = function(obj, targetY){
          return (targetY - (obj.$node.eq(0).height()/2));
        }
        break;
    }

    var that = this;

    $.each(this.selection, function(index, obj){
        obj.data.y = calculateY(obj, targetY);
        obj.$node[0].dataset.y = obj.data.y;
        that.redrawFunction(obj.$node[0]);
      });
  }

  LayoutManager.prototype.alignVertically = function(){
    // do stuff
    console.log("I will align vertically this selection")
    console.log(this.selection)



    if (this.selection.length<2) {
      console.log("Need two or more selected objects");
      return;
    }

    //calculateX is going to be a function that calculates the
    // X coordinate for each element based on the vertical 
    // alignement setting
    var calculateX

    // targetX is going to hold the targetX for the top, center, or bottom
    // of each slide based on the vertical alignment setting
    , targetX;

    switch(this.alignment.vertical){
      case "left":
        targetX = (this.selection[0].data.x - this.selection[0].$node.eq(0).width()/2); 
        calculateX = function(obj, targetX){
          return (targetX + (obj.$node.eq(0).width()/2));
        }
        break;
      case "center":
        targetX = this.selection[0].data.x; 
        calculateX = function(obj, targetX){
          return (targetX);
        }
        break;
      case "right":
        targetX = (this.selection[0].data.x + this.selection[0].$node.eq(0).width()/2); 
        calculateX = function(obj, targetX){
          return (targetX - (obj.$node.eq(0).width()/2));
        }
        break;
    }

    var that = this;

    $.each(this.selection, function(index, obj){
        obj.data.x = calculateX(obj, targetX);
        obj.$node[0].dataset.x = obj.data.x;
        that.redrawFunction(obj.$node[0]);
      });
  }

  LayoutManager.prototype.spreadHorizontally = function(){
    // do stuff
    console.log("I will spread horizontally this selection");
    console.log(this.selection);

    var selLength = this.selection.length;
    if (selLength<3) {
      console.log("Need three or more selected objects");
      return;
    }

    var leftMost = this.selection[0]
    , rightMost = this.selection[0]

    $.each(this.selection, function(index, obj){
      if(obj.data.x < leftMost.data.x){
        leftMost = obj;
        return;
      }

      if(obj.data.x > rightMost.data.x){
        rightMost = obj;
      }
    });


    var distance =  rightMost.data.x - (rightMost.$node.eq(0).width()/2) - (leftMost.data.x + (leftMost.$node.eq(0).width()/2) )
    ,space2Spread = distance
    //element that are in between
    , inBetween = this.selection.slice(0)
    inBetween.splice(inBetween.indexOf(leftMost), 1);
    inBetween.splice(inBetween.indexOf(rightMost), 1);

    $.each(inBetween, function(index, obj){
      space2Spread-= obj.$node.eq(0).width()
    });

    if(space2Spread<0){
      console.log("Not enough space to spread");
      return false;
    }

    var spreadPerEl = space2Spread/(inBetween.length +1)
    , nextX = leftMost.data.x + (leftMost.$node.eq(0).width()/2) + spreadPerEl
    , that = this;

    $.each(inBetween, function(index, obj){
      obj.data.x = nextX + (obj.$node.eq(0).width()/2);
      obj.$node[0].dataset.x = obj.data.x;
      nextX = obj.data.x + (obj.$node.eq(0).width()/2) + spreadPerEl;
      that.redrawFunction(obj.$node[0]);
    });
  }

  LayoutManager.prototype.spreadVertically = function(){
    // do stuff
    console.log("I will spread vertically this selection");
    console.log(this.selection);

    var selLength = this.selection.length;
    if (selLength<3) {
      console.log("Need three or more selected objects");
      return;
    }

    var topMost = this.selection[0]
    , bottomMost = this.selection[0]

    $.each(this.selection, function(index, obj){
      if(obj.data.y < topMost.data.y){
        topMost = obj;
        return;
      }

      if(obj.data.y > bottomMost.data.y){
        bottomMost = obj;
      }
    });


    var distance =  bottomMost.data.y - (bottomMost.$node.eq(0).height()/2) - (topMost.data.y + (topMost.$node.eq(0).height()/2) )
    ,space2Spread = distance
    //element that are in between
    , inBetween = this.selection.slice(0)
    inBetween.splice(inBetween.indexOf(topMost), 1);
    inBetween.splice(inBetween.indexOf(bottomMost), 1);

    $.each(inBetween, function(index, obj){
      space2Spread-= obj.$node.eq(0).height()
    });

    if(space2Spread<0){
      console.log("Not enough space to spread");
      return false;
    }

    var spreadPerEl = space2Spread/(inBetween.length +1)
    , nextX = topMost.data.y + (topMost.$node.eq(0).height()/2) + spreadPerEl
    , that = this;


    $.each(inBetween, function(index, obj){
      obj.data.y = nextX + (obj.$node.eq(0).height()/2);
      obj.$node[0].dataset.y = obj.data.y;
      nextX = obj.data.y + (obj.$node.eq(0).height()/2) + spreadPerEl;
      that.redrawFunction(obj.$node[0]);
    });
  }

  LayoutManager.prototype.offsetHorizontally = function(){
    // do stuff
    console.log("I will offset horizontally this selection")
    console.log(this.selection)

    if (this.selection.length<2) {
      console.log("Need two or more selected objects");
      return;
    }

    var distance = parseInt($("#horizontal-spacing").val());

    var that = this;

    var newX = this.selection[0].data.x - (this.selection[0].$node.eq(0).width()/2);
    $.each(this.selection, function(index, obj){
        obj.data.x = newX + (obj.$node.eq(0).width()/2);
        obj.$node[0].dataset.x = obj.data.x;
        newX += parseInt(obj.$node.eq(0).width() + distance);
        that.redrawFunction(obj.$node[0]);
      });
  }

  LayoutManager.prototype.offsetVertically = function(){
    // do stuff
    console.log("I will offset horizontally this selection")
    console.log(this.selection)

    if (this.selection.length<2) {
      console.log("Need two or more selected objects");
      return;
    }

    var distance = parseInt($("#vertical-spacing").val());

    var that = this;

    var newX = this.selection[0].data.y - (this.selection[0].$node.eq(0).height()/2);
    $.each(this.selection, function(index, obj){
        obj.data.y = newX + (obj.$node.eq(0).height()/2);
        obj.$node[0].dataset.y = obj.data.y;
        newX += parseInt(obj.$node.eq(0).height() + distance);
        that.redrawFunction(obj.$node[0]);
      });
  }

  LayoutManager.prototype.layoutInGrid = function (opt) {

    console.log("I will align in grid this selection")
    console.log(this.selection)


    if (this.selection.length<2) {
      console.log("Need two or more selected objects");
      return;
    }

    var defaults = {
          gridSize : {
            columns : typeof opt !== 'undefined' ? opt : 3,
                  x : 1500,
                  y : 1500
          }
      };

    var offSetX = 0
      , offSetY = 0;

    var that = this;

    $.each(this.selection, function(index, obj){
      obj.data.x = offSetX + ((index % defaults.gridSize.columns) * defaults.gridSize.x); 
      obj.data.y = offSetY + ((Math.floor(index / defaults.gridSize.columns)) * defaults.gridSize.y);   

      obj.$node[0].dataset.x = obj.data.x;
      obj.$node[0].dataset.y = obj.data.y;

      that.redrawFunction(obj.$node[0]);
    });

  }

  LayoutManager.prototype.layoutInCircle = function (opt) {
    
    console.log("I will align in grid this selection")
    console.log(this.selection)


    if (this.selection.length<2) {
      console.log("Need two or more selected objects");
      return;
    }

    var offSetX = 2000
      , offSetY = 1000
      , angle = 0
      , radius = typeof opt !== 'undefined' ? opt : 1500
      , step = (2 * Math.PI) / this.selection.length;

    var that = this;

    $.each(this.selection, function(index, obj){

      obj.data.x = offSetX + Math.round(radius * Math.cos(angle));
      obj.data.y = offSetY + Math.round(radius * Math.sin(angle));

      obj.$node[0].dataset.x = obj.data.x;
      obj.$node[0].dataset.y = obj.data.y;

      angle += step;

      that.redrawFunction(obj.$node[0]);
    });

  }
  this.init();
};





