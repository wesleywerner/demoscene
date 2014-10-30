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
 */

var cubeDemolet = {
    "path": "demolets/cube/",
    "frequency": 1,
    "running": false
    };

cubeDemolet.init = function() {

    this.gfx = new PIXI.Graphics();

}

cubeDemolet.start = function() {

    // Do we need to Translate() our graphics?

    stage.addChild(this.gfx);
    cubeDemolet.counter = 0;
    cubeDemolet.running = true;

    var node0 = [-100, -100, -100];
    var node1 = [-100, -100,  100];
    var node2 = [-100,  100, -100];
    var node3 = [-100,  100,  100];
    var node4 = [ 100, -100, -100];
    var node5 = [ 100, -100,  100];
    var node6 = [ 100,  100, -100];
    var node7 = [ 100,  100,  100];

    cubeDemolet.nodes = [node0, node1, node2, node3, node4, node5, node6, node7];

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

    cubeDemolet.edges = [edge0, edge1, edge2, edge3, edge4, edge5, edge6, edge7, edge8, edge9, edge10, edge11];

    cubeDemolet.positionX = 200;
    cubeDemolet.positionY = 200;
    cubeDemolet.scale = 2;

    cubeDemolet.angleX = 0.005;
    cubeDemolet.angleY = 0.02;
    cubeDemolet.angleZ = 0.01;

    cubeDemolet.lineColor = Demo.requestTint('orange');

}

cubeDemolet.update = function() {

    cubeDemolet.counter++;
    cubeDemolet.gfx.clear();
    cubeDemolet.gfx.beginFill(cubeDemolet.lineColor, 0.5);
    cubeDemolet.gfx.lineStyle(2, cubeDemolet.lineColor, 0.5);

    // rotate the cube
    cubeDemolet.rotateZ3D(cubeDemolet.angleZ);
    cubeDemolet.rotateY3D(cubeDemolet.angleY);
    cubeDemolet.rotateX3D(cubeDemolet.angleX);

    // draw the edges
    this.edges.forEach(function(edge) {
        cubeDemolet.gfx.moveTo(
            (cubeDemolet.nodes[edge[0]][0] + cubeDemolet.positionX) * cubeDemolet.scale,
            (cubeDemolet.nodes[edge[0]][1] + cubeDemolet.positionY) * cubeDemolet.scale );
        cubeDemolet.gfx.lineTo(
            (cubeDemolet.nodes[edge[1]][0] + cubeDemolet.positionX) * cubeDemolet.scale,
            (cubeDemolet.nodes[edge[1]][1] + cubeDemolet.positionY) * cubeDemolet.scale );
    });

    // draw the node point
    this.nodes.forEach(function(node) {
        cubeDemolet.gfx.drawCircle(
            (node[0] + cubeDemolet.positionX)  * cubeDemolet.scale,
            (node[1] + cubeDemolet.positionY)  * cubeDemolet.scale
            , 6);
    });

    //this.finish();

}

cubeDemolet.finish = function() {

    this.counter++;
    if (this.counter == 200) {
        stage.removeChild(this.gfx);
        this.running = false;
    }

}

cubeDemolet.resize = function(w, h) {


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
