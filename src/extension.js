/*
 * Alt Tab Mod: Always Show Thumbnails - GNOME Shell extension
 * Copyright (C) 2012  Davi da Silva Böger  (dsboger@gmail.com)
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
const Mainloop = imports.mainloop;
const Main = imports.ui.main;
const AltTab = imports.ui.altTab;

let _originalSelect;

function _modifiedSelect() {
    let select = _originalSelect;
    return function (app, window, forceAppFocus) {
        select.apply(this, [app, window, false]);
        
        if (this._thumbnailTimeoutId != 0) {
            Mainloop.source_remove(this._thumbnailTimeoutId);
            this._timeoutPopupThumbnails();
        }
        
        if (window == null) {
            if (!this._thumbnails) {
                this._createThumbnails();
			}
			this._thumbnails.highlight(0, false);
        }
    };
}

function init(metadata) {
}

function enable() {
    _originalSelect = AltTab.AppSwitcherPopup.prototype._select;
    AltTab.AppSwitcherPopup.prototype._select = _modifiedSelect();
}

function disable() {
    AltTab.AppSwitcherPopup.prototype._select = _originalSelect;
    _originalSelect = null;
}

