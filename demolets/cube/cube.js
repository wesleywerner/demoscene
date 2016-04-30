/*
 * cube.js
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
 *
 *
 * The wonderful code for this cube is by Peter Collingridge, you
 * can find his tutorial on this at:
 *
 * http://petercollingridge.appspot.com/3D-tutorial
 *
 */

var cubeDemolet = {
    "path": "demolets/cube/",
    "frequency": 0.1,
    "running": false
    };

cubeDemolet.init = function() {

    this.gfx = new PIXI.Graphics();
    this.alphaTable = [ ];

}

cubeDemolet.start = function() {

    // Do we need to Translate() our graphics?

    stage.addChild(this.gfx);
    cubeDemolet.running = true;

    // the outer cube
    var node0 = [-100, -100, -100];
    var node1 = [-100, -100,  100];
    var node2 = [-100,  100, -100];
    var node3 = [-100,  100,  100];
    var node4 = [ 100, -100, -100];
    var node5 = [ 100, -100,  100];
    var node6 = [ 100,  100, -100];
    var node7 = [ 100,  100,  100];

    // the inner cube
    var node10 = [-50, -50, -50];
    var node11 = [-50, -50,  50];
    var node12 = [-50,  50, -50];
    var node13 = [-50,  50,  50];
    var node14 = [ 50, -50, -50];
    var node15 = [ 50, -50,  50];
    var node16 = [ 50,  50, -50];
    var node17 = [ 50,  50,  50];

    cubeDemolet.nodes = [node0, node1, node2, node3, node4, node5, node6, node7,
                         node10, node11, node12, node13, node14, node15, node16, node17];

    // outer edges
    var edge0  = [0, 1];
    var edge1  = [1, 3];
    var edge2  = [3, 2];
    var edge3  = [2, 0];
    var edge4  = [4, 5];
    var edge5  = [5, 7];
    var edge6  = [7, 6];
    var edge7  = [6, 4];
    var edge8  = [0, 4];
    var edge9  = [1, 5];
    var edge10 = [2, 6];
    var edge11 = [3, 7];

    // inner edges
    var edge20 = [8, 9];
    var edge21 = [9, 11];
    var edge22 = [11, 10];
    var edge23 = [10, 8];
    var edge24 = [12, 13];
    var edge25 = [13, 15];
    var edge26 = [15, 14];
    var edge27 = [14, 12];
    var edge28 = [8, 12];
    var edge29 = [9, 13];
    var edge30 = [10, 14];
    var edge31 = [11, 15];

    cubeDemolet.edges = [edge0, edge1, edge2, edge3, edge4, edge5, edge6, edge7, edge8, edge9, edge10, edge11,
                         edge20, edge21, edge22, edge23, edge24, edge25, edge26, edge27, edge28, edge29, edge30, edge31];

    cubeDemolet.positionX = 0;
    cubeDemolet.positionY = 200;
    cubeDemolet.mouseP = stage.getMousePosition();

    cubeDemolet.angleX = 0.005;
    cubeDemolet.angleY = 0.02;
    cubeDemolet.angleZ = 0.01;

    cubeDemolet.lineColor = Demo.requestTint('orange');

}

cubeDemolet.update = function() {

    cubeDemolet.gfx.clear();
    cubeDemolet.gfx.beginFill(cubeDemolet.lineColor, this.alphaTable[this.positionX]);
    cubeDemolet.gfx.lineStyle(2, cubeDemolet.lineColor, this.alphaTable[this.positionX]);

    // move the cube
    this.positionX += 2;
    this.positionY = (Demo.stageH / 2) + this.positionTable[this.positionX];

    // rotate the cube
    var mp = stage.getMousePosition();
    cubeDemolet.angleY = clamp( (cubeDemolet.positionX - mp.x) * 0.0001, -0.01, 0.01);
    cubeDemolet.angleX = clamp( (cubeDemolet.positionY - mp.y) * 0.0001, -0.01, 0.01);
    cubeDemolet.rotateZ3D(cubeDemolet.angleZ);
    cubeDemolet.rotateY3D(cubeDemolet.angleY);
    cubeDemolet.rotateX3D(cubeDemolet.angleX);

    // draw the edges
    cubeDemolet.edges.forEach(function(edge) {
        cubeDemolet.gfx.moveTo(
            (cubeDemolet.nodes[edge[0]][0] + cubeDemolet.positionX),
            (cubeDemolet.nodes[edge[0]][1] + cubeDemolet.positionY) );
        cubeDemolet.gfx.lineTo(
            (cubeDemolet.nodes[edge[1]][0] + cubeDemolet.positionX),
            (cubeDemolet.nodes[edge[1]][1] + cubeDemolet.positionY) );
    });

    // draw the node point
    this.nodes.forEach(function(node) {
        cubeDemolet.gfx.drawCircle(
            (node[0] + cubeDemolet.positionX),
            (node[1] + cubeDemolet.positionY)
            , 6);
    });

    this.finish();

}

cubeDemolet.finish = function() {

    if (this.positionX > Demo.stageW) {
console.log('quitting cube');
        stage.removeChild(this.gfx);
        this.running = false;
    }
}

cubeDemolet.resize = function(w, h) {

    // build a lookup table of where each of our Y-points map to the X-space.
    this.positionTable = [ ]
    for (var i=0; i < w; i++) {
        this.positionTable.push(this.sinWave(200, 0.009, i, 0));
    }

    // near 1 at the center of the X-axiz, and fade back to 0 near the right of the screen.
    w2 = Math.floor(w / 2);
    for (var i=0; i < w2; i++) {
        this.alphaTable[i] = i / w2;
    }
    for (var i=w2; i < w; i++) {
        this.alphaTable[i] = (w / i) - 1;
    }

}

cubeDemolet.sinWave = function(A, w, t, p) {

    // f(x) = A sin(wt + p)
    //  A is the amplitude
    //  w is the frequency
    //  p is the phase

    return A * Math.sin(w * t + p);

}

cubeDemolet.rotateZ3D = function(theta) {
    var sin_t = Math.sin(theta);
    var cos_t = Math.cos(theta);

    cubeDemolet.nodes.forEach(function(node) {
        var x = node[0];
        var y = node[1];
        node[0] = x * cos_t - y * sin_t;
        node[1] = y * cos_t + x * sin_t;
    });
};

cubeDemolet.rotateY3D = function(theta) {
    var sin_t = Math.sin(theta);
    var cos_t = Math.cos(theta);

    cubeDemolet.nodes.forEach(function(node) {
        var x = node[0];
        var z = node[2];
        node[0] = x * cos_t - z * sin_t;
        node[2] = z * cos_t + x * sin_t;
    });
};

cubeDemolet.rotateX3D = function(theta) {
    var sin_t = Math.sin(theta);
    var cos_t = Math.cos(theta);

    cubeDemolet.nodes.forEach(function(node) {
        var y = node[1];
        var z = node[2];
        node[1] = y * cos_t - z * sin_t;
        node[2] = z * cos_t + y * sin_t;
    });
};
