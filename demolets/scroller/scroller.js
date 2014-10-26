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

var scrollerDemolet = { };

scrollerDemolet.init = function() {

    this.words = "HELLO WORLD! HERE IS OUR FIRST EVER SCROLLER. I HOPE YOU ENJOY IT <3";

    // build a alpha-numeric texture map
    this.textureMap = { };
    var alphabet = " .,!#<0123456789-ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for(var i=0; i < alphabet.length-1; i++) {
        var c = alphabet.charAt(i);
        var s = new PIXI.Text(c, { font: "bold 42px Arial", fill: "white", stroke: "black", strokeThickness: "6" });
        s.visible = false;
        stage.addChild(s);
        this.textureMap[c] = s;
    }

    // this array stores all our on-screen sprites. we limit the number. the divisor is our best guess sprite width.
    this.lastUsedCharIndex = 0;
    // remember the last created sprite width
    this.nextSpriteCountdown = 0;
    this.sprites = [ ];
    // scroller text speed
    this.scrollSpeed = 6;

    // The scroll origin position
    this.scrollX = Demo.stageW;
    this.scrollY = Demo.stageH / 2;
    this.scrollEndsAtX = 0;

    /*
     * create a lookup of all the positions (1000) where the letter sprites need to move along to Y-axiz.
     * calculate the lookup on resize, use a sin function to store the Y position of each lookup value.
     * create an array for on-screen character sprites, say (1000 / 64 = 15) elements. 15 chars on screen.
     * start filling the char array with letters.
     * move each sprite left.
     * map the sprite X position to our lookup, and grab the Y position stored in the lookup.
     * when a sprite leaves the screen, remove it from the array.
     * add more sprites to the array while there is space left.
     */

}

scrollerDemolet.fillScroller = function() {

    this.nextSpriteCountdown -= Math.abs(this.scrollSpeed);

    if (this.nextSpriteCountdown <= 0) {

        var newChar = scrollerDemolet.words[scrollerDemolet.lastUsedCharIndex];

        var charTexture = this.textureMap[newChar];

        // ignore missing character textures
        if (charTexture == undefined) return;

        var charSprite = new PIXI.Sprite(charTexture.texture);
        this.nextSpriteCountdown = 48; //charSprite.width;

        //charSprite.tint = Demo.requestTint();
        charSprite.position.set(this.scrollX, this.scrollY);
        scrollerDemolet.sprites.push(charSprite);
        stage.addChild(charSprite);
        scrollerDemolet.lastUsedCharIndex++;
        // rotate to beginning
        if (scrollerDemolet.lastUsedCharIndex > scrollerDemolet.words.length - 1)
            scrollerDemolet.lastUsedCharIndex = 0;
    }

}

scrollerDemolet.updateSpritePosition = function(sprite) {

    var lookupMapsTo = Math.abs(sprite.x / 64);     // again, our best guess sprite width
    sprite.position.x -= this.scrollSpeed;
    sprite.position.y = this.lookup[sprite.x] + (Demo.stageH / 2);
    if (sprite.x <= this.scrollEndsAtX) {
        stage.removeChild(sprite);
        this.sprites = this.sprites.slice(1)
    }

}

scrollerDemolet.update = function() {

    this.fillScroller();

    this.sprites.forEach(function(sprite) {
        scrollerDemolet.updateSpritePosition(sprite);
    });

}

scrollerDemolet.resize = function(w, h) {

    var half = h / 2;

    // we build a lookup table of where each of our Y-points map to the X-space.
    this.lookup = [ ]
    for (var i=0; i < w; i++) {
        this.lookup.push(this.sinWave(80, 0.009, i, 0));
    }

}

scrollerDemolet.sinWave = function(A, w, t, p) {

    // f(x) = A sin(wt + p)
    //  A is the amplitude
    //  w is the frequency
    //  p is the phase

    return A * Math.sin(w * t + p);

}
