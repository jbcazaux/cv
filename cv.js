(function(){

    function registerEvents(){
        var displayOld = document.getElementById('displayOld');
        var hideOld = document.getElementById('hideOld');
        var oldies = document.getElementsByClassName('old mission');

        displayOld.onclick = function(){
            for (var o in oldies){
                oldies[o].className = 'old mission visible';
            }
            displayOld.className = "displayOld switch hidden"
            hideOld.className = "hideOld switch";
        }
        hideOld.onclick = function(){
            for (var o in oldies){
                oldies[o].className = 'old mission';
            }
            displayOld.className = "displayOld switch"
            hideOld.className = "hideOld switch hidden";
        }


    };

    //document.onload = registerEvents;
    registerEvents();
})();


