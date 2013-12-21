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
                if (e.target.nodeName != 'LABEL' && e.target.nodeName != 'INPUT'){
                    return false;
                }
                var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
                checkboxes = checkboxes.length > 0 ? checkboxes : document.querySelectorAll('input[type=checkbox]');
                //getFilters();
                missionFilter.filterMissionWithTags(checkboxes.toArray().map(function(c){
                    return c.dataset.filter;
                }))
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

        displayOld.onclick = function(){
            oldies.forEach(function (o){
                o.classList.toggle("hiddenOld");
            });
            displayOld.innerHTML = displayOld.innerHTML.indexOf("Afficher") > -1 ?
                   "Masquer les missions plus anciennes" : "Afficher les missions plus anciennes";
        }

        descriptionPlus.onclick = function(){
            descriptionPlus.innerHTML = plus.innerHTML.indexOf("Plus") > -1 ? "Réduire" : "Plus...";
            descriptionMore.classList.toggle("hidden");
        }

        sideFilter.onclick = missionFilter.onChechboxFilterClick;


    };

    window.onload = registerEvents;
})();


