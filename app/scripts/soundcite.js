 /* soundcite - v0.3.0 - 2014-06-16
 * Copyright (c) 2014 Tyler J. Fisher and Northwestern University Knight Lab 
 */
// window.Popcorn.version = 1.5.6
// http://popcornjs.org/code/dist/popcorn-complete.min.js
// window.SC._version = 2.0.0
// http://connect.soundcloud.com/sdk-2.0.0.js
//
(function(e, t, n, r) {
    function a(n, r) {
        var s, o;
        if (!(s = e.jQuery) || n > s.fn.jquery || r(s)) {
            var a = t.createElement("script");
            a.type = "text/javascript", a.src = "http://code.jquery.com/jquery-1.9.1.min.js", a.onload = a.onreadystatechange = function() {
                !i && (!(o = this.readyState) || o == "loaded" || o == "complete") && (s = e.jQuery.noConflict(1), r(s, i = !0), s(a).remove())
            }, u.appendChild(a)
        }
    }
    function f(n, r, i) {
        var o, a, f;
        if (!(o = e.Popcorn) || r > o.version || i(o)) {
            var l = t.createElement("script");
            l.type = "text/javascript", l.src = "http://popcornjs.org/code/dist/popcorn-complete.min.js", l.onload = l.onreadystatechange = function() {
                !s && (!(a = this.readyState) || a == "loaded" || a == "complete") && (f = e.Popcorn, o && (e.Popcorn = o), i(f, s = !0), n(l).remove())
            }, u.appendChild(l)
        }
    }
    function l(n, r, i) {
        var s, a;
        if (!(s = e.SC) || !s.Dialog || r > s._version || i(s)) {
            var f = t.createElement("script");
            f.type = "text/javascript", f.src = "http://connect.soundcloud.com/sdk-2.0.0.js", f.onload = f.onreadystatechange = function() {
                !o && (!(a = this.readyState) || a == "loaded" || a == "complete") && (i(e.SC, o = !0), n(f).remove())
            }, u.appendChild(f)
        }
    }
    var i = !1, s = !1, o = !1, u = t.head || t.getElementsByTagName("head").item(0) || t.documentElement.childNodes[0];
    a(n, function(e) {
        f(e, "1.5.6", function(t) {
            l(e, "2.0.0", function(n) {
                r(e, t, n)
            })
        })
    })
})(window, document, "1.3", function(e, t, n) {
    e(document).ready(function() {
        function u(t) {
            this.el = t, this.$el = e(this.el), this.start = t.attributes["data-start"].value || 0, this.end = t.attributes["data-end"].value, this.playing = !1, this.sound = null, i.push(this)
        }
        function a(e) {
            u.apply(this, Array.prototype.slice.call(arguments)), this.id = e.attributes["data-id"].value, n.stream(this.id, o(function(e) {
                this.sound = e, this.sound._player.on("positionChange", o(function(e) {
                    this.track_progress(), e > this.end && this.stop()
                }, this)), this.sound_loaded()
            }, this))
        }
        function f(e) {
            u.apply(this, Array.prototype.slice.call(arguments)), this.id = "soundcite-audio-" + i.length, this.url = e.attributes["data-url"].value, this.start = Math.floor(this.start / 1e3), this.end = Math.floor(this.end / 1e3), s.append('<audio id="' + this.id + '" src="' + this.url + '" preload="true"></audio>'), this.sound = t("#" + this.id, {frameAnimation: !0}), this.sound.on("loadeddata", o(function() {
                this.end || (this.end = this.sound.duration()), this.sound.cue(this.end, o(this.stop, this)), soundcite.mobile || this.sound_loaded()
            }, this)), soundcite.mobile ? this.sound_loaded() : this.sound.readyState() > 1 && this.sound_loaded()
        }
        var r = {update_playing_element: function(t, n) {
                e(t).css({background: "-webkit-linear-gradient(left, rgba(0,0,0,.15)" + n + "%, rgba(0,0,0,.05)" + (n + 1) + "%)",background: "linear-gradient(to right, rgba(0,0,0,.15)" + n + "%, rgba(0,0,0,.05)" + (n + 1) + "%)"})
            }};
        e.extend(r, window.SOUNDCITE_CONFIG), window.soundcite = {}, /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? soundcite.mobile = !0 : soundcite.mobile = !1;
        var i = [], s = e('<div class="soundcite-audio"></div>');
        e("body").append(s), n.initialize({client_id: "5ba7fd66044a60db41a97cb9d924996a"});
        var o = function(e, t) {
            var n = Array.prototype.slice, r = n.call(arguments, 2);
            return function() {
                return e.apply(t, r.concat(n.call(arguments)))
            }
        };
        u.prototype.sound_loaded = function() {
            this.$el.click(o(this.click_handler, this)), this.$el.addClass("soundcite-loaded soundcite-play")
        }, u.prototype.pause = function() {
            this.$el.removeClass("soundcite-pause"), this.$el.addClass("soundcite-play"), this.pause_sound(), this.playing = !1
        }, u.prototype.stop = function() {
            this.$el.removeClass("soundcite-pause"), this.$el.addClass("soundcite-play"), this.stop_sound(), this.playing = !1
        }, u.prototype.track_progress = function() {
            var e = this.end - this.start, t = this.sound_position(), n = t - this.start, i = n * 100 / e;
            r.update_playing_element(this.el, i)
        }, u.prototype.click_handler = function() {
            for (var e = 0; e < i.length; e++)
                this.el !== i[e].el && i[e].playing && i[e].pause();
            this.playing ? this.pause() : this.play()
        }, a.prototype = Object.create(u.prototype), a.prototype.sound_position = function() {
            return this.sound.getCurrentPosition()
        }, a.prototype.pause_sound = function() {
            this.sound.pause()
        }, a.prototype.stop_sound = function() {
            this.sound.stop()
        }, a.prototype.play = function() {
            var e = this.sound_position();
            (e < this.start || e >= this.end) && this.sound.seek(this.start), this.$el.removeClass("soundcite-play"), this.$el.addClass("soundcite-pause"), this.sound.play(), this.playing = !0
        }, f.prototype = Object.create(u.prototype), f.prototype.sound_position = function() {
            return this.sound.currentTime()
        }, f.prototype.pause_sound = function() {
            this.sound.pause(), this.sound.off("timeupdate")
        }, f.prototype.stop_sound = function() {
            this.sound.pause(), this.sound.off("timeupdate")
        }, f.prototype._play_sound = function() {
            this.$el.removeClass("soundcite-loading soundcite-play"), this.$el.addClass("soundcite-pause"), this.sound.play(), this.playing = !0, this.sound.on("timeupdate", o(this.track_progress, this)), this.sound.on("ended", o(this.stop, this))
        }, f.prototype.play_sound = function() {
            var e = this.sound.roundTime();
            e < this.start || e >= this.end ? (this.sound.on("seeked", o(function() {
                this.sound.off("seeked"), this._play_sound()
            }, this)), this.sound.currentTime(this.start)) : this._play_sound()
        }, f.prototype.play = function() {
            soundcite.mobile ? (this.$el.removeClass("soundcite-play"), this.$el.addClass("soundcite-loading"), this.sound.readyState() > 1 ? this.play_sound() : (this.sound.on("canplaythrough", o(function() {
                this.play_sound()
            }, this)), e("#" + this.id)[0].load())) : this.play_sound()
        };
        var l = e(".soundcite");
        for (var c = 0; c < l.length; c++) {
            var h = l[c];
            h.hasAttribute("data-url") ? new f(h) : new a(h)
        }
        soundcite.Clip = u, soundcite.SoundCloudClip = a, soundcite.PopcornClip = f, soundcite.clips = i
    })
});
