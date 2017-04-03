/*
 * warpsphere.js
 *
 * Copyright 2016 Wesley Werner <wez@darknet.co.za>
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
 * path
 *      Load resources by using this.path + 'image.png'
 * frequency
 *      The % chance your Demolet is chosen to run. 0.5 is 50%.
 * running
 *      Bool you have to manage, so Demoscene knows while your Demolet is busy.
 *      When your effect is done, set this false, and Demoscene knows a slot is freed up to start
 *      another Demolet :)
 */
var warpsphereDemolet = {
    "path": "demolets/warpsphere/",
    "frequency": 0.01,
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
warpsphereDemolet.init = function() {

    this.displaceTable = [ ];
    this.displacementSprite = PIXI.Sprite.fromImage(this.path + '/map.png');
    this.displacementSprite.x = Demo.stageW;
    this.displacementSprite.y = 0;
    this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite);
    this.displacementFilter.scale.x = 160;
    this.displacementFilter.scale.y = 160;

}

/*
 * The start() function should set your Demolet in motion. It should not last for infinity, and
 * it should set the running value to false when it is done.
 */
warpsphereDemolet.start = function() {

    stage.addChild(this.displacementSprite);
    Demo.requestFilter(this.displacementFilter);
    this.displacementSprite.x = Demo.stageW;
    this.displacementSprite.y = 0;
    this.yPosition = getRandomInt(50, 200);
    this.running = true;

}

/*
 * update()
 *
 * Called during renders, we use this call to change our Demolet sprites and values.
 * The stage is rendered automatically after all Demolets have updated.
 */
warpsphereDemolet.update = function() {

    if (this.running) {

        // Reference our Demolet using 'this' keyword.
        this.displacementSprite.x -= 2;
        this.displacementSprite.y = this.yPosition + this.positionTable[this.displacementSprite.x];

        // adjust displacement amount by our position
        var displaceVal = this.displaceTable[this.displacementSprite.x];
        if (displaceVal == undefined) displaceVal = 1;
        var displaceBy = clamp(160 * displaceVal, 10, 160);
        
        this.displacementFilter.scale.x = displaceBy;
        this.displacementFilter.scale.y = displaceBy;

        this.finish();

    }
}

/*
 * finish()
 *
 * Not called by Demoscene directly, but is a good way to test for finish conditions in your loop.
 */
warpsphereDemolet.finish = function() {

    if (this.displacementSprite.x < 50) {
        // let Demolet know we are done
        this.running = false;
        // we are responsible for removing our assets from the stage
        stage.removeChild(this.displacementSprite);
        Demo.removeFilter(this.displacementFilter);
    }

}

/*
 * resize()
 *
 * Called when the window is resized.
 * You don't have to handle resize events, but it gives a nicer experience for the viewer.
 * It also gets called right after init().
 */
warpsphereDemolet.resize = function(w, h) {

    // build a lookup table of where each of our Y-points map to the X-space.
    this.positionTable = sineTable(60, 0.009, w)
    
    // reduce displacement near the end of our journey
    w2 = Math.floor(w / 2);
    for (var i=0; i < w2; i++) {
        this.displaceTable[i] = i / w2;
    }

}
