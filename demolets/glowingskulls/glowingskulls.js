/*
 * ghostskulls.js
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

var glowingskullsDemolet = {
    "path": "demolets/glowingskulls/",
    "frequency": 0.1,
    "running": false
    };

glowingskullsDemolet.init = function() {

    this.infos = [ ];
    this.maxSkulls = 10;
    this.liveSkulls = 0;
    this.texture = PIXI.Texture.fromImage(this.path + "glowingskull.png");

    // TODO to be called by the demo main loop
    this.start();
}

glowingskullsDemolet.start = function() {

    this.infos = [ ];
    for (var i=0; i<this.maxSkulls; i++) {
        var sprite = new PIXI.Sprite(this.texture);
        sprite.position.set(-getRandomInt(100, 1000), getRandomInt(100, Demo.stageH - 100));
        sprite.scale.set(0, 0);
        sprite.anchor.set(0.5, 0.5);
        stage.addChild(sprite);

        this.infos.push(
                {
                'dead': false,
                'sprite': sprite,
                'zoom': Math.random() * 0.01,
                'rotatespeed': Math.random() * 0.1,
                'movespeed': getRandomInt(2, 6),
                'counter': 0
                }
            );
    }
    this.liveSkulls = this.maxSkulls;
    this.running = true;
}

glowingskullsDemolet.finish = function() {
    this.liveSkulls--;
    if (this.liveSkulls == 0) {
        glowingskullsDemolet.infos.forEach(function(info) {
            stage.removeChild(info.sprite);
        });
    }
}

glowingskullsDemolet.update = function() {

    if (this.liveSkulls > 0) {
        this.infos.forEach(function(info) {
            if (!info.dead) {
                // rotate the skull
                info.sprite.rotation += info.rotatespeed;
                // zoom in and out
                info.sprite.scale.x += info.zoom;
                info.sprite.scale.y += info.zoom;
                // flip zoom
                if (info.sprite.scale.x > 1.5 || info.sprite.scale.x <= 0) info.zoom *= -1;
                // move skull
                info.sprite.position.x = (info.sprite.position.x + info.movespeed) + Math.sin(info.counter * 0.1);
                info.sprite.position.y += Math.cos(info.counter * 0.1);
                // count
                info.counter++;
                // exit strategy
                if (info.sprite.position.x > Demo.stageW + 100) {
                    info.dead = true;
                    glowingskullsDemolet.finish();
                }
            }
        });
    }
}

glowingskullsDemolet.resize = function(w, h) {

    //this.tilingSprite.width = w;
    //this.tilingSprite.height = h;

}
