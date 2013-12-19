(function(){

    function addClass(classname, element ) {
        var cn = element.className;
        var rxp = new RegExp( "\\s?\\b"+classname+"\\b", "g" );

        if( !cn.match(rxp) ) {
            classname = ' ' + classname;
            element.className = cn + classname;
        }
    }

    function removeClass( classname, element ) {
        var cn = element.className;
        var rxp = new RegExp( "\\s?\\b"+classname+"\\b", "g" );
        element.className = cn.replace( rxp, '' );
    }

    function matchFilter(tags, filters){
        for (var i in filters){
            if (tags.indexOf(filters[i]) > -1){
                return true;
            }
        }
        return false;
    }

    function filterMission(filters){
        var missions = document.getElementsByClassName('mission');
        for (var i = 0; i < missions.length; i++){
            var m = missions[i];
            if (matchFilter(m.dataset.tag, filters)){
                removeClass("hidden", m);
            }else{
                addClass("hidden", m);
            }
        }
    }

    function getFilters(nodeList){
        var arr = Array.prototype.slice.call(nodeList);
        return filterMission(arr.map(function(c){
            return c.className;
        }));
    }

    function onCbClick(){
        var cbs = document.querySelectorAll('input[type=checkbox]:checked');
        if (cbs.length > 0) {
            return getFilters(cbs);
        } else {
            return getFilters(document.querySelectorAll('input[type=checkbox]'));
        }
    }

    function registerEvents(){
        var displayOld = document.getElementById('displayOld');
        var hideOld = document.getElementById('hideOld');
        var oldies = document.getElementsByClassName('old mission');

        displayOld.onclick = function(){
            for (var i = 0 ; i < oldies.length; i++){
                removeClass("hiddenOld", oldies[i]);
            }
            displayOld.className = "displayOld switch hidden"
            hideOld.className = "hideOld switch";
        }
        hideOld.onclick = function(){
            for (var i = 0 ; i < oldies.length; i++){
                addClass("hiddenOld", oldies[i]);
            }
            displayOld.className = "displayOld switch"
            hideOld.className = "hideOld switch hidden";
        }

        var checkboxes = document.querySelectorAll('input[type=checkbox]');
        for (var i = 0 ; i < checkboxes.length; i++){
            checkboxes[i].onclick = onCbClick;
        }


    };

    window.onload = registerEvents;
})();


