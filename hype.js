(function ( $ ) {

	function validateOpts(opts) {
        //Throws error if key is not in default options of if key type is different
        Object.keys(opts).forEach(function(key) {
            if (typeof $.fn.hype.defaults[key] == "undefined") {
                throw new Error("Invalid hype option: \'" + key + "\'")
            } else if (typeof opts[key] != typeof $.fn.hype.defaults[key]) {
                throw new Error("Hype option \'"+ key + "\' must be a " + typeof $.fn.hype.defaults[key])
            }
        })
        opts = !opts ? {} : opts
		return opts
	}

	function getRandomRGB() {
		return "rgb(" + Math.floor(Math.random() * 256) + ","
					  + Math.floor(Math.random() * 256) + ","
					  + Math.floor(Math.random() * 256) + ")"
	}
 
    $.fn.hype = function(opts) {
    	var options = $.extend({}, $.fn.hype.defaults, validateOpts(opts))
    	var $parent = this
    	var $parentWidth = $parent.width()
    	var $parentHeight = $parent.height()

        var initialState = $parent.html()

        var animationIds = []
    	$parent.find("*").each(function() {
    		var $this = $(this)
    		var $childWidth = $this.width()
    		var $childHeight = $this.height()

            var currentRot = 0

    		animationIds.push(window.setInterval(function() {
                $this.css("position", "fixed")
                //Slide or offset random position
                if (options.slide) {
                    $this.animate({
                        left: Math.floor(Math.random() * $parentWidth),
                        top: Math.floor(Math.random() * $parentHeight)
                    })
                } else {
                    $this.offset({
                        left: Math.floor(Math.random() * $parentWidth),
                        top: Math.floor(Math.random() * $parentHeight)
                    })
                }

                //Rotation
                currentRot += options.rotate
                if (Math.abs(currentRot) >= 360) {
                    currentRot += currentRot < 0 ? 360 : -360
                }
                $this.css({'transform' : 'rotate('+ currentRot +'deg)'});

                //Random background color
    			if (options.color) {
    				$this.css("background-color", getRandomRGB())
    			}
    		}, options.delay))
    	})

        $parent.stopTheHype = function() {
            //stops animation intervals from continuing
            animationIds.forEach(function(id) {
                window.clearInterval(id)
            })
            //Revert parent back to initial state
            $parent.empty()
            $parent.append(initialState)
        }

        //Stops animations once timeout is reached
        if (options.timeout >= 0) {
            setTimeout($parent.stopTheHype, options.timeout)
        }
    	return $parent
    }

    //Default options
    $.fn.hype.defaults = {
        delay: 100,
        color: true,
        rotate: 0, //in degrees
        timeout: -1, //Loops forever if value < 1 is set
        slide: true
    }
 
}( jQuery ));
