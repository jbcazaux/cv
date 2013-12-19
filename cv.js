(function(){

    function addClass(classname, element ) {
        var cn = element.className;
        var rxp = new RegExp( "\\s+\\b"+classname+"\\b", "g" );
        if( !cn.match(rxp) ) {
            classname = ' ' + classname;
            element.className = cn + classname;
        }
    }

    function removeClass( classname, element ) {
        var rxp = new RegExp( "\\s+\\b"+classname+"\\b", "g" );
        var cn = element.className;
        element.className = cn.replace( rxp, '' );
    }

    function toggleClass(classname, element){
        var rxp = new RegExp( "\\s+\\b"+classname+"\\b", "g" );
        if (element.className.match(rxp)){
            element.className = element.className.replace( rxp, '' );
        } else {
            element.className = element.className + ' ' + classname;
        }
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
        var oldies = document.getElementsByClassName('old mission');

        displayOld.onclick = function(){
            for (var i = 0 ; i < oldies.length; i++){
                toggleClass("hiddenOld", oldies[i]);
            }
            displayOld.innerHTML = displayOld.innerHTML.indexOf("Afficher") > -1 ?
                   "Masquer les missions plus anciennes" : "Afficher les missions plus anciennes";
        }

        var checkboxes = document.querySelectorAll('input[type=checkbox]');
        for (var i = 0 ; i < checkboxes.length; i++){
            checkboxes[i].onclick = onCbClick;
        }

        var descriptionPlus = document.getElementById('plus');
        var descriptionMore = document.getElementById('more');
        plus.onclick = function(){
            plus.innerHTML = plus.innerHTML.indexOf("Plus") > -1 ? "Réduire" : "Plus...";
            toggleClass("hidden", descriptionMore);
        }



    };

    window.onload = registerEvents;
})();


