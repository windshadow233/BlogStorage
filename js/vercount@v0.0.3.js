var t, e;
(function() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return;
    }
    var n, o = [], c = !1;
    var a = 'blog.fyz666.xyz';
    function i() {
        c = !0,
        document.removeEventListener("DOMContentLoaded", i),
        o.forEach((t => t.call(document))),
        o = []
    }
    e = {
        counterIds: ["site_pv", "page_pv", "site_uv"],
        updateText: function(t) {
            this.counterIds.forEach((e => {
                const o = document.getElementById("vercount_value_" + e);
                o && (o.textContent = t[e] || "0")
            }))
        },
        hideAll: function() {
            this.counterIds.forEach((t => {
                const n = document.getElementById("vercount_container_" + t);
                n && (n.style.display = "none")
            }))
        },
        showAll: function() {
            this.counterIds.forEach((t => {
                const n = document.getElementById("vercount_container_" + t);
                n && (n.style.display = "inline")
            }))
        }
    };
    t = {
        fetch: async function(t) {
            try {
                e.hideAll();
                const o = await fetch("https://events.vercount.one/log?jsonpCallback=VisitorCountCallback", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        url: window.location.href.replace(window.location.hostname, a)
                    })
                })
                , c = await o.json();
                n(( () => {
                    t(c),
                    localStorage.setItem("visitorCountData", JSON.stringify(c)),
                    e.showAll()
                }))
            } catch (t) {
                console.error("Error fetching visitor count:", t),
                e.hideAll()
            }
        }
    };
    (n = function(t) {
        c || "interactive" === document.readyState || "complete" === document.readyState ? t.call(document) : (o.push(t),
        document.addEventListener("DOMContentLoaded", i))
    })(( () => {
        t.fetch(e.updateText.bind(e))
    }))
})();
