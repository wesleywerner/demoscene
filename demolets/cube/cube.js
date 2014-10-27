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

    stage.addChild(this.gfx);
    cubeDemolet.running = true;

    cubeDemolet.vertices = [
            [-1,1,-1],
            [1,1,-1],
            [1,-1,-1],
            [-1,-1,-1],
            [-1,1,1],
            [1,1,1],
            [1,-1,1],
            [-1,-1,1]
        ];

    cubeDemolet.angleX = 0;
    cubeDemolet.angleY = 0;
    cubeDemolet.angleZ = 0;
}

cubeDemolet.update = function() {

    cubeDemolet.gfx.clear();
    cubeDemolet.gfx.lineStyle(1, this.borderColor, 0.5);
    cubeDemolet.gfx.beginFill(this.fillColor, 0.5);

    this.vertices.forEach(function(point) {
        // Rotate the point around X axis, then around Y axis, and finally around Z axis.
        //var r = v.rotateX(self.angleX).rotateY(self.angleY).rotateZ(self.angleZ)
        var r = cubeDemolet.rotateX(point, cubeDemolet.angleX);
        r = cubeDemolet.rotateY(r, cubeDemolet.angleY);
        r = cubeDemolet.rotateZ(r, cubeDemolet.angleZ);

        // Transform the point from 3D to 2D
        //var p = r.project(self.screen.get_width(), self.screen.get_height(), 256, 4)
        var p = cubeDemolet.project(r, window.innerWidth, window.innerHeight, 256, 4);
        var x = p[0];
        var y = p[1];

        //cubeDemolet.angleX += 0.1;
        cubeDemolet.angleY += 0.1;
        //cubeDemolet.angleZ += 0.1;

        cubeDemolet.gfx.drawCircle(x, y, 3);
    });

    //this.finish();

}

cubeDemolet.finish = function() {

    if (this.counter > 500) {
        stage.removeChild(this.gfx);
        this.running = false;
    }

}

cubeDemolet.resize = function(w, h) {


}

//  http://codentronix.com/2011/04/20/simulation-of-3d-point-rotation-with-python-and-pygame/

cubeDemolet.rotateX = function(points, angle) {

    //Rotation along X:
    //y' = y*cos(a) - z*sin(a)
    //z' = y*sin(a) + z*cos(a)
    //x' = x

    // Rotates the point around the X axis by the given angle in degrees.
    var x = points[0];
    var y = points[1];
    var z = points[2];

    var rad = angle * Math.PI / 180;
    var cosa = Math.cos(rad);
    var sina = Math.sin(rad);
    y = (y * cosa) - (z * sina);
    z = (y * sina) + (z * cosa);
    return [x, y, z];
}

cubeDemolet.rotateY = function(points, angle) {

    //Rotation along Y:
    //z' = z*cos(a) - x*sin(a)
    //x' = z*sin(a) + x*cos(a)
    //y' = y

    // Rotates the point around the Y axis by the given angle in degrees.
    var x = points[0];
    var y = points[1];
    var z = points[2];

    var rad = angle * Math.PI / 180;
    var cosa = Math.cos(rad);
    var sina = Math.sin(rad);
    z = (z * cosa) - (x * sina);
    x = (z * sina) + (x * cosa);
    return [x, y, z];
}

cubeDemolet.rotateZ = function(points, angle) {

    //Rotation along Z:
    //x' = x*cos(a) - y*sin(a)
    //y' = x*sin(a) + y*cos(a)
    //z' = z

    // Rotates the point around the Z axis by the given angle in degrees.
    var x = points[0];
    var y = points[1];
    var z = points[2];

    var rad = angle * Math.PI / 180;
    var cosa = Math.cos(rad);
    var sina = Math.sin(rad);
    x = (x * cosa) - (y * sina);
    y = (x * sina) + (y * cosa);
    return [x, y, z];
}

cubeDemolet.project = function(points, win_width, win_height, fov, viewer_distance) {

    //3D Perspective Projection
    //x' = x * fov / (z + viewer_distance) + half_screen_width
    //y' = -y * fov / (z + viewer_distance) + half_screen_height
    //z' -> for now, z is useless

    // Transforms this 3D point to 2D using a perspective projection.
    var x = points[0];
    var y = points[1];
    var z = points[2];

    var factor = fov / (viewer_distance + z);
    x = (x * factor) + (win_width / 2);
    y = (-y * factor) + (win_height / 2);
    return [x, y, z];
}
