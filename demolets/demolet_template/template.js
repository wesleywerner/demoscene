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
 * Define your demolet with this "fooDemolet" naming convention. It is created as an Object type.
 */
var templateDemolet = { "path": "demolets/demolet_template/" };

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

    /*
     * Store an array of our sprites on our Demolet object.
     */
    this.sprites = [ ];

    for (var i=2; i<6; i++) {
        var newSprite = PIXI.Sprite.fromImage(this.path + "gradient.png");
        newSprite.anchor.x = 0.5;
        newSprite.anchor.y = 0.5;
        newSprite.position.x = Demo.stageW / i;
        newSprite.position.y = Demo.stageW / i;

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

        /*
         * Save this sprite so we can access it later during update events.
         */
        this.sprites.push(newSprite);

        /*
         * Add our sprite to the stage. If we don't add it, it won't get rendered.
         */
        stage.addChild(newSprite);
    }

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
        sprite.rotation -= 0.01 * (index + 1);
    });

}
