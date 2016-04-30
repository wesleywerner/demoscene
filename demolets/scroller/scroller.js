/*
 * scroller.js
 *
 * Copyright 2014 Wesley Werner <wez@darknet.co.za>
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 * MA 02110-1301, USA.
 *
 */

var scrollerDemolet = {
    "path": "demolets/scroller/",
    "frequency": 1,
    "running": false
    };

scrollerDemolet.init = function() {

    /*
     * An old-school text scroller effect.
     * Copyleft Wesley Werner aka keyboardmonkey 2014
     *
     * For your learning pleasure, a summary of variables and how they work:
     *
     * this.lookup [Array]
     *
     *      On view resize, we build a lookup table the size of the screen width.
     *      For each X position we calculate the matching Y using a sine function.
     *      Thus sprite.Y = this.lookup[X]. Easy huh.
     *
     * this.textureMap [Object]
     *
     *      We precreate our alpha-numeric sprites and store them in an associative collection.
     *      Reusing these textures when building our scroller saves cycles by not rendering text.
     *      Thus this.textureMap['F'] gets the F-texture.
     *
     * this.words
     *
     *      What our soapbox speaks.
     *
     * this.scrollerPosition
     *
     *      The latest position in this.words
     *
     * this.sprites
     *
     *      List of sprites on the stage. We iterate this list to update sprites, and remove them from the stage
     *      when they leave the bounds set by this.scrollEndsAtX.
     *
     * this.scrollSpeed
     *
     *      Move speed in pixels. Negative values switches direction ;)
     *
     * this.nextSpriteCountdown
     *
     *      Stores the width of the last sprite created. We decrement this on updates, and when it hits 0
     *      we know it is about time to create the next sprite. Wash, rinse, repeat.
     *
     */

    this.words = "HELLO THERE. WESLEY HERE ATTACKING YOU WITH AN OLD-SCHOOL AMIGA SCROLLER! THIS DEMO IS WRITTEN IN JAVASCRIPT USING THE PIXI.JS FRAMEWORK. IT IS PRETTY SWEET! - WWW.PIXIJS.COM                       NOW LET US SWITCH TO FUN MODE        :) AH MUCH BETTER!               SO THIS IS MY FIRST EVER SCROLLER IN JAVASCRIPT, I HOPE YOU ENJOY IT. THIS SINE WAVE FUNCTION IS A GEM . . . THAT IS ALL FOR NOW, ENJOY THE REST OF THE SHOW ******** SIGNED WESLEY AKA KEYBOARD MONKEY #!/BIN/SH EOF **************************************";

    // build a alpha-numeric texture map
    this.textureMap = { };
    var alphabet = " .,:!*#</)0123456789-ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for(var i=0; i < alphabet.length-1; i++) {
        var c = alphabet.charAt(i);
        var s = new PIXI.Text(c, { font: "30px Impact", fill: "white", stroke: "black", strokeThickness: "6" });
        s.visible = false;
        stage.addChild(s);
        this.textureMap[c] = s;
    }

    // build a color gradient for tinting letters
    this.gradient = { };
    for(var i=0; i<100; i++) {
        var rgb = hslToRgb(i/100, 0.8, 0.8);
        var rgbhex = '0x' + rgb[0].toString(16) + rgb[1].toString(16) + rgb[2].toString(16);
        this.gradient[i] = parseInt(rgbhex);
    }

    // The latest character we are scrolling
    this.scrollerPosition = -1;
    // Remember the last created sprite width
    this.nextSpriteCountdown = 0;
    // List sprites showing on screen
    this.sprites = [ ];
    // Movement speed in pixels
    this.scrollSpeed = 6;
    // Start the scroll at this point
    this.scrollX = Demo.stageW;
    this.scrollY = 64;
    // End the scroll here
    this.scrollEndsAtX = -48;
    // Tint sprites
    this.tint = 0xFFFFFF;
    // Wait this many updates before restarting the scroller text.
    this.restartDelay = 1000;
    // The scroller is on
    this.on = false;

    /* Settings below this line are customized for this particular scroller */

    // Start tinting words after this position
    this.tintAfter = 235;

    // Load the background image
    var background = new PIXI.Sprite.fromImage(this.path + "background.png");
    background.visible = false;
    background.position.set(0, -background.height);
    this.backgroundTargetY = 16;
    stage.addChild(background);
    this.background = background;

}

scrollerDemolet.start = function() {

    this.running = true;
    this.on = true;
    this.background.visible = true;

}

scrollerDemolet.fillScroller = function() {

    this.nextSpriteCountdown -= Math.abs(this.scrollSpeed);

    if (this.nextSpriteCountdown <= 0) {

        // rotate to beginning
        this.scrollerPosition++;
        //if (this.scrollerPosition > this.words.length - 1) {
            //this.scrollerPosition = -1;
            //this.nextSpriteCountdown = this.restartDelay;
            //return;
        //}

        var nextChar = this.words[scrollerDemolet.scrollerPosition];
        var charTexture = this.textureMap[nextChar];

        // rotate tint by word
        if (this.scrollerPosition < this.tintAfter)
            this.tint = Demo.requestTint('base2');
        else
            this.tint = this.gradient[this.scrollerPosition % 100];

        // ignore missing character textures
        if (charTexture == undefined) return;

        var charSprite = new PIXI.Sprite(charTexture.texture);
        this.nextSpriteCountdown = 24; //charSprite.width;
        charSprite.tint = this.tint;

        charSprite.position.set(this.scrollX, this.scrollY);
        this.sprites.push(charSprite);
        stage.addChild(charSprite);
    }

}

scrollerDemolet.updateSpritePosition = function(sprite) {

    var lookupMapsTo = Math.abs(sprite.x / 64);     // again, our best guess sprite width
    sprite.position.x -= this.scrollSpeed;
    sprite.position.y = this.lookup[sprite.x] + this.scrollY;
    if (sprite.x <= this.scrollEndsAtX) {
        stage.removeChild(sprite);
        this.sprites = this.sprites.slice(1)
    }

}

scrollerDemolet.update = function() {

    if (this.scrollerPosition < this.words.length) {
        this.fillScroller();
    }

    this.sprites.forEach(function(sprite) {
        scrollerDemolet.updateSpritePosition(sprite);
    });

    // slide the background into view
    if (this.background.visible && this.background.y < this.backgroundTargetY)
        this.background.y += 1;

    this.finish();
}

scrollerDemolet.resize = function(w, h) {

    var half = h / 2;

    // we build a lookup table of where each of our Y-points map to the X-space.
    this.lookup = [ ]
    for (var i=0; i < w; i++) {
        this.lookup.push(this.sinWave(40, 0.009, i, 0));
    }

    this.background.width = Demo.stageW;

}

scrollerDemolet.finish = function() {

    if (this.scrollerPosition >= this.words.length) {
        // all letter sprites have moved off screen
        if (scrollerDemolet.sprites.length == 0) {
            this.running = false;
            this.background.visible = false;
            // reset position for next time
            this.scrollerPosition = -1;
        }
    }
}

scrollerDemolet.sinWave = function(A, w, t, p) {

    // f(x) = A sin(wt + p)
    //  A is the amplitude
    //  w is the frequency
    //  p is the phase

    return A * Math.sin(w * t + p);

}

