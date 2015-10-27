function isElementVisible(el) {
    var rect     = el.getBoundingClientRect(),
        vWidth   = window.innerWidth || doc.documentElement.clientWidth,
        vHeight  = window.innerHeight || doc.documentElement.clientHeight,
        efp      = function (x, y) { return document.elementFromPoint(x, y) };     

    // Return false if it's not in the viewport
    if (rect.right < 0 || rect.bottom < 0 
            || rect.left > vWidth || rect.top > vHeight)
        return false;

    // Return true if any of its four corners are visible
    return (
          el.contains(efp(rect.left,  rect.top))
      ||  el.contains(efp(rect.right, rect.top))
      ||  el.contains(efp(rect.right, rect.bottom))
      ||  el.contains(efp(rect.left,  rect.bottom))
    );
}

var ta  = $('#testarea'),
    res = $('#result');

res.offset(ta.offset());

$(new Array(10)).map(function (idx) {
    var el = document.createElement('span');
    el.textContent = idx;
    return el;
}).appendTo('#testarea');

function runTheTest() {
   ta.children().map(function (idx, el) {
        var resEl = document.createElement('span'),
            vis   = isElementVisible(el);
        
        $(resEl).css({
            top:  el.offsetTop + 'px', 
            left: el.offsetLeft + 'px' 
        }).html('&nbsp;');
        
        if (!vis)
            resEl.style.borderColor = 'red';
        
        return resEl;
    }).appendTo(res);
}