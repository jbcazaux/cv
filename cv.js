(function(){
    NodeList.prototype.toArray = function(){
        return Array.prototype.slice.call(this);
    };
    HTMLCollection.prototype.toArray = function(){
        return Array.prototype.slice.call(this);
    };



    var missionFilter = Object.defineProperties({}, {
        filterMissionWithTags : {
            enumerable : false,
            value : function (filters){
                var missions = document.getElementsByClassName('mission').toArray();
                missions.forEach(function(m){
                    missionFilter.matchFilter(m.dataset.tag, filters) ? m.classList.remove("hidden") : m.classList.add("hidden");
                });
            }
        },
        onChechboxFilterClick : {
            enumerable: false,
            value : function onChechboxFilterClick(e){
                if (e.target.nodeName != 'INPUT'){
                    return true;
                }
                var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
                checkboxes = checkboxes.length > 0 ? checkboxes : document.querySelectorAll('input[type=checkbox]');
                missionFilter.filterMissionWithTags(checkboxes.toArray().map(function(c){
                    return c.dataset.filter;
                }));
                ga('send', 'event', 'button', 'click', 'filter' + e.target.id);
            }
        },
        matchFilter : {
            enumerable: false,
            value : function matchFilter(tags, filters){
                for (var i in filters){
                    if (tags.indexOf(filters[i]) > -1){
                        return true;
                    }
                }
                return false;
            }
        }

    });





    function registerEvents(){
        var displayOld = document.getElementById('displayOld'),
            oldies = document.getElementsByClassName('old mission').toArray(),
            checkboxes = document.querySelectorAll('input[type=checkbox]'),
            sideFilter = document.querySelector('section.side'),
            descriptionPlus = document.getElementById('plus'),
            descriptionMore = document.getElementById('more');
            var showRegexp = new RegExp("Afficher");
            var plusRegexp = new RegExp("Plus");

        displayOld.onclick = function(){

            oldies.forEach(function (o){
                o.classList.toggle("hiddenOld");
            });
            if (displayOld.innerHTML.match(showRegexp)){
                displayOld.innerHTML = "Masquer les missions plus anciennes";
                ga('send', 'event', 'button', 'click', 'old missions', 1);
            } else {
                displayOld.innerHTML = "Afficher les missions plus anciennes";
                ga('send', 'event', 'button', 'click', 'old missions', 0);
            }
        }

        descriptionPlus.onclick = function(){
            if (plus.innerHTML.match(plusRegexp)){
                descriptionPlus.innerHTML = "Réduire";
                ga('send', 'event', 'button', 'click', 'more description', 1);
            } else {
                descriptionPlus.innerHTML = "Plus...";
                ga('send', 'event', 'button', 'click', 'more description', 0);
            }
            descriptionMore.classList.toggle("hidden");
        }

        sideFilter.onclick = missionFilter.onChechboxFilterClick;


    };

    window.onload = registerEvents;
})();


