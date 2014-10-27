/*
 * template.js
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
 */

/*
 * Your Demolet must follow this "fooDemolet" naming convention.
 *
 * path
 *      Load resources by using this.path + 'image.png'
 * frequency
 *      The % chance your Demolet is chosen to run. 0.5 is 50%.
 * running
 *      Bool you have to manage, so Demoscene knows while your Demolet is busy.
 *      When your effect is done, set this false, and Demoscene knows a slot is freed up to start
 *      another Demolet :)
 */
var templateDemolet = {
    "path": "demolets/demolet_template/",
    "frequency": 1,
    "running": false
    };

/*
 * init()
 *
 * We use this call to set up our Demolet.
 *
 * A global "Demo" object offers these properties:
 *
 *  stageW, stageH
 *      The size of the stage.
 */
templateDemolet.init = function() {

    // Store an array of our sprites on our Demolet object.
    this.sprites = [ ];

}

/*
 * The start() function should set your Demolet in motion. It should not last for infinity, and
 * it should set the running value to false when it is done.
 */
templateDemolet.start = function() {

    this.running = true;

    // store an internal counter for our Demolet
    this.counter = 0;

    // create square sprites
    for (var i=2; i<6; i++) {
        var newSprite = PIXI.Sprite.fromImage(this.path + "gradient.png");
        newSprite.anchor.x = 0.5;
        newSprite.anchor.y = 0.5;
        newSprite.position.set(Demo.stageW / 2, Demo.stageH / 2);

        /*
         * Demo.requestTint(name)
         *
         * Our sprite is monochrome, and we apply a tint to it through the Demo object
         * This ensures all Demolets use a consistent color scheme.
         * Available tint names are:
         *
         *      base03, base02, base01, base00, base0, base1, base2, base3,
         *      yellow, orange, red, magenta, violet blue, cyan, green,
         *
         * These are from the Solarized colour palette available at http://ethanschoonover.com/solarized.
         * Requesting with no name will return a random tint.
         */
        newSprite.tint = Demo.requestTint();

        // Save this sprite so we can access it later during update events.
        this.sprites.push(newSprite);

    }

    // Add a text to the sprite list.
    var textSprite = new PIXI.Text("This is the Template Demolet.", { fill: "white", align: "left" });
    textSprite.anchor.x = 0.5;
    textSprite.anchor.y = 0.5;
    textSprite.position.set(Demo.stageW / 2, Demo.stageH / 2);
    this.sprites.push(textSprite);

    // Add our sprite to the stage. If we don't add it, it won't get rendered.
    this.sprites.forEach(function(sprite) {
        stage.addChild(sprite);
    });

}

/*
 * update()
 *
 * Called during renders, we use this call to change our Demolet sprites and values.
 * The stage is rendered automatically after all Demolets have updated.
 */
templateDemolet.update = function() {

    // Reference our Demolet using 'this' keyword.
    this.sprites.forEach(function(sprite, index) {
        sprite.rotation -= 0.01 * (5 - index);
    });

    // count up each update and check for finish condition
    this.counter++;
    this.finish();

}

/*
 * finish()
 *
 * Not called by Demoscene directly, but is a good way to test for finish conditions in your loop.
 */
templateDemolet.finish = function() {

    if (this.counter == 500) {
        // let Demolet know we are done
        this.running = false;
        // we are responsible for remove our assets from the stage
        this.sprites.forEach(function(sprite) {
            stage.removeChild(sprite);
        });
    }

}

/*
 * resize()
 *
 * Called when the window is resized.
 * You don't have to handle resize events, but it gives a nicer experience for the viewer.
 * It also gets called right after init().
 */
templateDemolet.resize = function(w, h) {

    this.sprites.forEach(function(sprite) {
        sprite.position.set(w / 2, h / 2);
    });

}
