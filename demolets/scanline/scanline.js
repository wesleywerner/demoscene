/*
 * scanline.js
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

var scanlineDemolet = {
    "path": "demolets/scanline/",
    "frequency": 1,
    "running": false
    };

scanlineDemolet.init = function() {

    this.scanline = new PIXI.Sprite.fromImage(this.path + "scanline.png");
    this.scanline.anchor.set(0, 1);
    this.scanline.alpha = 0.5;
    this.scanline.width = Demo.stageW;

}

scanlineDemolet.start = function() {

    stage.addChild(this.scanline);
    this.scanline.tint = Demo.requestTint();
    this.scanline.blendMode = PIXI.BLEND_MODES.ADD;
    this.scanline.position.set(0, 0);
    this.running = true;

}

scanlineDemolet.update = function() {

    this.scanline.y += 4
    this.finish();

}

scanlineDemolet.finish = function() {

    if (this.scanline.y > Demo.stageH + 50) {
        stage.removeChild(this.scanline);
        this.running = false;
    }

}

scanlineDemolet.resize = function(w, h) {

    if (this.running) {
        this.scanline.width = w;
    }

}
