
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
            if (!this._thumbnails)
                this._createThumbnails();
            this._thumbnails.highlight(0, true);
        }
    };
}

function init(metadata) {
}

function enable() {
    _originalSelect = AltTab.AltTabPopup.prototype._select;
    AltTab.AltTabPopup.prototype._select = _modifiedSelect();
}

function disable() {
    AltTab.AltTabPopup.prototype._select = _originalSelect;
    _originalSelect = null;
}

