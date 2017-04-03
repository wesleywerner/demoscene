/*
 * .js
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

var pixelateFilter = {
    "path": "demolets/pixelatefilter/",
    "frequency": 0.1,
    "running": false
    };

pixelateFilter.init = function() {

    this.pixelateLevel = 10;
    this.filter = new PIXI.PixelateFilter();

}

pixelateFilter.start = function() {

    this.filter.size.x = 0;
    this.filter.size.y = 0;
    this.direction = 1;
    Demo.requestFilter(this.filter);
    this.running = true;

}

pixelateFilter.update = function() {

    if (this.running) {

        this.filter.size.x += this.direction * 0.1;
        this.filter.size.y += this.direction * 0.1;
        this.finish();
    }

}

pixelateFilter.finish = function() {

    // flip pixelate direction
    if (this.direction == 1) {
        if (this.filter.size.x > this.pixelateLevel) {
            this.direction = -1;
        }
    }
    else {
        if (this.filter.size.x < 0) {
            this.running = false;
            Demo.removeFilter(this.filter);
        }
    }
}

pixelateFilter.resize = function(w, h) {


}
