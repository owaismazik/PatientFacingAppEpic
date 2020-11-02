﻿! function a(b, c, d) {
    function e(g, h) {
        if (!c[g]) {
            if (!b[g]) {
                var i = "function" == typeof require && require;
                if (!h && i) return i(g, !0);
                if (f) return f(g, !0);
                var j = new Error("Cannot find module '" + g + "'");
                throw j.code = "MODULE_NOT_FOUND", j
            }
            var k = c[g] = {
                exports: {}
            };
            b[g][0].call(k.exports, function (a) {
                var c = b[g][1][a];
                return e(c || a)
            }, k, k.exports, a, b, c, d)
        }
        return c[g].exports
    }
    for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
    return e
}({
    1: [function (a, b, c) {
        ! function (a, d) {
            "object" == typeof c && "object" == typeof b ? b.exports = d() : "function" == typeof define && define.amd ? define([], d) : "object" == typeof c ? c.fhir = d() : a.fhir = d()
        }(this, function () {
            return function (a) {
                function b(d) {
                    if (c[d]) return c[d].exports;
                    var e = c[d] = {
                        exports: {},
                        id: d,
                        loaded: !1
                    };
                    return a[d].call(e.exports, e, e.exports, b), e.loaded = !0, e.exports
                }
                var c = {};
                return b.m = a, b.c = c, b.p = "", b(0)
            }([function (a, b, c) {
                (function () {
                    var b = c(1),
                        d = window._jQuery || window.jQuery,
                        e = function () {
                            return pr = d.Deferred(), pr.promise = pr.promise(), pr
                        },
                        f = {
                            defer: e,
                            http: function (a) {
                                var b = d.Deferred(),
                                    c = {
                                        type: a.method,
                                        url: a.url,
                                        headers: a.headers,
                                        dataType: "json",
                                        contentType: "application/json",
                                        data: a.data || a.params,
                                        withCredentials: "include" === a.credentials
                                    };
                                return d.ajax(c).done(function (c, d, e) {
                                    b.resolve({
                                        data: c,
                                        status: d,
                                        headers: e.getResponseHeader,
                                        config: a
                                    })
                                }).fail(function (c) {
                                    b.reject({
                                        error: c,
                                        data: c,
                                        config: a
                                    })
                                }), b.promise()
                            }
                        },
                        g = function (a) {
                            return b(a, f)
                        };
                    g.defer = e, a.exports = g
                }).call(this)
            }, function (a, b, c) {
                (function () {
                    var b = (c(2), c(5)),
                        d = c(6),
                        e = c(7),
                        f = c(9),
                        g = c(10),
                        h = c(11),
                        i = c(12),
                        j = c(13),
                        k = c(14),
                        l = c(15),
                        m = c(16),
                        n = function (a, c) {
                            var n = b.Middleware,
                                o = b.$$Attr,
                                p = function (a) {
                                    return o("method", a)
                                },
                                q = function (a, b) {
                                    return o("headers." + a, b)
                                },
                                r = n(g),
                                s = n(h(a, c)).and(r).and(e.$Basic).and(e.$Bearer).and(e.$Credentials).and(f.$JsonData).and(q("Accept", "application/json")).and(q("Content-Type", "application/json")),
                                t = s.and(p("GET")),
                                u = s.and(p("POST")),
                                v = s.and(p("PUT")),
                                w = s.and(p("DELETE")),
                                x = f.Http(a, c),
                                y = l.Path,
                                z = y(a.baseUrl),
                                A = z.slash(":type || :resource.resourceType"),
                                B = A.slash("_history"),
                                C = A.slash(":id || :resource.id"),
                                D = C.slash("_history"),
                                E = D.slash(":versionId || :resource.meta.versionId"),
                                F = (D.slash(":versionId || :resource.meta.versionId"), q("Prefer", "return=representation")),
                                G = n(d.$Paging);
                            return m({
                                conformance: t.and(z.slash("metadata")).end(x),
                                document: u.and(z.slash("Document")).end(x),
                                profile: t.and(z.slash("Profile").slash(":type")).end(x),
                                transaction: u.and(z).end(x),
                                history: t.and(z.slash("_history")).and(G).end(x),
                                typeHistory: t.and(B).and(G).end(x),
                                resourceHistory: t.and(D).and(G).end(x),
                                read: t.and(j.$WithPatient).and(C).end(x),
                                vread: t.and(E).end(x),
                                delete: w.and(C).and(F).end(x),
                                create: u.and(A).and(F).end(x),
                                validate: u.and(A.slash("_validate")).end(x),
                                search: t.and(A).and(j.$WithPatient).and(d.$SearchParams).and(G).end(x),
                                update: v.and(C).and(F).end(x),
                                nextPage: t.and(i.$$BundleLinkUrl("next")).end(x),
                                prevPage: t.and(i.$$BundleLinkUrl("prev")).end(x),
                                resolve: t.and(k.resolve).end(x)
                            }, c)
                        };
                    a.exports = n
                }).call(this)
            }, function (a, b, c) {
                (function () {
                    var a = c(3),
                        d = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
                        e = function (a) {
                            return a ? a.toString().replace(d, "") : ""
                        };
                    b.trim = e;
                    var f = function (a) {
                        var b;
                        return null == a && void 0 === a ? String(a) : (b = {
                            "[object Boolean]": "boolean",
                            "[object Number]": "number",
                            "[object String]": "string",
                            "[object Function]": "function",
                            "[object Array]": "array",
                            "[object Date]": "date",
                            "[object RegExp]": "regexp",
                            "[object Object]": "object"
                        }, b[Object.prototype.toString.call(a)])
                    };
                    b.type = f;
                    var g = function (a) {
                        if ("array" !== f(a)) throw "not array";
                        return a
                    };
                    b.assertArray = g;
                    var h = function (a) {
                        if ("object" !== f(a)) throw "not object";
                        return a
                    };
                    b.assertObject = h;
                    var i = function (a, b, c) {
                        var d, e;
                        return c || (c = []), h(a),
                            function () {
                                var b;
                                b = [];
                                for (d in a) e = a[d], b.push([d, e]);
                                return b
                            }().reduce(b, c)
                    };
                    b.reduceMap = i;
                    var j = function (a) {
                        return a
                    };
                    b.identity = j;
                    var k = function () {
                        return Array.prototype.slice.call(arguments)
                    };
                    b.argsArray = k;
                    var l = function () {
                        var b;
                        return b = function (b, c) {
                            var d, e, f;
                            e = a(!0, b);
                            for (d in c) f = c[d], e[d] = (e[d] || []).concat(f);
                            return e
                        }, k.apply(null, arguments).reduce(b, {})
                    };
                    b.mergeLists = l;
                    var m = function (a, b) {
                        return b.match(/https?:\/\/./) ? b : a + "/" + b
                    };
                    b.absoluteUrl = m;
                    var n = function (a, b) {
                        return b.slice(b, a.length + 1) === a + "/" ? b.slice(a.length + 1) : b
                    };
                    b.relativeUrl = n, b.resourceIdToUrl = function (a, b, c) {
                        return b = b.replace(/\/$/, ""), a = a.replace(/^\//, ""), a.indexOf("/") < 0 ? b + "/" + c + "/" + a : 0 !== a.indexOf(b) ? b + "/" + a : a
                    };
                    var o = function (a, b, c, d) {
                        var e, g;
                        switch (f(c)) {
                            case "array":
                                return b(c.map(function (b) {
                                    return a(b, [c, d])
                                }), d);
                            case "object":
                                return e = function (b, e) {
                                    var f, g;
                                    return f = e[0], g = e[1], b[f] = a(g, [c].concat(d)), b
                                }, g = i(c, e, {}), b(g, d);
                            default:
                                return b(c, d)
                        }
                    };
                    b.walk = o;
                    var p = function (a, b, c) {
                        return b ? o(p(a), a, b, c) : function (b, c) {
                            return p(a, b, c)
                        }
                    };
                    b.postwalk = p
                }).call(this)
            }, function (a, b, c) {
                (function (a) {
                    ! function (b) {
                        function c() {
                            var a, b, c, f = Array.prototype.slice.call(arguments),
                                g = f.shift(),
                                h = !0 === g,
                                i = f.length;
                            for ((h || "object" !== e(g)) && (g = {}), b = 0; b < i; ++b)
                                if ("object" === e(a = f[b]))
                                    for (c in a) g[c] = h ? d(a[c]) : a[c];
                            return g
                        }

                        function d(a) {
                            var b, c, f = a,
                                g = e(a);
                            if ("array" === g)
                                for (f = [], c = a.length, b = 0; b < c; ++b) f[b] = d(a[b]);
                            else if ("object" === g) {
                                f = {};
                                for (b in a) f[b] = d(a[b])
                            }
                            return f
                        }

                        function e(a) {
                            return {}.toString.call(a).match(/\s([\w]+)/)[1].toLowerCase()
                        }
                        b ? a.exports = c : window.merge = c
                    }("object" == typeof a && a && "object" == typeof a.exports && a.exports)
                }).call(b, c(4)(a))
            }, function (a, b) {
                a.exports = function (a) {
                    return a.webpackPolyfill || (a.deprecate = function () { }, a.paths = [], a.children = [], a.webpackPolyfill = 1), a
                }
            }, function (a, b, c) {
                (function () {
                    var a = c(2),
                        d = function (a) {
                            return function () {
                                return a
                            }
                        },
                        e = function (a, b) {
                            return function (c) {
                                return a(b(c))
                            }
                        },
                        f = function (a) {
                            return a.and = function (b) {
                                return f(e(a, b))
                            }, a.end = function (b) {
                                return a(b)
                            }, a
                        };
                    b.$$Simple = function (a) {
                        return function (b) {
                            return function (c) {
                                return b(a(c))
                            }
                        }
                    };
                    var g = function (a, b, c) {
                        for (var d = b.split("."), e = a, f = 0; f < d.length - 1; f++) {
                            var g = d[f];
                            e = a[g], e || (e = {}, a[g] = e)
                        }
                        return e[d[d.length - 1]] = c, a
                    };
                    b.$$Attr = function (b, c) {
                        return f(function (d) {
                            return function (e) {
                                var f = null;
                                return f = "function" == a.type(c) ? c(e) : c, d(null == f && void 0 == f ? e : g(e, b, f))
                            }
                        })
                    };
                    var h = function (a, b) {
                        return f(function (c) {
                            return function (d) {
                                return d[a] = b(d), c(d)
                            }
                        })
                    },
                        i = function (a) {
                            return h("method", d(a))
                        };
                    b.Middleware = f, b.Attribute = h, b.Method = i
                }).call(this)
            }, function (a, b, c) {
                (function () {
                    var a = c(2),
                        d = a.type,
                        e = a.assertArray,
                        f = (a.assertObject, a.reduceMap),
                        g = a.identity,
                        h = {
                            $gt: "gt",
                            $lt: "lt",
                            $lte: "lte",
                            $gte: "gte"
                        },
                        i = {
                            $asc: ":asc",
                            $desc: ":desc",
                            $exact: ":exact",
                            $missing: ":missing",
                            $null: ":missing",
                            $text: ":text"
                        },
                        j = function (a) {
                            return 0 === a.indexOf("$")
                        },
                        k = function (a, b) {
                            return f(b, function (c, f) {
                                var g, k, l, m;
                                return g = f[0], m = f[1], c.concat("$and" === g ? e(m).reduce(function (b, c) {
                                    return b.concat(n(a, c))
                                }, []) : "$type" === g ? [] : j(g) ? (k = {
                                    param: a
                                }, "$or" === g ? k.value = m : (h[g] && (k.operator = h[g]), i[g] && (k.modifier = i[g]), "object" === d(m) && m.$or ? k.value = m.$or : k.value = [m]), [k]) : (b.$type && (l = ":" + b.$type), n("" + a + (l || "") + "." + g, m)))
                            })
                        },
                        l = function (a) {
                            var b, c, f, g;
                            for (e(a), f = [], b = 0, c = a.length; b < c; b++) switch (g = a[b], d(g)) {
                                case "array":
                                    f.push({
                                        param: "_sort",
                                        value: g[0],
                                        modifier: ":" + g[1]
                                    });
                                    break;
                                case "string":
                                    f.push({
                                        param: "_sort",
                                        value: g
                                    });
                                    break;
                                default:
                                    f.push(void 0)
                            }
                            return f
                        },
                        m = function (a) {
                            return f(a, function (a, b) {
                                var c, e;
                                return c = b[0], e = b[1], a.concat(function () {
                                    switch (d(e)) {
                                        case "array":
                                            return e.map(function (a) {
                                                return {
                                                    param: "_include",
                                                    value: c + "." + a
                                                }
                                            });
                                        case "string":
                                            return [{
                                                param: "_include",
                                                value: c + "." + e
                                            }]
                                    }
                                }())
                            })
                        },
                        n = function (a, b) {
                            if ("$sort" === a) return l(b);
                            if ("$include" === a) return m(b);
                            switch (d(b)) {
                                case "object":
                                    return k(a, b);
                                case "string":
                                case "number":
                                    return [{
                                        param: a,
                                        value: [b]
                                    }];
                                case "array":
                                    return [{
                                        param: a,
                                        value: [b.join("|")]
                                    }];
                                default:
                                    throw "could not linearizeParams " + d(b)
                            }
                        },
                        o = function (a) {
                            return f(a, function (a, b) {
                                var c, d;
                                return c = b[0], d = b[1], a.concat(n(c, d))
                            })
                        },
                        p = function (a) {
                            var b, c;
                            return c = function () {
                                var c, d, e, f;
                                for (e = o(a), f = [], c = 0, d = e.length; c < d; c++) b = e[c], f.push([b.param, b.modifier, "=", b.operator, encodeURIComponent(b.value)].filter(g).join(""));
                                return f
                            }(), c.join("&")
                        };
                    b._query = o, b.query = p;
                    var q = c(5);
                    b.$SearchParams = q.$$Attr("url", function (a) {
                        var b = a.url;
                        if (a.query) {
                            return b + "?" + p(a.query)
                        }
                        return b
                    }), b.$Paging = function (a) {
                        return function (b) {
                            var c = b.params || {};
                            return b.since && (c._since = b.since), b.count && (c._count = b.count), b.params = c, a(b)
                        }
                    }
                }).call(this)
            }, function (a, b, c) {
                (function () {
                    var a = c(5),
                        d = c(8).btoa;
                    b.$Basic = a.$$Attr("headers.Authorization", function (a) {
                        if (a.auth && a.auth.user && a.auth.pass) return "Basic " + d(a.auth.user + ":" + a.auth.pass)
                    }), b.$Bearer = a.$$Attr("headers.Authorization", function (a) {
                        if (a.auth && a.auth.bearer) return "Bearer " + a.auth.bearer
                    });
                    var e;
                    b.$Credentials = a.Middleware(a.$$Attr("credentials", function (a) {
                        return e = a.credentials, ""
                    })).and(a.$$Attr("credentials", function (a) {
                        if (["same-origin", "include"].indexOf(e) > -1) return e
                    }))
                }).call(this)
            }, function (a, b, c) {
                ! function () {
                    function a(a) {
                        this.message = a
                    }
                    var c = b,
                        d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                    a.prototype = new Error, a.prototype.name = "InvalidCharacterError", c.btoa || (c.btoa = function (b) {
                        for (var c, e, f = String(b), g = 0, h = d, i = ""; f.charAt(0 | g) || (h = "=", g % 1); i += h.charAt(63 & c >> 8 - g % 1 * 8)) {
                            if ((e = f.charCodeAt(g += .75)) > 255) throw new a("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
                            c = c << 8 | e
                        }
                        return i
                    }), c.atob || (c.atob = function (b) {
                        var c = String(b).replace(/=+$/, "");
                        if (c.length % 4 == 1) throw new a("'atob' failed: The string to be decoded is not correctly encoded.");
                        for (var e, f, g = 0, h = 0, i = ""; f = c.charAt(h++); ~f && (e = g % 4 ? 64 * e + f : f, g++ % 4) ? i += String.fromCharCode(255 & e >> (-2 * g & 6)) : 0) f = d.indexOf(f);
                        return i
                    })
                }()
            }, function (a, b, c) {
                (function () {
                    var a = c(2);
                    b.Http = function (a, b) {
                        return function (c) {
                            c.debug && console.log("\nDEBUG (request):", c.method, c.url, c);
                            var d = (c.http || b.http || a.http)(c);
                            return c.debug && d && d.then && d.then(function (a) {
                                console.log("\nDEBUG: (responce)", a)
                            }), d
                        }
                    };
                    var d = function (b) {
                        return "object" == a.type(b) ? JSON.stringify(b) : b
                    };
                    b.$JsonData = function (a) {
                        return function (b) {
                            var c = b.bundle || b.data || b.resource;
                            return c && (b.data = d(c)), a(b)
                        }
                    }
                }).call(this)
            }, function (a, b) {
                a.exports = function (a) {
                    return function (b) {
                        try {
                            return a(b)
                        } catch (a) {
                            if (b.debug && (console.log("\nDEBUG: (ERROR in middleware)"), console.log(a.message), console.log(a.stack)), !b.defer) throw console.log("\nDEBUG: (ERROR in middleware)"), console.log(a.message), console.log(a.stack), new Error("I need adapter.defer");
                            var c = b.defer();
                            return c.reject(a), c.promise
                        }
                    }
                }
            }, function (a, b) {
                (function () {
                    var b = function (a, b, c) {
                        var d = a[c];
                        return d && !b[c] && (b[c] = d), a
                    };
                    a.exports = function (a, c) {
                        return function (d) {
                            return function (e) {
                                return b(a, e, "baseUrl"), b(a, e, "cache"), b(a, e, "auth"), b(a, e, "patient"), b(a, e, "debug"), b(c, e, "defer"), b(c, e, "http"), d(e)
                            }
                        }
                    }
                }).call(this)
            }, function (a, b) {
                b.$$BundleLinkUrl = function (a) {
                    return function (b) {
                        return function (c) {
                            var d = function (b) {
                                return b.relation && b.relation === a
                            },
                                e = c.bundle && (c.bundle.link || []).filter(d)[0];
                            if (e && e.url) return c.url = e.url, c.data = null, b(c);
                            throw new Error("No " + a + " link found in bundle")
                        }
                    }
                }
            }, function (a, b, c) {
                (function () {
                    var a = c(5),
                        d = ["Account", "AllergyIntolerance", "BodySite", "CarePlan", "Claim", "ClinicalImpression", "Communication", "CommunicationRequest", "Composition", "Condition", "Contract", "DetectedIssue", "Device", "DeviceUseRequest", "DeviceUseStatement", "DiagnosticOrder", "DiagnosticReport", "DocumentManifest", "DocumentReference", "Encounter", "EnrollmentRequest", "EpisodeOfCare", "FamilyMemberHistory", "Flag", "Goal", "ImagingObjectSelection", "ImagingStudy", "Immunization", "ImmunizationRecommendation", "List", "Media", "MedicationAdministration", "MedicationDispense", "MedicationOrder", "MedicationStatement", "NutritionOrder", "Observation", "Order", "Procedure", "ProcedureRequest", "QuestionnaireResponse", "ReferralRequest", "RelatedPerson", "RiskAssessment", "Specimen", "SupplyDelivery", "SupplyRequest", "VisionPrescription"];
                    b.$WithPatient = a.$$Simple(function (a) {
                        var b = a.type;
                        return a.patient && ("Patient" === b ? (a.query = a.query || {}, a.query._id = a.patient, a.id = a.patient) : d.indexOf(b) >= 0 && (a.query = a.query || {}, a.query.patient = a.patient)), a
                    })
                }).call(this)
            }, function (a, b, c) {
                (function () {
                    var b = c(2),
                        d = /^#(.*)/,
                        e = function (a, b) {
                            var c = a.match(d)[1],
                                e = (b.contained || []).filter(function (a) {
                                    return (a.id || a._id) == c
                                })[0];
                            return e && {
                                content: e
                            } || null
                        },
                        f = function (a) {
                            var c = a.cache,
                                f = a.reference,
                                g = a.bundle,
                                h = f;
                            if (!h.reference) return null;
                            if (h.reference.match(d)) return e(h.reference, a.resource);
                            var i = b.absoluteUrl(a.baseUrl, h.reference);
                            return (g && g.entry || []).filter(function (a) {
                                return a.id === i
                            })[0] || (null != c ? c[i] : void 0) || null
                        },
                        g = function (a) {
                            return function (c) {
                                var e = f(c),
                                    g = c.reference,
                                    h = c.defer();
                                if (e) {
                                    if (!c.defer) throw new Error("I need promise constructor 'adapter.defer' in adapter");
                                    return h.resolve(e), h.promise
                                }
                                if (!g) throw new Error("No reference found");
                                if (g && g.reference.match(d)) throw new Error("Contained resource not found");
                                return c.url = b.absoluteUrl(c.baseUrl, g.reference), c.data = null, a(c)
                            }
                        };
                    a.exports.sync = f, a.exports.resolve = g
                }).call(this)
            }, function (a, b, c) {
                (function () {
                    var a = (c(2), c(5)),
                        d = function (a, b) {
                            return b.split(".").reduce(function (a, b) {
                                return null == a || void 0 == a ? null : a[b]
                            }, a)
                        },
                        e = function (a, b) {
                            for (var c = a.split("||").map(function (a) {
                                return a.trim().substring(1)
                            }), e = 0; e < c.length; e++) {
                                var f = d(b, c[e]);
                                if (f) return f
                            }
                            return null
                        },
                        f = function (a, b) {
                            return 0 == a.indexOf(":") ? e(a, b) : a
                        },
                        g = function (a, b) {
                            var c = f(a.trim(), b);
                            if (null == c || void 0 === c) throw new Error("Parameter " + a + " is required: " + JSON.stringify(b));
                            return c
                        },
                        h = function (b, c) {
                            var d = function (a) {
                                return (c && c(a) + "/" || "") + g(b, a)
                            },
                                e = a.Attribute("url", d);
                            return e.slash = function (a) {
                                return h(a, d)
                            }, e
                        };
                    b.Path = h
                }).call(this)
            }, function (a, b) {
                (function () {
                    function b(a, c) {
                        var d, e = a.data.entry || [],
                            f = [];
                        for (d = 0; d < e.length; d++) f.push(e[d].resource);
                        c(f);
                        var i = h.defer();
                        return g.nextPage({
                            bundle: a.data
                        }).then(function (a) {
                            b(a, c).then(function (a) {
                                i.resolve()
                            })
                        }, function (a) {
                            i.resolve()
                        }), i.promise
                    }

                    function c(a, c, d, e) {
                        h.defer();
                        g.search(a).then(function (a) {
                            b(a, c).then(function () {
                                d()
                            }, function (a) {
                                e(a)
                            })
                        }, function (a) {
                            e(a)
                        })
                    }

                    function d(a) {
                        var b = h.defer(),
                            d = [];
                        return c(a, function (a) {
                            a.forEach(function (a) {
                                d.push(a)
                            })
                        }, function () {
                            b.resolve(d)
                        }, function (a) {
                            b.reject(a)
                        }), b.promise
                    }

                    function e(a, b) {
                        var c = h.defer();
                        return g.search(a).then(function (a) {
                            function d(a, b) {
                                var c = b.reference;
                                if (c.startsWith("#")) {
                                    return a.resourceType + "/" + a.id + c
                                }
                                return c
                            }

                            function e(a, b, c) {
                                j.push(function () {
                                    h(a, b, c)
                                })
                            }

                            function f() {
                                j.pop()()
                            }

                            function h(a, b, c) {
                                var e = d(b, c);
                                g.resolve({
                                    bundle: a,
                                    resource: b,
                                    reference: c
                                }).then(function (a) {
                                    var b = a.data || a.content;
                                    i[e] = b, f()
                                })
                            }
                            var i = {},
                                j = [function () {
                                    var b = a.data.entry || [],
                                        e = b.map(function (a) {
                                            return a.resource
                                        }),
                                        f = function (a, b) {
                                            var c = d(a, b);
                                            return i[c]
                                        };
                                    c.resolve(e, f)
                                }],
                                k = a.data;
                            k.entry && k.entry.forEach(function (a) {
                                var c = a.resource,
                                    d = c.resourceType;
                                b && b.forEach(function (a) {
                                    var b = a.split("."),
                                        f = b[0],
                                        g = b[1],
                                        h = c[g];
                                    if (d === f && h) {
                                        var j = h.reference;
                                        i[j] || e(k, c, h)
                                    }
                                })
                            }), f()
                        }, function () {
                            c.reject("Could not fetch search results")
                        }), c.promise
                    }

                    function f(a, b) {
                        return g = a, h = b, a.drain = c, a.fetchAll = d, a.fetchAllWithReferences = e, a
                    }
                    var g, h;
                    a.exports = f
                }).call(this)
            }])
        })
    }, {}],
    2: [function (a, b, c) { }, {}],
    3: [function (a, b, c) {
        function d(a, b, c) {
            if (!(this instanceof d)) return new d(a, b, c);
            var e, f = typeof a;
            if ("number" === f) e = a > 0 ? a >>> 0 : 0;
            else if ("string" === f) "base64" === b && (a = C(a)), e = d.byteLength(a, b);
            else {
                if ("object" !== f || null === a) throw new Error("First argument needs to be a number, array or string.");
                "Buffer" === a.type && E(a.data) && (a = a.data), e = +a.length > 0 ? Math.floor(+a.length) : 0
            }
            var g;
            T ? g = d._augment(new Uint8Array(e)) : (g = this, g.length = e, g._isBuffer = !0);
            var h;
            if (T && "number" == typeof a.byteLength) g._set(a);
            else if (F(a))
                if (d.isBuffer(a))
                    for (h = 0; h < e; h++) g[h] = a.readUInt8(h);
                else
                    for (h = 0; h < e; h++) g[h] = (a[h] % 256 + 256) % 256;
            else if ("string" === f) g.write(a, 0, b);
            else if ("number" === f && !T && !c)
                for (h = 0; h < e; h++) g[h] = 0;
            return g
        }

        function e(a, b, c, d) {
            c = Number(c) || 0;
            var e = a.length - c;
            d ? (d = Number(d)) > e && (d = e) : d = e;
            var f = b.length;
            Q(f % 2 == 0, "Invalid hex string"), d > f / 2 && (d = f / 2);
            for (var g = 0; g < d; g++) {
                var h = parseInt(b.substr(2 * g, 2), 16);
                Q(!isNaN(h), "Invalid hex string"), a[c + g] = h
            }
            return g
        }

        function f(a, b, c, d) {
            return L(H(b), a, c, d)
        }

        function g(a, b, c, d) {
            return L(I(b), a, c, d)
        }

        function h(a, b, c, d) {
            return g(a, b, c, d)
        }

        function i(a, b, c, d) {
            return L(K(b), a, c, d)
        }

        function j(a, b, c, d) {
            return L(J(b), a, c, d)
        }

        function k(a, b, c) {
            return 0 === b && c === a.length ? R.fromByteArray(a) : R.fromByteArray(a.slice(b, c))
        }

        function l(a, b, c) {
            var d = "",
                e = "";
            c = Math.min(a.length, c);
            for (var f = b; f < c; f++) a[f] <= 127 ? (d += M(e) + String.fromCharCode(a[f]), e = "") : e += "%" + a[f].toString(16);
            return d + M(e)
        }

        function m(a, b, c) {
            var d = "";
            c = Math.min(a.length, c);
            for (var e = b; e < c; e++) d += String.fromCharCode(a[e]);
            return d
        }

        function n(a, b, c) {
            return m(a, b, c)
        }

        function o(a, b, c) {
            var d = a.length;
            (!b || b < 0) && (b = 0), (!c || c < 0 || c > d) && (c = d);
            for (var e = "", f = b; f < c; f++) e += G(a[f]);
            return e
        }

        function p(a, b, c) {
            for (var d = a.slice(b, c), e = "", f = 0; f < d.length; f += 2) e += String.fromCharCode(d[f] + 256 * d[f + 1]);
            return e
        }

        function q(a, b, c, d) {
            d || (Q("boolean" == typeof c, "missing or invalid endian"), Q(void 0 !== b && null !== b, "missing offset"), Q(b + 1 < a.length, "Trying to read beyond buffer length"));
            var e = a.length;
            if (!(b >= e)) {
                var f;
                return c ? (f = a[b], b + 1 < e && (f |= a[b + 1] << 8)) : (f = a[b] << 8, b + 1 < e && (f |= a[b + 1])), f
            }
        }

        function r(a, b, c, d) {
            d || (Q("boolean" == typeof c, "missing or invalid endian"), Q(void 0 !== b && null !== b, "missing offset"), Q(b + 3 < a.length, "Trying to read beyond buffer length"));
            var e = a.length;
            if (!(b >= e)) {
                var f;
                return c ? (b + 2 < e && (f = a[b + 2] << 16), b + 1 < e && (f |= a[b + 1] << 8), f |= a[b], b + 3 < e && (f += a[b + 3] << 24 >>> 0)) : (b + 1 < e && (f = a[b + 1] << 16), b + 2 < e && (f |= a[b + 2] << 8), b + 3 < e && (f |= a[b + 3]), f += a[b] << 24 >>> 0), f
            }
        }

        function s(a, b, c, d) {
            if (d || (Q("boolean" == typeof c, "missing or invalid endian"), Q(void 0 !== b && null !== b, "missing offset"), Q(b + 1 < a.length, "Trying to read beyond buffer length")), !(b >= a.length)) {
                var e = q(a, b, c, !0);
                return 32768 & e ? -1 * (65535 - e + 1) : e
            }
        }

        function t(a, b, c, d) {
            if (d || (Q("boolean" == typeof c, "missing or invalid endian"), Q(void 0 !== b && null !== b, "missing offset"), Q(b + 3 < a.length, "Trying to read beyond buffer length")), !(b >= a.length)) {
                var e = r(a, b, c, !0);
                return 2147483648 & e ? -1 * (4294967295 - e + 1) : e
            }
        }

        function u(a, b, c, d) {
            return d || (Q("boolean" == typeof c, "missing or invalid endian"), Q(b + 3 < a.length, "Trying to read beyond buffer length")), S.read(a, b, c, 23, 4)
        }

        function v(a, b, c, d) {
            return d || (Q("boolean" == typeof c, "missing or invalid endian"), Q(b + 7 < a.length, "Trying to read beyond buffer length")), S.read(a, b, c, 52, 8)
        }

        function w(a, b, c, d, e) {
            e || (Q(void 0 !== b && null !== b, "missing value"), Q("boolean" == typeof d, "missing or invalid endian"), Q(void 0 !== c && null !== c, "missing offset"), Q(c + 1 < a.length, "trying to write beyond buffer length"), N(b, 65535));
            var f = a.length;
            if (!(c >= f)) {
                for (var g = 0, h = Math.min(f - c, 2); g < h; g++) a[c + g] = (b & 255 << 8 * (d ? g : 1 - g)) >>> 8 * (d ? g : 1 - g);
                return c + 2
            }
        }

        function x(a, b, c, d, e) {
            e || (Q(void 0 !== b && null !== b, "missing value"), Q("boolean" == typeof d, "missing or invalid endian"), Q(void 0 !== c && null !== c, "missing offset"), Q(c + 3 < a.length, "trying to write beyond buffer length"), N(b, 4294967295));
            var f = a.length;
            if (!(c >= f)) {
                for (var g = 0, h = Math.min(f - c, 4); g < h; g++) a[c + g] = b >>> 8 * (d ? g : 3 - g) & 255;
                return c + 4
            }
        }

        function y(a, b, c, d, e) {
            if (e || (Q(void 0 !== b && null !== b, "missing value"), Q("boolean" == typeof d, "missing or invalid endian"), Q(void 0 !== c && null !== c, "missing offset"), Q(c + 1 < a.length, "Trying to write beyond buffer length"), O(b, 32767, -32768)), !(c >= a.length)) return b >= 0 ? w(a, b, c, d, e) : w(a, 65535 + b + 1, c, d, e), c + 2
        }

        function z(a, b, c, d, e) {
            if (e || (Q(void 0 !== b && null !== b, "missing value"), Q("boolean" == typeof d, "missing or invalid endian"), Q(void 0 !== c && null !== c, "missing offset"), Q(c + 3 < a.length, "Trying to write beyond buffer length"), O(b, 2147483647, -2147483648)), !(c >= a.length)) return b >= 0 ? x(a, b, c, d, e) : x(a, 4294967295 + b + 1, c, d, e), c + 4
        }

        function A(a, b, c, d, e) {
            if (e || (Q(void 0 !== b && null !== b, "missing value"), Q("boolean" == typeof d, "missing or invalid endian"), Q(void 0 !== c && null !== c, "missing offset"), Q(c + 3 < a.length, "Trying to write beyond buffer length"), P(b, 3.4028234663852886e38, -3.4028234663852886e38)), !(c >= a.length)) return S.write(a, b, c, d, 23, 4), c + 4
        }

        function B(a, b, c, d, e) {
            if (e || (Q(void 0 !== b && null !== b, "missing value"), Q("boolean" == typeof d, "missing or invalid endian"), Q(void 0 !== c && null !== c, "missing offset"), Q(c + 7 < a.length, "Trying to write beyond buffer length"), P(b, 1.7976931348623157e308, -1.7976931348623157e308)), !(c >= a.length)) return S.write(a, b, c, d, 52, 8), c + 8
        }

        function C(a) {
            for (a = D(a).replace(V, ""); a.length % 4 != 0;) a += "=";
            return a
        }

        function D(a) {
            return a.trim ? a.trim() : a.replace(/^\s+|\s+$/g, "")
        }

        function E(a) {
            return (Array.isArray || function (a) {
                return "[object Array]" === Object.prototype.toString.call(a)
            })(a)
        }

        function F(a) {
            return E(a) || d.isBuffer(a) || a && "object" == typeof a && "number" == typeof a.length
        }

        function G(a) {
            return a < 16 ? "0" + a.toString(16) : a.toString(16)
        }

        function H(a) {
            for (var b = [], c = 0; c < a.length; c++) {
                var d = a.charCodeAt(c);
                if (d <= 127) b.push(d);
                else {
                    var e = c;
                    d >= 55296 && d <= 57343 && c++;
                    for (var f = encodeURIComponent(a.slice(e, c + 1)).substr(1).split("%"), g = 0; g < f.length; g++) b.push(parseInt(f[g], 16))
                }
            }
            return b
        }

        function I(a) {
            for (var b = [], c = 0; c < a.length; c++) b.push(255 & a.charCodeAt(c));
            return b
        }

        function J(a) {
            for (var b, c, d, e = [], f = 0; f < a.length; f++) b = a.charCodeAt(f), c = b >> 8, d = b % 256, e.push(d), e.push(c);
            return e
        }

        function K(a) {
            return R.toByteArray(a)
        }

        function L(a, b, c, d) {
            for (var e = 0; e < d && !(e + c >= b.length || e >= a.length); e++) b[e + c] = a[e];
            return e
        }

        function M(a) {
            try {
                return decodeURIComponent(a)
            } catch (a) {
                return String.fromCharCode(65533)
            }
        }

        function N(a, b) {
            Q("number" == typeof a, "cannot write a non-number as a number"), Q(a >= 0, "specified a negative value for writing an unsigned value"), Q(a <= b, "value is larger than maximum value for type"), Q(Math.floor(a) === a, "value has a fractional component")
        }

        function O(a, b, c) {
            Q("number" == typeof a, "cannot write a non-number as a number"), Q(a <= b, "value larger than maximum allowed value"), Q(a >= c, "value smaller than minimum allowed value"), Q(Math.floor(a) === a, "value has a fractional component")
        }

        function P(a, b, c) {
            Q("number" == typeof a, "cannot write a non-number as a number"), Q(a <= b, "value larger than maximum allowed value"), Q(a >= c, "value smaller than minimum allowed value")
        }

        function Q(a, b) {
            if (!a) throw new Error(b || "Failed assertion")
        }
        var R = a("base64-js"),
            S = a("ieee754");
        c.Buffer = d, c.SlowBuffer = d, c.INSPECT_MAX_BYTES = 50, d.poolSize = 8192;
        var T = function () {
            try {
                var a = new ArrayBuffer(0),
                    b = new Uint8Array(a);
                return b.foo = function () {
                    return 42
                }, 42 === b.foo() && "function" == typeof b.subarray && 0 === new Uint8Array(1).subarray(1, 1).byteLength
            } catch (a) {
                return !1
            }
        }();
        d.isEncoding = function (a) {
            switch (String(a).toLowerCase()) {
                case "hex":
                case "utf8":
                case "utf-8":
                case "ascii":
                case "binary":
                case "base64":
                case "raw":
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return !0;
                default:
                    return !1
            }
        }, d.isBuffer = function (a) {
            return !(null == a || !a._isBuffer)
        }, d.byteLength = function (a, b) {
            var c;
            switch (a = a.toString(), b || "utf8") {
                case "hex":
                    c = a.length / 2;
                    break;
                case "utf8":
                case "utf-8":
                    c = H(a).length;
                    break;
                case "ascii":
                case "binary":
                case "raw":
                    c = a.length;
                    break;
                case "base64":
                    c = K(a).length;
                    break;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    c = 2 * a.length;
                    break;
                default:
                    throw new Error("Unknown encoding")
            }
            return c
        }, d.concat = function (a, b) {
            if (Q(E(a), "Usage: Buffer.concat(list[, length])"), 0 === a.length) return new d(0);
            if (1 === a.length) return a[0];
            var c;
            if (void 0 === b)
                for (b = 0, c = 0; c < a.length; c++) b += a[c].length;
            var e = new d(b),
                f = 0;
            for (c = 0; c < a.length; c++) {
                var g = a[c];
                g.copy(e, f), f += g.length
            }
            return e
        }, d.compare = function (a, b) {
            Q(d.isBuffer(a) && d.isBuffer(b), "Arguments must be Buffers");
            for (var c = a.length, e = b.length, f = 0, g = Math.min(c, e); f < g && a[f] === b[f]; f++);
            return f !== g && (c = a[f], e = b[f]), c < e ? -1 : e < c ? 1 : 0
        }, d.prototype.write = function (a, b, c, d) {
            if (isFinite(b)) isFinite(c) || (d = c, c = void 0);
            else {
                var k = d;
                d = b, b = c, c = k
            }
            b = Number(b) || 0;
            var l = this.length - b;
            c ? (c = Number(c)) > l && (c = l) : c = l, d = String(d || "utf8").toLowerCase();
            var m;
            switch (d) {
                case "hex":
                    m = e(this, a, b, c);
                    break;
                case "utf8":
                case "utf-8":
                    m = f(this, a, b, c);
                    break;
                case "ascii":
                    m = g(this, a, b, c);
                    break;
                case "binary":
                    m = h(this, a, b, c);
                    break;
                case "base64":
                    m = i(this, a, b, c);
                    break;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    m = j(this, a, b, c);
                    break;
                default:
                    throw new Error("Unknown encoding")
            }
            return m
        }, d.prototype.toString = function (a, b, c) {
            var d = this;
            if (a = String(a || "utf8").toLowerCase(), b = Number(b) || 0, (c = void 0 === c ? d.length : Number(c)) === b) return "";
            var e;
            switch (a) {
                case "hex":
                    e = o(d, b, c);
                    break;
                case "utf8":
                case "utf-8":
                    e = l(d, b, c);
                    break;
                case "ascii":
                    e = m(d, b, c);
                    break;
                case "binary":
                    e = n(d, b, c);
                    break;
                case "base64":
                    e = k(d, b, c);
                    break;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    e = p(d, b, c);
                    break;
                default:
                    throw new Error("Unknown encoding")
            }
            return e
        }, d.prototype.toJSON = function () {
            return {
                type: "Buffer",
                data: Array.prototype.slice.call(this._arr || this, 0)
            }
        }, d.prototype.equals = function (a) {
            return Q(d.isBuffer(a), "Argument must be a Buffer"), 0 === d.compare(this, a)
        }, d.prototype.compare = function (a) {
            return Q(d.isBuffer(a), "Argument must be a Buffer"), d.compare(this, a)
        }, d.prototype.copy = function (a, b, c, d) {
            var e = this;
            if (c || (c = 0), d || 0 === d || (d = this.length), b || (b = 0), d !== c && 0 !== a.length && 0 !== e.length) {
                Q(d >= c, "sourceEnd < sourceStart"), Q(b >= 0 && b < a.length, "targetStart out of bounds"), Q(c >= 0 && c < e.length, "sourceStart out of bounds"), Q(d >= 0 && d <= e.length, "sourceEnd out of bounds"), d > this.length && (d = this.length), a.length - b < d - c && (d = a.length - b + c);
                var f = d - c;
                if (f < 100 || !T)
                    for (var g = 0; g < f; g++) a[g + b] = this[g + c];
                else a._set(this.subarray(c, c + f), b)
            }
        }, d.prototype.slice = function (a, b) {
            var c = this.length;
            if (a = ~~a, b = void 0 === b ? c : ~~b, a < 0 ? (a += c) < 0 && (a = 0) : a > c && (a = c), b < 0 ? (b += c) < 0 && (b = 0) : b > c && (b = c), b < a && (b = a), T) return d._augment(this.subarray(a, b));
            for (var e = b - a, f = new d(e, void 0, !0), g = 0; g < e; g++) f[g] = this[g + a];
            return f
        }, d.prototype.get = function (a) {
            return console.log(".get() is deprecated. Access using array indexes instead."), this.readUInt8(a)
        }, d.prototype.set = function (a, b) {
            return console.log(".set() is deprecated. Access using array indexes instead."), this.writeUInt8(a, b)
        }, d.prototype.readUInt8 = function (a, b) {
            if (b || (Q(void 0 !== a && null !== a, "missing offset"), Q(a < this.length, "Trying to read beyond buffer length")), !(a >= this.length)) return this[a]
        }, d.prototype.readUInt16LE = function (a, b) {
            return q(this, a, !0, b)
        }, d.prototype.readUInt16BE = function (a, b) {
            return q(this, a, !1, b)
        }, d.prototype.readUInt32LE = function (a, b) {
            return r(this, a, !0, b)
        }, d.prototype.readUInt32BE = function (a, b) {
            return r(this, a, !1, b)
        }, d.prototype.readInt8 = function (a, b) {
            if (b || (Q(void 0 !== a && null !== a, "missing offset"), Q(a < this.length, "Trying to read beyond buffer length")), !(a >= this.length)) {
                return 128 & this[a] ? -1 * (255 - this[a] + 1) : this[a]
            }
        }, d.prototype.readInt16LE = function (a, b) {
            return s(this, a, !0, b)
        }, d.prototype.readInt16BE = function (a, b) {
            return s(this, a, !1, b)
        }, d.prototype.readInt32LE = function (a, b) {
            return t(this, a, !0, b)
        }, d.prototype.readInt32BE = function (a, b) {
            return t(this, a, !1, b)
        }, d.prototype.readFloatLE = function (a, b) {
            return u(this, a, !0, b)
        }, d.prototype.readFloatBE = function (a, b) {
            return u(this, a, !1, b)
        }, d.prototype.readDoubleLE = function (a, b) {
            return v(this, a, !0, b)
        }, d.prototype.readDoubleBE = function (a, b) {
            return v(this, a, !1, b)
        }, d.prototype.writeUInt8 = function (a, b, c) {
            if (c || (Q(void 0 !== a && null !== a, "missing value"), Q(void 0 !== b && null !== b, "missing offset"), Q(b < this.length, "trying to write beyond buffer length"), N(a, 255)), !(b >= this.length)) return this[b] = a, b + 1
        }, d.prototype.writeUInt16LE = function (a, b, c) {
            return w(this, a, b, !0, c)
        }, d.prototype.writeUInt16BE = function (a, b, c) {
            return w(this, a, b, !1, c)
        }, d.prototype.writeUInt32LE = function (a, b, c) {
            return x(this, a, b, !0, c)
        }, d.prototype.writeUInt32BE = function (a, b, c) {
            return x(this, a, b, !1, c)
        }, d.prototype.writeInt8 = function (a, b, c) {
            if (c || (Q(void 0 !== a && null !== a, "missing value"), Q(void 0 !== b && null !== b, "missing offset"), Q(b < this.length, "Trying to write beyond buffer length"), O(a, 127, -128)), !(b >= this.length)) return a >= 0 ? this.writeUInt8(a, b, c) : this.writeUInt8(255 + a + 1, b, c), b + 1
        }, d.prototype.writeInt16LE = function (a, b, c) {
            return y(this, a, b, !0, c)
        }, d.prototype.writeInt16BE = function (a, b, c) {
            return y(this, a, b, !1, c)
        }, d.prototype.writeInt32LE = function (a, b, c) {
            return z(this, a, b, !0, c)
        }, d.prototype.writeInt32BE = function (a, b, c) {
            return z(this, a, b, !1, c)
        }, d.prototype.writeFloatLE = function (a, b, c) {
            return A(this, a, b, !0, c)
        }, d.prototype.writeFloatBE = function (a, b, c) {
            return A(this, a, b, !1, c)
        }, d.prototype.writeDoubleLE = function (a, b, c) {
            return B(this, a, b, !0, c)
        }, d.prototype.writeDoubleBE = function (a, b, c) {
            return B(this, a, b, !1, c)
        }, d.prototype.fill = function (a, b, c) {
            if (a || (a = 0), b || (b = 0), c || (c = this.length), Q(c >= b, "end < start"), c !== b && 0 !== this.length) {
                Q(b >= 0 && b < this.length, "start out of bounds"), Q(c >= 0 && c <= this.length, "end out of bounds");
                var d;
                if ("number" == typeof a)
                    for (d = b; d < c; d++) this[d] = a;
                else {
                    var e = H(a.toString()),
                        f = e.length;
                    for (d = b; d < c; d++) this[d] = e[d % f]
                }
                return this
            }
        }, d.prototype.inspect = function () {
            for (var a = [], b = this.length, d = 0; d < b; d++)
                if (a[d] = G(this[d]), d === c.INSPECT_MAX_BYTES) {
                    a[d + 1] = "...";
                    break
                } return "<Buffer " + a.join(" ") + ">"
        }, d.prototype.toArrayBuffer = function () {
            if ("undefined" != typeof Uint8Array) {
                if (T) return new d(this).buffer;
                for (var a = new Uint8Array(this.length), b = 0, c = a.length; b < c; b += 1) a[b] = this[b];
                return a.buffer
            }
            throw new Error("Buffer.toArrayBuffer not supported in this browser")
        };
        var U = d.prototype;
        d._augment = function (a) {
            return a._isBuffer = !0, a._get = a.get, a._set = a.set, a.get = U.get, a.set = U.set, a.write = U.write, a.toString = U.toString, a.toLocaleString = U.toString, a.toJSON = U.toJSON, a.equals = U.equals, a.compare = U.compare, a.copy = U.copy, a.slice = U.slice, a.readUInt8 = U.readUInt8, a.readUInt16LE = U.readUInt16LE, a.readUInt16BE = U.readUInt16BE, a.readUInt32LE = U.readUInt32LE, a.readUInt32BE = U.readUInt32BE, a.readInt8 = U.readInt8, a.readInt16LE = U.readInt16LE, a.readInt16BE = U.readInt16BE, a.readInt32LE = U.readInt32LE, a.readInt32BE = U.readInt32BE, a.readFloatLE = U.readFloatLE, a.readFloatBE = U.readFloatBE, a.readDoubleLE = U.readDoubleLE, a.readDoubleBE = U.readDoubleBE, a.writeUInt8 = U.writeUInt8, a.writeUInt16LE = U.writeUInt16LE, a.writeUInt16BE = U.writeUInt16BE, a.writeUInt32LE = U.writeUInt32LE, a.writeUInt32BE = U.writeUInt32BE, a.writeInt8 = U.writeInt8, a.writeInt16LE = U.writeInt16LE, a.writeInt16BE = U.writeInt16BE, a.writeInt32LE = U.writeInt32LE, a.writeInt32BE = U.writeInt32BE, a.writeFloatLE = U.writeFloatLE, a.writeFloatBE = U.writeFloatBE, a.writeDoubleLE = U.writeDoubleLE, a.writeDoubleBE = U.writeDoubleBE, a.fill = U.fill, a.inspect = U.inspect, a.toArrayBuffer = U.toArrayBuffer, a
        };
        var V = /[^+\/0-9A-z]/g
    }, {
        "base64-js": 4,
        ieee754: 5
    }],
    4: [function (a, b, c) {
        ! function (a) {
            "use strict";

            function b(a) {
                var b = a.charCodeAt(0);
                return b === f ? 62 : b === g ? 63 : b < h ? -1 : b < h + 10 ? b - h + 26 + 26 : b < j + 26 ? b - j : b < i + 26 ? b - i + 26 : void 0
            }

            function c(a) {
                function c(a) {
                    j[l++] = a
                }
                var d, f, g, h, i, j;
                if (a.length % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                var k = a.length;
                i = "=" === a.charAt(k - 2) ? 2 : "=" === a.charAt(k - 1) ? 1 : 0, j = new e(3 * a.length / 4 - i), g = i > 0 ? a.length - 4 : a.length;
                var l = 0;
                for (d = 0, f = 0; d < g; d += 4, f += 3) h = b(a.charAt(d)) << 18 | b(a.charAt(d + 1)) << 12 | b(a.charAt(d + 2)) << 6 | b(a.charAt(d + 3)), c((16711680 & h) >> 16), c((65280 & h) >> 8), c(255 & h);
                return 2 === i ? (h = b(a.charAt(d)) << 2 | b(a.charAt(d + 1)) >> 4, c(255 & h)) : 1 === i && (h = b(a.charAt(d)) << 10 | b(a.charAt(d + 1)) << 4 | b(a.charAt(d + 2)) >> 2, c(h >> 8 & 255), c(255 & h)), j
            }

            function d(a) {
                function b(a) {
                    return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(a)
                }

                function c(a) {
                    return b(a >> 18 & 63) + b(a >> 12 & 63) + b(a >> 6 & 63) + b(63 & a)
                }
                var d, e, f, g = a.length % 3,
                    h = "";
                for (d = 0, f = a.length - g; d < f; d += 3) e = (a[d] << 16) + (a[d + 1] << 8) + a[d + 2], h += c(e);
                switch (g) {
                    case 1:
                        e = a[a.length - 1], h += b(e >> 2), h += b(e << 4 & 63), h += "==";
                        break;
                    case 2:
                        e = (a[a.length - 2] << 8) + a[a.length - 1], h += b(e >> 10), h += b(e >> 4 & 63), h += b(e << 2 & 63), h += "="
                }
                return h
            }
            var e = "undefined" != typeof Uint8Array ? Uint8Array : Array,
                f = "+".charCodeAt(0),
                g = "/".charCodeAt(0),
                h = "0".charCodeAt(0),
                i = "a".charCodeAt(0),
                j = "A".charCodeAt(0);
            a.toByteArray = c, a.fromByteArray = d
        }(void 0 === c ? this.base64js = {} : c)
    }, {}],
    5: [function (a, b, c) {
        c.read = function (a, b, c, d, e) {
            var f, g, h = 8 * e - d - 1,
                i = (1 << h) - 1,
                j = i >> 1,
                k = -7,
                l = c ? e - 1 : 0,
                m = c ? -1 : 1,
                n = a[b + l];
            for (l += m, f = n & (1 << -k) - 1, n >>= -k, k += h; k > 0; f = 256 * f + a[b + l], l += m, k -= 8);
            for (g = f & (1 << -k) - 1, f >>= -k, k += d; k > 0; g = 256 * g + a[b + l], l += m, k -= 8);
            if (0 === f) f = 1 - j;
            else {
                if (f === i) return g ? NaN : 1 / 0 * (n ? -1 : 1);
                g += Math.pow(2, d), f -= j
            }
            return (n ? -1 : 1) * g * Math.pow(2, f - d)
        }, c.write = function (a, b, c, d, e, f) {
            var g, h, i, j = 8 * f - e - 1,
                k = (1 << j) - 1,
                l = k >> 1,
                m = 23 === e ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                n = d ? 0 : f - 1,
                o = d ? 1 : -1,
                p = b < 0 || 0 === b && 1 / b < 0 ? 1 : 0;
            for (b = Math.abs(b), isNaN(b) || b === 1 / 0 ? (h = isNaN(b) ? 1 : 0, g = k) : (g = Math.floor(Math.log(b) / Math.LN2), b * (i = Math.pow(2, -g)) < 1 && (g--, i *= 2), b += g + l >= 1 ? m / i : m * Math.pow(2, 1 - l), b * i >= 2 && (g++, i /= 2), g + l >= k ? (h = 0, g = k) : g + l >= 1 ? (h = (b * i - 1) * Math.pow(2, e), g += l) : (h = b * Math.pow(2, l - 1) * Math.pow(2, e), g = 0)); e >= 8; a[c + n] = 255 & h, n += o, h /= 256, e -= 8);
            for (g = g << e | h, j += e; j > 0; a[c + n] = 255 & g, n += o, g /= 256, j -= 8);
            a[c + n - o] |= 128 * p
        }
    }, {}],
    6: [function (a, b, c) {
        (function (c) {
            function d(a) {
                return function () {
                    var b = [];
                    return {
                        update: function (a, d) {
                            return c.isBuffer(a) || (a = new c(a, d)), b.push(a), this
                        },
                        digest: function (d) {
                            var e = c.concat(b),
                                f = a(e);
                            return b = null, d ? f.toString(d) : f
                        }
                    }
                }
            }
            var e = a("sha.js"),
                f = d(a("./md5")),
                g = d(a("ripemd160"));
            b.exports = function (a) {
                return "md5" === a ? new f : "rmd160" === a ? new g : e(a)
            }
        }).call(this, a("buffer").Buffer)
    }, {
        "./md5": 10,
        buffer: 3,
        ripemd160: 11,
        "sha.js": 13
    }],
    7: [function (a, b, c) {
        (function (c) {
            function d(a, b) {
                if (!(this instanceof d)) return new d(a, b);
                this._opad = i, this._alg = a, b = this._key = c.isBuffer(b) ? b : new c(b), b.length > f ? b = e(a).update(b).digest() : b.length < f && (b = c.concat([b, g], f));
                for (var h = this._ipad = new c(f), i = this._opad = new c(f), j = 0; j < f; j++) h[j] = 54 ^ b[j], i[j] = 92 ^ b[j];
                this._hash = e(a).update(h)
            }
            var e = a("./create-hash"),
                f = 64,
                g = new c(f);
            g.fill(0), b.exports = d, d.prototype.update = function (a, b) {
                return this._hash.update(a, b), this
            }, d.prototype.digest = function (a) {
                var b = this._hash.digest();
                return e(this._alg).update(this._opad).update(b).digest(a)
            }
        }).call(this, a("buffer").Buffer)
    }, {
        "./create-hash": 6,
        buffer: 3
    }],
    8: [function (a, b, c) {
        (function (a) {
            function c(b, c) {
                if (b.length % f != 0) {
                    var d = b.length + (f - b.length % f);
                    b = a.concat([b, g], d)
                }
                for (var e = [], h = c ? b.readInt32BE : b.readInt32LE, i = 0; i < b.length; i += f) e.push(h.call(b, i));
                return e
            }

            function d(b, c, d) {
                for (var e = new a(c), f = d ? e.writeInt32BE : e.writeInt32LE, g = 0; g < b.length; g++) f.call(e, b[g], 4 * g, !0);
                return e
            }

            function e(b, e, f, g) {
                return a.isBuffer(b) || (b = new a(b)), d(e(c(b, g), b.length * h), f, g)
            }
            var f = 4,
                g = new a(f);
            g.fill(0);
            var h = 8;
            b.exports = {
                hash: e
            }
        }).call(this, a("buffer").Buffer)
    }, {
        buffer: 3
    }],
    9: [function (a, b, c) {
        (function (b) {
            function d() {
                var a = [].slice.call(arguments).join(" ");
                throw new Error([a, "we accept pull requests", "http://github.com/dominictarr/crypto-browserify"].join("\n"))
            }

            function e(a, b) {
                for (var c in a) b(a[c], c)
            }
            var f = a("./rng");
            c.createHash = a("./create-hash"), c.createHmac = a("./create-hmac"), c.randomBytes = function (a, c) {
                if (!c || !c.call) return new b(f(a));
                try {
                    c.call(this, void 0, new b(f(a)))
                } catch (a) {
                    c(a)
                }
            }, c.getHashes = function () {
                return ["sha1", "sha256", "md5", "rmd160"]
            };
            var g = a("./pbkdf2")(c.createHmac);
            c.pbkdf2 = g.pbkdf2, c.pbkdf2Sync = g.pbkdf2Sync, e(["createCredentials", "createCipher", "createCipheriv", "createDecipher", "createDecipheriv", "createSign", "createVerify", "createDiffieHellman"], function (a) {
                c[a] = function () {
                    d("sorry,", a, "is not implemented yet")
                }
            })
        }).call(this, a("buffer").Buffer)
    }, {
        "./create-hash": 6,
        "./create-hmac": 7,
        "./pbkdf2": 17,
        "./rng": 18,
        buffer: 3
    }],
    10: [function (a, b, c) {
        function d(a, b) {
            a[b >> 5] |= 128 << b % 32, a[14 + (b + 64 >>> 9 << 4)] = b;
            for (var c = 1732584193, d = -271733879, e = -1732584194, k = 271733878, l = 0; l < a.length; l += 16) {
                var m = c,
                    n = d,
                    o = e,
                    p = k;
                c = f(c, d, e, k, a[l + 0], 7, -680876936), k = f(k, c, d, e, a[l + 1], 12, -389564586), e = f(e, k, c, d, a[l + 2], 17, 606105819), d = f(d, e, k, c, a[l + 3], 22, -1044525330), c = f(c, d, e, k, a[l + 4], 7, -176418897), k = f(k, c, d, e, a[l + 5], 12, 1200080426), e = f(e, k, c, d, a[l + 6], 17, -1473231341), d = f(d, e, k, c, a[l + 7], 22, -45705983), c = f(c, d, e, k, a[l + 8], 7, 1770035416), k = f(k, c, d, e, a[l + 9], 12, -1958414417), e = f(e, k, c, d, a[l + 10], 17, -42063), d = f(d, e, k, c, a[l + 11], 22, -1990404162), c = f(c, d, e, k, a[l + 12], 7, 1804603682), k = f(k, c, d, e, a[l + 13], 12, -40341101), e = f(e, k, c, d, a[l + 14], 17, -1502002290), d = f(d, e, k, c, a[l + 15], 22, 1236535329), c = g(c, d, e, k, a[l + 1], 5, -165796510), k = g(k, c, d, e, a[l + 6], 9, -1069501632), e = g(e, k, c, d, a[l + 11], 14, 643717713), d = g(d, e, k, c, a[l + 0], 20, -373897302), c = g(c, d, e, k, a[l + 5], 5, -701558691), k = g(k, c, d, e, a[l + 10], 9, 38016083), e = g(e, k, c, d, a[l + 15], 14, -660478335), d = g(d, e, k, c, a[l + 4], 20, -405537848), c = g(c, d, e, k, a[l + 9], 5, 568446438), k = g(k, c, d, e, a[l + 14], 9, -1019803690), e = g(e, k, c, d, a[l + 3], 14, -187363961), d = g(d, e, k, c, a[l + 8], 20, 1163531501), c = g(c, d, e, k, a[l + 13], 5, -1444681467), k = g(k, c, d, e, a[l + 2], 9, -51403784), e = g(e, k, c, d, a[l + 7], 14, 1735328473), d = g(d, e, k, c, a[l + 12], 20, -1926607734), c = h(c, d, e, k, a[l + 5], 4, -378558), k = h(k, c, d, e, a[l + 8], 11, -2022574463), e = h(e, k, c, d, a[l + 11], 16, 1839030562), d = h(d, e, k, c, a[l + 14], 23, -35309556), c = h(c, d, e, k, a[l + 1], 4, -1530992060), k = h(k, c, d, e, a[l + 4], 11, 1272893353), e = h(e, k, c, d, a[l + 7], 16, -155497632), d = h(d, e, k, c, a[l + 10], 23, -1094730640), c = h(c, d, e, k, a[l + 13], 4, 681279174), k = h(k, c, d, e, a[l + 0], 11, -358537222), e = h(e, k, c, d, a[l + 3], 16, -722521979), d = h(d, e, k, c, a[l + 6], 23, 76029189), c = h(c, d, e, k, a[l + 9], 4, -640364487), k = h(k, c, d, e, a[l + 12], 11, -421815835), e = h(e, k, c, d, a[l + 15], 16, 530742520), d = h(d, e, k, c, a[l + 2], 23, -995338651), c = i(c, d, e, k, a[l + 0], 6, -198630844), k = i(k, c, d, e, a[l + 7], 10, 1126891415), e = i(e, k, c, d, a[l + 14], 15, -1416354905), d = i(d, e, k, c, a[l + 5], 21, -57434055), c = i(c, d, e, k, a[l + 12], 6, 1700485571), k = i(k, c, d, e, a[l + 3], 10, -1894986606), e = i(e, k, c, d, a[l + 10], 15, -1051523), d = i(d, e, k, c, a[l + 1], 21, -2054922799), c = i(c, d, e, k, a[l + 8], 6, 1873313359), k = i(k, c, d, e, a[l + 15], 10, -30611744), e = i(e, k, c, d, a[l + 6], 15, -1560198380), d = i(d, e, k, c, a[l + 13], 21, 1309151649), c = i(c, d, e, k, a[l + 4], 6, -145523070), k = i(k, c, d, e, a[l + 11], 10, -1120210379), e = i(e, k, c, d, a[l + 2], 15, 718787259), d = i(d, e, k, c, a[l + 9], 21, -343485551), c = j(c, m), d = j(d, n), e = j(e, o), k = j(k, p)
            }
            return Array(c, d, e, k)
        }

        function e(a, b, c, d, e, f) {
            return j(k(j(j(b, a), j(d, f)), e), c)
        }

        function f(a, b, c, d, f, g, h) {
            return e(b & c | ~b & d, a, b, f, g, h)
        }

        function g(a, b, c, d, f, g, h) {
            return e(b & d | c & ~d, a, b, f, g, h)
        }

        function h(a, b, c, d, f, g, h) {
            return e(b ^ c ^ d, a, b, f, g, h)
        }

        function i(a, b, c, d, f, g, h) {
            return e(c ^ (b | ~d), a, b, f, g, h)
        }

        function j(a, b) {
            var c = (65535 & a) + (65535 & b);
            return (a >> 16) + (b >> 16) + (c >> 16) << 16 | 65535 & c
        }

        function k(a, b) {
            return a << b | a >>> 32 - b
        }
        var l = a("./helpers");
        b.exports = function (a) {
            return l.hash(a, d, 16)
        }
    }, {
        "./helpers": 8
    }],
    11: [function (a, b, c) {
        (function (a) {
            function c(a, b, c) {
                return a ^ b ^ c
            }

            function d(a, b, c) {
                return a & b | ~a & c
            }

            function e(a, b, c) {
                return (a | ~b) ^ c
            }

            function f(a, b, c) {
                return a & c | b & ~c
            }

            function g(a, b, c) {
                return a ^ (b | ~c)
            }

            function h(a, b) {
                return a << b | a >>> 32 - b
            }

            function i(b) {
                var c = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
                "string" == typeof b && (b = new a(b, "utf8"));
                var d = p(b),
                    e = 8 * b.length,
                    f = 8 * b.length;
                d[e >>> 5] |= 128 << 24 - e % 32, d[14 + (e + 64 >>> 9 << 4)] = 16711935 & (f << 8 | f >>> 24) | 4278255360 & (f << 24 | f >>> 8);
                for (var g = 0; g < d.length; g += 16) r(c, d, g);
                for (var g = 0; g < 5; g++) {
                    var h = c[g];
                    c[g] = 16711935 & (h << 8 | h >>> 24) | 4278255360 & (h << 24 | h >>> 8)
                }
                var i = q(c);
                return new a(i)
            }
            b.exports = i;
            var j = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13],
                k = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11],
                l = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6],
                m = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11],
                n = [0, 1518500249, 1859775393, 2400959708, 2840853838],
                o = [1352829926, 1548603684, 1836072691, 2053994217, 0],
                p = function (a) {
                    for (var b = [], c = 0, d = 0; c < a.length; c++, d += 8) b[d >>> 5] |= a[c] << 24 - d % 32;
                    return b
                },
                q = function (a) {
                    for (var b = [], c = 0; c < 32 * a.length; c += 8) b.push(a[c >>> 5] >>> 24 - c % 32 & 255);
                    return b
                },
                r = function (a, b, i) {
                    for (var p = 0; p < 16; p++) {
                        var q = i + p,
                            r = b[q];
                        b[q] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8)
                    }
                    var s, t, u, v, w, x, y, z, A, B;
                    x = s = a[0], y = t = a[1], z = u = a[2], A = v = a[3], B = w = a[4];
                    for (var C, p = 0; p < 80; p += 1) C = s + b[i + j[p]] | 0, C += p < 16 ? c(t, u, v) + n[0] : p < 32 ? d(t, u, v) + n[1] : p < 48 ? e(t, u, v) + n[2] : p < 64 ? f(t, u, v) + n[3] : g(t, u, v) + n[4], C |= 0, C = h(C, l[p]), C = C + w | 0, s = w, w = v, v = h(u, 10), u = t, t = C, C = x + b[i + k[p]] | 0, C += p < 16 ? g(y, z, A) + o[0] : p < 32 ? f(y, z, A) + o[1] : p < 48 ? e(y, z, A) + o[2] : p < 64 ? d(y, z, A) + o[3] : c(y, z, A) + o[4], C |= 0, C = h(C, m[p]), C = C + B | 0, x = B, B = A, A = h(z, 10), z = y, y = C;
                    C = a[1] + u + A | 0, a[1] = a[2] + v + B | 0, a[2] = a[3] + w + x | 0, a[3] = a[4] + s + y | 0, a[4] = a[0] + t + z | 0, a[0] = C
                }
        }).call(this, a("buffer").Buffer)
    }, {
        buffer: 3
    }],
    12: [function (a, b, c) {
        var d = a("./util"),
            e = d.write,
            f = d.zeroFill;
        b.exports = function (a) {
            function b(b, c) {
                this._block = new a(b), this._finalSize = c, this._blockSize = b, this._len = 0, this._s = 0
            }

            function c(a, b) {
                return null == b ? a.byteLength || a.length : "ascii" == b || "binary" == b ? a.length : "hex" == b ? a.length / 2 : "base64" == b ? a.length / 3 : void 0
            }
            return b.prototype.init = function () {
                this._s = 0, this._len = 0
            }, b.prototype.update = function (b, d) {
                var f, g = this._blockSize;
                d || "string" != typeof b || (d = "utf8"), d ? ("utf-8" === d && (d = "utf8"), "base64" !== d && "utf8" !== d || (b = new a(b, d), d = null), f = c(b, d)) : f = b.byteLength || b.length;
                for (var h = this._len += f, i = this._s = this._s || 0, j = 0, k = this._block; i < h;) {
                    var l = Math.min(f, j + g - i % g);
                    e(k, b, d, i % g, j, l);
                    var m = l - j;
                    i += m, j += m, i % g || this._update(k)
                }
                return this._s = i, this
            }, b.prototype.digest = function (a) {
                var b = this._blockSize,
                    c = this._finalSize,
                    e = 8 * this._len,
                    g = this._block,
                    h = e % (8 * b);
                g[this._len % b] = 128, f(this._block, this._len % b + 1), h >= 8 * c && (this._update(this._block), d.zeroFill(this._block, 0)), g.writeInt32BE(e, c + 4);
                var i = this._update(this._block) || this._hash();
                return null == a ? i : i.toString(a)
            }, b.prototype._update = function () {
                throw new Error("_update must be implemented by subclass")
            }, b
        }
    }, {
        "./util": 16
    }],
    13: [function (a, b, c) {
        var c = b.exports = function (a) {
            var b = c[a];
            if (!b) throw new Error(a + " is not supported (we accept pull requests)");
            return new b
        },
            d = a("buffer").Buffer,
            e = a("./hash")(d);
        c.sha = c.sha1 = a("./sha1")(d, e), c.sha256 = a("./sha256")(d, e)
    }, {
        "./hash": 12,
        "./sha1": 14,
        "./sha256": 15,
        buffer: 3
    }],
    14: [function (a, b, c) {
        b.exports = function (b, c) {
            function d() {
                return o.length ? o.pop().init() : this instanceof d ? (this._w = n, c.call(this, 64, 56), this._h = null, void this.init()) : new d
            }

            function e(a, b, c, d) {
                return a < 20 ? b & c | ~b & d : a < 40 ? b ^ c ^ d : a < 60 ? b & c | b & d | c & d : b ^ c ^ d
            }

            function f(a) {
                return a < 20 ? 1518500249 : a < 40 ? 1859775393 : a < 60 ? -1894007588 : -899497514
            }

            function g(a, b) {
                return a + b | 0
            }

            function h(a, b) {
                return a << b | a >>> 32 - b
            } (0, a("util").inherits)(d, c);
            var i = 0,
                j = 4,
                k = 8,
                l = 12,
                m = 16,
                n = new Int32Array(80),
                o = [];
            d.prototype.init = function () {
                return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, c.prototype.init.call(this), this
            }, d.prototype._POOL = o;
            new b(1), DataView;
            return d.prototype._update = function (a) {
                var b, c, d, i, j, k, l, m, n, o, p = this._block;
                this._h;
                b = k = this._a, c = l = this._b, d = m = this._c, i = n = this._d, j = o = this._e;
                for (var q = this._w, r = 0; r < 80; r++) {
                    var s = q[r] = r < 16 ? p.readInt32BE(4 * r) : h(q[r - 3] ^ q[r - 8] ^ q[r - 14] ^ q[r - 16], 1),
                        t = g(g(h(b, 5), e(r, c, d, i)), g(g(j, s), f(r)));
                    j = i, i = d, d = h(c, 30), c = b, b = t
                }
                this._a = g(b, k), this._b = g(c, l), this._c = g(d, m), this._d = g(i, n), this._e = g(j, o)
            }, d.prototype._hash = function () {
                o.length < 100 && o.push(this);
                var a = new b(20);
                return a.writeInt32BE(0 | this._a, i), a.writeInt32BE(0 | this._b, j), a.writeInt32BE(0 | this._c, k), a.writeInt32BE(0 | this._d, l), a.writeInt32BE(0 | this._e, m), a
            }, d
        }
    }, {
        util: 37
    }],
    15: [function (a, b, c) {
        var d = a("util").inherits;
        a("./util");
        b.exports = function (a, b) {
            function c() {
                o.length, this.init(), this._w = n, b.call(this, 64, 56)
            }

            function e(a, b) {
                return a >>> b | a << 32 - b
            }

            function f(a, b) {
                return a >>> b
            }

            function g(a, b, c) {
                return a & b ^ ~a & c
            }

            function h(a, b, c) {
                return a & b ^ a & c ^ b & c
            }

            function i(a) {
                return e(a, 2) ^ e(a, 13) ^ e(a, 22)
            }

            function j(a) {
                return e(a, 6) ^ e(a, 11) ^ e(a, 25)
            }

            function k(a) {
                return e(a, 7) ^ e(a, 18) ^ f(a, 3)
            }

            function l(a) {
                return e(a, 17) ^ e(a, 19) ^ f(a, 10)
            }
            var m = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
            d(c, b);
            var n = new Array(64),
                o = [];
            c.prototype.init = function () {
                return this._a = 1779033703, this._b = -1150833019, this._c = 1013904242, this._d = -1521486534, this._e = 1359893119, this._f = -1694144372, this._g = 528734635, this._h = 1541459225, this._len = this._s = 0, this
            };
            return c.prototype._update = function (a) {
                var b, c, d, e, f, n, o, p, q, r, s = this._block,
                    t = this._w;
                b = 0 | this._a, c = 0 | this._b, d = 0 | this._c, e = 0 | this._d, f = 0 | this._e, n = 0 | this._f, o = 0 | this._g, p = 0 | this._h;
                for (var u = 0; u < 64; u++) {
                    var v = t[u] = u < 16 ? s.readInt32BE(4 * u) : l(t[u - 2]) + t[u - 7] + k(t[u - 15]) + t[u - 16];
                    q = p + j(f) + g(f, n, o) + m[u] + v, r = i(b) + h(b, c, d), p = o, o = n, n = f, f = e + q, e = d, d = c, c = b, b = q + r
                }
                this._a = b + this._a | 0, this._b = c + this._b | 0, this._c = d + this._c | 0, this._d = e + this._d | 0, this._e = f + this._e | 0, this._f = n + this._f | 0, this._g = o + this._g | 0, this._h = p + this._h | 0
            }, c.prototype._hash = function () {
                o.length < 10 && o.push(this);
                var b = new a(32);
                return b.writeInt32BE(this._a, 0), b.writeInt32BE(this._b, 4), b.writeInt32BE(this._c, 8), b.writeInt32BE(this._d, 12), b.writeInt32BE(this._e, 16), b.writeInt32BE(this._f, 20), b.writeInt32BE(this._g, 24), b.writeInt32BE(this._h, 28), b
            }, c
        }
    }, {
        "./util": 16,
        util: 37
    }],
    16: [function (a, b, c) {
        function d(a, b, c, d, e, f, g) {
            var h = f - e;
            if ("ascii" === c || "binary" === c)
                for (var i = 0; i < h; i++) a[d + i] = b.charCodeAt(i + e);
            else if (null == c)
                for (var i = 0; i < h; i++) a[d + i] = b[i + e];
            else {
                if ("hex" !== c) throw "base64" === c ? new Error("base64 encoding not yet supported") : new Error(c + " encoding not yet supported");
                for (var i = 0; i < h; i++) {
                    var j = e + i;
                    a[d + i] = parseInt(b[2 * j] + b[2 * j + 1], 16)
                }
            }
        }

        function e(a, b) {
            for (var c = b; c < a.length; c++) a[c] = 0
        }
        c.write = d, c.zeroFill = e, c.toString = toString
    }, {}],
    17: [function (a, b, c) {
        (function (a) {
            var c = 64,
                d = new a(c);
            d.fill(0), b.exports = function (b, e) {
                return e = e || {}, e.pbkdf2 = function (a, b, c, d, f) {
                    if ("function" != typeof f) throw new Error("No callback provided to pbkdf2");
                    setTimeout(function () {
                        f(null, e.pbkdf2Sync(a, b, c, d))
                    })
                }, e.pbkdf2Sync = function (e, f, g, h) {
                    if ("number" != typeof g) throw new TypeError("Iterations not a number");
                    if (g < 0) throw new TypeError("Bad iterations");
                    if ("number" != typeof h) throw new TypeError("Key length not a number");
                    if (h < 0) throw new TypeError("Bad key length");
                    var e = a.isBuffer(e) ? e : new a(e);
                    e.length > c ? e = createHash(alg).update(e).digest() : e.length < c && (e = a.concat([e, d], c));
                    var i, j, k, l = 0,
                        m = 1,
                        n = new a(4),
                        o = new a(h);
                    for (o.fill(0); h;) {
                        j = h > 20 ? 20 : h, n[0] = m >> 24 & 255, n[1] = m >> 16 & 255, n[2] = m >> 8 & 255, n[3] = 255 & m, i = b("sha1", e), i.update(f), i.update(n), k = i.digest(), k.copy(o, l, 0, j);
                        for (var p = 1; p < g; p++) {
                            i = b("sha1", e), i.update(k), k = i.digest();
                            for (var q = 0; q < j; q++) o[q] ^= k[q]
                        }
                        h -= j, m++, l += j
                    }
                    return o
                }, e
            }
        }).call(this, a("buffer").Buffer)
    }, {
        buffer: 3
    }],
    18: [function (a, b, c) {
        (function (a) {
            ! function () {
                b.exports = function (b) {
                    var c = new a(b);
                    return crypto.getRandomValues(c), c
                }
            }()
        }).call(this, a("buffer").Buffer)
    }, {
        buffer: 3
    }],
    19: [function (a, b, c) {
        function d() {
            this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
        }

        function e(a) {
            return "function" == typeof a
        }

        function f(a) {
            return "number" == typeof a
        }

        function g(a) {
            return "object" == typeof a && null !== a
        }

        function h(a) {
            return void 0 === a
        }
        b.exports = d, d.EventEmitter = d, d.prototype._events = void 0, d.prototype._maxListeners = void 0, d.defaultMaxListeners = 10, d.prototype.setMaxListeners = function (a) {
            if (!f(a) || a < 0 || isNaN(a)) throw TypeError("n must be a positive number");
            return this._maxListeners = a, this
        }, d.prototype.emit = function (a) {
            var b, c, d, f, i, j;
            if (this._events || (this._events = {}), "error" === a && (!this._events.error || g(this._events.error) && !this._events.error.length)) throw b = arguments[1], b instanceof Error ? b : TypeError('Uncaught, unspecified "error" event.');
            if (c = this._events[a], h(c)) return !1;
            if (e(c)) switch (arguments.length) {
                case 1:
                    c.call(this);
                    break;
                case 2:
                    c.call(this, arguments[1]);
                    break;
                case 3:
                    c.call(this, arguments[1], arguments[2]);
                    break;
                default:
                    for (d = arguments.length, f = new Array(d - 1), i = 1; i < d; i++) f[i - 1] = arguments[i];
                    c.apply(this, f)
            } else if (g(c)) {
                for (d = arguments.length, f = new Array(d - 1), i = 1; i < d; i++) f[i - 1] = arguments[i];
                for (j = c.slice(), d = j.length, i = 0; i < d; i++) j[i].apply(this, f)
            } return !0
        }, d.prototype.addListener = function (a, b) {
            var c;
            if (!e(b)) throw TypeError("listener must be a function");
            if (this._events || (this._events = {}), this._events.newListener && this.emit("newListener", a, e(b.listener) ? b.listener : b), this._events[a] ? g(this._events[a]) ? this._events[a].push(b) : this._events[a] = [this._events[a], b] : this._events[a] = b, g(this._events[a]) && !this._events[a].warned) {
                var c;
                c = h(this._maxListeners) ? d.defaultMaxListeners : this._maxListeners, c && c > 0 && this._events[a].length > c && (this._events[a].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[a].length), "function" == typeof console.trace && console.trace())
            }
            return this
        }, d.prototype.on = d.prototype.addListener, d.prototype.once = function (a, b) {
            function c() {
                this.removeListener(a, c), d || (d = !0, b.apply(this, arguments))
            }
            if (!e(b)) throw TypeError("listener must be a function");
            var d = !1;
            return c.listener = b, this.on(a, c), this
        }, d.prototype.removeListener = function (a, b) {
            var c, d, f, h;
            if (!e(b)) throw TypeError("listener must be a function");
            if (!this._events || !this._events[a]) return this;
            if (c = this._events[a], f = c.length, d = -1, c === b || e(c.listener) && c.listener === b) delete this._events[a], this._events.removeListener && this.emit("removeListener", a, b);
            else if (g(c)) {
                for (h = f; h-- > 0;)
                    if (c[h] === b || c[h].listener && c[h].listener === b) {
                        d = h;
                        break
                    } if (d < 0) return this;
                1 === c.length ? (c.length = 0, delete this._events[a]) : c.splice(d, 1), this._events.removeListener && this.emit("removeListener", a, b)
            }
            return this
        }, d.prototype.removeAllListeners = function (a) {
            var b, c;
            if (!this._events) return this;
            if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[a] && delete this._events[a], this;
            if (0 === arguments.length) {
                for (b in this._events) "removeListener" !== b && this.removeAllListeners(b);
                return this.removeAllListeners("removeListener"), this._events = {}, this
            }
            if (c = this._events[a], e(c)) this.removeListener(a, c);
            else
                for (; c.length;) this.removeListener(a, c[c.length - 1]);
            return delete this._events[a], this
        }, d.prototype.listeners = function (a) {
            return this._events && this._events[a] ? e(this._events[a]) ? [this._events[a]] : this._events[a].slice() : []
        }, d.listenerCount = function (a, b) {
            return a._events && a._events[b] ? e(a._events[b]) ? 1 : a._events[b].length : 0
        }
    }, {}],
    20: [function (a, b, c) {
        "function" == typeof Object.create ? b.exports = function (a, b) {
            a.super_ = b, a.prototype = Object.create(b.prototype, {
                constructor: {
                    value: a,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            })
        } : b.exports = function (a, b) {
            a.super_ = b;
            var c = function () { };
            c.prototype = b.prototype, a.prototype = new c, a.prototype.constructor = a
        }
    }, {}],
    21: [function (a, b, c) {
        b.exports = Array.isArray || function (a) {
            return "[object Array]" == Object.prototype.toString.call(a)
        }
    }, {}],
    22: [function (a, b, c) {
        function d() { }
        var e = b.exports = {};
        e.nextTick = function () {
            var a = "undefined" != typeof window && window.setImmediate,
                b = "undefined" != typeof window && window.postMessage && window.addEventListener;
            if (a) return function (a) {
                return window.setImmediate(a)
            };
            if (b) {
                var c = [];
                return window.addEventListener("message", function (a) {
                    var b = a.source;
                    if ((b === window || null === b) && "process-tick" === a.data && (a.stopPropagation(), c.length > 0)) {
                        c.shift()()
                    }
                }, !0),
                    function (a) {
                        c.push(a), window.postMessage("process-tick", "*")
                    }
            }
            return function (a) {
                setTimeout(a, 0)
            }
        }(), e.title = "browser", e.browser = !0, e.env = {}, e.argv = [], e.on = d, e.addListener = d, e.once = d, e.off = d, e.removeListener = d, e.removeAllListeners = d, e.emit = d, e.binding = function (a) {
            throw new Error("process.binding is not supported")
        }, e.cwd = function () {
            return "/"
        }, e.chdir = function (a) {
            throw new Error("process.chdir is not supported")
        }
    }, {}],
    23: [function (a, b, c) {
        b.exports = a("./lib/_stream_duplex.js")
    }, {
        "./lib/_stream_duplex.js": 24
    }],
    24: [function (a, b, c) {
        (function (c) {
            function d(a) {
                if (!(this instanceof d)) return new d(a);
                i.call(this, a), j.call(this, a), a && !1 === a.readable && (this.readable = !1), a && !1 === a.writable && (this.writable = !1), this.allowHalfOpen = !0, a && !1 === a.allowHalfOpen && (this.allowHalfOpen = !1), this.once("end", e)
            }

            function e() {
                this.allowHalfOpen || this._writableState.ended || c.nextTick(this.end.bind(this))
            }

            function f(a, b) {
                for (var c = 0, d = a.length; c < d; c++) b(a[c], c)
            }
            b.exports = d;
            var g = Object.keys || function (a) {
                var b = [];
                for (var c in a) b.push(c);
                return b
            },
                h = a("core-util-is");
            h.inherits = a("inherits");
            var i = a("./_stream_readable"),
                j = a("./_stream_writable");
            h.inherits(d, i), f(g(j.prototype), function (a) {
                d.prototype[a] || (d.prototype[a] = j.prototype[a])
            })
        }).call(this, a("_process"))
    }, {
        "./_stream_readable": 26,
        "./_stream_writable": 28,
        _process: 22,
        "core-util-is": 29,
        inherits: 20
    }],
    25: [function (a, b, c) {
        function d(a) {
            if (!(this instanceof d)) return new d(a);
            e.call(this, a)
        }
        b.exports = d;
        var e = a("./_stream_transform"),
            f = a("core-util-is");
        f.inherits = a("inherits"), f.inherits(d, e), d.prototype._transform = function (a, b, c) {
            c(null, a)
        }
    }, {
        "./_stream_transform": 27,
        "core-util-is": 29,
        inherits: 20
    }],
    26: [function (a, b, c) {
        (function (c) {
            function d(b, c) {
                b = b || {};
                var d = b.highWaterMark;
                this.highWaterMark = d || 0 === d ? d : 16384, this.highWaterMark = ~~this.highWaterMark, this.buffer = [], this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = !1, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.calledRead = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.objectMode = !!b.objectMode, this.defaultEncoding = b.defaultEncoding || "utf8", this.ranOut = !1, this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, b.encoding && (C || (C = a("string_decoder/").StringDecoder), this.decoder = new C(b.encoding), this.encoding = b.encoding)
            }

            function e(a) {
                if (!(this instanceof e)) return new e(a);
                this._readableState = new d(a, this), this.readable = !0, A.call(this)
            }

            function f(a, b, c, d, e) {
                var f = j(b, c);
                if (f) a.emit("error", f);
                else if (null === c || void 0 === c) b.reading = !1, b.ended || k(a, b);
                else if (b.objectMode || c && c.length > 0)
                    if (b.ended && !e) {
                        var h = new Error("stream.push() after EOF");
                        a.emit("error", h)
                    } else if (b.endEmitted && e) {
                        var h = new Error("stream.unshift() after end event");
                        a.emit("error", h)
                    } else !b.decoder || e || d || (c = b.decoder.write(c)), b.length += b.objectMode ? 1 : c.length, e ? b.buffer.unshift(c) : (b.reading = !1, b.buffer.push(c)), b.needReadable && l(a), n(a, b);
                else e || (b.reading = !1);
                return g(b)
            }

            function g(a) {
                return !a.ended && (a.needReadable || a.length < a.highWaterMark || 0 === a.length)
            }

            function h(a) {
                if (a >= D) a = D;
                else {
                    a--;
                    for (var b = 1; b < 32; b <<= 1) a |= a >> b;
                    a++
                }
                return a
            }

            function i(a, b) {
                return 0 === b.length && b.ended ? 0 : b.objectMode ? 0 === a ? 0 : 1 : null === a || isNaN(a) ? b.flowing && b.buffer.length ? b.buffer[0].length : b.length : a <= 0 ? 0 : (a > b.highWaterMark && (b.highWaterMark = h(a)), a > b.length ? b.ended ? b.length : (b.needReadable = !0, 0) : a)
            }

            function j(a, b) {
                var c = null;
                return y.isBuffer(b) || "string" == typeof b || null === b || void 0 === b || a.objectMode || (c = new TypeError("Invalid non-string/buffer chunk")), c
            }

            function k(a, b) {
                if (b.decoder && !b.ended) {
                    var c = b.decoder.end();
                    c && c.length && (b.buffer.push(c), b.length += b.objectMode ? 1 : c.length)
                }
                b.ended = !0, b.length > 0 ? l(a) : u(a)
            }

            function l(a) {
                var b = a._readableState;
                b.needReadable = !1, b.emittedReadable || (b.emittedReadable = !0, b.sync ? c.nextTick(function () {
                    m(a)
                }) : m(a))
            }

            function m(a) {
                a.emit("readable")
            }

            function n(a, b) {
                b.readingMore || (b.readingMore = !0, c.nextTick(function () {
                    o(a, b)
                }))
            }

            function o(a, b) {
                for (var c = b.length; !b.reading && !b.flowing && !b.ended && b.length < b.highWaterMark && (a.read(0), c !== b.length);) c = b.length;
                b.readingMore = !1
            }

            function p(a) {
                return function () {
                    var b = a._readableState;
                    0 === --b.awaitDrain && q(a)
                }
            }

            function q(a) {
                function b(a, b, e) {
                    !1 === a.write(c) && d.awaitDrain++
                }
                var c, d = a._readableState;
                for (d.awaitDrain = 0; d.pipesCount && null !== (c = a.read());)
                    if (1 === d.pipesCount ? b(d.pipes, 0, null) : v(d.pipes, b), a.emit("data", c), d.awaitDrain > 0) return;
                if (0 === d.pipesCount) return d.flowing = !1, void (z.listenerCount(a, "data") > 0 && s(a));
                d.ranOut = !0
            }

            function r() {
                this._readableState.ranOut && (this._readableState.ranOut = !1, q(this))
            }

            function s(a, b) {
                if (a._readableState.flowing) throw new Error("Cannot switch to old mode now.");
                var d = b || !1,
                    e = !1;
                a.readable = !0, a.pipe = A.prototype.pipe, a.on = a.addListener = A.prototype.on, a.on("readable", function () {
                    e = !0;
                    for (var b; !d && null !== (b = a.read());) a.emit("data", b);
                    null === b && (e = !1, a._readableState.needReadable = !0)
                }), a.pause = function () {
                    d = !0, this.emit("pause")
                }, a.resume = function () {
                    d = !1, e ? c.nextTick(function () {
                        a.emit("readable")
                    }) : this.read(0), this.emit("resume")
                }, a.emit("readable")
            }

            function t(a, b) {
                var c, d = b.buffer,
                    e = b.length,
                    f = !!b.decoder,
                    g = !!b.objectMode;
                if (0 === d.length) return null;
                if (0 === e) c = null;
                else if (g) c = d.shift();
                else if (!a || a >= e) c = f ? d.join("") : y.concat(d, e), d.length = 0;
                else if (a < d[0].length) {
                    var h = d[0];
                    c = h.slice(0, a), d[0] = h.slice(a)
                } else if (a === d[0].length) c = d.shift();
                else {
                    c = f ? "" : new y(a);
                    for (var i = 0, j = 0, k = d.length; j < k && i < a; j++) {
                        var h = d[0],
                            l = Math.min(a - i, h.length);
                        f ? c += h.slice(0, l) : h.copy(c, i, 0, l), l < h.length ? d[0] = h.slice(l) : d.shift(), i += l
                    }
                }
                return c
            }

            function u(a) {
                var b = a._readableState;
                if (b.length > 0) throw new Error("endReadable called on non-empty stream");
                !b.endEmitted && b.calledRead && (b.ended = !0, c.nextTick(function () {
                    b.endEmitted || 0 !== b.length || (b.endEmitted = !0, a.readable = !1, a.emit("end"))
                }))
            }

            function v(a, b) {
                for (var c = 0, d = a.length; c < d; c++) b(a[c], c)
            }

            function w(a, b) {
                for (var c = 0, d = a.length; c < d; c++)
                    if (a[c] === b) return c;
                return -1
            }
            b.exports = e;
            var x = a("isarray"),
                y = a("buffer").Buffer;
            e.ReadableState = d;
            var z = a("events").EventEmitter;
            z.listenerCount || (z.listenerCount = function (a, b) {
                return a.listeners(b).length
            });
            var A = a("stream"),
                B = a("core-util-is");
            B.inherits = a("inherits");
            var C;
            B.inherits(e, A), e.prototype.push = function (a, b) {
                var c = this._readableState;
                return "string" != typeof a || c.objectMode || (b = b || c.defaultEncoding) !== c.encoding && (a = new y(a, b), b = ""), f(this, c, a, b, !1)
            }, e.prototype.unshift = function (a) {
                return f(this, this._readableState, a, "", !0)
            }, e.prototype.setEncoding = function (b) {
                C || (C = a("string_decoder/").StringDecoder), this._readableState.decoder = new C(b), this._readableState.encoding = b
            };
            var D = 8388608;
            e.prototype.read = function (a) {
                var b = this._readableState;
                b.calledRead = !0;
                var c, d = a;
                if (("number" != typeof a || a > 0) && (b.emittedReadable = !1), 0 === a && b.needReadable && (b.length >= b.highWaterMark || b.ended)) return l(this), null;
                if (0 === (a = i(a, b)) && b.ended) return c = null, b.length > 0 && b.decoder && (c = t(a, b), b.length -= c.length), 0 === b.length && u(this), c;
                var e = b.needReadable;
                return b.length - a <= b.highWaterMark && (e = !0), (b.ended || b.reading) && (e = !1), e && (b.reading = !0, b.sync = !0, 0 === b.length && (b.needReadable = !0), this._read(b.highWaterMark), b.sync = !1), e && !b.reading && (a = i(d, b)), c = a > 0 ? t(a, b) : null, null === c && (b.needReadable = !0, a = 0), b.length -= a, 0 !== b.length || b.ended || (b.needReadable = !0), b.ended && !b.endEmitted && 0 === b.length && u(this), c
            }, e.prototype._read = function (a) {
                this.emit("error", new Error("not implemented"))
            }, e.prototype.pipe = function (a, b) {
                function d(a) {
                    a === k && f()
                }

                function e() {
                    a.end()
                }

                function f() {
                    a.removeListener("close", h), a.removeListener("finish", i), a.removeListener("drain", o), a.removeListener("error", g), a.removeListener("unpipe", d), k.removeListener("end", e), k.removeListener("end", f), a._writableState && !a._writableState.needDrain || o()
                }

                function g(b) {
                    j(), a.removeListener("error", g), 0 === z.listenerCount(a, "error") && a.emit("error", b)
                }

                function h() {
                    a.removeListener("finish", i), j()
                }

                function i() {
                    a.removeListener("close", h), j()
                }

                function j() {
                    k.unpipe(a)
                }
                var k = this,
                    l = this._readableState;
                switch (l.pipesCount) {
                    case 0:
                        l.pipes = a;
                        break;
                    case 1:
                        l.pipes = [l.pipes, a];
                        break;
                    default:
                        l.pipes.push(a)
                }
                l.pipesCount += 1;
                var m = (!b || !1 !== b.end) && a !== c.stdout && a !== c.stderr,
                    n = m ? e : f;
                l.endEmitted ? c.nextTick(n) : k.once("end", n), a.on("unpipe", d);
                var o = p(k);
                return a.on("drain", o), a._events && a._events.error ? x(a._events.error) ? a._events.error.unshift(g) : a._events.error = [g, a._events.error] : a.on("error", g), a.once("close", h), a.once("finish", i), a.emit("pipe", k), l.flowing || (this.on("readable", r), l.flowing = !0, c.nextTick(function () {
                    q(k)
                })), a
            }, e.prototype.unpipe = function (a) {
                var b = this._readableState;
                if (0 === b.pipesCount) return this;
                if (1 === b.pipesCount) return a && a !== b.pipes ? this : (a || (a = b.pipes), b.pipes = null, b.pipesCount = 0, this.removeListener("readable", r), b.flowing = !1, a && a.emit("unpipe", this), this);
                if (!a) {
                    var c = b.pipes,
                        d = b.pipesCount;
                    b.pipes = null, b.pipesCount = 0, this.removeListener("readable", r), b.flowing = !1;
                    for (var e = 0; e < d; e++) c[e].emit("unpipe", this);
                    return this
                }
                var e = w(b.pipes, a);
                return -1 === e ? this : (b.pipes.splice(e, 1), b.pipesCount -= 1, 1 === b.pipesCount && (b.pipes = b.pipes[0]), a.emit("unpipe", this), this)
            }, e.prototype.on = function (a, b) {
                var c = A.prototype.on.call(this, a, b);
                if ("data" !== a || this._readableState.flowing || s(this), "readable" === a && this.readable) {
                    var d = this._readableState;
                    d.readableListening || (d.readableListening = !0, d.emittedReadable = !1, d.needReadable = !0, d.reading ? d.length && l(this, d) : this.read(0))
                }
                return c
            }, e.prototype.addListener = e.prototype.on, e.prototype.resume = function () {
                s(this), this.read(0), this.emit("resume")
            }, e.prototype.pause = function () {
                s(this, !0), this.emit("pause")
            }, e.prototype.wrap = function (a) {
                var b = this._readableState,
                    c = !1,
                    d = this;
                a.on("end", function () {
                    if (b.decoder && !b.ended) {
                        var a = b.decoder.end();
                        a && a.length && d.push(a)
                    }
                    d.push(null)
                }), a.on("data", function (e) {
                    if (b.decoder && (e = b.decoder.write(e)), (!b.objectMode || null !== e && void 0 !== e) && (b.objectMode || e && e.length)) {
                        d.push(e) || (c = !0, a.pause())
                    }
                });
                for (var e in a) "function" == typeof a[e] && void 0 === this[e] && (this[e] = function (b) {
                    return function () {
                        return a[b].apply(a, arguments)
                    }
                }(e));
                return v(["error", "close", "destroy", "pause", "resume"], function (b) {
                    a.on(b, d.emit.bind(d, b))
                }), d._read = function (b) {
                    c && (c = !1, a.resume())
                }, d
            }, e._fromList = t
        }).call(this, a("_process"))
    }, {
        _process: 22,
        buffer: 3,
        "core-util-is": 29,
        events: 19,
        inherits: 20,
        isarray: 21,
        stream: 35,
        "string_decoder/": 30
    }],
    27: [function (a, b, c) {
        function d(a, b) {
            this.afterTransform = function (a, c) {
                return e(b, a, c)
            }, this.needTransform = !1, this.transforming = !1, this.writecb = null, this.writechunk = null
        }

        function e(a, b, c) {
            var d = a._transformState;
            d.transforming = !1;
            var e = d.writecb;
            if (!e) return a.emit("error", new Error("no writecb in Transform class"));
            d.writechunk = null, d.writecb = null, null !== c && void 0 !== c && a.push(c), e && e(b);
            var f = a._readableState;
            f.reading = !1, (f.needReadable || f.length < f.highWaterMark) && a._read(f.highWaterMark)
        }

        function f(a) {
            if (!(this instanceof f)) return new f(a);
            h.call(this, a);
            var b = (this._transformState = new d(a, this), this);
            this._readableState.needReadable = !0, this._readableState.sync = !1, this.once("finish", function () {
                "function" == typeof this._flush ? this._flush(function (a) {
                    g(b, a)
                }) : g(b)
            })
        }

        function g(a, b) {
            if (b) return a.emit("error", b);
            var c = a._writableState,
                d = (a._readableState, a._transformState);
            if (c.length) throw new Error("calling transform done when ws.length != 0");
            if (d.transforming) throw new Error("calling transform done when still transforming");
            return a.push(null)
        }
        b.exports = f;
        var h = a("./_stream_duplex"),
            i = a("core-util-is");
        i.inherits = a("inherits"), i.inherits(f, h), f.prototype.push = function (a, b) {
            return this._transformState.needTransform = !1, h.prototype.push.call(this, a, b)
        }, f.prototype._transform = function (a, b, c) {
            throw new Error("not implemented")
        }, f.prototype._write = function (a, b, c) {
            var d = this._transformState;
            if (d.writecb = c, d.writechunk = a, d.writeencoding = b, !d.transforming) {
                var e = this._readableState;
                (d.needTransform || e.needReadable || e.length < e.highWaterMark) && this._read(e.highWaterMark)
            }
        }, f.prototype._read = function (a) {
            var b = this._transformState;
            null !== b.writechunk && b.writecb && !b.transforming ? (b.transforming = !0, this._transform(b.writechunk, b.writeencoding, b.afterTransform)) : b.needTransform = !0
        }
    }, {
        "./_stream_duplex": 24,
        "core-util-is": 29,
        inherits: 20
    }],
    28: [function (a, b, c) {
        (function (c) {
            function d(a, b, c) {
                this.chunk = a, this.encoding = b, this.callback = c
            }

            function e(a, b) {
                a = a || {};
                var c = a.highWaterMark;
                this.highWaterMark = c || 0 === c ? c : 16384, this.objectMode = !!a.objectMode, this.highWaterMark = ~~this.highWaterMark, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1;
                var d = !1 === a.decodeStrings;
                this.decodeStrings = !d, this.defaultEncoding = a.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function (a) {
                    n(b, a)
                }, this.writecb = null, this.writelen = 0, this.buffer = [], this.errorEmitted = !1
            }

            function f(b) {
                var c = a("./_stream_duplex");
                if (!(this instanceof f || this instanceof c)) return new f(b);
                this._writableState = new e(b, this), this.writable = !0, w.call(this)
            }

            function g(a, b, d) {
                var e = new Error("write after end");
                a.emit("error", e), c.nextTick(function () {
                    d(e)
                })
            }

            function h(a, b, d, e) {
                var f = !0;
                if (!u.isBuffer(d) && "string" != typeof d && null !== d && void 0 !== d && !b.objectMode) {
                    var g = new TypeError("Invalid non-string/buffer chunk");
                    a.emit("error", g), c.nextTick(function () {
                        e(g)
                    }), f = !1
                }
                return f
            }

            function i(a, b, c) {
                return a.objectMode || !1 === a.decodeStrings || "string" != typeof b || (b = new u(b, c)), b
            }

            function j(a, b, c, e, f) {
                c = i(b, c, e), u.isBuffer(c) && (e = "buffer");
                var g = b.objectMode ? 1 : c.length;
                b.length += g;
                var h = b.length < b.highWaterMark;
                return h || (b.needDrain = !0), b.writing ? b.buffer.push(new d(c, e, f)) : k(a, b, g, c, e, f), h
            }

            function k(a, b, c, d, e, f) {
                b.writelen = c, b.writecb = f, b.writing = !0, b.sync = !0, a._write(d, e, b.onwrite), b.sync = !1
            }

            function l(a, b, d, e, f) {
                d ? c.nextTick(function () {
                    f(e)
                }) : f(e), a._writableState.errorEmitted = !0, a.emit("error", e)
            }

            function m(a) {
                a.writing = !1, a.writecb = null, a.length -= a.writelen, a.writelen = 0
            }

            function n(a, b) {
                var d = a._writableState,
                    e = d.sync,
                    f = d.writecb;
                if (m(d), b) l(a, d, e, b, f);
                else {
                    var g = r(a, d);
                    g || d.bufferProcessing || !d.buffer.length || q(a, d), e ? c.nextTick(function () {
                        o(a, d, g, f)
                    }) : o(a, d, g, f)
                }
            }

            function o(a, b, c, d) {
                c || p(a, b), d(), c && s(a, b)
            }

            function p(a, b) {
                0 === b.length && b.needDrain && (b.needDrain = !1, a.emit("drain"))
            }

            function q(a, b) {
                b.bufferProcessing = !0;
                for (var c = 0; c < b.buffer.length; c++) {
                    var d = b.buffer[c],
                        e = d.chunk,
                        f = d.encoding,
                        g = d.callback;
                    if (k(a, b, b.objectMode ? 1 : e.length, e, f, g), b.writing) {
                        c++;
                        break
                    }
                }
                b.bufferProcessing = !1, c < b.buffer.length ? b.buffer = b.buffer.slice(c) : b.buffer.length = 0
            }

            function r(a, b) {
                return b.ending && 0 === b.length && !b.finished && !b.writing
            }

            function s(a, b) {
                var c = r(a, b);
                return c && (b.finished = !0, a.emit("finish")), c
            }

            function t(a, b, d) {
                b.ending = !0, s(a, b), d && (b.finished ? c.nextTick(d) : a.once("finish", d)), b.ended = !0
            }
            b.exports = f;
            var u = a("buffer").Buffer;
            f.WritableState = e;
            var v = a("core-util-is");
            v.inherits = a("inherits");
            var w = a("stream");
            v.inherits(f, w), f.prototype.pipe = function () {
                this.emit("error", new Error("Cannot pipe. Not readable."))
            }, f.prototype.write = function (a, b, c) {
                var d = this._writableState,
                    e = !1;
                return "function" == typeof b && (c = b, b = null), u.isBuffer(a) ? b = "buffer" : b || (b = d.defaultEncoding), "function" != typeof c && (c = function () { }), d.ended ? g(this, d, c) : h(this, d, a, c) && (e = j(this, d, a, b, c)), e
            }, f.prototype._write = function (a, b, c) {
                c(new Error("not implemented"))
            }, f.prototype.end = function (a, b, c) {
                var d = this._writableState;
                "function" == typeof a ? (c = a, a = null, b = null) : "function" == typeof b && (c = b, b = null), void 0 !== a && null !== a && this.write(a, b), d.ending || d.finished || t(this, d, c)
            }
        }).call(this, a("_process"))
    }, {
        "./_stream_duplex": 24,
        _process: 22,
        buffer: 3,
        "core-util-is": 29,
        inherits: 20,
        stream: 35
    }],
    29: [function (a, b, c) {
        (function (a) {
            function b(a) {
                return Array.isArray(a)
            }

            function d(a) {
                return "boolean" == typeof a
            }

            function e(a) {
                return null === a
            }

            function f(a) {
                return null == a
            }

            function g(a) {
                return "number" == typeof a
            }

            function h(a) {
                return "string" == typeof a
            }

            function i(a) {
                return "symbol" == typeof a
            }

            function j(a) {
                return void 0 === a
            }

            function k(a) {
                return l(a) && "[object RegExp]" === r(a)
            }

            function l(a) {
                return "object" == typeof a && null !== a
            }

            function m(a) {
                return l(a) && "[object Date]" === r(a)
            }

            function n(a) {
                return l(a) && ("[object Error]" === r(a) || a instanceof Error)
            }

            function o(a) {
                return "function" == typeof a
            }

            function p(a) {
                return null === a || "boolean" == typeof a || "number" == typeof a || "string" == typeof a || "symbol" == typeof a || void 0 === a
            }

            function q(b) {
                return a.isBuffer(b)
            }

            function r(a) {
                return Object.prototype.toString.call(a)
            }
            c.isArray = b, c.isBoolean = d, c.isNull = e, c.isNullOrUndefined = f, c.isNumber = g, c.isString = h, c.isSymbol = i, c.isUndefined = j, c.isRegExp = k, c.isObject = l, c.isDate = m, c.isError = n, c.isFunction = o, c.isPrimitive = p, c.isBuffer = q
        }).call(this, a("buffer").Buffer)
    }, {
        buffer: 3
    }],
    30: [function (a, b, c) {
        function d(a) {
            if (a && !i(a)) throw new Error("Unknown encoding: " + a)
        }

        function e(a) {
            return a.toString(this.encoding)
        }

        function f(a) {
            this.charReceived = a.length % 2, this.charLength = this.charReceived ? 2 : 0
        }

        function g(a) {
            this.charReceived = a.length % 3, this.charLength = this.charReceived ? 3 : 0
        }
        var h = a("buffer").Buffer,
            i = h.isEncoding || function (a) {
                switch (a && a.toLowerCase()) {
                    case "hex":
                    case "utf8":
                    case "utf-8":
                    case "ascii":
                    case "binary":
                    case "base64":
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                    case "raw":
                        return !0;
                    default:
                        return !1
                }
            },
            j = c.StringDecoder = function (a) {
                switch (this.encoding = (a || "utf8").toLowerCase().replace(/[-_]/, ""), d(a), this.encoding) {
                    case "utf8":
                        this.surrogateSize = 3;
                        break;
                    case "ucs2":
                    case "utf16le":
                        this.surrogateSize = 2, this.detectIncompleteChar = f;
                        break;
                    case "base64":
                        this.surrogateSize = 3, this.detectIncompleteChar = g;
                        break;
                    default:
                        return void (this.write = e)
                }
                this.charBuffer = new h(6), this.charReceived = 0, this.charLength = 0
            };
        j.prototype.write = function (a) {
            for (var b = ""; this.charLength;) {
                var c = a.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : a.length;
                if (a.copy(this.charBuffer, this.charReceived, 0, c), this.charReceived += c, this.charReceived < this.charLength) return "";
                a = a.slice(c, a.length), b = this.charBuffer.slice(0, this.charLength).toString(this.encoding);
                var d = b.charCodeAt(b.length - 1);
                if (!(d >= 55296 && d <= 56319)) {
                    if (this.charReceived = this.charLength = 0, 0 === a.length) return b;
                    break
                }
                this.charLength += this.surrogateSize, b = ""
            }
            this.detectIncompleteChar(a);
            var e = a.length;
            this.charLength && (a.copy(this.charBuffer, 0, a.length - this.charReceived, e), e -= this.charReceived), b += a.toString(this.encoding, 0, e);
            var e = b.length - 1,
                d = b.charCodeAt(e);
            if (d >= 55296 && d <= 56319) {
                var f = this.surrogateSize;
                return this.charLength += f, this.charReceived += f, this.charBuffer.copy(this.charBuffer, f, 0, f), a.copy(this.charBuffer, 0, 0, f), b.substring(0, e)
            }
            return b
        }, j.prototype.detectIncompleteChar = function (a) {
            for (var b = a.length >= 3 ? 3 : a.length; b > 0; b--) {
                var c = a[a.length - b];
                if (1 == b && c >> 5 == 6) {
                    this.charLength = 2;
                    break
                }
                if (b <= 2 && c >> 4 == 14) {
                    this.charLength = 3;
                    break
                }
                if (b <= 3 && c >> 3 == 30) {
                    this.charLength = 4;
                    break
                }
            }
            this.charReceived = b
        }, j.prototype.end = function (a) {
            var b = "";
            if (a && a.length && (b = this.write(a)), this.charReceived) {
                var c = this.charReceived,
                    d = this.charBuffer,
                    e = this.encoding;
                b += d.slice(0, c).toString(e)
            }
            return b
        }
    }, {
        buffer: 3
    }],
    31: [function (a, b, c) {
        b.exports = a("./lib/_stream_passthrough.js")
    }, {
        "./lib/_stream_passthrough.js": 25
    }],
    32: [function (a, b, c) {
        c = b.exports = a("./lib/_stream_readable.js"), c.Readable = c, c.Writable = a("./lib/_stream_writable.js"), c.Duplex = a("./lib/_stream_duplex.js"), c.Transform = a("./lib/_stream_transform.js"), c.PassThrough = a("./lib/_stream_passthrough.js")
    }, {
        "./lib/_stream_duplex.js": 24,
        "./lib/_stream_passthrough.js": 25,
        "./lib/_stream_readable.js": 26,
        "./lib/_stream_transform.js": 27,
        "./lib/_stream_writable.js": 28
    }],
    33: [function (a, b, c) {
        b.exports = a("./lib/_stream_transform.js")
    }, {
        "./lib/_stream_transform.js": 27
    }],
    34: [function (a, b, c) {
        b.exports = a("./lib/_stream_writable.js")
    }, {
        "./lib/_stream_writable.js": 28
    }],
    35: [function (a, b, c) {
        function d() {
            e.call(this)
        }
        b.exports = d;
        var e = a("events").EventEmitter;
        a("inherits")(d, e), d.Readable = a("readable-stream/readable.js"), d.Writable = a("readable-stream/writable.js"), d.Duplex = a("readable-stream/duplex.js"), d.Transform = a("readable-stream/transform.js"), d.PassThrough = a("readable-stream/passthrough.js"), d.Stream = d, d.prototype.pipe = function (a, b) {
            function c(b) {
                a.writable && !1 === a.write(b) && j.pause && j.pause()
            }

            function d() {
                j.readable && j.resume && j.resume()
            }

            function f() {
                k || (k = !0, a.end())
            }

            function g() {
                k || (k = !0, "function" == typeof a.destroy && a.destroy())
            }

            function h(a) {
                if (i(), 0 === e.listenerCount(this, "error")) throw a
            }

            function i() {
                j.removeListener("data", c), a.removeListener("drain", d), j.removeListener("end", f), j.removeListener("close", g), j.removeListener("error", h), a.removeListener("error", h), j.removeListener("end", i), j.removeListener("close", i), a.removeListener("close", i)
            }
            var j = this;
            j.on("data", c), a.on("drain", d), a._isStdio || b && !1 === b.end || (j.on("end", f), j.on("close", g));
            var k = !1;
            return j.on("error", h), a.on("error", h), j.on("end", i), j.on("close", i), a.on("close", i), a.emit("pipe", j), a
        }
    }, {
        events: 19,
        inherits: 20,
        "readable-stream/duplex.js": 23,
        "readable-stream/passthrough.js": 31,
        "readable-stream/readable.js": 32,
        "readable-stream/transform.js": 33,
        "readable-stream/writable.js": 34
    }],
    36: [function (a, b, c) {
        b.exports = function (a) {
            return a && "object" == typeof a && "function" == typeof a.copy && "function" == typeof a.fill && "function" == typeof a.readUInt8
        }
    }, {}],
    37: [function (a, b, c) {
        (function (b, d) {
            function e(a, b) {
                var d = {
                    seen: [],
                    stylize: g
                };
                return arguments.length >= 3 && (d.depth = arguments[2]), arguments.length >= 4 && (d.colors = arguments[3]), p(b) ? d.showHidden = b : b && c._extend(d, b), v(d.showHidden) && (d.showHidden = !1), v(d.depth) && (d.depth = 2), v(d.colors) && (d.colors = !1), v(d.customInspect) && (d.customInspect = !0), d.colors && (d.stylize = f), i(d, a, d.depth)
            }

            function f(a, b) {
                var c = e.styles[b];
                return c ? "[" + e.colors[c][0] + "m" + a + "[" + e.colors[c][1] + "m" : a
            }

            function g(a, b) {
                return a
            }

            function h(a) {
                var b = {};
                return a.forEach(function (a, c) {
                    b[a] = !0
                }), b
            }

            function i(a, b, d) {
                if (a.customInspect && b && A(b.inspect) && b.inspect !== c.inspect && (!b.constructor || b.constructor.prototype !== b)) {
                    var e = b.inspect(d, a);
                    return t(e) || (e = i(a, e, d)), e
                }
                var f = j(a, b);
                if (f) return f;
                var g = Object.keys(b),
                    p = h(g);
                if (a.showHidden && (g = Object.getOwnPropertyNames(b)), z(b) && (g.indexOf("message") >= 0 || g.indexOf("description") >= 0)) return k(b);
                if (0 === g.length) {
                    if (A(b)) {
                        var q = b.name ? ": " + b.name : "";
                        return a.stylize("[Function" + q + "]", "special")
                    }
                    if (w(b)) return a.stylize(RegExp.prototype.toString.call(b), "regexp");
                    if (y(b)) return a.stylize(Date.prototype.toString.call(b), "date");
                    if (z(b)) return k(b)
                }
                var r = "",
                    s = !1,
                    u = ["{", "}"];
                if (o(b) && (s = !0, u = ["[", "]"]), A(b)) {
                    r = " [Function" + (b.name ? ": " + b.name : "") + "]"
                }
                if (w(b) && (r = " " + RegExp.prototype.toString.call(b)), y(b) && (r = " " + Date.prototype.toUTCString.call(b)), z(b) && (r = " " + k(b)), 0 === g.length && (!s || 0 == b.length)) return u[0] + r + u[1];
                if (d < 0) return w(b) ? a.stylize(RegExp.prototype.toString.call(b), "regexp") : a.stylize("[Object]", "special");
                a.seen.push(b);
                var v;
                return v = s ? l(a, b, d, p, g) : g.map(function (c) {
                    return m(a, b, d, p, c, s)
                }), a.seen.pop(), n(v, r, u)
            }

            function j(a, b) {
                if (v(b)) return a.stylize("undefined", "undefined");
                if (t(b)) {
                    var c = "'" + JSON.stringify(b).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                    return a.stylize(c, "string")
                }
                return s(b) ? a.stylize("" + b, "number") : p(b) ? a.stylize("" + b, "boolean") : q(b) ? a.stylize("null", "null") : void 0
            }

            function k(a) {
                return "[" + Error.prototype.toString.call(a) + "]"
            }

            function l(a, b, c, d, e) {
                for (var f = [], g = 0, h = b.length; g < h; ++g) F(b, String(g)) ? f.push(m(a, b, c, d, String(g), !0)) : f.push("");
                return e.forEach(function (e) {
                    e.match(/^\d+$/) || f.push(m(a, b, c, d, e, !0))
                }), f
            }

            function m(a, b, c, d, e, f) {
                var g, h, j;
                if (j = Object.getOwnPropertyDescriptor(b, e) || {
                    value: b[e]
                }, j.get ? h = j.set ? a.stylize("[Getter/Setter]", "special") : a.stylize("[Getter]", "special") : j.set && (h = a.stylize("[Setter]", "special")), F(d, e) || (g = "[" + e + "]"), h || (a.seen.indexOf(j.value) < 0 ? (h = q(c) ? i(a, j.value, null) : i(a, j.value, c - 1), h.indexOf("\n") > -1 && (h = f ? h.split("\n").map(function (a) {
                    return "  " + a
                }).join("\n").substr(2) : "\n" + h.split("\n").map(function (a) {
                    return "   " + a
                }).join("\n"))) : h = a.stylize("[Circular]", "special")), v(g)) {
                    if (f && e.match(/^\d+$/)) return h;
                    g = JSON.stringify("" + e), g.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (g = g.substr(1, g.length - 2), g = a.stylize(g, "name")) : (g = g.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), g = a.stylize(g, "string"))
                }
                return g + ": " + h
            }

            function n(a, b, c) {
                var d = 0;
                return a.reduce(function (a, b) {
                    return d++, b.indexOf("\n") >= 0 && d++, a + b.replace(/\u001b\[\d\d?m/g, "").length + 1
                }, 0) > 60 ? c[0] + ("" === b ? "" : b + "\n ") + " " + a.join(",\n  ") + " " + c[1] : c[0] + b + " " + a.join(", ") + " " + c[1]
            }

            function o(a) {
                return Array.isArray(a)
            }

            function p(a) {
                return "boolean" == typeof a
            }

            function q(a) {
                return null === a
            }

            function r(a) {
                return null == a
            }

            function s(a) {
                return "number" == typeof a
            }

            function t(a) {
                return "string" == typeof a
            }

            function u(a) {
                return "symbol" == typeof a
            }

            function v(a) {
                return void 0 === a
            }

            function w(a) {
                return x(a) && "[object RegExp]" === C(a)
            }

            function x(a) {
                return "object" == typeof a && null !== a
            }

            function y(a) {
                return x(a) && "[object Date]" === C(a)
            }

            function z(a) {
                return x(a) && ("[object Error]" === C(a) || a instanceof Error)
            }

            function A(a) {
                return "function" == typeof a
            }

            function B(a) {
                return null === a || "boolean" == typeof a || "number" == typeof a || "string" == typeof a || "symbol" == typeof a || void 0 === a
            }

            function C(a) {
                return Object.prototype.toString.call(a)
            }

            function D(a) {
                return a < 10 ? "0" + a.toString(10) : a.toString(10)
            }

            function E() {
                var a = new Date,
                    b = [D(a.getHours()), D(a.getMinutes()), D(a.getSeconds())].join(":");
                return [a.getDate(), J[a.getMonth()], b].join(" ")
            }

            function F(a, b) {
                return Object.prototype.hasOwnProperty.call(a, b)
            }
            var G = /%[sdj%]/g;
            c.format = function (a) {
                if (!t(a)) {
                    for (var b = [], c = 0; c < arguments.length; c++) b.push(e(arguments[c]));
                    return b.join(" ")
                }
                for (var c = 1, d = arguments, f = d.length, g = String(a).replace(G, function (a) {
                    if ("%%" === a) return "%";
                    if (c >= f) return a;
                    switch (a) {
                        case "%s":
                            return String(d[c++]);
                        case "%d":
                            return Number(d[c++]);
                        case "%j":
                            try {
                                return JSON.stringify(d[c++])
                            } catch (a) {
                                return "[Circular]"
                            }
                        default:
                            return a
                    }
                }), h = d[c]; c < f; h = d[++c]) q(h) || !x(h) ? g += " " + h : g += " " + e(h);
                return g
            }, c.deprecate = function (a, e) {
                function f() {
                    if (!g) {
                        if (b.throwDeprecation) throw new Error(e);
                        b.traceDeprecation ? console.trace(e) : console.error(e), g = !0
                    }
                    return a.apply(this, arguments)
                }
                if (v(d.process)) return function () {
                    return c.deprecate(a, e).apply(this, arguments)
                };
                if (!0 === b.noDeprecation) return a;
                var g = !1;
                return f
            };
            var H, I = {};
            c.debuglog = function (a) {
                if (v(H) && (H = b.env.NODE_DEBUG || ""), a = a.toUpperCase(), !I[a])
                    if (new RegExp("\\b" + a + "\\b", "i").test(H)) {
                        var d = b.pid;
                        I[a] = function () {
                            var b = c.format.apply(c, arguments);
                            console.error("%s %d: %s", a, d, b)
                        }
                    } else I[a] = function () { };
                return I[a]
            }, c.inspect = e, e.colors = {
                bold: [1, 22],
                italic: [3, 23],
                underline: [4, 24],
                inverse: [7, 27],
                white: [37, 39],
                grey: [90, 39],
                black: [30, 39],
                blue: [34, 39],
                cyan: [36, 39],
                green: [32, 39],
                magenta: [35, 39],
                red: [31, 39],
                yellow: [33, 39]
            }, e.styles = {
                special: "cyan",
                number: "yellow",
                boolean: "yellow",
                undefined: "grey",
                null: "bold",
                string: "green",
                date: "magenta",
                regexp: "red"
            }, c.isArray = o, c.isBoolean = p, c.isNull = q, c.isNullOrUndefined = r, c.isNumber = s, c.isString = t, c.isSymbol = u, c.isUndefined = v, c.isRegExp = w, c.isObject = x, c.isDate = y, c.isError = z, c.isFunction = A, c.isPrimitive = B, c.isBuffer = a("./support/isBuffer");
            var J = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            c.log = function () {
                console.log("%s - %s", E(), c.format.apply(c, arguments))
            }, c.inherits = a("inherits"), c._extend = function (a, b) {
                if (!b || !x(b)) return a;
                for (var c = Object.keys(b), d = c.length; d--;) a[c[d]] = b[c[d]];
                return a
            }
        }).call(this, a("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        "./support/isBuffer": 36,
        _process: 22,
        inherits: 20
    }],
    38: [function (a, b, c) {
        (function (a) {
            ! function () {
                "use strict";

                function c(b) {
                    var c;
                    return c = b instanceof a ? b : new a(b.toString(), "binary"), c.toString("base64")
                }
                b.exports = c
            }()
        }).call(this, a("buffer").Buffer)
    }, {
        buffer: 3
    }],
    39: [function (a, b, c) {
        ! function (a, c) {
            "object" == typeof b && "object" == typeof b.exports ? b.exports = a.document ? c(a, !0) : function (a) {
                if (!a.document) throw new Error("jQuery requires a window with a document");
                return c(a)
            } : c(a)
        }("undefined" != typeof window ? window : this, function (a, b) {
            function c(a) {
                var b = a.length,
                    c = _.type(a);
                return "function" !== c && !_.isWindow(a) && (!(1 !== a.nodeType || !b) || ("array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a))
            }

            function d(a, b, c) {
                if (_.isFunction(b)) return _.grep(a, function (a, d) {
                    return !!b.call(a, d, a) !== c
                });
                if (b.nodeType) return _.grep(a, function (a) {
                    return a === b !== c
                });
                if ("string" == typeof b) {
                    if (ha.test(b)) return _.filter(b, a, c);
                    b = _.filter(b, a)
                }
                return _.grep(a, function (a) {
                    return U.call(b, a) >= 0 !== c
                })
            }

            function e(a, b) {
                for (;
                    (a = a[b]) && 1 !== a.nodeType;);
                return a
            }

            function f(a) {
                var b = na[a] = {};
                return _.each(a.match(ma) || [], function (a, c) {
                    b[c] = !0
                }), b
            }

            function g() {
                Z.removeEventListener("DOMContentLoaded", g, !1), a.removeEventListener("load", g, !1), _.ready()
            }

            function h() {
                Object.defineProperty(this.cache = {}, 0, {
                    get: function () {
                        return {}
                    }
                }), this.expando = _.expando + Math.random()
            }

            function i(a, b, c) {
                var d;
                if (void 0 === c && 1 === a.nodeType)
                    if (d = "data-" + b.replace(ta, "-$1").toLowerCase(), "string" == typeof (c = a.getAttribute(d))) {
                        try {
                            c = "true" === c || "false" !== c && ("null" === c ? null : +c + "" === c ? +c : sa.test(c) ? _.parseJSON(c) : c)
                        } catch (a) { }
                        ra.set(a, b, c)
                    } else c = void 0;
                return c
            }

            function j() {
                return !0
            }

            function k() {
                return !1
            }

            function l() {
                try {
                    return Z.activeElement
                } catch (a) { }
            }

            function m(a, b) {
                return _.nodeName(a, "table") && _.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
            }

            function n(a) {
                return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a
            }

            function o(a) {
                var b = Ja.exec(a.type);
                return b ? a.type = b[1] : a.removeAttribute("type"), a
            }

            function p(a, b) {
                for (var c = 0, d = a.length; c < d; c++) qa.set(a[c], "globalEval", !b || qa.get(b[c], "globalEval"))
            }

            function q(a, b) {
                var c, d, e, f, g, h, i, j;
                if (1 === b.nodeType) {
                    if (qa.hasData(a) && (f = qa.access(a), g = qa.set(b, f), j = f.events)) {
                        delete g.handle, g.events = {};
                        for (e in j)
                            for (c = 0, d = j[e].length; c < d; c++) _.event.add(b, e, j[e][c])
                    }
                    ra.hasData(a) && (h = ra.access(a), i = _.extend({}, h), ra.set(b, i))
                }
            }

            function r(a, b) {
                var c = a.getElementsByTagName ? a.getElementsByTagName(b || "*") : a.querySelectorAll ? a.querySelectorAll(b || "*") : [];
                return void 0 === b || b && _.nodeName(a, b) ? _.merge([a], c) : c
            }

            function s(a, b) {
                var c = b.nodeName.toLowerCase();
                "input" === c && xa.test(a.type) ? b.checked = a.checked : "input" !== c && "textarea" !== c || (b.defaultValue = a.defaultValue)
            }

            function t(b, c) {
                var d, e = _(c.createElement(b)).appendTo(c.body),
                    f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : _.css(e[0], "display");
                return e.detach(), f
            }

            function u(a) {
                var b = Z,
                    c = Na[a];
                return c || (c = t(a, b), "none" !== c && c || (Ma = (Ma || _("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = Ma[0].contentDocument, b.write(), b.close(), c = t(a, b), Ma.detach()), Na[a] = c), c
            }

            function v(a, b, c) {
                var d, e, f, g, h = a.style;
                return c = c || Qa(a), c && (g = c.getPropertyValue(b) || c[b]), c && ("" !== g || _.contains(a.ownerDocument, a) || (g = _.style(a, b)), Pa.test(g) && Oa.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 !== g ? g + "" : g
            }

            function w(a, b) {
                return {
                    get: function () {
                        return a() ? void delete this.get : (this.get = b).apply(this, arguments)
                    }
                }
            }

            function x(a, b) {
                if (b in a) return b;
                for (var c = b[0].toUpperCase() + b.slice(1), d = b, e = Wa.length; e--;)
                    if ((b = Wa[e] + c) in a) return b;
                return d
            }

            function y(a, b, c) {
                var d = Sa.exec(b);
                return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
            }

            function z(a, b, c, d, e) {
                for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; f < 4; f += 2) "margin" === c && (g += _.css(a, c + va[f], !0, e)), d ? ("content" === c && (g -= _.css(a, "padding" + va[f], !0, e)), "margin" !== c && (g -= _.css(a, "border" + va[f] + "Width", !0, e))) : (g += _.css(a, "padding" + va[f], !0, e), "padding" !== c && (g += _.css(a, "border" + va[f] + "Width", !0, e)));
                return g
            }

            function A(a, b, c) {
                var d = !0,
                    e = "width" === b ? a.offsetWidth : a.offsetHeight,
                    f = Qa(a),
                    g = "border-box" === _.css(a, "boxSizing", !1, f);
                if (e <= 0 || null == e) {
                    if (e = v(a, b, f), (e < 0 || null == e) && (e = a.style[b]), Pa.test(e)) return e;
                    d = g && (Y.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0
                }
                return e + z(a, b, c || (g ? "border" : "content"), d, f) + "px"
            }

            function B(a, b) {
                for (var c, d, e, f = [], g = 0, h = a.length; g < h; g++) d = a[g], d.style && (f[g] = qa.get(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && wa(d) && (f[g] = qa.access(d, "olddisplay", u(d.nodeName)))) : (e = wa(d), "none" === c && e || qa.set(d, "olddisplay", e ? c : _.css(d, "display"))));
                for (g = 0; g < h; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
                return a
            }

            function C(a, b, c, d, e) {
                return new C.prototype.init(a, b, c, d, e)
            }

            function D() {
                return setTimeout(function () {
                    Xa = void 0
                }), Xa = _.now()
            }

            function E(a, b) {
                var c, d = 0,
                    e = {
                        height: a
                    };
                for (b = b ? 1 : 0; d < 4; d += 2 - b) c = va[d], e["margin" + c] = e["padding" + c] = a;
                return b && (e.opacity = e.width = a), e
            }

            function F(a, b, c) {
                for (var d, e = (bb[b] || []).concat(bb["*"]), f = 0, g = e.length; f < g; f++)
                    if (d = e[f].call(c, b, a)) return d
            }

            function G(a, b, c) {
                var d, e, f, g, h, i, j, k = this,
                    l = {},
                    m = a.style,
                    n = a.nodeType && wa(a),
                    o = qa.get(a, "fxshow");
                c.queue || (h = _._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function () {
                    h.unqueued || i()
                }), h.unqueued++, k.always(function () {
                    k.always(function () {
                        h.unqueued--, _.queue(a, "fx").length || h.empty.fire()
                    })
                })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [m.overflow, m.overflowX, m.overflowY], j = _.css(a, "display"), "inline" === ("none" === j ? qa.get(a, "olddisplay") || u(a.nodeName) : j) && "none" === _.css(a, "float") && (m.display = "inline-block")), c.overflow && (m.overflow = "hidden", k.always(function () {
                    m.overflow = c.overflow[0], m.overflowX = c.overflow[1], m.overflowY = c.overflow[2]
                }));
                for (d in b)
                    if (e = b[d], Za.exec(e)) {
                        if (delete b[d], f = f || "toggle" === e, e === (n ? "hide" : "show")) {
                            if ("show" !== e || !o || void 0 === o[d]) continue;
                            n = !0
                        }
                        l[d] = o && o[d] || _.style(a, d)
                    } else j = void 0;
                if (_.isEmptyObject(l)) "inline" === ("none" === j ? u(a.nodeName) : j) && (m.display = j);
                else {
                    o ? "hidden" in o && (n = o.hidden) : o = qa.access(a, "fxshow", {}), f && (o.hidden = !n), n ? _(a).show() : k.done(function () {
                        _(a).hide()
                    }), k.done(function () {
                        var b;
                        qa.remove(a, "fxshow");
                        for (b in l) _.style(a, b, l[b])
                    });
                    for (d in l) g = F(n ? o[d] : 0, d, k), d in o || (o[d] = g.start, n && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
                }
            }

            function H(a, b) {
                var c, d, e, f, g;
                for (c in a)
                    if (d = _.camelCase(c), e = b[d], f = a[c], _.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), (g = _.cssHooks[d]) && "expand" in g) {
                        f = g.expand(f), delete a[d];
                        for (c in f) c in a || (a[c] = f[c], b[c] = e)
                    } else b[d] = e
            }

            function I(a, b, c) {
                var d, e, f = 0,
                    g = ab.length,
                    h = _.Deferred().always(function () {
                        delete i.elem
                    }),
                    i = function () {
                        if (e) return !1;
                        for (var b = Xa || D(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; g < i; g++) j.tweens[g].run(f);
                        return h.notifyWith(a, [j, f, c]), f < 1 && i ? c : (h.resolveWith(a, [j]), !1)
                    },
                    j = h.promise({
                        elem: a,
                        props: _.extend({}, b),
                        opts: _.extend(!0, {
                            specialEasing: {}
                        }, c),
                        originalProperties: b,
                        originalOptions: c,
                        startTime: Xa || D(),
                        duration: c.duration,
                        tweens: [],
                        createTween: function (b, c) {
                            var d = _.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                            return j.tweens.push(d), d
                        },
                        stop: function (b) {
                            var c = 0,
                                d = b ? j.tweens.length : 0;
                            if (e) return this;
                            for (e = !0; c < d; c++) j.tweens[c].run(1);
                            return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this
                        }
                    }),
                    k = j.props;
                for (H(k, j.opts.specialEasing); f < g; f++)
                    if (d = ab[f].call(j, a, k, j.opts)) return d;
                return _.map(k, F, j), _.isFunction(j.opts.start) && j.opts.start.call(a, j), _.fx.timer(_.extend(i, {
                    elem: a,
                    anim: j,
                    queue: j.opts.queue
                })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
            }

            function J(a) {
                return function (b, c) {
                    "string" != typeof b && (c = b, b = "*");
                    var d, e = 0,
                        f = b.toLowerCase().match(ma) || [];
                    if (_.isFunction(c))
                        for (; d = f[e++];) "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
                }
            }

            function K(a, b, c, d) {
                function e(h) {
                    var i;
                    return f[h] = !0, _.each(a[h] || [], function (a, h) {
                        var j = h(b, c, d);
                        return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j), e(j), !1)
                    }), i
                }
                var f = {},
                    g = a === ub;
                return e(b.dataTypes[0]) || !f["*"] && e("*")
            }

            function L(a, b) {
                var c, d, e = _.ajaxSettings.flatOptions || {};
                for (c in b) void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
                return d && _.extend(!0, a, d), a
            }

            function M(a, b, c) {
                for (var d, e, f, g, h = a.contents, i = a.dataTypes;
                    "*" === i[0];) i.shift(), void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
                if (d)
                    for (e in h)
                        if (h[e] && h[e].test(d)) {
                            i.unshift(e);
                            break
                        } if (i[0] in c) f = i[0];
                else {
                    for (e in c) {
                        if (!i[0] || a.converters[e + " " + i[0]]) {
                            f = e;
                            break
                        }
                        g || (g = e)
                    }
                    f = f || g
                }
                if (f) return f !== i[0] && i.unshift(f), c[f]
            }

            function N(a, b, c, d) {
                var e, f, g, h, i, j = {},
                    k = a.dataTypes.slice();
                if (k[1])
                    for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
                for (f = k.shift(); f;)
                    if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
                        if ("*" === f) f = i;
                        else if ("*" !== i && i !== f) {
                            if (!(g = j[i + " " + f] || j["* " + f]))
                                for (e in j)
                                    if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                                        !0 === g ? g = j[e] : !0 !== j[e] && (f = h[0], k.unshift(h[1]));
                                        break
                                    } if (!0 !== g)
                                if (g && a.throws) b = g(b);
                                else try {
                                    b = g(b)
                                } catch (a) {
                                    return {
                                        state: "parsererror",
                                        error: g ? a : "No conversion from " + i + " to " + f
                                    }
                                }
                        }
                return {
                    state: "success",
                    data: b
                }
            }

            function O(a, b, c, d) {
                var e;
                if (_.isArray(b)) _.each(b, function (b, e) {
                    c || xb.test(a) ? d(a, e) : O(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
                });
                else if (c || "object" !== _.type(b)) d(a, b);
                else
                    for (e in b) O(a + "[" + e + "]", b[e], c, d)
            }

            function P(a) {
                return _.isWindow(a) ? a : 9 === a.nodeType && a.defaultView
            }
            var Q = [],
                R = Q.slice,
                S = Q.concat,
                T = Q.push,
                U = Q.indexOf,
                V = {},
                W = V.toString,
                X = V.hasOwnProperty,
                Y = {},
                Z = a.document,
                $ = "2.1.1",
                _ = function (a, b) {
                    return new _.fn.init(a, b)
                },
                aa = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
                ba = /^-ms-/,
                ca = /-([\da-z])/gi,
                da = function (a, b) {
                    return b.toUpperCase()
                };
            _.fn = _.prototype = {
                jquery: $,
                constructor: _,
                selector: "",
                length: 0,
                toArray: function () {
                    return R.call(this)
                },
                get: function (a) {
                    return null != a ? a < 0 ? this[a + this.length] : this[a] : R.call(this)
                },
                pushStack: function (a) {
                    var b = _.merge(this.constructor(), a);
                    return b.prevObject = this, b.context = this.context, b
                },
                each: function (a, b) {
                    return _.each(this, a, b)
                },
                map: function (a) {
                    return this.pushStack(_.map(this, function (b, c) {
                        return a.call(b, c, b)
                    }))
                },
                slice: function () {
                    return this.pushStack(R.apply(this, arguments))
                },
                first: function () {
                    return this.eq(0)
                },
                last: function () {
                    return this.eq(-1)
                },
                eq: function (a) {
                    var b = this.length,
                        c = +a + (a < 0 ? b : 0);
                    return this.pushStack(c >= 0 && c < b ? [this[c]] : [])
                },
                end: function () {
                    return this.prevObject || this.constructor(null)
                },
                push: T,
                sort: Q.sort,
                splice: Q.splice
            }, _.extend = _.fn.extend = function () {
                var a, b, c, d, e, f, g = arguments[0] || {},
                    h = 1,
                    i = arguments.length,
                    j = !1;
                for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || _.isFunction(g) || (g = {}), h === i && (g = this, h--); h < i; h++)
                    if (null != (a = arguments[h]))
                        for (b in a) c = g[b], d = a[b], g !== d && (j && d && (_.isPlainObject(d) || (e = _.isArray(d))) ? (e ? (e = !1, f = c && _.isArray(c) ? c : []) : f = c && _.isPlainObject(c) ? c : {}, g[b] = _.extend(j, f, d)) : void 0 !== d && (g[b] = d));
                return g
            }, _.extend({
                expando: "jQuery" + ($ + Math.random()).replace(/\D/g, ""),
                isReady: !0,
                error: function (a) {
                    throw new Error(a)
                },
                noop: function () { },
                isFunction: function (a) {
                    return "function" === _.type(a)
                },
                isArray: Array.isArray,
                isWindow: function (a) {
                    return null != a && a === a.window
                },
                isNumeric: function (a) {
                    return !_.isArray(a) && a - parseFloat(a) >= 0
                },
                isPlainObject: function (a) {
                    return "object" === _.type(a) && !a.nodeType && !_.isWindow(a) && !(a.constructor && !X.call(a.constructor.prototype, "isPrototypeOf"))
                },
                isEmptyObject: function (a) {
                    var b;
                    for (b in a) return !1;
                    return !0
                },
                type: function (a) {
                    return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? V[W.call(a)] || "object" : typeof a
                },
                globalEval: function (a) {
                    var b, c = eval;
                    (a = _.trim(a)) && (1 === a.indexOf("use strict") ? (b = Z.createElement("script"), b.text = a, Z.head.appendChild(b).parentNode.removeChild(b)) : c(a))
                },
                camelCase: function (a) {
                    return a.replace(ba, "ms-").replace(ca, da)
                },
                nodeName: function (a, b) {
                    return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
                },
                each: function (a, b, d) {
                    var e = 0,
                        f = a.length,
                        g = c(a);
                    if (d) {
                        if (g)
                            for (; e < f && !1 !== b.apply(a[e], d); e++);
                        else
                            for (e in a)
                                if (!1 === b.apply(a[e], d)) break
                    } else if (g)
                        for (; e < f && !1 !== b.call(a[e], e, a[e]); e++);
                    else
                        for (e in a)
                            if (!1 === b.call(a[e], e, a[e])) break;
                    return a
                },
                trim: function (a) {
                    return null == a ? "" : (a + "").replace(aa, "")
                },
                makeArray: function (a, b) {
                    var d = b || [];
                    return null != a && (c(Object(a)) ? _.merge(d, "string" == typeof a ? [a] : a) : T.call(d, a)), d
                },
                inArray: function (a, b, c) {
                    return null == b ? -1 : U.call(b, a, c)
                },
                merge: function (a, b) {
                    for (var c = +b.length, d = 0, e = a.length; d < c; d++) a[e++] = b[d];
                    return a.length = e, a
                },
                grep: function (a, b, c) {
                    for (var d = [], e = 0, f = a.length, g = !c; e < f; e++) !b(a[e], e) !== g && d.push(a[e]);
                    return d
                },
                map: function (a, b, d) {
                    var e, f = 0,
                        g = a.length,
                        h = c(a),
                        i = [];
                    if (h)
                        for (; f < g; f++) null != (e = b(a[f], f, d)) && i.push(e);
                    else
                        for (f in a) null != (e = b(a[f], f, d)) && i.push(e);
                    return S.apply([], i)
                },
                guid: 1,
                proxy: function (a, b) {
                    var c, d, e;
                    if ("string" == typeof b && (c = a[b], b = a, a = c), _.isFunction(a)) return d = R.call(arguments, 2), e = function () {
                        return a.apply(b || this, d.concat(R.call(arguments)))
                    }, e.guid = a.guid = a.guid || _.guid++, e
                },
                now: Date.now,
                support: Y
            }), _.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (a, b) {
                V["[object " + b + "]"] = b.toLowerCase()
            });
            var ea = function (a) {
                function b(a, b, c, d) {
                    var e, f, g, h, i, j, l, n, o, p;
                    if ((b ? b.ownerDocument || b : O) !== G && F(b), b = b || G, c = c || [], !a || "string" != typeof a) return c;
                    if (1 !== (h = b.nodeType) && 9 !== h) return [];
                    if (I && !d) {
                        if (e = sa.exec(a))
                            if (g = e[1]) {
                                if (9 === h) {
                                    if (!(f = b.getElementById(g)) || !f.parentNode) return c;
                                    if (f.id === g) return c.push(f), c
                                } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && M(b, f) && f.id === g) return c.push(f), c
                            } else {
                                if (e[2]) return _.apply(c, b.getElementsByTagName(a)), c;
                                if ((g = e[3]) && v.getElementsByClassName && b.getElementsByClassName) return _.apply(c, b.getElementsByClassName(g)), c
                            } if (v.qsa && (!J || !J.test(a))) {
                                if (n = l = N, o = b, p = 9 === h && a, 1 === h && "object" !== b.nodeName.toLowerCase()) {
                                    for (j = z(a), (l = b.getAttribute("id")) ? n = l.replace(ua, "\\$&") : b.setAttribute("id", n), n = "[id='" + n + "'] ", i = j.length; i--;) j[i] = n + m(j[i]);
                                    o = ta.test(a) && k(b.parentNode) || b, p = j.join(",")
                                }
                                if (p) try {
                                    return _.apply(c, o.querySelectorAll(p)), c
                                } catch (a) { } finally {
                                        l || b.removeAttribute("id")
                                    }
                            }
                    }
                    return B(a.replace(ia, "$1"), b, c, d)
                }

                function c() {
                    function a(c, d) {
                        return b.push(c + " ") > w.cacheLength && delete a[b.shift()], a[c + " "] = d
                    }
                    var b = [];
                    return a
                }

                function d(a) {
                    return a[N] = !0, a
                }

                function e(a) {
                    var b = G.createElement("div");
                    try {
                        return !!a(b)
                    } catch (a) {
                        return !1
                    } finally {
                        b.parentNode && b.parentNode.removeChild(b), b = null
                    }
                }

                function f(a, b) {
                    for (var c = a.split("|"), d = a.length; d--;) w.attrHandle[c[d]] = b
                }

                function g(a, b) {
                    var c = b && a,
                        d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || W) - (~a.sourceIndex || W);
                    if (d) return d;
                    if (c)
                        for (; c = c.nextSibling;)
                            if (c === b) return -1;
                    return a ? 1 : -1
                }

                function h(a) {
                    return function (b) {
                        return "input" === b.nodeName.toLowerCase() && b.type === a
                    }
                }

                function i(a) {
                    return function (b) {
                        var c = b.nodeName.toLowerCase();
                        return ("input" === c || "button" === c) && b.type === a
                    }
                }

                function j(a) {
                    return d(function (b) {
                        return b = +b, d(function (c, d) {
                            for (var e, f = a([], c.length, b), g = f.length; g--;) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                        })
                    })
                }

                function k(a) {
                    return a && typeof a.getElementsByTagName !== V && a
                }

                function l() { }

                function m(a) {
                    for (var b = 0, c = a.length, d = ""; b < c; b++) d += a[b].value;
                    return d
                }

                function n(a, b, c) {
                    var d = b.dir,
                        e = c && "parentNode" === d,
                        f = Q++;
                    return b.first ? function (b, c, f) {
                        for (; b = b[d];)
                            if (1 === b.nodeType || e) return a(b, c, f)
                    } : function (b, c, g) {
                        var h, i, j = [P, f];
                        if (g) {
                            for (; b = b[d];)
                                if ((1 === b.nodeType || e) && a(b, c, g)) return !0
                        } else
                            for (; b = b[d];)
                                if (1 === b.nodeType || e) {
                                    if (i = b[N] || (b[N] = {}), (h = i[d]) && h[0] === P && h[1] === f) return j[2] = h[2];
                                    if (i[d] = j, j[2] = a(b, c, g)) return !0
                                }
                    }
                }

                function o(a) {
                    return a.length > 1 ? function (b, c, d) {
                        for (var e = a.length; e--;)
                            if (!a[e](b, c, d)) return !1;
                        return !0
                    } : a[0]
                }

                function p(a, c, d) {
                    for (var e = 0, f = c.length; e < f; e++) b(a, c[e], d);
                    return d
                }

                function q(a, b, c, d, e) {
                    for (var f, g = [], h = 0, i = a.length, j = null != b; h < i; h++)(f = a[h]) && (c && !c(f, d, e) || (g.push(f), j && b.push(h)));
                    return g
                }

                function r(a, b, c, e, f, g) {
                    return e && !e[N] && (e = r(e)), f && !f[N] && (f = r(f, g)), d(function (d, g, h, i) {
                        var j, k, l, m = [],
                            n = [],
                            o = g.length,
                            r = d || p(b || "*", h.nodeType ? [h] : h, []),
                            s = !a || !d && b ? r : q(r, m, a, h, i),
                            t = c ? f || (d ? a : o || e) ? [] : g : s;
                        if (c && c(s, t, h, i), e)
                            for (j = q(t, n), e(j, [], h, i), k = j.length; k--;)(l = j[k]) && (t[n[k]] = !(s[n[k]] = l));
                        if (d) {
                            if (f || a) {
                                if (f) {
                                    for (j = [], k = t.length; k--;)(l = t[k]) && j.push(s[k] = l);
                                    f(null, t = [], j, i)
                                }
                                for (k = t.length; k--;)(l = t[k]) && (j = f ? ba.call(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l))
                            }
                        } else t = q(t === g ? t.splice(o, t.length) : t), f ? f(null, g, t, i) : _.apply(g, t)
                    })
                }

                function s(a) {
                    for (var b, c, d, e = a.length, f = w.relative[a[0].type], g = f || w.relative[" "], h = f ? 1 : 0, i = n(function (a) {
                        return a === b
                    }, g, !0), j = n(function (a) {
                        return ba.call(b, a) > -1
                    }, g, !0), k = [function (a, c, d) {
                        return !f && (d || c !== C) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d))
                    }]; h < e; h++)
                        if (c = w.relative[a[h].type]) k = [n(o(k), c)];
                        else {
                            if (c = w.filter[a[h].type].apply(null, a[h].matches), c[N]) {
                                for (d = ++h; d < e && !w.relative[a[d].type]; d++);
                                return r(h > 1 && o(k), h > 1 && m(a.slice(0, h - 1).concat({
                                    value: " " === a[h - 2].type ? "*" : ""
                                })).replace(ia, "$1"), c, h < d && s(a.slice(h, d)), d < e && s(a = a.slice(d)), d < e && m(a))
                            }
                            k.push(c)
                        } return o(k)
                }

                function t(a, c) {
                    var e = c.length > 0,
                        f = a.length > 0,
                        g = function (d, g, h, i, j) {
                            var k, l, m, n = 0,
                                o = "0",
                                p = d && [],
                                r = [],
                                s = C,
                                t = d || f && w.find.TAG("*", j),
                                u = P += null == s ? 1 : Math.random() || .1,
                                v = t.length;
                            for (j && (C = g !== G && g); o !== v && null != (k = t[o]); o++) {
                                if (f && k) {
                                    for (l = 0; m = a[l++];)
                                        if (m(k, g, h)) {
                                            i.push(k);
                                            break
                                        } j && (P = u)
                                }
                                e && ((k = !m && k) && n--, d && p.push(k))
                            }
                            if (n += o, e && o !== n) {
                                for (l = 0; m = c[l++];) m(p, r, g, h);
                                if (d) {
                                    if (n > 0)
                                        for (; o--;) p[o] || r[o] || (r[o] = Z.call(i));
                                    r = q(r)
                                }
                                _.apply(i, r), j && !d && r.length > 0 && n + c.length > 1 && b.uniqueSort(i)
                            }
                            return j && (P = u, C = s), p
                        };
                    return e ? d(g) : g
                }
                var u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N = "sizzle" + -new Date,
                    O = a.document,
                    P = 0,
                    Q = 0,
                    R = c(),
                    S = c(),
                    T = c(),
                    U = function (a, b) {
                        return a === b && (E = !0), 0
                    },
                    V = "undefined",
                    W = 1 << 31,
                    X = {}.hasOwnProperty,
                    Y = [],
                    Z = Y.pop,
                    $ = Y.push,
                    _ = Y.push,
                    aa = Y.slice,
                    ba = Y.indexOf || function (a) {
                        for (var b = 0, c = this.length; b < c; b++)
                            if (this[b] === a) return b;
                        return -1
                    },
                    ca = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                    da = "[\\x20\\t\\r\\n\\f]",
                    ea = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                    fa = ea.replace("w", "w#"),
                    ga = "\\[" + da + "*(" + ea + ")(?:" + da + "*([*^$|!~]?=)" + da + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + fa + "))|)" + da + "*\\]",
                    ha = ":(" + ea + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ga + ")*)|.*)\\)|)",
                    ia = new RegExp("^" + da + "+|((?:^|[^\\\\])(?:\\\\.)*)" + da + "+$", "g"),
                    ja = new RegExp("^" + da + "*," + da + "*"),
                    ka = new RegExp("^" + da + "*([>+~]|" + da + ")" + da + "*"),
                    la = new RegExp("=" + da + "*([^\\]'\"]*?)" + da + "*\\]", "g"),
                    ma = new RegExp(ha),
                    na = new RegExp("^" + fa + "$"),
                    oa = {
                        ID: new RegExp("^#(" + ea + ")"),
                        CLASS: new RegExp("^\\.(" + ea + ")"),
                        TAG: new RegExp("^(" + ea.replace("w", "w*") + ")"),
                        ATTR: new RegExp("^" + ga),
                        PSEUDO: new RegExp("^" + ha),
                        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + da + "*(even|odd|(([+-]|)(\\d*)n|)" + da + "*(?:([+-]|)" + da + "*(\\d+)|))" + da + "*\\)|)", "i"),
                        bool: new RegExp("^(?:" + ca + ")$", "i"),
                        needsContext: new RegExp("^" + da + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + da + "*((?:-\\d)?\\d*)" + da + "*\\)|)(?=[^-]|$)", "i")
                    },
                    pa = /^(?:input|select|textarea|button)$/i,
                    qa = /^h\d$/i,
                    ra = /^[^{]+\{\s*\[native \w/,
                    sa = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                    ta = /[+~]/,
                    ua = /'|\\/g,
                    va = new RegExp("\\\\([\\da-f]{1,6}" + da + "?|(" + da + ")|.)", "ig"),
                    wa = function (a, b, c) {
                        var d = "0x" + b - 65536;
                        return d !== d || c ? b : d < 0 ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
                    };
                try {
                    _.apply(Y = aa.call(O.childNodes), O.childNodes), Y[O.childNodes.length].nodeType
                } catch (a) {
                    _ = {
                        apply: Y.length ? function (a, b) {
                            $.apply(a, aa.call(b))
                        } : function (a, b) {
                            for (var c = a.length, d = 0; a[c++] = b[d++];);
                            a.length = c - 1
                        }
                    }
                }
                v = b.support = {}, y = b.isXML = function (a) {
                    var b = a && (a.ownerDocument || a).documentElement;
                    return !!b && "HTML" !== b.nodeName
                }, F = b.setDocument = function (a) {
                    var b, c = a ? a.ownerDocument || a : O,
                        d = c.defaultView;
                    return c !== G && 9 === c.nodeType && c.documentElement ? (G = c, H = c.documentElement, I = !y(c), d && d !== d.top && (d.addEventListener ? d.addEventListener("unload", function () {
                        F()
                    }, !1) : d.attachEvent && d.attachEvent("onunload", function () {
                        F()
                    })), v.attributes = e(function (a) {
                        return a.className = "i", !a.getAttribute("className")
                    }), v.getElementsByTagName = e(function (a) {
                        return a.appendChild(c.createComment("")), !a.getElementsByTagName("*").length
                    }), v.getElementsByClassName = ra.test(c.getElementsByClassName) && e(function (a) {
                        return a.innerHTML = "<div class='a'></div><div class='a i'></div>", a.firstChild.className = "i", 2 === a.getElementsByClassName("i").length
                    }), v.getById = e(function (a) {
                        return H.appendChild(a).id = N, !c.getElementsByName || !c.getElementsByName(N).length
                    }), v.getById ? (w.find.ID = function (a, b) {
                        if (typeof b.getElementById !== V && I) {
                            var c = b.getElementById(a);
                            return c && c.parentNode ? [c] : []
                        }
                    }, w.filter.ID = function (a) {
                        var b = a.replace(va, wa);
                        return function (a) {
                            return a.getAttribute("id") === b
                        }
                    }) : (delete w.find.ID, w.filter.ID = function (a) {
                        var b = a.replace(va, wa);
                        return function (a) {
                            var c = typeof a.getAttributeNode !== V && a.getAttributeNode("id");
                            return c && c.value === b
                        }
                    }), w.find.TAG = v.getElementsByTagName ? function (a, b) {
                        if (typeof b.getElementsByTagName !== V) return b.getElementsByTagName(a)
                    } : function (a, b) {
                        var c, d = [],
                            e = 0,
                            f = b.getElementsByTagName(a);
                        if ("*" === a) {
                            for (; c = f[e++];) 1 === c.nodeType && d.push(c);
                            return d
                        }
                        return f
                    }, w.find.CLASS = v.getElementsByClassName && function (a, b) {
                        if (typeof b.getElementsByClassName !== V && I) return b.getElementsByClassName(a)
                    }, K = [], J = [], (v.qsa = ra.test(c.querySelectorAll)) && (e(function (a) {
                        a.innerHTML = "<select msallowclip=''><option selected=''></option></select>", a.querySelectorAll("[msallowclip^='']").length && J.push("[*^$]=" + da + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || J.push("\\[" + da + "*(?:value|" + ca + ")"), a.querySelectorAll(":checked").length || J.push(":checked")
                    }), e(function (a) {
                        var b = c.createElement("input");
                        b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && J.push("name" + da + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || J.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), J.push(",.*:")
                    })), (v.matchesSelector = ra.test(L = H.matches || H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && e(function (a) {
                        v.disconnectedMatch = L.call(a, "div"), L.call(a, "[s!='']:x"), K.push("!=", ha)
                    }), J = J.length && new RegExp(J.join("|")), K = K.length && new RegExp(K.join("|")), b = ra.test(H.compareDocumentPosition), M = b || ra.test(H.contains) ? function (a, b) {
                        var c = 9 === a.nodeType ? a.documentElement : a,
                            d = b && b.parentNode;
                        return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
                    } : function (a, b) {
                        if (b)
                            for (; b = b.parentNode;)
                                if (b === a) return !0;
                        return !1
                    }, U = b ? function (a, b) {
                        if (a === b) return E = !0, 0;
                        var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
                        return d || (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !v.sortDetached && b.compareDocumentPosition(a) === d ? a === c || a.ownerDocument === O && M(O, a) ? -1 : b === c || b.ownerDocument === O && M(O, b) ? 1 : D ? ba.call(D, a) - ba.call(D, b) : 0 : 4 & d ? -1 : 1)
                    } : function (a, b) {
                        if (a === b) return E = !0, 0;
                        var d, e = 0,
                            f = a.parentNode,
                            h = b.parentNode,
                            i = [a],
                            j = [b];
                        if (!f || !h) return a === c ? -1 : b === c ? 1 : f ? -1 : h ? 1 : D ? ba.call(D, a) - ba.call(D, b) : 0;
                        if (f === h) return g(a, b);
                        for (d = a; d = d.parentNode;) i.unshift(d);
                        for (d = b; d = d.parentNode;) j.unshift(d);
                        for (; i[e] === j[e];) e++;
                        return e ? g(i[e], j[e]) : i[e] === O ? -1 : j[e] === O ? 1 : 0
                    }, c) : G
                }, b.matches = function (a, c) {
                    return b(a, null, null, c)
                }, b.matchesSelector = function (a, c) {
                    if ((a.ownerDocument || a) !== G && F(a), c = c.replace(la, "='$1']"), v.matchesSelector && I && (!K || !K.test(c)) && (!J || !J.test(c))) try {
                        var d = L.call(a, c);
                        if (d || v.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
                    } catch (a) { }
                    return b(c, G, null, [a]).length > 0
                }, b.contains = function (a, b) {
                    return (a.ownerDocument || a) !== G && F(a), M(a, b)
                }, b.attr = function (a, b) {
                    (a.ownerDocument || a) !== G && F(a);
                    var c = w.attrHandle[b.toLowerCase()],
                        d = c && X.call(w.attrHandle, b.toLowerCase()) ? c(a, b, !I) : void 0;
                    return void 0 !== d ? d : v.attributes || !I ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
                }, b.error = function (a) {
                    throw new Error("Syntax error, unrecognized expression: " + a)
                }, b.uniqueSort = function (a) {
                    var b, c = [],
                        d = 0,
                        e = 0;
                    if (E = !v.detectDuplicates, D = !v.sortStable && a.slice(0), a.sort(U), E) {
                        for (; b = a[e++];) b === a[e] && (d = c.push(e));
                        for (; d--;) a.splice(c[d], 1)
                    }
                    return D = null, a
                }, x = b.getText = function (a) {
                    var b, c = "",
                        d = 0,
                        e = a.nodeType;
                    if (e) {
                        if (1 === e || 9 === e || 11 === e) {
                            if ("string" == typeof a.textContent) return a.textContent;
                            for (a = a.firstChild; a; a = a.nextSibling) c += x(a)
                        } else if (3 === e || 4 === e) return a.nodeValue
                    } else
                        for (; b = a[d++];) c += x(b);
                    return c
                }, w = b.selectors = {
                    cacheLength: 50,
                    createPseudo: d,
                    match: oa,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function (a) {
                            return a[1] = a[1].replace(va, wa), a[3] = (a[3] || a[4] || a[5] || "").replace(va, wa), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                        },
                        CHILD: function (a) {
                            return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]), a
                        },
                        PSEUDO: function (a) {
                            var b, c = !a[6] && a[2];
                            return oa.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && ma.test(c) && (b = z(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function (a) {
                            var b = a.replace(va, wa).toLowerCase();
                            return "*" === a ? function () {
                                return !0
                            } : function (a) {
                                return a.nodeName && a.nodeName.toLowerCase() === b
                            }
                        },
                        CLASS: function (a) {
                            var b = R[a + " "];
                            return b || (b = new RegExp("(^|" + da + ")" + a + "(" + da + "|$)")) && R(a, function (a) {
                                return b.test("string" == typeof a.className && a.className || typeof a.getAttribute !== V && a.getAttribute("class") || "")
                            })
                        },
                        ATTR: function (a, c, d) {
                            return function (e) {
                                var f = b.attr(e, a);
                                return null == f ? "!=" === c : !c || (f += "", "=" === c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && f.indexOf(d) > -1 : "$=" === c ? d && f.slice(-d.length) === d : "~=" === c ? (" " + f + " ").indexOf(d) > -1 : "|=" === c && (f === d || f.slice(0, d.length + 1) === d + "-"))
                            }
                        },
                        CHILD: function (a, b, c, d, e) {
                            var f = "nth" !== a.slice(0, 3),
                                g = "last" !== a.slice(-4),
                                h = "of-type" === b;
                            return 1 === d && 0 === e ? function (a) {
                                return !!a.parentNode
                            } : function (b, c, i) {
                                var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
                                    q = b.parentNode,
                                    r = h && b.nodeName.toLowerCase(),
                                    s = !i && !h;
                                if (q) {
                                    if (f) {
                                        for (; p;) {
                                            for (l = b; l = l[p];)
                                                if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
                                            o = p = "only" === a && !o && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (o = [g ? q.firstChild : q.lastChild], g && s) {
                                        for (k = q[N] || (q[N] = {}), j = k[a] || [], n = j[0] === P && j[1], m = j[0] === P && j[2], l = n && q.childNodes[n]; l = ++n && l && l[p] || (m = n = 0) || o.pop();)
                                            if (1 === l.nodeType && ++m && l === b) {
                                                k[a] = [P, n, m];
                                                break
                                            }
                                    } else if (s && (j = (b[N] || (b[N] = {}))[a]) && j[0] === P) m = j[1];
                                    else
                                        for (;
                                            (l = ++n && l && l[p] || (m = n = 0) || o.pop()) && ((h ? l.nodeName.toLowerCase() !== r : 1 !== l.nodeType) || !++m || (s && ((l[N] || (l[N] = {}))[a] = [P, m]), l !== b)););
                                    return (m -= e) === d || m % d == 0 && m / d >= 0
                                }
                            }
                        },
                        PSEUDO: function (a, c) {
                            var e, f = w.pseudos[a] || w.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
                            return f[N] ? f(c) : f.length > 1 ? (e = [a, a, "", c], w.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function (a, b) {
                                for (var d, e = f(a, c), g = e.length; g--;) d = ba.call(a, e[g]), a[d] = !(b[d] = e[g])
                            }) : function (a) {
                                return f(a, 0, e)
                            }) : f
                        }
                    },
                    pseudos: {
                        not: d(function (a) {
                            var b = [],
                                c = [],
                                e = A(a.replace(ia, "$1"));
                            return e[N] ? d(function (a, b, c, d) {
                                for (var f, g = e(a, null, d, []), h = a.length; h--;)(f = g[h]) && (a[h] = !(b[h] = f))
                            }) : function (a, d, f) {
                                return b[0] = a, e(b, null, f, c), !c.pop()
                            }
                        }),
                        has: d(function (a) {
                            return function (c) {
                                return b(a, c).length > 0
                            }
                        }),
                        contains: d(function (a) {
                            return function (b) {
                                return (b.textContent || b.innerText || x(b)).indexOf(a) > -1
                            }
                        }),
                        lang: d(function (a) {
                            return na.test(a || "") || b.error("unsupported lang: " + a), a = a.replace(va, wa).toLowerCase(),
                                function (b) {
                                    var c;
                                    do {
                                        if (c = I ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return (c = c.toLowerCase()) === a || 0 === c.indexOf(a + "-")
                                    } while ((b = b.parentNode) && 1 === b.nodeType);
                                    return !1
                                }
                        }),
                        target: function (b) {
                            var c = a.location && a.location.hash;
                            return c && c.slice(1) === b.id
                        },
                        root: function (a) {
                            return a === H
                        },
                        focus: function (a) {
                            return a === G.activeElement && (!G.hasFocus || G.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                        },
                        enabled: function (a) {
                            return !1 === a.disabled
                        },
                        disabled: function (a) {
                            return !0 === a.disabled
                        },
                        checked: function (a) {
                            var b = a.nodeName.toLowerCase();
                            return "input" === b && !!a.checked || "option" === b && !!a.selected
                        },
                        selected: function (a) {
                            return a.parentNode && a.parentNode.selectedIndex, !0 === a.selected
                        },
                        empty: function (a) {
                            for (a = a.firstChild; a; a = a.nextSibling)
                                if (a.nodeType < 6) return !1;
                            return !0
                        },
                        parent: function (a) {
                            return !w.pseudos.empty(a)
                        },
                        header: function (a) {
                            return qa.test(a.nodeName)
                        },
                        input: function (a) {
                            return pa.test(a.nodeName)
                        },
                        button: function (a) {
                            var b = a.nodeName.toLowerCase();
                            return "input" === b && "button" === a.type || "button" === b
                        },
                        text: function (a) {
                            var b;
                            return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                        },
                        first: j(function () {
                            return [0]
                        }),
                        last: j(function (a, b) {
                            return [b - 1]
                        }),
                        eq: j(function (a, b, c) {
                            return [c < 0 ? c + b : c]
                        }),
                        even: j(function (a, b) {
                            for (var c = 0; c < b; c += 2) a.push(c);
                            return a
                        }),
                        odd: j(function (a, b) {
                            for (var c = 1; c < b; c += 2) a.push(c);
                            return a
                        }),
                        lt: j(function (a, b, c) {
                            for (var d = c < 0 ? c + b : c; --d >= 0;) a.push(d);
                            return a
                        }),
                        gt: j(function (a, b, c) {
                            for (var d = c < 0 ? c + b : c; ++d < b;) a.push(d);
                            return a
                        })
                    }
                }, w.pseudos.nth = w.pseudos.eq;
                for (u in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) w.pseudos[u] = h(u);
                for (u in {
                    submit: !0,
                    reset: !0
                }) w.pseudos[u] = i(u);
                return l.prototype = w.filters = w.pseudos, w.setFilters = new l, z = b.tokenize = function (a, c) {
                    var d, e, f, g, h, i, j, k = S[a + " "];
                    if (k) return c ? 0 : k.slice(0);
                    for (h = a, i = [], j = w.preFilter; h;) {
                        d && !(e = ja.exec(h)) || (e && (h = h.slice(e[0].length) || h), i.push(f = [])), d = !1, (e = ka.exec(h)) && (d = e.shift(), f.push({
                            value: d,
                            type: e[0].replace(ia, " ")
                        }), h = h.slice(d.length));
                        for (g in w.filter) !(e = oa[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(), f.push({
                            value: d,
                            type: g,
                            matches: e
                        }), h = h.slice(d.length));
                        if (!d) break
                    }
                    return c ? h.length : h ? b.error(a) : S(a, i).slice(0)
                }, A = b.compile = function (a, b) {
                    var c, d = [],
                        e = [],
                        f = T[a + " "];
                    if (!f) {
                        for (b || (b = z(a)), c = b.length; c--;) f = s(b[c]), f[N] ? d.push(f) : e.push(f);
                        f = T(a, t(e, d)), f.selector = a
                    }
                    return f
                }, B = b.select = function (a, b, c, d) {
                    var e, f, g, h, i, j = "function" == typeof a && a,
                        l = !d && z(a = j.selector || a);
                    if (c = c || [], 1 === l.length) {
                        if (f = l[0] = l[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && v.getById && 9 === b.nodeType && I && w.relative[f[1].type]) {
                            if (!(b = (w.find.ID(g.matches[0].replace(va, wa), b) || [])[0])) return c;
                            j && (b = b.parentNode), a = a.slice(f.shift().value.length)
                        }
                        for (e = oa.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e], !w.relative[h = g.type]);)
                            if ((i = w.find[h]) && (d = i(g.matches[0].replace(va, wa), ta.test(f[0].type) && k(b.parentNode) || b))) {
                                if (f.splice(e, 1), !(a = d.length && m(f))) return _.apply(c, d), c;
                                break
                            }
                    }
                    return (j || A(a, l))(d, b, !I, c, ta.test(a) && k(b.parentNode) || b), c
                }, v.sortStable = N.split("").sort(U).join("") === N, v.detectDuplicates = !!E, F(), v.sortDetached = e(function (a) {
                    return 1 & a.compareDocumentPosition(G.createElement("div"))
                }), e(function (a) {
                    return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
                }) || f("type|href|height|width", function (a, b, c) {
                    if (!c) return a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
                }), v.attributes && e(function (a) {
                    return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
                }) || f("value", function (a, b, c) {
                    if (!c && "input" === a.nodeName.toLowerCase()) return a.defaultValue
                }), e(function (a) {
                    return null == a.getAttribute("disabled")
                }) || f(ca, function (a, b, c) {
                    var d;
                    if (!c) return !0 === a[b] ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
                }), b
            }(a);
            _.find = ea, _.expr = ea.selectors, _.expr[":"] = _.expr.pseudos, _.unique = ea.uniqueSort, _.text = ea.getText, _.isXMLDoc = ea.isXML, _.contains = ea.contains;
            var fa = _.expr.match.needsContext,
                ga = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
                ha = /^.[^:#\[\.,]*$/;
            _.filter = function (a, b, c) {
                var d = b[0];
                return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? _.find.matchesSelector(d, a) ? [d] : [] : _.find.matches(a, _.grep(b, function (a) {
                    return 1 === a.nodeType
                }))
            }, _.fn.extend({
                find: function (a) {
                    var b, c = this.length,
                        d = [],
                        e = this;
                    if ("string" != typeof a) return this.pushStack(_(a).filter(function () {
                        for (b = 0; b < c; b++)
                            if (_.contains(e[b], this)) return !0
                    }));
                    for (b = 0; b < c; b++) _.find(a, e[b], d);
                    return d = this.pushStack(c > 1 ? _.unique(d) : d), d.selector = this.selector ? this.selector + " " + a : a, d
                },
                filter: function (a) {
                    return this.pushStack(d(this, a || [], !1))
                },
                not: function (a) {
                    return this.pushStack(d(this, a || [], !0))
                },
                is: function (a) {
                    return !!d(this, "string" == typeof a && fa.test(a) ? _(a) : a || [], !1).length
                }
            });
            var ia, ja = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
            (_.fn.init = function (a, b) {
                var c, d;
                if (!a) return this;
                if ("string" == typeof a) {
                    if (!(c = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : ja.exec(a)) || !c[1] && b) return !b || b.jquery ? (b || ia).find(a) : this.constructor(b).find(a);
                    if (c[1]) {
                        if (b = b instanceof _ ? b[0] : b, _.merge(this, _.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : Z, !0)), ga.test(c[1]) && _.isPlainObject(b))
                            for (c in b) _.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
                        return this
                    }
                    return d = Z.getElementById(c[2]), d && d.parentNode && (this.length = 1, this[0] = d), this.context = Z, this.selector = a, this
                }
                return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : _.isFunction(a) ? void 0 !== ia.ready ? ia.ready(a) : a(_) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), _.makeArray(a, this))
            }).prototype = _.fn, ia = _(Z);
            var ka = /^(?:parents|prev(?:Until|All))/,
                la = {
                    children: !0,
                    contents: !0,
                    next: !0,
                    prev: !0
                };
            _.extend({
                dir: function (a, b, c) {
                    for (var d = [], e = void 0 !== c;
                        (a = a[b]) && 9 !== a.nodeType;)
                        if (1 === a.nodeType) {
                            if (e && _(a).is(c)) break;
                            d.push(a)
                        } return d
                },
                sibling: function (a, b) {
                    for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
                    return c
                }
            }), _.fn.extend({
                has: function (a) {
                    var b = _(a, this),
                        c = b.length;
                    return this.filter(function () {
                        for (var a = 0; a < c; a++)
                            if (_.contains(this, b[a])) return !0
                    })
                },
                closest: function (a, b) {
                    for (var c, d = 0, e = this.length, f = [], g = fa.test(a) || "string" != typeof a ? _(a, b || this.context) : 0; d < e; d++)
                        for (c = this[d]; c && c !== b; c = c.parentNode)
                            if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && _.find.matchesSelector(c, a))) {
                                f.push(c);
                                break
                            } return this.pushStack(f.length > 1 ? _.unique(f) : f)
                },
                index: function (a) {
                    return a ? "string" == typeof a ? U.call(_(a), this[0]) : U.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                },
                add: function (a, b) {
                    return this.pushStack(_.unique(_.merge(this.get(), _(a, b))))
                },
                addBack: function (a) {
                    return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
                }
            }), _.each({
                parent: function (a) {
                    var b = a.parentNode;
                    return b && 11 !== b.nodeType ? b : null
                },
                parents: function (a) {
                    return _.dir(a, "parentNode")
                },
                parentsUntil: function (a, b, c) {
                    return _.dir(a, "parentNode", c)
                },
                next: function (a) {
                    return e(a, "nextSibling")
                },
                prev: function (a) {
                    return e(a, "previousSibling")
                },
                nextAll: function (a) {
                    return _.dir(a, "nextSibling")
                },
                prevAll: function (a) {
                    return _.dir(a, "previousSibling")
                },
                nextUntil: function (a, b, c) {
                    return _.dir(a, "nextSibling", c)
                },
                prevUntil: function (a, b, c) {
                    return _.dir(a, "previousSibling", c)
                },
                siblings: function (a) {
                    return _.sibling((a.parentNode || {}).firstChild, a)
                },
                children: function (a) {
                    return _.sibling(a.firstChild)
                },
                contents: function (a) {
                    return a.contentDocument || _.merge([], a.childNodes)
                }
            }, function (a, b) {
                _.fn[a] = function (c, d) {
                    var e = _.map(this, b, c);
                    return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = _.filter(d, e)), this.length > 1 && (la[a] || _.unique(e), ka.test(a) && e.reverse()), this.pushStack(e)
                }
            });
            var ma = /\S+/g,
                na = {};
            _.Callbacks = function (a) {
                a = "string" == typeof a ? na[a] || f(a) : _.extend({}, a);
                var b, c, d, e, g, h, i = [],
                    j = !a.once && [],
                    k = function (f) {
                        for (b = a.memory && f, c = !0, h = e || 0, e = 0, g = i.length, d = !0; i && h < g; h++)
                            if (!1 === i[h].apply(f[0], f[1]) && a.stopOnFalse) {
                                b = !1;
                                break
                            } d = !1, i && (j ? j.length && k(j.shift()) : b ? i = [] : l.disable())
                    },
                    l = {
                        add: function () {
                            if (i) {
                                var c = i.length;
                                ! function b(c) {
                                    _.each(c, function (c, d) {
                                        var e = _.type(d);
                                        "function" === e ? a.unique && l.has(d) || i.push(d) : d && d.length && "string" !== e && b(d)
                                    })
                                }(arguments), d ? g = i.length : b && (e = c, k(b))
                            }
                            return this
                        },
                        remove: function () {
                            return i && _.each(arguments, function (a, b) {
                                for (var c;
                                    (c = _.inArray(b, i, c)) > -1;) i.splice(c, 1), d && (c <= g && g--, c <= h && h--)
                            }), this
                        },
                        has: function (a) {
                            return a ? _.inArray(a, i) > -1 : !(!i || !i.length)
                        },
                        empty: function () {
                            return i = [], g = 0, this
                        },
                        disable: function () {
                            return i = j = b = void 0, this
                        },
                        disabled: function () {
                            return !i
                        },
                        lock: function () {
                            return j = void 0, b || l.disable(), this
                        },
                        locked: function () {
                            return !j
                        },
                        fireWith: function (a, b) {
                            return !i || c && !j || (b = b || [], b = [a, b.slice ? b.slice() : b], d ? j.push(b) : k(b)), this
                        },
                        fire: function () {
                            return l.fireWith(this, arguments), this
                        },
                        fired: function () {
                            return !!c
                        }
                    };
                return l
            }, _.extend({
                Deferred: function (a) {
                    var b = [
                        ["resolve", "done", _.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", _.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", _.Callbacks("memory")]
                    ],
                        c = "pending",
                        d = {
                            state: function () {
                                return c
                            },
                            always: function () {
                                return e.done(arguments).fail(arguments), this
                            },
                            then: function () {
                                var a = arguments;
                                return _.Deferred(function (c) {
                                    _.each(b, function (b, f) {
                                        var g = _.isFunction(a[b]) && a[b];
                                        e[f[1]](function () {
                                            var a = g && g.apply(this, arguments);
                                            a && _.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                                        })
                                    }), a = null
                                }).promise()
                            },
                            promise: function (a) {
                                return null != a ? _.extend(a, d) : d
                            }
                        },
                        e = {};
                    return d.pipe = d.then, _.each(b, function (a, f) {
                        var g = f[2],
                            h = f[3];
                        d[f[1]] = g.add, h && g.add(function () {
                            c = h
                        }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function () {
                            return e[f[0] + "With"](this === e ? d : this, arguments), this
                        }, e[f[0] + "With"] = g.fireWith
                    }), d.promise(e), a && a.call(e, e), e
                },
                when: function (a) {
                    var b, c, d, e = 0,
                        f = R.call(arguments),
                        g = f.length,
                        h = 1 !== g || a && _.isFunction(a.promise) ? g : 0,
                        i = 1 === h ? a : _.Deferred(),
                        j = function (a, c, d) {
                            return function (e) {
                                c[a] = this, d[a] = arguments.length > 1 ? R.call(arguments) : e, d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d)
                            }
                        };
                    if (g > 1)
                        for (b = new Array(g), c = new Array(g), d = new Array(g); e < g; e++) f[e] && _.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
                    return h || i.resolveWith(d, f), i.promise()
                }
            });
            var oa;
            _.fn.ready = function (a) {
                return _.ready.promise().done(a), this
            }, _.extend({
                isReady: !1,
                readyWait: 1,
                holdReady: function (a) {
                    a ? _.readyWait++ : _.ready(!0)
                },
                ready: function (a) {
                    (!0 === a ? --_.readyWait : _.isReady) || (_.isReady = !0, !0 !== a && --_.readyWait > 0 || (oa.resolveWith(Z, [_]), _.fn.triggerHandler && (_(Z).triggerHandler("ready"), _(Z).off("ready"))))
                }
            }), _.ready.promise = function (b) {
                return oa || (oa = _.Deferred(), "complete" === Z.readyState ? setTimeout(_.ready) : (Z.addEventListener("DOMContentLoaded", g, !1), a.addEventListener("load", g, !1))), oa.promise(b)
            }, _.ready.promise();
            var pa = _.access = function (a, b, c, d, e, f, g) {
                var h = 0,
                    i = a.length,
                    j = null == c;
                if ("object" === _.type(c)) {
                    e = !0;
                    for (h in c) _.access(a, b, h, c[h], !0, f, g)
                } else if (void 0 !== d && (e = !0, _.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function (a, b, c) {
                    return j.call(_(a), c)
                })), b))
                    for (; h < i; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
                return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
            };
            _.acceptData = function (a) {
                return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType
            }, h.uid = 1, h.accepts = _.acceptData, h.prototype = {
                key: function (a) {
                    if (!h.accepts(a)) return 0;
                    var b = {},
                        c = a[this.expando];
                    if (!c) {
                        c = h.uid++;
                        try {
                            b[this.expando] = {
                                value: c
                            }, Object.defineProperties(a, b)
                        } catch (d) {
                            b[this.expando] = c, _.extend(a, b)
                        }
                    }
                    return this.cache[c] || (this.cache[c] = {}), c
                },
                set: function (a, b, c) {
                    var d, e = this.key(a),
                        f = this.cache[e];
                    if ("string" == typeof b) f[b] = c;
                    else if (_.isEmptyObject(f)) _.extend(this.cache[e], b);
                    else
                        for (d in b) f[d] = b[d];
                    return f
                },
                get: function (a, b) {
                    var c = this.cache[this.key(a)];
                    return void 0 === b ? c : c[b]
                },
                access: function (a, b, c) {
                    var d;
                    return void 0 === b || b && "string" == typeof b && void 0 === c ? (d = this.get(a, b), void 0 !== d ? d : this.get(a, _.camelCase(b))) : (this.set(a, b, c), void 0 !== c ? c : b)
                },
                remove: function (a, b) {
                    var c, d, e, f = this.key(a),
                        g = this.cache[f];
                    if (void 0 === b) this.cache[f] = {};
                    else {
                        _.isArray(b) ? d = b.concat(b.map(_.camelCase)) : (e = _.camelCase(b), b in g ? d = [b, e] : (d = e, d = d in g ? [d] : d.match(ma) || [])), c = d.length;
                        for (; c--;) delete g[d[c]]
                    }
                },
                hasData: function (a) {
                    return !_.isEmptyObject(this.cache[a[this.expando]] || {})
                },
                discard: function (a) {
                    a[this.expando] && delete this.cache[a[this.expando]]
                }
            };
            var qa = new h,
                ra = new h,
                sa = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
                ta = /([A-Z])/g;
            _.extend({
                hasData: function (a) {
                    return ra.hasData(a) || qa.hasData(a)
                },
                data: function (a, b, c) {
                    return ra.access(a, b, c)
                },
                removeData: function (a, b) {
                    ra.remove(a, b)
                },
                _data: function (a, b, c) {
                    return qa.access(a, b, c)
                },
                _removeData: function (a, b) {
                    qa.remove(a, b)
                }
            }), _.fn.extend({
                data: function (a, b) {
                    var c, d, e, f = this[0],
                        g = f && f.attributes;
                    if (void 0 === a) {
                        if (this.length && (e = ra.get(f), 1 === f.nodeType && !qa.get(f, "hasDataAttrs"))) {
                            for (c = g.length; c--;) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = _.camelCase(d.slice(5)), i(f, d, e[d])));
                            qa.set(f, "hasDataAttrs", !0)
                        }
                        return e
                    }
                    return "object" == typeof a ? this.each(function () {
                        ra.set(this, a)
                    }) : pa(this, function (b) {
                        var c, d = _.camelCase(a);
                        if (f && void 0 === b) {
                            if (void 0 !== (c = ra.get(f, a))) return c;
                            if (void 0 !== (c = ra.get(f, d))) return c;
                            if (void 0 !== (c = i(f, d, void 0))) return c
                        } else this.each(function () {
                            var c = ra.get(this, d);
                            ra.set(this, d, b), -1 !== a.indexOf("-") && void 0 !== c && ra.set(this, a, b)
                        })
                    }, null, b, arguments.length > 1, null, !0)
                },
                removeData: function (a) {
                    return this.each(function () {
                        ra.remove(this, a)
                    })
                }
            }), _.extend({
                queue: function (a, b, c) {
                    var d;
                    if (a) return b = (b || "fx") + "queue", d = qa.get(a, b), c && (!d || _.isArray(c) ? d = qa.access(a, b, _.makeArray(c)) : d.push(c)), d || []
                },
                dequeue: function (a, b) {
                    b = b || "fx";
                    var c = _.queue(a, b),
                        d = c.length,
                        e = c.shift(),
                        f = _._queueHooks(a, b),
                        g = function () {
                            _.dequeue(a, b)
                        };
                    "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
                },
                _queueHooks: function (a, b) {
                    var c = b + "queueHooks";
                    return qa.get(a, c) || qa.access(a, c, {
                        empty: _.Callbacks("once memory").add(function () {
                            qa.remove(a, [b + "queue", c])
                        })
                    })
                }
            }), _.fn.extend({
                queue: function (a, b) {
                    var c = 2;
                    return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? _.queue(this[0], a) : void 0 === b ? this : this.each(function () {
                        var c = _.queue(this, a, b);
                        _._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && _.dequeue(this, a)
                    })
                },
                dequeue: function (a) {
                    return this.each(function () {
                        _.dequeue(this, a)
                    })
                },
                clearQueue: function (a) {
                    return this.queue(a || "fx", [])
                },
                promise: function (a, b) {
                    var c, d = 1,
                        e = _.Deferred(),
                        f = this,
                        g = this.length,
                        h = function () {
                            --d || e.resolveWith(f, [f])
                        };
                    for ("string" != typeof a && (b = a, a = void 0), a = a || "fx"; g--;)(c = qa.get(f[g], a + "queueHooks")) && c.empty && (d++, c.empty.add(h));
                    return h(), e.promise(b)
                }
            });
            var ua = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                va = ["Top", "Right", "Bottom", "Left"],
                wa = function (a, b) {
                    return a = b || a, "none" === _.css(a, "display") || !_.contains(a.ownerDocument, a)
                },
                xa = /^(?:checkbox|radio)$/i;
            ! function () {
                var a = Z.createDocumentFragment(),
                    b = a.appendChild(Z.createElement("div")),
                    c = Z.createElement("input");
                c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), b.appendChild(c), Y.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, b.innerHTML = "<textarea>x</textarea>", Y.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue
            }();
            var ya = "undefined";
            Y.focusinBubbles = "onfocusin" in a;
            var za = /^key/,
                Aa = /^(?:mouse|pointer|contextmenu)|click/,
                Ba = /^(?:focusinfocus|focusoutblur)$/,
                Ca = /^([^.]*)(?:\.(.+)|)$/;
            _.event = {
                global: {},
                add: function (a, b, c, d, e) {
                    var f, g, h, i, j, k, l, m, n, o, p, q = qa.get(a);
                    if (q)
                        for (c.handler && (f = c, c = f.handler, e = f.selector), c.guid || (c.guid = _.guid++), (i = q.events) || (i = q.events = {}), (g = q.handle) || (g = q.handle = function (b) {
                            return typeof _ !== ya && _.event.triggered !== b.type ? _.event.dispatch.apply(a, arguments) : void 0
                        }), b = (b || "").match(ma) || [""], j = b.length; j--;) h = Ca.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n && (l = _.event.special[n] || {}, n = (e ? l.delegateType : l.bindType) || n, l = _.event.special[n] || {}, k = _.extend({
                            type: n,
                            origType: p,
                            data: d,
                            handler: c,
                            guid: c.guid,
                            selector: e,
                            needsContext: e && _.expr.match.needsContext.test(e),
                            namespace: o.join(".")
                        }, f), (m = i[n]) || (m = i[n] = [], m.delegateCount = 0, l.setup && !1 !== l.setup.call(a, d, o, g) || a.addEventListener && a.addEventListener(n, g, !1)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), _.event.global[n] = !0)
                },
                remove: function (a, b, c, d, e) {
                    var f, g, h, i, j, k, l, m, n, o, p, q = qa.hasData(a) && qa.get(a);
                    if (q && (i = q.events)) {
                        for (b = (b || "").match(ma) || [""], j = b.length; j--;)
                            if (h = Ca.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
                                for (l = _.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = i[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length; f--;) k = m[f], !e && p !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
                                g && !m.length && (l.teardown && !1 !== l.teardown.call(a, o, q.handle) || _.removeEvent(a, n, q.handle), delete i[n])
                            } else
                                for (n in i) _.event.remove(a, n + b[j], c, d, !0);
                        _.isEmptyObject(i) && (delete q.handle, qa.remove(a, "events"))
                    }
                },
                trigger: function (b, c, d, e) {
                    var f, g, h, i, j, k, l, m = [d || Z],
                        n = X.call(b, "type") ? b.type : b,
                        o = X.call(b, "namespace") ? b.namespace.split(".") : [];
                    if (g = h = d = d || Z, 3 !== d.nodeType && 8 !== d.nodeType && !Ba.test(n + _.event.triggered) && (n.indexOf(".") >= 0 && (o = n.split("."), n = o.shift(), o.sort()), j = n.indexOf(":") < 0 && "on" + n, b = b[_.expando] ? b : new _.Event(n, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = o.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : _.makeArray(c, [b]), l = _.event.special[n] || {}, e || !l.trigger || !1 !== l.trigger.apply(d, c))) {
                        if (!e && !l.noBubble && !_.isWindow(d)) {
                            for (i = l.delegateType || n, Ba.test(i + n) || (g = g.parentNode); g; g = g.parentNode) m.push(g), h = g;
                            h === (d.ownerDocument || Z) && m.push(h.defaultView || h.parentWindow || a)
                        }
                        for (f = 0;
                            (g = m[f++]) && !b.isPropagationStopped();) b.type = f > 1 ? i : l.bindType || n, k = (qa.get(g, "events") || {})[b.type] && qa.get(g, "handle"), k && k.apply(g, c), (k = j && g[j]) && k.apply && _.acceptData(g) && (b.result = k.apply(g, c), !1 === b.result && b.preventDefault());
                        return b.type = n, e || b.isDefaultPrevented() || l._default && !1 !== l._default.apply(m.pop(), c) || !_.acceptData(d) || j && _.isFunction(d[n]) && !_.isWindow(d) && (h = d[j], h && (d[j] = null), _.event.triggered = n, d[n](), _.event.triggered = void 0, h && (d[j] = h)), b.result
                    }
                },
                dispatch: function (a) {
                    a = _.event.fix(a);
                    var b, c, d, e, f, g = [],
                        h = R.call(arguments),
                        i = (qa.get(this, "events") || {})[a.type] || [],
                        j = _.event.special[a.type] || {};
                    if (h[0] = a, a.delegateTarget = this, !j.preDispatch || !1 !== j.preDispatch.call(this, a)) {
                        for (g = _.event.handlers.call(this, a, i), b = 0;
                            (e = g[b++]) && !a.isPropagationStopped();)
                            for (a.currentTarget = e.elem, c = 0;
                                (f = e.handlers[c++]) && !a.isImmediatePropagationStopped();) a.namespace_re && !a.namespace_re.test(f.namespace) || (a.handleObj = f, a.data = f.data, void 0 !== (d = ((_.event.special[f.origType] || {}).handle || f.handler).apply(e.elem, h)) && !1 === (a.result = d) && (a.preventDefault(), a.stopPropagation()));
                        return j.postDispatch && j.postDispatch.call(this, a), a.result
                    }
                },
                handlers: function (a, b) {
                    var c, d, e, f, g = [],
                        h = b.delegateCount,
                        i = a.target;
                    if (h && i.nodeType && (!a.button || "click" !== a.type))
                        for (; i !== this; i = i.parentNode || this)
                            if (!0 !== i.disabled || "click" !== a.type) {
                                for (d = [], c = 0; c < h; c++) f = b[c], e = f.selector + " ", void 0 === d[e] && (d[e] = f.needsContext ? _(e, this).index(i) >= 0 : _.find(e, this, null, [i]).length), d[e] && d.push(f);
                                d.length && g.push({
                                    elem: i,
                                    handlers: d
                                })
                            } return h < b.length && g.push({
                                elem: this,
                                handlers: b.slice(h)
                            }), g
                },
                props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                fixHooks: {},
                keyHooks: {
                    props: "char charCode key keyCode".split(" "),
                    filter: function (a, b) {
                        return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
                    }
                },
                mouseHooks: {
                    props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                    filter: function (a, b) {
                        var c, d, e, f = b.button;
                        return null == a.pageX && null != b.clientX && (c = a.target.ownerDocument || Z, d = c.documentElement, e = c.body, a.pageX = b.clientX + (d && d.scrollLeft || e && e.scrollLeft || 0) - (d && d.clientLeft || e && e.clientLeft || 0), a.pageY = b.clientY + (d && d.scrollTop || e && e.scrollTop || 0) - (d && d.clientTop || e && e.clientTop || 0)), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a
                    }
                },
                fix: function (a) {
                    if (a[_.expando]) return a;
                    var b, c, d, e = a.type,
                        f = a,
                        g = this.fixHooks[e];
                    for (g || (this.fixHooks[e] = g = Aa.test(e) ? this.mouseHooks : za.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new _.Event(f), b = d.length; b--;) c = d[b], a[c] = f[c];
                    return a.target || (a.target = Z), 3 === a.target.nodeType && (a.target = a.target.parentNode), g.filter ? g.filter(a, f) : a
                },
                special: {
                    load: {
                        noBubble: !0
                    },
                    focus: {
                        trigger: function () {
                            if (this !== l() && this.focus) return this.focus(), !1
                        },
                        delegateType: "focusin"
                    },
                    blur: {
                        trigger: function () {
                            if (this === l() && this.blur) return this.blur(), !1
                        },
                        delegateType: "focusout"
                    },
                    click: {
                        trigger: function () {
                            if ("checkbox" === this.type && this.click && _.nodeName(this, "input")) return this.click(), !1
                        },
                        _default: function (a) {
                            return _.nodeName(a.target, "a")
                        }
                    },
                    beforeunload: {
                        postDispatch: function (a) {
                            void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
                        }
                    }
                },
                simulate: function (a, b, c, d) {
                    var e = _.extend(new _.Event, c, {
                        type: a,
                        isSimulated: !0,
                        originalEvent: {}
                    });
                    d ? _.event.trigger(e, null, b) : _.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
                }
            }, _.removeEvent = function (a, b, c) {
                a.removeEventListener && a.removeEventListener(b, c, !1)
            }, _.Event = function (a, b) {
                if (!(this instanceof _.Event)) return new _.Event(a, b);
                a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && !1 === a.returnValue ? j : k) : this.type = a, b && _.extend(this, b), this.timeStamp = a && a.timeStamp || _.now(), this[_.expando] = !0
            }, _.Event.prototype = {
                isDefaultPrevented: k,
                isPropagationStopped: k,
                isImmediatePropagationStopped: k,
                preventDefault: function () {
                    var a = this.originalEvent;
                    this.isDefaultPrevented = j, a && a.preventDefault && a.preventDefault()
                },
                stopPropagation: function () {
                    var a = this.originalEvent;
                    this.isPropagationStopped = j, a && a.stopPropagation && a.stopPropagation()
                },
                stopImmediatePropagation: function () {
                    var a = this.originalEvent;
                    this.isImmediatePropagationStopped = j, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation()
                }
            }, _.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout"
            }, function (a, b) {
                _.event.special[a] = {
                    delegateType: b,
                    bindType: b,
                    handle: function (a) {
                        var c, d = this,
                            e = a.relatedTarget,
                            f = a.handleObj;
                        return e && (e === d || _.contains(d, e)) || (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
                    }
                }
            }), Y.focusinBubbles || _.each({
                focus: "focusin",
                blur: "focusout"
            }, function (a, b) {
                var c = function (a) {
                    _.event.simulate(b, a.target, _.event.fix(a), !0)
                };
                _.event.special[b] = {
                    setup: function () {
                        var d = this.ownerDocument || this,
                            e = qa.access(d, b);
                        e || d.addEventListener(a, c, !0), qa.access(d, b, (e || 0) + 1)
                    },
                    teardown: function () {
                        var d = this.ownerDocument || this,
                            e = qa.access(d, b) - 1;
                        e ? qa.access(d, b, e) : (d.removeEventListener(a, c, !0), qa.remove(d, b))
                    }
                }
            }), _.fn.extend({
                on: function (a, b, c, d, e) {
                    var f, g;
                    if ("object" == typeof a) {
                        "string" != typeof b && (c = c || b, b = void 0);
                        for (g in a) this.on(g, b, c, a[g], e);
                        return this
                    }
                    if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), !1 === d) d = k;
                    else if (!d) return this;
                    return 1 === e && (f = d, d = function (a) {
                        return _().off(a), f.apply(this, arguments)
                    }, d.guid = f.guid || (f.guid = _.guid++)), this.each(function () {
                        _.event.add(this, a, d, c, b)
                    })
                },
                one: function (a, b, c, d) {
                    return this.on(a, b, c, d, 1)
                },
                off: function (a, b, c) {
                    var d, e;
                    if (a && a.preventDefault && a.handleObj) return d = a.handleObj, _(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
                    if ("object" == typeof a) {
                        for (e in a) this.off(e, b, a[e]);
                        return this
                    }
                    return !1 !== b && "function" != typeof b || (c = b, b = void 0), !1 === c && (c = k), this.each(function () {
                        _.event.remove(this, a, c, b)
                    })
                },
                trigger: function (a, b) {
                    return this.each(function () {
                        _.event.trigger(a, b, this)
                    })
                },
                triggerHandler: function (a, b) {
                    var c = this[0];
                    if (c) return _.event.trigger(a, b, c, !0)
                }
            });
            var Da = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
                Ea = /<([\w:]+)/,
                Fa = /<|&#?\w+;/,
                Ga = /<(?:script|style|link)/i,
                Ha = /checked\s*(?:[^=]|=\s*.checked.)/i,
                Ia = /^$|\/(?:java|ecma)script/i,
                Ja = /^true\/(.*)/,
                Ka = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
                La = {
                    option: [1, "<select multiple='multiple'>", "</select>"],
                    thead: [1, "<table>", "</table>"],
                    col: [2, "<table><colgroup>", "</colgroup></table>"],
                    tr: [2, "<table><tbody>", "</tbody></table>"],
                    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                    _default: [0, "", ""]
                };
            La.optgroup = La.option, La.tbody = La.tfoot = La.colgroup = La.caption = La.thead, La.th = La.td, _.extend({
                clone: function (a, b, c) {
                    var d, e, f, g, h = a.cloneNode(!0),
                        i = _.contains(a.ownerDocument, a);
                    if (!(Y.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || _.isXMLDoc(a)))
                        for (g = r(h), f = r(a), d = 0, e = f.length; d < e; d++) s(f[d], g[d]);
                    if (b)
                        if (c)
                            for (f = f || r(a), g = g || r(h), d = 0, e = f.length; d < e; d++) q(f[d], g[d]);
                        else q(a, h);
                    return g = r(h, "script"), g.length > 0 && p(g, !i && r(a, "script")), h
                },
                buildFragment: function (a, b, c, d) {
                    for (var e, f, g, h, i, j, k = b.createDocumentFragment(), l = [], m = 0, n = a.length; m < n; m++)
                        if ((e = a[m]) || 0 === e)
                            if ("object" === _.type(e)) _.merge(l, e.nodeType ? [e] : e);
                            else if (Fa.test(e)) {
                                for (f = f || k.appendChild(b.createElement("div")), g = (Ea.exec(e) || ["", ""])[1].toLowerCase(), h = La[g] || La._default, f.innerHTML = h[1] + e.replace(Da, "<$1></$2>") + h[2], j = h[0]; j--;) f = f.lastChild;
                                _.merge(l, f.childNodes), f = k.firstChild, f.textContent = ""
                            } else l.push(b.createTextNode(e));
                    for (k.textContent = "", m = 0; e = l[m++];)
                        if ((!d || -1 === _.inArray(e, d)) && (i = _.contains(e.ownerDocument, e), f = r(k.appendChild(e), "script"), i && p(f), c))
                            for (j = 0; e = f[j++];) Ia.test(e.type || "") && c.push(e);
                    return k
                },
                cleanData: function (a) {
                    for (var b, c, d, e, f = _.event.special, g = 0; void 0 !== (c = a[g]); g++) {
                        if (_.acceptData(c) && (e = c[qa.expando]) && (b = qa.cache[e])) {
                            if (b.events)
                                for (d in b.events) f[d] ? _.event.remove(c, d) : _.removeEvent(c, d, b.handle);
                            qa.cache[e] && delete qa.cache[e]
                        }
                        delete ra.cache[c[ra.expando]]
                    }
                }
            }), _.fn.extend({
                text: function (a) {
                    return pa(this, function (a) {
                        return void 0 === a ? _.text(this) : this.empty().each(function () {
                            1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = a)
                        })
                    }, null, a, arguments.length)
                },
                append: function () {
                    return this.domManip(arguments, function (a) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            m(this, a).appendChild(a)
                        }
                    })
                },
                prepend: function () {
                    return this.domManip(arguments, function (a) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var b = m(this, a);
                            b.insertBefore(a, b.firstChild)
                        }
                    })
                },
                before: function () {
                    return this.domManip(arguments, function (a) {
                        this.parentNode && this.parentNode.insertBefore(a, this)
                    })
                },
                after: function () {
                    return this.domManip(arguments, function (a) {
                        this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
                    })
                },
                remove: function (a, b) {
                    for (var c, d = a ? _.filter(a, this) : this, e = 0; null != (c = d[e]); e++) b || 1 !== c.nodeType || _.cleanData(r(c)), c.parentNode && (b && _.contains(c.ownerDocument, c) && p(r(c, "script")), c.parentNode.removeChild(c));
                    return this
                },
                empty: function () {
                    for (var a, b = 0; null != (a = this[b]); b++) 1 === a.nodeType && (_.cleanData(r(a, !1)), a.textContent = "");
                    return this
                },
                clone: function (a, b) {
                    return a = null != a && a, b = null == b ? a : b, this.map(function () {
                        return _.clone(this, a, b)
                    })
                },
                html: function (a) {
                    return pa(this, function (a) {
                        var b = this[0] || {},
                            c = 0,
                            d = this.length;
                        if (void 0 === a && 1 === b.nodeType) return b.innerHTML;
                        if ("string" == typeof a && !Ga.test(a) && !La[(Ea.exec(a) || ["", ""])[1].toLowerCase()]) {
                            a = a.replace(Da, "<$1></$2>");
                            try {
                                for (; c < d; c++) b = this[c] || {}, 1 === b.nodeType && (_.cleanData(r(b, !1)), b.innerHTML = a);
                                b = 0
                            } catch (a) { }
                        }
                        b && this.empty().append(a)
                    }, null, a, arguments.length)
                },
                replaceWith: function () {
                    var a = arguments[0];
                    return this.domManip(arguments, function (b) {
                        a = this.parentNode, _.cleanData(r(this)), a && a.replaceChild(b, this)
                    }), a && (a.length || a.nodeType) ? this : this.remove()
                },
                detach: function (a) {
                    return this.remove(a, !0)
                },
                domManip: function (a, b) {
                    a = S.apply([], a);
                    var c, d, e, f, g, h, i = 0,
                        j = this.length,
                        k = this,
                        l = j - 1,
                        m = a[0],
                        p = _.isFunction(m);
                    if (p || j > 1 && "string" == typeof m && !Y.checkClone && Ha.test(m)) return this.each(function (c) {
                        var d = k.eq(c);
                        p && (a[0] = m.call(this, c, d.html())), d.domManip(a, b)
                    });
                    if (j && (c = _.buildFragment(a, this[0].ownerDocument, !1, this), d = c.firstChild, 1 === c.childNodes.length && (c = d), d)) {
                        for (e = _.map(r(c, "script"), n), f = e.length; i < j; i++) g = c, i !== l && (g = _.clone(g, !0, !0), f && _.merge(e, r(g, "script"))), b.call(this[i], g, i);
                        if (f)
                            for (h = e[e.length - 1].ownerDocument, _.map(e, o), i = 0; i < f; i++) g = e[i], Ia.test(g.type || "") && !qa.access(g, "globalEval") && _.contains(h, g) && (g.src ? _._evalUrl && _._evalUrl(g.src) : _.globalEval(g.textContent.replace(Ka, "")))
                    }
                    return this
                }
            }), _.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            }, function (a, b) {
                _.fn[a] = function (a) {
                    for (var c, d = [], e = _(a), f = e.length - 1, g = 0; g <= f; g++) c = g === f ? this : this.clone(!0), _(e[g])[b](c), T.apply(d, c.get());
                    return this.pushStack(d)
                }
            });
            var Ma, Na = {},
                Oa = /^margin/,
                Pa = new RegExp("^(" + ua + ")(?!px)[a-z%]+$", "i"),
                Qa = function (a) {
                    return a.ownerDocument.defaultView.getComputedStyle(a, null)
                };
            ! function () {
                function b() {
                    g.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", g.innerHTML = "", e.appendChild(f);
                    var b = a.getComputedStyle(g, null);
                    c = "1%" !== b.top, d = "4px" === b.width, e.removeChild(f)
                }
                var c, d, e = Z.documentElement,
                    f = Z.createElement("div"),
                    g = Z.createElement("div");
                g.style && (g.style.backgroundClip = "content-box", g.cloneNode(!0).style.backgroundClip = "", Y.clearCloneStyle = "content-box" === g.style.backgroundClip, f.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", f.appendChild(g), a.getComputedStyle && _.extend(Y, {
                    pixelPosition: function () {
                        return b(), c
                    },
                    boxSizingReliable: function () {
                        return null == d && b(), d
                    },
                    reliableMarginRight: function () {
                        var b, c = g.appendChild(Z.createElement("div"));
                        return c.style.cssText = g.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", c.style.marginRight = c.style.width = "0", g.style.width = "1px", e.appendChild(f), b = !parseFloat(a.getComputedStyle(c, null).marginRight), e.removeChild(f), b
                    }
                }))
            }(), _.swap = function (a, b, c, d) {
                var e, f, g = {};
                for (f in b) g[f] = a.style[f], a.style[f] = b[f];
                e = c.apply(a, d || []);
                for (f in b) a.style[f] = g[f];
                return e
            };
            var Ra = /^(none|table(?!-c[ea]).+)/,
                Sa = new RegExp("^(" + ua + ")(.*)$", "i"),
                Ta = new RegExp("^([+-])=(" + ua + ")", "i"),
                Ua = {
                    position: "absolute",
                    visibility: "hidden",
                    display: "block"
                },
                Va = {
                    letterSpacing: "0",
                    fontWeight: "400"
                },
                Wa = ["Webkit", "O", "Moz", "ms"];
            _.extend({
                cssHooks: {
                    opacity: {
                        get: function (a, b) {
                            if (b) {
                                var c = v(a, "opacity");
                                return "" === c ? "1" : c
                            }
                        }
                    }
                },
                cssNumber: {
                    columnCount: !0,
                    fillOpacity: !0,
                    flexGrow: !0,
                    flexShrink: !0,
                    fontWeight: !0,
                    lineHeight: !0,
                    opacity: !0,
                    order: !0,
                    orphans: !0,
                    widows: !0,
                    zIndex: !0,
                    zoom: !0
                },
                cssProps: {
                    float: "cssFloat"
                },
                style: function (a, b, c, d) {
                    if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                        var e, f, g, h = _.camelCase(b),
                            i = a.style;
                        if (b = _.cssProps[h] || (_.cssProps[h] = x(i, h)), g = _.cssHooks[b] || _.cssHooks[h], void 0 === c) return g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
                        f = typeof c, "string" === f && (e = Ta.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(_.css(a, b)), f = "number"), null != c && c === c && ("number" !== f || _.cssNumber[h] || (c += "px"), Y.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i[b] = c))
                    }
                },
                css: function (a, b, c, d) {
                    var e, f, g, h = _.camelCase(b);
                    return b = _.cssProps[h] || (_.cssProps[h] = x(a.style, h)), g = _.cssHooks[b] || _.cssHooks[h], g && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = v(a, b, d)), "normal" === e && b in Va && (e = Va[b]), "" === c || c ? (f = parseFloat(e), !0 === c || _.isNumeric(f) ? f || 0 : e) : e
                }
            }), _.each(["height", "width"], function (a, b) {
                _.cssHooks[b] = {
                    get: function (a, c, d) {
                        if (c) return Ra.test(_.css(a, "display")) && 0 === a.offsetWidth ? _.swap(a, Ua, function () {
                            return A(a, b, d)
                        }) : A(a, b, d)
                    },
                    set: function (a, c, d) {
                        var e = d && Qa(a);
                        return y(a, c, d ? z(a, b, d, "border-box" === _.css(a, "boxSizing", !1, e), e) : 0)
                    }
                }
            }), _.cssHooks.marginRight = w(Y.reliableMarginRight, function (a, b) {
                if (b) return _.swap(a, {
                    display: "inline-block"
                }, v, [a, "marginRight"])
            }), _.each({
                margin: "",
                padding: "",
                border: "Width"
            }, function (a, b) {
                _.cssHooks[a + b] = {
                    expand: function (c) {
                        for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; d < 4; d++) e[a + va[d] + b] = f[d] || f[d - 2] || f[0];
                        return e
                    }
                }, Oa.test(a) || (_.cssHooks[a + b].set = y)
            }), _.fn.extend({
                css: function (a, b) {
                    return pa(this, function (a, b, c) {
                        var d, e, f = {},
                            g = 0;
                        if (_.isArray(b)) {
                            for (d = Qa(a), e = b.length; g < e; g++) f[b[g]] = _.css(a, b[g], !1, d);
                            return f
                        }
                        return void 0 !== c ? _.style(a, b, c) : _.css(a, b)
                    }, a, b, arguments.length > 1)
                },
                show: function () {
                    return B(this, !0)
                },
                hide: function () {
                    return B(this)
                },
                toggle: function (a) {
                    return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function () {
                        wa(this) ? _(this).show() : _(this).hide()
                    })
                }
            }), _.Tween = C, C.prototype = {
                constructor: C,
                init: function (a, b, c, d, e, f) {
                    this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (_.cssNumber[c] ? "" : "px")
                },
                cur: function () {
                    var a = C.propHooks[this.prop];
                    return a && a.get ? a.get(this) : C.propHooks._default.get(this)
                },
                run: function (a) {
                    var b, c = C.propHooks[this.prop];
                    return this.options.duration ? this.pos = b = _.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : C.propHooks._default.set(this), this
                }
            }, C.prototype.init.prototype = C.prototype, C.propHooks = {
                _default: {
                    get: function (a) {
                        var b;
                        return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = _.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
                    },
                    set: function (a) {
                        _.fx.step[a.prop] ? _.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[_.cssProps[a.prop]] || _.cssHooks[a.prop]) ? _.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
                    }
                }
            }, C.propHooks.scrollTop = C.propHooks.scrollLeft = {
                set: function (a) {
                    a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
                }
            }, _.easing = {
                linear: function (a) {
                    return a
                },
                swing: function (a) {
                    return .5 - Math.cos(a * Math.PI) / 2
                }
            }, _.fx = C.prototype.init, _.fx.step = {};
            var Xa, Ya, Za = /^(?:toggle|show|hide)$/,
                $a = new RegExp("^(?:([+-])=|)(" + ua + ")([a-z%]*)$", "i"),
                _a = /queueHooks$/,
                ab = [G],
                bb = {
                    "*": [function (a, b) {
                        var c = this.createTween(a, b),
                            d = c.cur(),
                            e = $a.exec(b),
                            f = e && e[3] || (_.cssNumber[a] ? "" : "px"),
                            g = (_.cssNumber[a] || "px" !== f && +d) && $a.exec(_.css(c.elem, a)),
                            h = 1,
                            i = 20;
                        if (g && g[3] !== f) {
                            f = f || g[3], e = e || [], g = +d || 1;
                            do {
                                h = h || ".5", g /= h, _.style(c.elem, a, g + f)
                            } while (h !== (h = c.cur() / d) && 1 !== h && --i)
                        }
                        return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c
                    }]
                };
            _.Animation = _.extend(I, {
                tweener: function (a, b) {
                    _.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
                    for (var c, d = 0, e = a.length; d < e; d++) c = a[d], bb[c] = bb[c] || [], bb[c].unshift(b)
                },
                prefilter: function (a, b) {
                    b ? ab.unshift(a) : ab.push(a)
                }
            }), _.speed = function (a, b, c) {
                var d = a && "object" == typeof a ? _.extend({}, a) : {
                    complete: c || !c && b || _.isFunction(a) && a,
                    duration: a,
                    easing: c && b || b && !_.isFunction(b) && b
                };
                return d.duration = _.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in _.fx.speeds ? _.fx.speeds[d.duration] : _.fx.speeds._default, null != d.queue && !0 !== d.queue || (d.queue = "fx"), d.old = d.complete, d.complete = function () {
                    _.isFunction(d.old) && d.old.call(this), d.queue && _.dequeue(this, d.queue)
                }, d
            }, _.fn.extend({
                fadeTo: function (a, b, c, d) {
                    return this.filter(wa).css("opacity", 0).show().end().animate({
                        opacity: b
                    }, a, c, d)
                },
                animate: function (a, b, c, d) {
                    var e = _.isEmptyObject(a),
                        f = _.speed(b, c, d),
                        g = function () {
                            var b = I(this, _.extend({}, a), f);
                            (e || qa.get(this, "finish")) && b.stop(!0)
                        };
                    return g.finish = g, e || !1 === f.queue ? this.each(g) : this.queue(f.queue, g)
                },
                stop: function (a, b, c) {
                    var d = function (a) {
                        var b = a.stop;
                        delete a.stop, b(c)
                    };
                    return "string" != typeof a && (c = b, b = a, a = void 0), b && !1 !== a && this.queue(a || "fx", []), this.each(function () {
                        var b = !0,
                            e = null != a && a + "queueHooks",
                            f = _.timers,
                            g = qa.get(this);
                        if (e) g[e] && g[e].stop && d(g[e]);
                        else
                            for (e in g) g[e] && g[e].stop && _a.test(e) && d(g[e]);
                        for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
                        !b && c || _.dequeue(this, a)
                    })
                },
                finish: function (a) {
                    return !1 !== a && (a = a || "fx"), this.each(function () {
                        var b, c = qa.get(this),
                            d = c[a + "queue"],
                            e = c[a + "queueHooks"],
                            f = _.timers,
                            g = d ? d.length : 0;
                        for (c.finish = !0, _.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                        for (b = 0; b < g; b++) d[b] && d[b].finish && d[b].finish.call(this);
                        delete c.finish
                    })
                }
            }), _.each(["toggle", "show", "hide"], function (a, b) {
                var c = _.fn[b];
                _.fn[b] = function (a, d, e) {
                    return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(E(b, !0), a, d, e)
                }
            }), _.each({
                slideDown: E("show"),
                slideUp: E("hide"),
                slideToggle: E("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, function (a, b) {
                _.fn[a] = function (a, c, d) {
                    return this.animate(b, a, c, d)
                }
            }), _.timers = [], _.fx.tick = function () {
                var a, b = 0,
                    c = _.timers;
                for (Xa = _.now(); b < c.length; b++)(a = c[b])() || c[b] !== a || c.splice(b--, 1);
                c.length || _.fx.stop(), Xa = void 0
            }, _.fx.timer = function (a) {
                _.timers.push(a), a() ? _.fx.start() : _.timers.pop()
            }, _.fx.interval = 13, _.fx.start = function () {
                Ya || (Ya = setInterval(_.fx.tick, _.fx.interval))
            }, _.fx.stop = function () {
                clearInterval(Ya), Ya = null
            }, _.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            }, _.fn.delay = function (a, b) {
                return a = _.fx ? _.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function (b, c) {
                    var d = setTimeout(b, a);
                    c.stop = function () {
                        clearTimeout(d)
                    }
                })
            },
                function () {
                    var a = Z.createElement("input"),
                        b = Z.createElement("select"),
                        c = b.appendChild(Z.createElement("option"));
                    a.type = "checkbox", Y.checkOn = "" !== a.value, Y.optSelected = c.selected, b.disabled = !0, Y.optDisabled = !c.disabled, a = Z.createElement("input"), a.value = "t", a.type = "radio", Y.radioValue = "t" === a.value
                }();
            var cb, db, eb = _.expr.attrHandle;
            _.fn.extend({
                attr: function (a, b) {
                    return pa(this, _.attr, a, b, arguments.length > 1)
                },
                removeAttr: function (a) {
                    return this.each(function () {
                        _.removeAttr(this, a)
                    })
                }
            }), _.extend({
                attr: function (a, b, c) {
                    var d, e, f = a.nodeType;
                    if (a && 3 !== f && 8 !== f && 2 !== f) return typeof a.getAttribute === ya ? _.prop(a, b, c) : (1 === f && _.isXMLDoc(a) || (b = b.toLowerCase(), d = _.attrHooks[b] || (_.expr.match.bool.test(b) ? db : cb)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = _.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), c) : void _.removeAttr(a, b))
                },
                removeAttr: function (a, b) {
                    var c, d, e = 0,
                        f = b && b.match(ma);
                    if (f && 1 === a.nodeType)
                        for (; c = f[e++];) d = _.propFix[c] || c, _.expr.match.bool.test(c) && (a[d] = !1), a.removeAttribute(c)
                },
                attrHooks: {
                    type: {
                        set: function (a, b) {
                            if (!Y.radioValue && "radio" === b && _.nodeName(a, "input")) {
                                var c = a.value;
                                return a.setAttribute("type", b), c && (a.value = c), b
                            }
                        }
                    }
                }
            }), db = {
                set: function (a, b, c) {
                    return !1 === b ? _.removeAttr(a, c) : a.setAttribute(c, c), c
                }
            }, _.each(_.expr.match.bool.source.match(/\w+/g), function (a, b) {
                var c = eb[b] || _.find.attr;
                eb[b] = function (a, b, d) {
                    var e, f;
                    return d || (f = eb[b], eb[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, eb[b] = f), e
                }
            });
            var fb = /^(?:input|select|textarea|button)$/i;
            _.fn.extend({
                prop: function (a, b) {
                    return pa(this, _.prop, a, b, arguments.length > 1)
                },
                removeProp: function (a) {
                    return this.each(function () {
                        delete this[_.propFix[a] || a]
                    })
                }
            }), _.extend({
                propFix: {
                    for: "htmlFor",
                    class: "className"
                },
                prop: function (a, b, c) {
                    var d, e, f, g = a.nodeType;
                    if (a && 3 !== g && 8 !== g && 2 !== g) return f = 1 !== g || !_.isXMLDoc(a), f && (b = _.propFix[b] || b, e = _.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
                },
                propHooks: {
                    tabIndex: {
                        get: function (a) {
                            return a.hasAttribute("tabindex") || fb.test(a.nodeName) || a.href ? a.tabIndex : -1
                        }
                    }
                }
            }), Y.optSelected || (_.propHooks.selected = {
                get: function (a) {
                    var b = a.parentNode;
                    return b && b.parentNode && b.parentNode.selectedIndex, null
                }
            }), _.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
                _.propFix[this.toLowerCase()] = this
            });
            var gb = /[\t\r\n\f]/g;
            _.fn.extend({
                addClass: function (a) {
                    var b, c, d, e, f, g, h = "string" == typeof a && a,
                        i = 0,
                        j = this.length;
                    if (_.isFunction(a)) return this.each(function (b) {
                        _(this).addClass(a.call(this, b, this.className))
                    });
                    if (h)
                        for (b = (a || "").match(ma) || []; i < j; i++)
                            if (c = this[i], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(gb, " ") : " ")) {
                                for (f = 0; e = b[f++];) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                                g = _.trim(d), c.className !== g && (c.className = g)
                            } return this
                },
                removeClass: function (a) {
                    var b, c, d, e, f, g, h = 0 === arguments.length || "string" == typeof a && a,
                        i = 0,
                        j = this.length;
                    if (_.isFunction(a)) return this.each(function (b) {
                        _(this).removeClass(a.call(this, b, this.className))
                    });
                    if (h)
                        for (b = (a || "").match(ma) || []; i < j; i++)
                            if (c = this[i], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(gb, " ") : "")) {
                                for (f = 0; e = b[f++];)
                                    for (; d.indexOf(" " + e + " ") >= 0;) d = d.replace(" " + e + " ", " ");
                                g = a ? _.trim(d) : "", c.className !== g && (c.className = g)
                            } return this
                },
                toggleClass: function (a, b) {
                    var c = typeof a;
                    return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : _.isFunction(a) ? this.each(function (c) {
                        _(this).toggleClass(a.call(this, c, this.className, b), b)
                    }) : this.each(function () {
                        if ("string" === c)
                            for (var b, d = 0, e = _(this), f = a.match(ma) || []; b = f[d++];) e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
                        else c !== ya && "boolean" !== c || (this.className && qa.set(this, "__className__", this.className), this.className = this.className || !1 === a ? "" : qa.get(this, "__className__") || "")
                    })
                },
                hasClass: function (a) {
                    for (var b = " " + a + " ", c = 0, d = this.length; c < d; c++)
                        if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(gb, " ").indexOf(b) >= 0) return !0;
                    return !1
                }
            });
            var hb = /\r/g;
            _.fn.extend({
                val: function (a) {
                    var b, c, d, e = this[0]; {
                        if (arguments.length) return d = _.isFunction(a), this.each(function (c) {
                            var e;
                            1 === this.nodeType && (e = d ? a.call(this, c, _(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : _.isArray(e) && (e = _.map(e, function (a) {
                                return null == a ? "" : a + ""
                            })), (b = _.valHooks[this.type] || _.valHooks[this.nodeName.toLowerCase()]) && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
                        });
                        if (e) return (b = _.valHooks[e.type] || _.valHooks[e.nodeName.toLowerCase()]) && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(hb, "") : null == c ? "" : c)
                    }
                }
            }), _.extend({
                valHooks: {
                    option: {
                        get: function (a) {
                            var b = _.find.attr(a, "value");
                            return null != b ? b : _.trim(_.text(a))
                        }
                    },
                    select: {
                        get: function (a) {
                            for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || e < 0, g = f ? null : [], h = f ? e + 1 : d.length, i = e < 0 ? h : f ? e : 0; i < h; i++)
                                if (c = d[i], (c.selected || i === e) && (Y.optDisabled ? !c.disabled : null === c.getAttribute("disabled")) && (!c.parentNode.disabled || !_.nodeName(c.parentNode, "optgroup"))) {
                                    if (b = _(c).val(), f) return b;
                                    g.push(b)
                                } return g
                        },
                        set: function (a, b) {
                            for (var c, d, e = a.options, f = _.makeArray(b), g = e.length; g--;) d = e[g], (d.selected = _.inArray(d.value, f) >= 0) && (c = !0);
                            return c || (a.selectedIndex = -1), f
                        }
                    }
                }
            }), _.each(["radio", "checkbox"], function () {
                _.valHooks[this] = {
                    set: function (a, b) {
                        if (_.isArray(b)) return a.checked = _.inArray(_(a).val(), b) >= 0
                    }
                }, Y.checkOn || (_.valHooks[this].get = function (a) {
                    return null === a.getAttribute("value") ? "on" : a.value
                })
            }), _.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
                _.fn[b] = function (a, c) {
                    return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
                }
            }), _.fn.extend({
                hover: function (a, b) {
                    return this.mouseenter(a).mouseleave(b || a)
                },
                bind: function (a, b, c) {
                    return this.on(a, null, b, c)
                },
                unbind: function (a, b) {
                    return this.off(a, null, b)
                },
                delegate: function (a, b, c, d) {
                    return this.on(b, a, c, d)
                },
                undelegate: function (a, b, c) {
                    return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
                }
            });
            var ib = _.now(),
                jb = /\?/;
            _.parseJSON = function (a) {
                return JSON.parse(a + "")
            }, _.parseXML = function (a) {
                var b, c;
                if (!a || "string" != typeof a) return null;
                try {
                    c = new DOMParser, b = c.parseFromString(a, "text/xml")
                } catch (a) {
                    b = void 0
                }
                return b && !b.getElementsByTagName("parsererror").length || _.error("Invalid XML: " + a), b
            };
            var kb, lb, mb = /#.*$/,
                nb = /([?&])_=[^&]*/,
                ob = /^(.*?):[ \t]*([^\r\n]*)$/gm,
                pb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
                qb = /^(?:GET|HEAD)$/,
                rb = /^\/\//,
                sb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
                tb = {},
                ub = {},
                vb = "*/".concat("*");
            try {
                lb = location.href
            } catch (a) {
                lb = Z.createElement("a"), lb.href = "", lb = lb.href
            }
            kb = sb.exec(lb.toLowerCase()) || [], _.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: lb,
                    type: "GET",
                    isLocal: pb.test(kb[1]),
                    global: !0,
                    processData: !0,
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: {
                        "*": vb,
                        text: "text/plain",
                        html: "text/html",
                        xml: "application/xml, text/xml",
                        json: "application/json, text/javascript"
                    },
                    contents: {
                        xml: /xml/,
                        html: /html/,
                        json: /json/
                    },
                    responseFields: {
                        xml: "responseXML",
                        text: "responseText",
                        json: "responseJSON"
                    },
                    converters: {
                        "* text": String,
                        "text html": !0,
                        "text json": _.parseJSON,
                        "text xml": _.parseXML
                    },
                    flatOptions: {
                        url: !0,
                        context: !0
                    }
                },
                ajaxSetup: function (a, b) {
                    return b ? L(L(a, _.ajaxSettings), b) : L(_.ajaxSettings, a)
                },
                ajaxPrefilter: J(tb),
                ajaxTransport: J(ub),
                ajax: function (a, b) {
                    function c(a, b, c, g) {
                        var i, k, r, s, u, w = b;
                        2 !== t && (t = 2, h && clearTimeout(h), d = void 0, f = g || "", v.readyState = a > 0 ? 4 : 0, i = a >= 200 && a < 300 || 304 === a, c && (s = M(l, v, c)), s = N(l, s, v, i), i ? (l.ifModified && (u = v.getResponseHeader("Last-Modified"), u && (_.lastModified[e] = u), (u = v.getResponseHeader("etag")) && (_.etag[e] = u)), 204 === a || "HEAD" === l.type ? w = "nocontent" : 304 === a ? w = "notmodified" : (w = s.state, k = s.data, r = s.error, i = !r)) : (r = w, !a && w || (w = "error", a < 0 && (a = 0))), v.status = a, v.statusText = (b || w) + "", i ? o.resolveWith(m, [k, w, v]) : o.rejectWith(m, [v, w, r]), v.statusCode(q), q = void 0, j && n.trigger(i ? "ajaxSuccess" : "ajaxError", [v, l, i ? k : r]), p.fireWith(m, [v, w]), j && (n.trigger("ajaxComplete", [v, l]), --_.active || _.event.trigger("ajaxStop")))
                    }
                    "object" == typeof a && (b = a, a = void 0), b = b || {};
                    var d, e, f, g, h, i, j, k, l = _.ajaxSetup({}, b),
                        m = l.context || l,
                        n = l.context && (m.nodeType || m.jquery) ? _(m) : _.event,
                        o = _.Deferred(),
                        p = _.Callbacks("once memory"),
                        q = l.statusCode || {},
                        r = {},
                        s = {},
                        t = 0,
                        u = "canceled",
                        v = {
                            readyState: 0,
                            getResponseHeader: function (a) {
                                var b;
                                if (2 === t) {
                                    if (!g)
                                        for (g = {}; b = ob.exec(f);) g[b[1].toLowerCase()] = b[2];
                                    b = g[a.toLowerCase()]
                                }
                                return null == b ? null : b
                            },
                            getAllResponseHeaders: function () {
                                return 2 === t ? f : null
                            },
                            setRequestHeader: function (a, b) {
                                var c = a.toLowerCase();
                                return t || (a = s[c] = s[c] || a, r[a] = b), this
                            },
                            overrideMimeType: function (a) {
                                return t || (l.mimeType = a), this
                            },
                            statusCode: function (a) {
                                var b;
                                if (a)
                                    if (t < 2)
                                        for (b in a) q[b] = [q[b], a[b]];
                                    else v.always(a[v.status]);
                                return this
                            },
                            abort: function (a) {
                                var b = a || u;
                                return d && d.abort(b), c(0, b), this
                            }
                        };
                    if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, l.url = ((a || l.url || lb) + "").replace(mb, "").replace(rb, kb[1] + "//"), l.type = b.method || b.type || l.method || l.type, l.dataTypes = _.trim(l.dataType || "*").toLowerCase().match(ma) || [""], null == l.crossDomain && (i = sb.exec(l.url.toLowerCase()), l.crossDomain = !(!i || i[1] === kb[1] && i[2] === kb[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === (kb[3] || ("http:" === kb[1] ? "80" : "443")))), l.data && l.processData && "string" != typeof l.data && (l.data = _.param(l.data, l.traditional)), K(tb, l, b, v), 2 === t) return v;
                    j = l.global, j && 0 == _.active++ && _.event.trigger("ajaxStart"), l.type = l.type.toUpperCase(), l.hasContent = !qb.test(l.type), e = l.url, l.hasContent || (l.data && (e = l.url += (jb.test(e) ? "&" : "?") + l.data, delete l.data), !1 === l.cache && (l.url = nb.test(e) ? e.replace(nb, "$1_=" + ib++) : e + (jb.test(e) ? "&" : "?") + "_=" + ib++)), l.ifModified && (_.lastModified[e] && v.setRequestHeader("If-Modified-Since", _.lastModified[e]), _.etag[e] && v.setRequestHeader("If-None-Match", _.etag[e])), (l.data && l.hasContent && !1 !== l.contentType || b.contentType) && v.setRequestHeader("Content-Type", l.contentType), v.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + ("*" !== l.dataTypes[0] ? ", " + vb + "; q=0.01" : "") : l.accepts["*"]);
                    for (k in l.headers) v.setRequestHeader(k, l.headers[k]);
                    if (l.beforeSend && (!1 === l.beforeSend.call(m, v, l) || 2 === t)) return v.abort();
                    u = "abort";
                    for (k in {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) v[k](l[k]);
                    if (d = K(ub, l, b, v)) {
                        v.readyState = 1, j && n.trigger("ajaxSend", [v, l]), l.async && l.timeout > 0 && (h = setTimeout(function () {
                            v.abort("timeout")
                        }, l.timeout));
                        try {
                            t = 1, d.send(r, c)
                        } catch (a) {
                            if (!(t < 2)) throw a;
                            c(-1, a)
                        }
                    } else c(-1, "No Transport");
                    return v
                },
                getJSON: function (a, b, c) {
                    return _.get(a, b, c, "json")
                },
                getScript: function (a, b) {
                    return _.get(a, void 0, b, "script")
                }
            }), _.each(["get", "post"], function (a, b) {
                _[b] = function (a, c, d, e) {
                    return _.isFunction(c) && (e = e || d, d = c, c = void 0), _.ajax({
                        url: a,
                        type: b,
                        dataType: e,
                        data: c,
                        success: d
                    })
                }
            }), _.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) {
                _.fn[b] = function (a) {
                    return this.on(b, a)
                }
            }), _._evalUrl = function (a) {
                return _.ajax({
                    url: a,
                    type: "GET",
                    dataType: "script",
                    async: !1,
                    global: !1,
                    throws: !0
                })
            }, _.fn.extend({
                wrapAll: function (a) {
                    var b;
                    return _.isFunction(a) ? this.each(function (b) {
                        _(this).wrapAll(a.call(this, b))
                    }) : (this[0] && (b = _(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                        for (var a = this; a.firstElementChild;) a = a.firstElementChild;
                        return a
                    }).append(this)), this)
                },
                wrapInner: function (a) {
                    return _.isFunction(a) ? this.each(function (b) {
                        _(this).wrapInner(a.call(this, b))
                    }) : this.each(function () {
                        var b = _(this),
                            c = b.contents();
                        c.length ? c.wrapAll(a) : b.append(a)
                    })
                },
                wrap: function (a) {
                    var b = _.isFunction(a);
                    return this.each(function (c) {
                        _(this).wrapAll(b ? a.call(this, c) : a)
                    })
                },
                unwrap: function () {
                    return this.parent().each(function () {
                        _.nodeName(this, "body") || _(this).replaceWith(this.childNodes)
                    }).end()
                }
            }), _.expr.filters.hidden = function (a) {
                return a.offsetWidth <= 0 && a.offsetHeight <= 0
            }, _.expr.filters.visible = function (a) {
                return !_.expr.filters.hidden(a)
            };
            var wb = /%20/g,
                xb = /\[\]$/,
                yb = /\r?\n/g,
                zb = /^(?:submit|button|image|reset|file)$/i,
                Ab = /^(?:input|select|textarea|keygen)/i;
            _.param = function (a, b) {
                var c, d = [],
                    e = function (a, b) {
                        b = _.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
                    };
                if (void 0 === b && (b = _.ajaxSettings && _.ajaxSettings.traditional), _.isArray(a) || a.jquery && !_.isPlainObject(a)) _.each(a, function () {
                    e(this.name, this.value)
                });
                else
                    for (c in a) O(c, a[c], b, e);
                return d.join("&").replace(wb, "+")
            }, _.fn.extend({
                serialize: function () {
                    return _.param(this.serializeArray())
                },
                serializeArray: function () {
                    return this.map(function () {
                        var a = _.prop(this, "elements");
                        return a ? _.makeArray(a) : this
                    }).filter(function () {
                        var a = this.type;
                        return this.name && !_(this).is(":disabled") && Ab.test(this.nodeName) && !zb.test(a) && (this.checked || !xa.test(a))
                    }).map(function (a, b) {
                        var c = _(this).val();
                        return null == c ? null : _.isArray(c) ? _.map(c, function (a) {
                            return {
                                name: b.name,
                                value: a.replace(yb, "\r\n")
                            }
                        }) : {
                                name: b.name,
                                value: c.replace(yb, "\r\n")
                            }
                    }).get()
                }
            }), _.ajaxSettings.xhr = function () {
                try {
                    return new XMLHttpRequest
                } catch (a) { }
            };
            var Bb = 0,
                Cb = {},
                Db = {
                    0: 200,
                    1223: 204
                },
                Eb = _.ajaxSettings.xhr();
            a.ActiveXObject && _(a).on("unload", function () {
                for (var a in Cb) Cb[a]()
            }), Y.cors = !!Eb && "withCredentials" in Eb, Y.ajax = Eb = !!Eb, _.ajaxTransport(function (a) {
                var b;
                if (Y.cors || Eb && !a.crossDomain) return {
                    send: function (c, d) {
                        var e, f = a.xhr(),
                            g = ++Bb;
                        if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)
                            for (e in a.xhrFields) f[e] = a.xhrFields[e];
                        a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
                        for (e in c) f.setRequestHeader(e, c[e]);
                        b = function (a) {
                            return function () {
                                b && (delete Cb[g], b = f.onload = f.onerror = null, "abort" === a ? f.abort() : "error" === a ? d(f.status, f.statusText) : d(Db[f.status] || f.status, f.statusText, "string" == typeof f.responseText ? {
                                    text: f.responseText
                                } : void 0, f.getAllResponseHeaders()))
                            }
                        }, f.onload = b(), f.onerror = b("error"), b = Cb[g] = b("abort");
                        try {
                            f.send(a.hasContent && a.data || null)
                        } catch (a) {
                            if (b) throw a
                        }
                    },
                    abort: function () {
                        b && b()
                    }
                }
            }), _.ajaxSetup({
                accepts: {
                    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                },
                contents: {
                    script: /(?:java|ecma)script/
                },
                converters: {
                    "text script": function (a) {
                        return _.globalEval(a), a
                    }
                }
            }), _.ajaxPrefilter("script", function (a) {
                void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET")
            }), _.ajaxTransport("script", function (a) {
                if (a.crossDomain) {
                    var b, c;
                    return {
                        send: function (d, e) {
                            b = _("<script>").prop({
                                async: !0,
                                charset: a.scriptCharset,
                                src: a.url
                            }).on("load error", c = function (a) {
                                b.remove(), c = null, a && e("error" === a.type ? 404 : 200, a.type)
                            }), Z.head.appendChild(b[0])
                        },
                        abort: function () {
                            c && c()
                        }
                    }
                }
            });
            var Fb = [],
                Gb = /(=)\?(?=&|$)|\?\?/;
            _.ajaxSetup({
                jsonp: "callback",
                jsonpCallback: function () {
                    var a = Fb.pop() || _.expando + "_" + ib++;
                    return this[a] = !0, a
                }
            }), _.ajaxPrefilter("json jsonp", function (b, c, d) {
                var e, f, g, h = !1 !== b.jsonp && (Gb.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && Gb.test(b.data) && "data");
                if (h || "jsonp" === b.dataTypes[0]) return e = b.jsonpCallback = _.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(Gb, "$1" + e) : !1 !== b.jsonp && (b.url += (jb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function () {
                    return g || _.error(e + " was not called"), g[0]
                }, b.dataTypes[0] = "json", f = a[e], a[e] = function () {
                    g = arguments
                }, d.always(function () {
                    a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, Fb.push(e)), g && _.isFunction(f) && f(g[0]), g = f = void 0
                }), "script"
            }), _.parseHTML = function (a, b, c) {
                if (!a || "string" != typeof a) return null;
                "boolean" == typeof b && (c = b, b = !1), b = b || Z;
                var d = ga.exec(a),
                    e = !c && [];
                return d ? [b.createElement(d[1])] : (d = _.buildFragment([a], b, e), e && e.length && _(e).remove(), _.merge([], d.childNodes))
            };
            var Hb = _.fn.load;
            _.fn.load = function (a, b, c) {
                if ("string" != typeof a && Hb) return Hb.apply(this, arguments);
                var d, e, f, g = this,
                    h = a.indexOf(" ");
                return h >= 0 && (d = _.trim(a.slice(h)), a = a.slice(0, h)), _.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (e = "POST"), g.length > 0 && _.ajax({
                    url: a,
                    type: e,
                    dataType: "html",
                    data: b
                }).done(function (a) {
                    f = arguments, g.html(d ? _("<div>").append(_.parseHTML(a)).find(d) : a)
                }).complete(c && function (a, b) {
                    g.each(c, f || [a.responseText, b, a])
                }), this
            }, _.expr.filters.animated = function (a) {
                return _.grep(_.timers, function (b) {
                    return a === b.elem
                }).length
            };
            var Ib = a.document.documentElement;
            _.offset = {
                setOffset: function (a, b, c) {
                    var d, e, f, g, h, i, j, k = _.css(a, "position"),
                        l = _(a),
                        m = {};
                    "static" === k && (a.style.position = "relative"), h = l.offset(), f = _.css(a, "top"), i = _.css(a, "left"), j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), _.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m)
                }
            }, _.fn.extend({
                offset: function (a) {
                    if (arguments.length) return void 0 === a ? this : this.each(function (b) {
                        _.offset.setOffset(this, a, b)
                    });
                    var b, c, d = this[0],
                        e = {
                            top: 0,
                            left: 0
                        },
                        f = d && d.ownerDocument;
                    if (f) return b = f.documentElement, _.contains(b, d) ? (typeof d.getBoundingClientRect !== ya && (e = d.getBoundingClientRect()), c = P(f), {
                        top: e.top + c.pageYOffset - b.clientTop,
                        left: e.left + c.pageXOffset - b.clientLeft
                    }) : e
                },
                position: function () {
                    if (this[0]) {
                        var a, b, c = this[0],
                            d = {
                                top: 0,
                                left: 0
                            };
                        return "fixed" === _.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), _.nodeName(a[0], "html") || (d = a.offset()), d.top += _.css(a[0], "borderTopWidth", !0), d.left += _.css(a[0], "borderLeftWidth", !0)), {
                            top: b.top - d.top - _.css(c, "marginTop", !0),
                            left: b.left - d.left - _.css(c, "marginLeft", !0)
                        }
                    }
                },
                offsetParent: function () {
                    return this.map(function () {
                        for (var a = this.offsetParent || Ib; a && !_.nodeName(a, "html") && "static" === _.css(a, "position");) a = a.offsetParent;
                        return a || Ib
                    })
                }
            }), _.each({
                scrollLeft: "pageXOffset",
                scrollTop: "pageYOffset"
            }, function (b, c) {
                var d = "pageYOffset" === c;
                _.fn[b] = function (e) {
                    return pa(this, function (b, e, f) {
                        var g = P(b);
                        if (void 0 === f) return g ? g[c] : b[e];
                        g ? g.scrollTo(d ? a.pageXOffset : f, d ? f : a.pageYOffset) : b[e] = f
                    }, b, e, arguments.length, null)
                }
            }), _.each(["top", "left"], function (a, b) {
                _.cssHooks[b] = w(Y.pixelPosition, function (a, c) {
                    if (c) return c = v(a, b), Pa.test(c) ? _(a).position()[b] + "px" : c
                })
            }), _.each({
                Height: "height",
                Width: "width"
            }, function (a, b) {
                _.each({
                    padding: "inner" + a,
                    content: b,
                    "": "outer" + a
                }, function (c, d) {
                    _.fn[d] = function (d, e) {
                        var f = arguments.length && (c || "boolean" != typeof d),
                            g = c || (!0 === d || !0 === e ? "margin" : "border");
                        return pa(this, function (b, c, d) {
                            var e;
                            return _.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? _.css(b, c, g) : _.style(b, c, d, g)
                        }, b, f ? d : void 0, f, null)
                    }
                })
            }), _.fn.size = function () {
                return this.length
            }, _.fn.andSelf = _.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
                return _
            });
            var Jb = a.jQuery,
                Kb = a.$;
            return _.noConflict = function (b) {
                return a.$ === _ && (a.$ = Kb), b && a.jQuery === _ && (a.jQuery = Jb), _
            }, typeof b === ya && (a.jQuery = a.$ = _), _
        })
    }, {}],
    40: [function (a, b, c) {
        (function (c) {
            var d = a("jws");
            b.exports.decode = function (a) {
                var b = d.decode(a, {
                    json: !0
                });
                return b && b.payload
            }, b.exports.sign = function (a, b, c) {
                c = c || {};
                var e = "object" == typeof c.headers && c.headers || {};
                if (e.typ = "JWT", e.alg = c.algorithm || "HS256", c.header && Object.keys(c.header).forEach(function (a) {
                    e[a] = c.header[a]
                }), c.noTimestamp || (a.iat = Math.floor(Date.now() / 1e3)), c.expiresInMinutes) {
                    var f = 60 * c.expiresInMinutes;
                    a.exp = a.iat + f
                }
                return c.audience && (a.aud = c.audience), c.issuer && (a.iss = c.issuer), c.subject && (a.sub = c.subject), d.sign({
                    header: e,
                    payload: a,
                    secret: b
                })
            }, b.exports.verify = function (a, b, g, h) {
                if ("function" != typeof g || h || (h = g, g = {}), g || (g = {}), h) var i = function () {
                    var a = Array.prototype.slice.call(arguments, 0);
                    return c.nextTick(function () {
                        h.apply(null, a)
                    })
                };
                else var i = function (a, b) {
                    if (a) throw a;
                    return b
                };
                if (!a) return i(new e("jwt must be provided"));
                var j = a.split(".");
                if (3 !== j.length) return i(new e("jwt malformed"));
                if ("" === j[2].trim() && b) return i(new e("jwt signature is required"));
                var k;
                try {
                    k = d.verify(a, b)
                } catch (a) {
                    return i(a)
                }
                if (!k) return i(new e("invalid signature"));
                var l;
                try {
                    l = this.decode(a)
                } catch (a) {
                    return i(a)
                }
                if (l.exp && Math.floor(Date.now() / 1e3) >= l.exp) return i(new f("jwt expired", new Date(1e3 * l.exp)));
                if (g.audience) {
                    var m = Array.isArray(g.audience) ? g.audience : [g.audience];
                    if (!(Array.isArray(l.aud) ? l.aud : [l.aud]).some(function (a) {
                        return -1 != m.indexOf(a)
                    })) return i(new e("jwt audience invalid. expected: " + l.aud))
                }
                return g.issuer && l.iss !== g.issuer ? i(new e("jwt issuer invalid. expected: " + l.iss)) : i(null, l)
            };
            var e = b.exports.JsonWebTokenError = function (a, b) {
                Error.call(this, a), this.name = "JsonWebTokenError", this.message = a, b && (this.inner = b)
            };
            e.prototype = Object.create(Error.prototype), e.prototype.constructor = e;
            var f = b.exports.TokenExpiredError = function (a, b) {
                e.call(this, a), this.name = "TokenExpiredError", this.expiredAt = b
            };
            f.prototype = Object.create(e.prototype), f.prototype.constructor = f
        }).call(this, a("_process"))
    }, {
        _process: 22,
        jws: 41
    }],
    41: [function (a, b, c) {
        (function (b) {
            function d(a) {
                return "string" == typeof a ? a : "number" == typeof a || t.isBuffer(a) ? a.toString() : JSON.stringify(a)
            }

            function e(a, b) {
                var c = w(d(a)),
                    e = w(d(b));
                return v.format("%s.%s", c, e)
            }

            function f(a) {
                var b = a.header,
                    c = a.payload,
                    d = a.secret || a.privateKey,
                    f = x(b.alg),
                    g = e(b, c),
                    h = f.sign(g, d);
                return v.format("%s.%s", g, h)
            }

            function g(a) {
                return "[object Object]" === Object.prototype.toString.call(a)
            }

            function h(a) {
                if (g(a)) return a;
                try {
                    return JSON.parse(a)
                } catch (a) {
                    return
                }
            }

            function i(a) {
                var b = a.split(".", 1)[0];
                return h(w.decode(b))
            }

            function j(a) {
                return a.split(".", 2).join(".")
            }

            function k(a) {
                var b, c = i(a);
                if ("object" != typeof c) throw b = new Error("Invalid token: no header in signature '" + a + "'"), b.code = "MISSING_HEADER", b.signature = a, b;
                if (!c.alg) throw b = new Error("Missing `alg` field in header for signature '" + a + "'"), b.code = "MISSING_ALGORITHM", b.header = c, b.signature = a, b;
                return c.alg
            }

            function l(a) {
                return a.split(".")[2]
            }

            function m(a) {
                var b = a.split(".")[1];
                return w.decode(b)
            }

            function n(a) {
                return !!z.test(a) && !!i(a)
            }

            function o(a, b) {
                a = d(a);
                var c = l(a),
                    e = j(a);
                return x(k(a)).verify(e, c, b)
            }

            function p(a, b) {
                if (b = b || {}, a = d(a), !n(a)) return null;
                var c = i(a);
                if (!c) return null;
                var e = m(a);
                return ("JWT" === c.typ || b.json) && (e = JSON.parse(e)), {
                    header: c,
                    payload: e,
                    signature: l(a)
                }
            }

            function q(a) {
                var b = a.secret || a.privateKey || a.key,
                    c = new s(b);
                this.readable = !0, this.header = a.header, this.secret = this.privateKey = this.key = c, this.payload = new s(a.payload), this.secret.once("close", function () {
                    !this.payload.writable && this.readable && this.sign()
                }.bind(this)), this.payload.once("close", function () {
                    !this.secret.writable && this.readable && this.sign()
                }.bind(this))
            }

            function r(a) {
                a = a || {};
                var b = a.secret || a.publicKey || a.key,
                    c = new s(b);
                this.readable = !0, this.secret = this.publicKey = this.key = c, this.signature = new s(a.signature), this.secret.once("close", function () {
                    !this.signature.writable && this.readable && this.verify()
                }.bind(this)), this.signature.once("close", function () {
                    !this.secret.writable && this.readable && this.verify()
                }.bind(this))
            }

            function s(a) {
                if (this.buffer = t(a || 0), this.writable = !0, this.readable = !0, !a) return this;
                "function" == typeof a.pipe ? a.pipe(this) : a.length && (this.writable = !1, b.nextTick(function () {
                    this.buffer = a, this.emit("end", a), this.readable = !1, this.emit("close")
                }.bind(this)))
            }
            var t = a("buffer").Buffer,
                u = a("stream"),
                v = a("util"),
                w = a("base64url"),
                x = a("jwa"),
                y = ["HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "ES256", "ES384", "ES512"],
                z = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;
            v.inherits(q, u), q.prototype.sign = function () {
                var a = f({
                    header: this.header,
                    payload: this.payload.buffer,
                    secret: this.secret.buffer
                });
                return this.emit("done", a), this.emit("data", a), this.emit("end"), this.readable = !1, a
            }, v.inherits(r, u), r.prototype.verify = function () {
                var a = o(this.signature.buffer, this.key.buffer),
                    b = p(this.signature.buffer);
                return this.emit("done", a, b), this.emit("data", a), this.emit("end"), this.readable = !1, a
            }, v.inherits(s, u), s.prototype.write = function (a) {
                this.buffer = t.concat([this.buffer, t(a)]), this.emit("data", a)
            }, s.prototype.end = function (a) {
                a && this.write(a), this.emit("end", a), this.emit("close"), this.writable = !1, this.readable = !1
            }, c.ALGORITHMS = y, c.sign = f, c.verify = o, c.decode = p, c.isValid = n, c.createSign = function (a) {
                return new q(a)
            }, c.createVerify = function (a) {
                return new r(a)
            }
        }).call(this, a("_process"))
    }, {
        _process: 22,
        base64url: 42,
        buffer: 3,
        jwa: 43,
        stream: 35,
        util: 37
    }],
    42: [function (a, b, c) {
        (function (a) {
            function c(a) {
                return a.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
            }

            function d(b) {
                return a.isBuffer(b) && (b = b.toString()), e(b).replace(/\-/g, "+").replace(/_/g, "/")
            }

            function e(b) {
                var c = 4,
                    d = b.length,
                    e = b.length % c;
                if (!e) return b;
                var f = d,
                    g = c - e,
                    h = d + g,
                    i = a(h);
                for (i.write(b); g--;) i.write("=", f++);
                return i.toString()
            }

            function f(b, c) {
                return a(d(b), "base64").toString(c)
            }

            function g(b) {
                return c(a(b).toString("base64"))
            }

            function h(b) {
                return a(d(b), "base64")
            }
            g.toBase64 = d, g.fromBase64 = c, g.decode = f, g.toBuffer = h, b.exports = g
        }).call(this, a("buffer").Buffer)
    }, {
        buffer: 3
    }],
    43: [function (a, b, c) {
        (function (c) {
            function d(a) {
                var b = [].slice.call(arguments, 1),
                    c = o.format.bind(o, a).apply(null, b);
                return new TypeError(c)
            }

            function e(a) {
                return c.isBuffer(a) || "string" == typeof a
            }

            function f(a) {
                return e(a) || (a = JSON.stringify(a)), a
            }

            function g(a) {
                return function (b, c) {
                    if (!e(c)) throw d(p);
                    b = f(b);
                    var g = n.createHmac("SHA" + a, c),
                        h = (g.update(b), g.digest("base64"));
                    return m.fromBase64(h)
                }
            }

            function h(a) {
                return function (b, c, d) {
                    return c === g(a)(b, d)
                }
            }

            function i(a) {
                return function (b, c) {
                    if (!e(c)) throw d(q);
                    b = f(b);
                    var g = n.createSign("RSA-SHA" + a),
                        h = (g.update(b), g.sign(c, "base64"));
                    return m.fromBase64(h)
                }
            }

            function j(a) {
                return function (b, c, g) {
                    if (!e(g)) throw d(q);
                    b = f(b), c = m.toBase64(c);
                    var h = n.createVerify("RSA-SHA" + a);
                    return h.update(b), h.verify(g, c, "base64")
                }
            }

            function k() {
                return function () {
                    return ""
                }
            }

            function l() {
                return function (a, b) {
                    return "" === b
                }
            }
            var m = a("base64url"),
                n = a("crypto"),
                o = a("util"),
                p = "secret must be a string or buffer",
                q = "key must be a string or buffer";
            b.exports = function (a) {
                var b = {
                    hs: g,
                    rs: i,
                    es: i,
                    none: k
                },
                    c = {
                        hs: h,
                        rs: j,
                        es: j,
                        none: l
                    },
                    e = a.match(/(RS|ES|HS|none)(256|384|512)?/i);
                if (!e) throw d('"%s" is not a valid algorithm.\n  Supported algorithms are:\n  "HS256", "HS384", "HS512", "RS256", "RS384", "RS512" and "none".', a);
                var f = e[1].toLowerCase(),
                    m = e[2];
                return {
                    sign: b[f](m),
                    verify: c[f](m)
                }
            }
        }).call(this, a("buffer").Buffer)
    }, {
        base64url: 42,
        buffer: 3,
        crypto: 9,
        util: 37
    }],
    44: [function (a, b, c) {
        (function (b) {
            (function () {
                var c = a("../client/entry"),
                    d = _jQuery = a("jquery");
                if (d.ajaxTransport("+*", function (a, b, c) {
                    if (window.FormData && (a.dataType && ("blob" === a.dataType || "arraybuffer" === a.dataType) || a.data && (window.Blob && a.data instanceof Blob || window.ArrayBuffer && a.data instanceof ArrayBuffer))) return {
                        send: function (b, c) {
                            var d, e = new XMLHttpRequest,
                                f = a.url || window.location.href,
                                g = a.type || "GET",
                                h = a.dataType || "text",
                                i = a.data || null,
                                j = a.async || !0;
                            e.addEventListener("load", function () {
                                var a, b = {};
                                a = e.status >= 200 && e.status < 300 || 304 === e.status, a ? b[h] = e.response : b.text = String.fromCharCode.apply(null, new Uint8Array(e.response)), c(e.status, e.statusText, b, e.getAllResponseHeaders())
                            }), e.open(g, f, j), e.responseType = h;
                            for (d in b) b.hasOwnProperty(d) && e.setRequestHeader(d, b[d]);
                            e.send(i)
                        },
                        abort: function () {
                            c.abort()
                        }
                    }
                }), !b.browser) {
                    var e = a("jsdom").jsdom().createWindow();
                    d = d(e)
                }
                c({
                    defer: function () {
                        return pr = d.Deferred(), pr.promise = pr.promise(), pr
                    },
                    http: function (a) {
                        var b = d.Deferred(),
                            c = {
                                type: a.method,
                                url: a.url,
                                dataType: a.dataType || "json",
                                headers: a.headers || {},
                                data: a.data
                            };
                        return d.ajax(c).done(b.resolve).fail(b.reject), b.promise()
                    },
                    fhirjs: a("../../lib/jqFhir.js")
                })
            }).call(this)
        }).call(this, a("_process"))
    }, {
        "../../lib/jqFhir.js": 1,
        "../client/entry": 48,
        _process: 22,
        jquery: 39,
        jsdom: 2
    }],
    45: [function (a, b, c) {
        var d, e = b.exports = {
            debug: !0
        };
        e.set = function (a) {
            d = a
        }, e.get = function () {
            return d
        }
    }, {}],
    46: [function (a, b, c) {
        (function (c) {
            function d(a, b) {
                void 0 === b && (b = !1);
                for (var c = location.search.substr(1), d = c.split("&"), e = [], f = 0; f < d.length; f++) {
                    var g = d[f].split("=");
                    if (g[0] === a) {
                        var h = g[1].replace(/\+/g, "%20");
                        e.push(decodeURIComponent(h))
                    }
                }
                return b ? e : 0 === e.length ? null : e[0]
            }

            function e(a) {
                return "/" === a.substr(-1) ? a.substr(0, a.length - 1) : a
            }

            function f() {
                var a = sessionStorage.tokenResponse;
                return a && (a = JSON.parse(a)), a
            }

            function g(a) {
                a || (a = window.location.hash);
                var b = o.get().defer();
                return c.nextTick(function () {
                    var c = a.match(/#(.*)/);
                    c = c ? c[1] : "", c = c.split(/&/);
                    for (var d = {}, e = 0; e < c.length; e++) {
                        var f = c[e].split(/=/);
                        f[0].length > 0 && f[1] && (d[decodeURIComponent(f[0])] = decodeURIComponent(f[1]))
                    }
                    b.resolve(d)
                }), b.promise
            }

            function h(a) {
                a || (a = {
                    code: d("code"),
                    state: d("state")
                });
                var b = o.get().defer(),
                    c = JSON.parse(sessionStorage[a.state]);
                window.history.replaceState && s.settings.replaceBrowserHistory && window.history.replaceState({}, "", window.location.toString().replace(window.location.search, ""));
                var e = {
                    code: a.code,
                    grant_type: "authorization_code",
                    redirect_uri: c.client.redirect_uri
                },
                    f = {};
                return c.client.secret ? f.Authorization = "Basic " + btoa(c.client.client_id + ":" + c.client.secret) : e.client_id = c.client.client_id, o.get().http({
                    method: "POST",
                    url: c.provider.oauth2.token_uri,
                    data: e,
                    headers: f
                }).then(function (c) {
                    for (var d in a) a.hasOwnProperty(d) && (c[d] = a[d]);
                    b.resolve(c)
                }, function () {
                    console.log("failed to exchange code for access_token", arguments), b.reject()
                }), b.promise
            }

            function i() {
                var a = o.get().defer();
                return c.nextTick(function () {
                    a.resolve(f())
                }), a
            }

            function j() {
                var a = null,
                    b = function () { },
                    c = function () { };
                if (0 === arguments.length) throw "Can't call 'ready' without arguments";
                if (1 === arguments.length) b = arguments[0];
                else if (2 === arguments.length)
                    if ("function" == typeof arguments[0]) b = arguments[0], c = arguments[1];
                    else {
                        if ("object" != typeof arguments[0]) throw "ready called with invalid arguments";
                        a = arguments[0], b = arguments[1]
                    }
                else {
                    if (3 !== arguments.length) throw "ready called with invalid arguments";
                    a = arguments[0], b = arguments[1], c = arguments[2]
                }
                return {
                    input: a,
                    callback: b,
                    errback: c
                }
            }

            function k(a, b, d, f) {
                return m() ? void c.nextTick(function () {
                    n(a, d)
                }) : b ? (b.url = a, void c.nextTick(function () {
                    d && d(b)
                })) : void o.get().http({
                    method: "GET",
                    url: e(a) + "/metadata"
                }).then(function (b) {
                    var c = {
                        name: "SMART on FHIR Testing Server",
                        description: "Dev server for SMART on FHIR",
                        url: a,
                        oauth2: {
                            registration_uri: null,
                            authorize_uri: null,
                            token_uri: null
                        }
                    };
                    try {
                        b.rest[0].security.extension.filter(function (a) {
                            return "http://fhir-registry.smarthealthit.org/StructureDefinition/oauth-uris" === a.url
                        })[0].extension.forEach(function (a, b, d) {
                            "register" === a.url ? c.oauth2.registration_uri = a.valueUri : "authorize" === a.url ? c.oauth2.authorize_uri = a.valueUri : "token" === a.url && (c.oauth2.token_uri = a.valueUri)
                        })
                    } catch (a) {
                        return f && f(a)
                    }
                    d && d(c)
                }, function () {
                    f && f("Unable to fetch conformance statement")
                })
            }

            function l(a) {
                return (window.location.protocol + "//" + window.location.host + window.location.pathname).match(/(.*\/)[^\/]*/)[1] + a
            }

            function m() {
                return d("fhirServiceUrl") && !d("iss")
            }

            function n(a, b) {
                b && b({
                    oauth2: null,
                    url: a || d("fhirServiceUrl")
                })
            }
            var o = a("./adapter"),
                p = a("./client"),
                q = a("./guid"),
                r = a("jsonwebtoken"),
                s = b.exports = {
                    debug: !0
                };
            s.settings = {
                replaceBrowserHistory: !0
            }, s.ready = function (a, b, c) {
                var e = j.apply(this, arguments),
                    f = d("code") || e.input && e.input.code,
                    k = null;
                k = sessionStorage.tokenResponse ? i() : f ? h(e.input) : g(e.input), k.done(function (a) {
                    if (!a || !a.state) return e.errback("No 'state' parameter found in authorization response.");
                    sessionStorage.getItem("patientId") && (a.patient = sessionStorage.getItem("patientId")), sessionStorage.tokenResponse = JSON.stringify(a);
                    var b = JSON.parse(sessionStorage[a.state]);
                    b.fake_token_response && (a = b.fake_token_response);
                    var c = {
                        serviceUrl: b.provider.url,
                        patientId: a.patient
                    };
                    if (a.id_token) {
                        var d = a.id_token,
                            f = r.decode(d);
                        c.userId = f.profile
                    }
                    if (void 0 !== a.access_token) c.auth = {
                        type: "bearer",
                        token: a.access_token
                    };
                    else if (!b.fake_token_response) return e.errback("Failed to obtain access token.");
                    var g = p(c);
                    g.state = JSON.parse(JSON.stringify(b)), g.tokenResponse = JSON.parse(JSON.stringify(a)), e.callback(g)
                }).fail(function () {
                    e.errback("Failed to obtain access token.")
                })
            };
            s.authorize = function (a, b) {
                b || (b = function () {
                    console.log("Failed to discover authorization URL given", a)
                }), delete sessionStorage.tokenResponse, a.client || (a = {
                    client: a
                }), a.response_type || (a.response_type = "code"), a.client.redirect_uri || (a.client.redirect_uri = l("")), a.client.redirect_uri.match(/:\/\//) || (a.client.redirect_uri = l(a.client.redirect_uri));
                var c = d("launch");
                c && (a.client.scope.match(/launch/) || (a.client.scope += " launch"), a.client.launch = c);
                var e = d("iss") || d("fhirServiceUrl");
                e && (a.server || (a.server = e)), d("patientId") && (a.fake_token_response = a.fake_token_response || {}, a.fake_token_response.patient = d("patientId")), k(a.server, a.provider, function (b) {
                    a.provider = b;
                    var c = a.client.state || q.newGuid(),
                        d = a.client;
                    if (null == a.provider.oauth2) return sessionStorage[c] = JSON.stringify(a), sessionStorage.tokenResponse = JSON.stringify({
                        state: c
                    }), void (window.location.href = d.redirect_uri + "#state=" + encodeURIComponent(c));
                    sessionStorage[c] = JSON.stringify(a), console.log("sending client reg", a.client);
                    var e = a.provider.oauth2.authorize_uri + "?client_id=" + encodeURIComponent(d.client_id) + "&response_type=" + encodeURIComponent(a.response_type) + "&scope=" + encodeURIComponent(d.scope) + "&redirect_uri=" + encodeURIComponent(d.redirect_uri) + "&state=" + encodeURIComponent(c) + "&aud=" + encodeURIComponent(a.server);
                    void 0 !== d.launch && d.launch && (e += "&launch=" + encodeURIComponent(d.launch)), window.location.href = e
                }, b)
            }, s.resolveAuthType = function (a, b, c) {
                o.get().http({
                    method: "GET",
                    url: e(a) + "/metadata"
                }).then(function (a) {
                    var c = "none";
                    try {
                        "smart-on-fhir" === a.rest[0].security.service[0].coding[0].code.toLowerCase() && (c = "oauth2")
                    } catch (a) { }
                    b && b(c)
                }, function () {
                    c && c("Unable to fetch conformance statement")
                })
            }
        }).call(this, a("_process"))
    }, {
        "./adapter": 45,
        "./client": 47,
        "./guid": 49,
        _process: 22,
        jsonwebtoken: 40
    }],
    47: [function (a, b, c) {
        function d() { }

        function e(a) {
            function b(a, b) {
                return a.match(/^http/) ? a : a.match(/^urn/) ? a : ("/" == a.charAt(0) && (a = a.substr(1)), b.serviceUrl + "/" + a)
            }
            var c = new d,
                e = g.get().fhirjs,
                h = c.server = {
                    serviceUrl: a.serviceUrl,
                    auth: a.auth || {
                        type: "none"
                    }
                },
                i = {};
            "basic" === h.auth.type ? i = {
                user: h.auth.username,
                pass: h.auth.password
            } : "bearer" === h.auth.type && (i = {
                bearer: h.auth.token
            }), c.api = e({
                baseUrl: h.serviceUrl,
                auth: i
            }), a.patientId && (c.patient = {}, c.patient.id = a.patientId, c.patient.api = e({
                baseUrl: h.serviceUrl,
                auth: i,
                patient: a.patientId
            }), c.patient.read = function () {
                return c.get({
                    resource: "Patient"
                })
            });
            var j = c.patient ? c.patient.api : c.api;
            if (c.userId = a.userId, h.auth = h.auth || {
                type: "none"
            }, !c.server.serviceUrl || !c.server.serviceUrl.match(/https?:\/\/.+[^\/]$/)) throw "Must supply a `server` property whose `serviceUrl` begins with http(s) and does NOT include a trailing slash. E.g. `https://fhir.aws.af.cm/fhir`";
            return c.authenticated = function (a) {
                if ("none" === h.auth.type) return a;
                var b;
                return "basic" === h.auth.type ? b = "Basic " + f(h.auth.username + ":" + h.auth.password) : "bearer" === h.auth.type && (b = "Bearer " + h.auth.token), a.headers || (a.headers = {}), a.headers.Authorization = b, a
            }, c.get = function (a) {
                var b = g.get().defer(),
                    c = {
                        type: a.resource
                    };
                return a.id && (c.id = a.id), j.read(c).then(function (a) {
                    b.resolve(a.data)
                }, function (c) {
                    b.reject("Could not fetch " + a.resource + " " + a.id, c)
                }), b.promise
            }, c.user = {
                read: function () {
                    var a = c.userId;
                    return resource = a.split("/")[0], uid = a.split("/")[1], c.get({
                        resource: resource,
                        id: uid
                    })
                }
            }, c.getBinary = function (a) {
                var b = g.get().defer();
                return g.get().http(c.authenticated({
                    type: "GET",
                    url: a,
                    dataType: "blob"
                })).done(function (a) {
                    b.resolve(a)
                }).fail(function () {
                    b.reject("Could not fetch " + a, arguments)
                }), b.promise
            }, c.fetchBinary = function (a) {
                var d = b(a, h);
                return c.getBinary(d)
            }, c
        }
        var f = a("btoa"),
            g = a("./adapter");
        b.exports = e;
        var h = a("./utils");
        Object.keys(h).forEach(function (a) {
            d.prototype[a] = h[a]
        })
    }, {
        "./adapter": 45,
        "./utils": 50,
        btoa: 38
    }],
    48: [function (a, b, c) {
        var d = a("./client"),
            e = a("./bb-client"),
            f = a("./adapter");
        window.FHIR = {
            client: d,
            oauth2: e
        }, b.exports = f.set
    }, {
        "./adapter": 45,
        "./bb-client": 46,
        "./client": 47
    }],
    49: [function (a, b, c) {
        var d = function (a, b, c) {
            return a.length >= b ? a : d(c + a, b, c || " ")
        },
            e = function (a) {
                var b = a.toString(16);
                return d(b, 4, "0")
            },
            f = function () {
                var a = new window.Uint16Array(8);
                return window.crypto.getRandomValues(a), [e(a[0]) + e(a[1]), e(a[2]), e(a[3]), e(a[4]), e(a[5]) + e(a[6]) + e(a[7])].join("-")
            },
            g = function () {
                var a = (new Date).getTime();
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (b) {
                    var c = (a + 16 * Math.random()) % 16 | 0;
                    return a = Math.floor(a / 16), ("x" === b ? c : 7 & c | 8).toString(16)
                })
            },
            h = function () {
                var a = void 0 !== window.crypto,
                    b = a && void 0 !== window.crypto.getRandomValues;
                return a && b ? f() : g()
            };
        b.exports = {
            newGuid: h,
            empty: "00000000-0000-0000-0000-000000000000"
        }
    }, {}],
    50: [function (a, b, c) {
        function d(a) {
            if ("number" != typeof a.value) throw "Found a non-numerical unit: " + a.value + " " + a.code
        }
        var e = b.exports = {};
        e.byCodes = function (a, b) {
            function c() {
                for (var a = [], b = 0; b < arguments.length; b++) {
                    var c = d[arguments[b]];
                    c && [].push.apply(a, c)
                }
                return a
            }
            var d = e.byCode(a, b);
            return c
        }, e.byCode = function (a, b) {
            var c = {};
            return Array.isArray(a) || (a = [a]), a.forEach(function (a) {
                "Observation" === a.resourceType && a[b].coding.forEach(function (b) {
                    c[b.code] = c[b.code] || [], c[b.code].push(a)
                })
            }), c
        }, e.units = {
            cm: function (a) {
                if (a) {
                    d(a);
                    var b = a.code || a.unit;
                    if ("cm" == (b = b ? b.trim() : null)) return a.value;
                    if ("m" == b) return 100 * a.value;
                    if ("in" == b) return 2.54 * a.value;
                    if ("[in_us]" == b) return 2.54 * a.value;
                    if ("[in_i]" == b) return 2.54 * a.value;
                    throw "Unrecognized length unit: " + a.code
                }
            },
            kg: function (a) {
                if (a) {
                    if (d(a), "kg" == a.code) return a.value;
                    if ("g" == a.code) return a.value / 1e3;
                    if (a.code.match(/lb/)) return a.value / 2.20462;
                    if (a.code.match(/oz/)) return a.value / 35.274;
                    throw "Unrecognized weight unit: " + a.code
                }
            },
            any: function (a) {
                if (a) return d(a), a.value
            }
        }
    }, {}]
}, {}, [44]);