(function(){
    NodeList.prototype.toArray = function(){
        return Array.prototype.slice.call(this);
    };
    HTMLCollection.prototype.toArray = function(){
        return Array.prototype.slice.call(this);
    };
	
	Element.prototype.addClass = function(c){
		return this.classList.add(c);
	};
	Element.prototype.removeClass = function(c){
		return this.classList.remove(c);
	};
	Element.prototype.toggleClass = function(c){
		return this.classList.toggle(c);
	};
	Element.prototype.containsClass = function(c){
		return this.classList.contains(c);
	};
	
	if (!document.getElementsByClassName('mission')[0].classList)
	{
		var ie9Support = Object.defineProperties({}, {
			addClass : {
				value : function(classname, element ) {
					 var cn = element.className;
					 var rxp = new RegExp( "\\s?\\b"+classname+"\\b", "g" );
			 
					 if( !cn.match(rxp) ) {
						 classname = ' ' + classname;
						 element.className = cn + classname;
					 }
				}
			},
			removeClass : {
				value : function( classname, element ) {
					 var cn = element.className;
					 var rxp = new RegExp( "\\s?\\b"+classname+"\\b", "g" );
					 element.className = cn.replace( rxp, '' );
				}
			},
			toggleClass : {
				value : function(classname, element){
                        var rxp = new RegExp( "\\s+\\b"+classname+"\\b", "g" );
                        if (element.className.match(rxp)){
                            element.className = element.className.replace( rxp, '' );
                        } else {
                            element.className = element.className + ' ' + classname;
                        }
			        }
			}
		});
		
		Element.prototype.addClass = function(c){
			return ie9Support.addClass(c, this);
		};
		Element.prototype.removeClass = function(c){
			return ie9Support.removeClass(c,this);
		};
		Element.prototype.toggleClass = function(c){
			return ie9Support.toggleClass(c,this);
		}
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
                ga('send', 'event', 'button', 'click', 'old missions', 1);
            } else {
                displayOld.innerHTML = "Afficher les missions plus anciennes";
                ga('send', 'event', 'button', 'click', 'old missions', 0);
            }
        };

        descriptionPlus.onclick = function(){
            if (plus.innerHTML.match(plusRegexp)){
                descriptionPlus.innerHTML = "Réduire";
                ga('send', 'event', 'button', 'click', 'more description', 1);
            } else {
                descriptionPlus.innerHTML = "Plus...";
                ga('send', 'event', 'button', 'click', 'more description', 0);
            }
            descriptionMore.toggleClass("hidden");
        };

        sideFilter.onclick = missionFilter.onChechboxFilterClick;

	    window.onscroll = function(){
            var header = document.getElementById("header");
            if (window.pageYOffset > 0 && !header.containsClass("animationOff")) {
                header.removeClass("animationOn");
                header.addClass("animationOff");
            } else if (window.pageYOffset === 0 && !header.containsClass("animationOn")) {
                header.removeClass("animationOff");
                header.addClass("animationOn");
            }
        };
    }

    window.addEventListener('load', function(e) {
        if (window.applicationCache) {
            window.applicationCache.addEventListener('updateready', function(e) {
                if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
                    // Browser downloaded a new app cache.
                    // Swap it in and reload the page to get the new hotness.
                    window.applicationCache.swapCache();
                    if (confirm('A new version of this site is available. Load it?')) {
                        window.location.reload();
                    }
                } else {
                    // Manifest didn't changed. Nothing new to server.
                }
            }, false);
        }
    }, false);

    window.onload = registerEvents;
})();


