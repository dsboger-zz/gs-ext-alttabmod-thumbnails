
const Mainloop = imports.mainloop;
const Main = imports.ui.main;
const AltTab = imports.ui.altTab;


let _originalSelect;

/*
let _originalFinish;
let _originalAppActivated;
*/

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

/*
function _modifiedFinish() {
    let finish = _originalFinish;
    return function () {
        let app = this._appIcons[this._currentApp];
        let window;
        if (this._currentWindow >= 0)
            window = app.cachedWindows[this._currentWindow];
        else
            window = app.cachedWindows[0];
        Main.activateWindow(window);
        this.destroy();
    };
}

function _modifiedAppActivated() {
    let appActivated = _originalAppActivated;
    return function (appSwitcher, n) {
        let app = this._appIcons[n];
        let window;
        if (n == this._currentApp && this._currentWindow >= 0)
            window = app.cachedWindows[this._currentWindow];
        else
            window = app.cachedWindows[0];
        Main.activateWindow(window);
        this.destroy();
    };
}
*/

function init(metadata) {
}

function enable() {
    _originalSelect = AltTab.AltTabPopup.prototype._select;
    AltTab.AltTabPopup.prototype._select = _modifiedSelect();
    
/*
    _originalFinish = AltTab.AltTabPopup.prototype._finish;
    AltTab.AltTabPopup.prototype._finish = _modifiedFinish();
    _originalAppActivated = AltTab.AltTabPopup.prototype._appActivated;
    AltTab.AltTabPopup.prototype._appActivated = _modifiedAppActivated();
*/
}

function disable() {
    AltTab.AltTabPopup.prototype._select = _originalSelect;
    _originalSelect = null;
    
/*
    AltTab.AltTabPopup.prototype._finish = _originalFinish;
    _originalFinish = null;
    AltTab.AltTabPopup.prototype._appActivated = _originalAppActivated;
    _originalAppActivated = null;
*/
}

