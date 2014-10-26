/*
 * intro.js
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

var introDemolet = { };

introDemolet.init = function() {

    this.done = false;
    this.sprites = [ ];
    this.textSprite = new PIXI.Text("INTRO.", { fill: "white", align: "left" });
    this.textSprite.anchor.x = 0.5;
    this.textSprite.anchor.y = 0.5;
    this.sprites.push(this.textSprite);
    stage.addChild(this.textSprite);

    // Show the intro Demolet for a few seconds before switching to the main loop.
    window.setTimeout(introDemolet.finish, 5000);

    // remove this line to let the intro run
    introDemolet.finish();
}

introDemolet.finish = function() {
    introDemolet.done = true;
    introDemolet.sprites.forEach(function(sprite) {
        stage.removeChild(sprite);
    });
}

introDemolet.update = function() {

    //this.gradientSprite.rotation -= 0.01;

}

introDemolet.resize = function(w, h) {

    this.textSprite.position.set(w / 2, 32);

}
