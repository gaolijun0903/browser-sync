"use strict";

var browserSync = require("../../../index");

var sinon   = require("sinon");

describe("E2E Events test", function () {

    var instance, clock;

    before(function (done) {
        instance = browserSync({
            open: false,
            debugInfo: false
        }, done);
        clock = sinon.useFakeTimers();
    });

    after(function () {
        instance.cleanup();
        clock.restore();
    });

    it("Should register internal events", function () {

        var spy = sinon.spy(instance.io.sockets, "emit");

        instance.events.emit("file:reload", {path: "somepath.css"});

        clock.tick();

        sinon.assert.calledWithExactly(spy, "file:reload", {path: "somepath.css"});

        spy.restore();
    });
});
