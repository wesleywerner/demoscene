/*
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

/*
 * This Demo object provides properties and functions that the Demolets use to get information about the render canvas.
 */
var Demo = { };

/*
 * Defines the stage size
 */
Demo.stageW = 600;
Demo.stageH = 600;

/*
 * The tint table allows us to define a common color theme for our demo.
 * Demolets request a tint to apply to their sprites or drawings.
 * This particular tint is names Solarized, this superb palette available at http://ethanschoonover.com/solarized.
 */
Demo.tintTable = {
    'base03': 0x002b36,
    'base02': 0x073642,
    'base01': 0x586e75,
    'base00': 0x657b83,
    'base0': 0x839496,
    'base1': 0x93a1a1,
    'base2': 0xeee8d5,
    'base3': 0xfdf6e3,
    'yellow': 0xb58900,
    'orange': 0xcb4b16,
    'red': 0xdc322f,
    'magenta': 0xd33682,
    'violet': 0x6c71c4,
    'blue': 0x268bd2,
    'cyan': 0x2aa198,
    'green': 0x859900,
}

Demo.requestTint = function(tintName) {
    return this.tintTable['cyan'];
}
