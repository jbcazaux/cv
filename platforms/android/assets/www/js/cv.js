(function(){
    NodeList.prototype.toArray = function(){
        return Array.prototype.slice.call(this);
    };
    HTMLCollection.prototype.toArray = function(){
        return Array.prototype.slice.call(this);
    };
	
	Element.prototype.addClass = function(c){
		return this.classList.add(c);
	}
	Element.prototype.removeClass = function(c){
		return this.classList.remove(c);
	}
	Element.prototype.toggleClass = function(c){
		return this.classList.toggle(c);
	}
	Element.prototype.containsClass = function(c){
		return this.classList.contains(c);
	}

    var missionFilter = Object.defineProperties({}, {
        filterMissionWithTags : {
            enumerable : false,
            value : function (filters){
                var missions = document.getElementsByClassName('mission').toArray();
                missions.forEach(function(m){
					var tag = m.dataset ? m.dataset.tag : m.getAttribute('data-tag');
					missionFilter.matchFilter(tag, filters) ? m.removeClass('hidden') : m.addClass('hidden');				
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
					return (c.dataset ? c.dataset.filter : c.getAttribute('data-filter'));
		
                }));
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
    
    function onMenuClick(){
    	var footer = document.getElementById("footer");
    	console.log('on menu click : ' + footer.containsClass('animationFooterOn')); 
    	footer.toggleClass('animationFooterOn');
    	footer.toggleClass('animationFooterOff');
    }
    
    function registerEvents(){
        var displayOld = document.getElementById('displayOld'),
            oldies = document.getElementsByClassName('old mission').toArray(),
            checkboxes = document.querySelectorAll('input[type=checkbox]'),
            sideFilter = document.querySelector('section.side'),
            descriptionPlus = document.getElementById('plus'),
            descriptionMore = document.getElementById('more'),
            showRegexp = new RegExp("Afficher"),
            plusRegexp = new RegExp("Plus");

        displayOld.onclick = function(){
            oldies.forEach(function (o){
                o.toggleClass("hiddenOld");
            });
            if (displayOld.innerHTML.match(showRegexp)){
                displayOld.innerHTML = "Masquer les missions plus anciennes";
            } else {
                displayOld.innerHTML = "Afficher les missions plus anciennes";
            }
        }

        descriptionPlus.onclick = function(){
            if (plus.innerHTML.match(plusRegexp)){
                descriptionPlus.innerHTML = "Réduire";
            } else {
                descriptionPlus.innerHTML = "Plus...";
            }
            descriptionMore.toggleClass("hidden");
        }

        sideFilter.onclick = missionFilter.onChechboxFilterClick;

	    window.onscroll = function(){
            var header = document.getElementById("header");
            if (window.pageYOffset > 0 && !header.containsClass("animationHeaderOff")) {
                header.removeClass("animationHeaderOn");
                header.addClass("animationHeaderOff");
            } else if (window.pageYOffset === 0 && !header.containsClass("animationHeaderOn")) {
                header.removeClass("animationHeaderOff");
                header.addClass("animationHeaderOn");
            }
        };
        document.addEventListener("menubutton", onMenuClick, true);
    };
    
	window.onload = registerEvents;
	
	
	
})();