/*
 * tiledbackground.js
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

var tiledbackgroundDemolet = {
    "path": "demolets/tiledbackground/",
    "frequency": 0.1,
    "running": true
    };

tiledbackgroundDemolet.init = function() {

    this.count = 0;
    this.textureFrames = 0;
    var texture = PIXI.Texture.fromImage(this.path + "tiledskull.png");
    var tilingSprite = new PIXI.extras.TilingSprite(texture, window.innerWidth, window.innerHeight);
    this.tilingSprite = tilingSprite;
    stage.addChild(tilingSprite);
}

tiledbackgroundDemolet.finish = function() {
    tiledbackgroundDemolet.done = true;
    tiledbackgroundDemolet.sprites.forEach(function(sprite) {
        stage.removeChild(sprite);
    });
}

tiledbackgroundDemolet.update = function() {

    this.count += 0.005;
    //this.tilingSprite.tileScale.x = 2 + Math.sin(this.count);
    //this.tilingSprite.tileScale.y = 2 + Math.cos(this.count);
    this.tilingSprite.tilePosition.x += Math.sin(this.count) * 2;
    this.tilingSprite.tilePosition.y += Math.cos(this.count) * 2;

}

tiledbackgroundDemolet.resize = function(w, h) {

    this.tilingSprite.width = w;
    this.tilingSprite.height = h;

}
