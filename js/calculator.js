// this object is the basis for all fields
const prices = {
    "base" : 260,
    "width":  { "min": 1000, "extra": 0.1  },
    "height": { "min":  800, "extra": 0.15 },
    "depth":  { "min": 15,   "extra": 0    } // correct?
  };
  // helper function to cast to number from string
  const toNum = str => isNaN(str) || str.trim() === "" ? 0 : +str;
  
  
  const compute = e => {
    if (e) e.target.reportValidity(); // show error if field is emptied
    let width = toNum($('#width').val()),
       height = toNum($('#height').val()),
        depth = toNum($('#depth').val()),
       colour = toNum($('#colour').val()),
       grille = toNum($('#grille').val()),
    widthPrice  = (width - prices["width"].min)*prices["width"].extra,
    heightPrice  = (height - prices["height"].min)*prices["height"].extra,
    depthPrice  = (depth - prices["depth"].min)*prices["depth"].extra,
    total = prices["base"] + widthPrice + heightPrice + depthPrice + colour + grille;
    if (total < prices["base"]) total = prices["base"]; // not possible to get less than base price
    $('#total').val(total.toFixed(2));
  };
  
  
  $(function() {
    // setting the defaults based on the object at the top
    ["width","height","depth"]
      .forEach(field => ["min","placeholder","value"]
        .forEach(attr => $('#'+field).attr(attr,prices[field].min))
    )    
        
    compute();
    $('#computeDiv').on("input", compute);
  });