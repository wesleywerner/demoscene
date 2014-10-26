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

    this.words = "HELLO WORLD! HERE IS OUR FIRST EVER SCROLLER. I HOPE YOU ENJOY IT <3";

    // build a alpha-numeric texture map
    this.textureMap = { };
    var alphabet = " .,!#<0123456789-ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for(var i=0; i < alphabet.length-1; i++) {
        var c = alphabet.charAt(i);
        var s = new PIXI.Text(c, { font: "30px Impact", fill: "white", stroke: "black", strokeThickness: "6" });
        s.visible = false;
        stage.addChild(s);
        this.textureMap[c] = s;
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
    this.scrollY = Demo.stageH / 2;
    // End the scroll here
    this.scrollEndsAtX = 0;
    // Tint sprites
    this.tint = 0xFFFFFF;
    // Wait this many updates before restarting the scroller text.
    this.restartDelay = 1000;
    // The scroller is on
    this.on = false;
    // Delay start by this many seconds
    this.startDelay = 0;

    /* Settings below this line are customized for this particular scroller */

    // Start tinting words after this position
    this.tintAfter = 12;

    // Load the background image
    var background = new PIXI.Sprite.fromImage(this.path + "background.png");
    background.width = (Demo.stageW - 64);
    background.visible = false;
    stage.addChild(background);
    var bgX = (Demo.stageW / 2) - (background.width / 2)
    var bgY = Demo.stageH - background.height - 16;
    background.position.set(bgX, Demo.stageH);
    this.scrollX = (Demo.stageW - 64);
    this.scrollY = bgY + 32;
    this.scrollEndsAtX = bgX;
    this.background = background;

    // Background image target Y position. Offers a slide-in effect when showing the background.
    this.backgroundTargetY = bgY;
    this.start();

}

scrollerDemolet.start = function() {

    window.setTimeout(function() {
        scrollerDemolet.on = true;
        scrollerDemolet.background.visible = true;
    }, this.startDelay * 1000);

}

scrollerDemolet.fillScroller = function() {

    this.nextSpriteCountdown -= Math.abs(this.scrollSpeed);

    if (this.nextSpriteCountdown <= 0) {

        // rotate to beginning
        this.scrollerPosition++;
        if (this.scrollerPosition > this.words.length - 1) {
            this.scrollerPosition = -1;
            this.nextSpriteCountdown = this.restartDelay;
            return;
        }

        var nextChar = this.words[scrollerDemolet.scrollerPosition];
        var charTexture = this.textureMap[nextChar];

        // rotate tint by word
        if (this.scrollerPosition > this.tintAfter && nextChar == ' ')
            this.tint = Demo.requestTint();

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

    if (!this.on) return;
    this.fillScroller();

    this.sprites.forEach(function(sprite) {
        scrollerDemolet.updateSpritePosition(sprite);
    });

    // slide the background into view
    if (this.background.visible && this.background.y > this.backgroundTargetY)
        this.background.y -= 1;

}

scrollerDemolet.resize = function(w, h) {

    var half = h / 2;

    // we build a lookup table of where each of our Y-points map to the X-space.
    this.lookup = [ ]
    for (var i=0; i < w; i++) {
        this.lookup.push(this.sinWave(40, 0.009, i, 0));
    }

}

scrollerDemolet.sinWave = function(A, w, t, p) {

    // f(x) = A sin(wt + p)
    //  A is the amplitude
    //  w is the frequency
    //  p is the phase

    return A * Math.sin(w * t + p);

}

