var hljs = new function() {
        function e(e) {
            return e.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;")
        }
        function t(e) {
            for (var t = e.firstChild; t; t = t.nextSibling) {
                if (t.nodeName == "CODE") return t;
                if (t.nodeType != 3 || !t.nodeValue.match(/\s+/)) break
            }
        }
        function n(e, t) {
            return Array.prototype.map.call(e.childNodes, function(e) {
                return e.nodeType == 3 ? t ? e.nodeValue.replace(/\n/g, "") : e.nodeValue : e.nodeName == "BR" ? "\n" : n(e, t)
            }).join("")
        }
        function r(e) {
            var t = (e.className + " " + e.parentNode.className).split(/\s+/);
            t = t.map(function(e) {
                return e.replace(/^language-/, "")
            });
            for (var n = 0; n < t.length; n++) if (p[t[n]] || t[n] == "no-highlight") return t[n]
        }
        function i(e) {
            var t = [];
            return function n(e, r) {
                for (var i = e.firstChild; i; i = i.nextSibling) i.nodeType == 3 ? r += i.nodeValue.length : i.nodeName == "BR" ? r += 1 : i.nodeType == 1 && (t.push({
                    event: "start",
                    offset: r,
                    node: i
                }), r = n(i, r), t.push({
                    event: "stop",
                    offset: r,
                    node: i
                }));
                return r
            }(e, 0), t
        }
        function s(t, n, r) {
            function u() {
                return t.length && n.length ? t[0].offset != n[0].offset ? t[0].offset < n[0].offset ? t : n : n[0].event == "start" ? t : n : t.length ? t : n
            }
            function a(t) {
                function n(t) {
                    return " " + t.nodeName + '="' + e(t.value) + '"'
                }
                return "<" + t.nodeName + Array.prototype.map.call(t.attributes, n).join("") + ">"
            }
            var i = 0,
                s = "",
                o = [];
            while (t.length || n.length) {
                var f = u().splice(0, 1)[0];
                s += e(r.substr(i, f.offset - i)), i = f.offset;
                if (f.event == "start") s += a(f.node), o.push(f.node);
                else if (f.event == "stop") {
                    var l, c = o.length;
                    do c--, l = o[c], s += "</" + l.nodeName.toLowerCase() + ">";
                    while (l != f.node);
                    o.splice(c, 1);
                    while (c < o.length) s += a(o[c]), c++
                }
            }
            return s + e(r.substr(i))
        }
        function o(e) {
            function t(t, n) {
                return RegExp(t, "m" + (e.cI ? "i" : "") + (n ? "g" : ""))
            }
            function n(e, r) {
                if (e.compiled) return;
                e.compiled = !0;
                var i = [];
                if (e.k) {
                    var s = {};

                    function o(e, t) {
                        t.split(" ").forEach(function(t) {
                            var n = t.split("|");
                            s[n[0]] = [e, n[1] ? Number(n[1]) : 1], i.push(n[0])
                        })
                    }
                    e.lR = t(e.l || hljs.IR, !0);
                    if (typeof e.k == "string") o("keyword", e.k);
                    else for (var u in e.k) {
                        if (!e.k.hasOwnProperty(u)) continue;
                        o(u, e.k[u])
                    }
                    e.k = s
                }
                r && (e.bWK && (e.b = "\\b(" + i.join("|") + ")\\s"), e.bR = t(e.b ? e.b : "\\B|\\b"), !e.e && !e.eW && (e.e = "\\B|\\b"), e.e && (e.eR = t(e.e)), e.tE = e.e || "", e.eW && r.tE && (e.tE += (e.e ? "|" : "") + r.tE)), e.i && (e.iR = t(e.i)), e.r === undefined && (e.r = 1), e.c || (e.c = []);
                for (var a = 0; a < e.c.length; a++) e.c[a] == "self" && (e.c[a] = e), n(e.c[a], e);
                e.starts && n(e.starts, r);
                var f = [];
                for (var a = 0; a < e.c.length; a++) f.push(e.c[a].b);
                e.tE && f.push(e.tE), e.i && f.push(e.i), e.t = f.length ? t(f.join("|"), !0) : {
                    exec: function(e) {
                        return null
                    }
                }
            }
            n(e)
        }
        function u(t, n) {
            function r(e, t) {
                for (var n = 0; n < t.c.length; n++) {
                    var r = t.c[n].bR.exec(e);
                    if (r && r.index == 0) return t.c[n]
                }
            }
            function i(e, t) {
                if (e.e && e.eR.test(t)) return e;
                if (e.eW) return i(e.parent, t)
            }
            function s(e, t) {
                return t.i && t.iR.test(e)
            }
            function f(e, t) {
                var n = y.cI ? t[0].toLowerCase() : t[0];
                return e.k.hasOwnProperty(n) && e.k[n]
            }
            function l() {
                var t = e(w);
                if (!b.k) return t;
                var n = "",
                    r = 0;
                b.lR.lastIndex = 0;
                var i = b.lR.exec(t);
                while (i) {
                    n += t.substr(r, i.index - r);
                    var s = f(b, i);
                    s ? (S += s[1], n += '<span class="' + s[0] + '">' + i[0] + "</span>") : n += i[0], r = b.lR.lastIndex, i = b.lR.exec(t)
                }
                return n + t.substr(r)
            }
            function c() {
                if (b.sL && !p[b.sL]) return e(w);
                var t = b.sL ? u(b.sL, w) : a(w);
                return b.r > 0 && (S += t.keyword_count, E += t.r), '<span class="' + t.language + '">' + t.value + "</span>"
            }
            function h() {
                return b.sL !== undefined ? c() : l()
            }
            function v(t, n) {
                var r = t.cN ? '<span class="' + t.cN + '">' : "";
                t.rB ? (x += r, w = "") : t.eB ? (x += e(n) + r, w = "") : (x += r, w = n), b = Object.create(t, {
                    parent: {
                        value: b
                    }
                }), E += t.r
            }
            function m(t, n) {
                w += t;
                if (n === undefined) return x += h(), 0;
                var o = r(n, b);
                if (o) return x += h(), v(o, n), o.rB ? 0 : n.length;
                var u = i(b, n);
                if (u) {
                    !u.rE && !u.eE && (w += n), x += h();
                    do b.cN && (x += "</span>"), b = b.parent;
                    while (b != u.parent);
                    return u.eE && (x += e(n)), w = "", u.starts && v(u.starts, ""), u.rE ? 0 : n.length
                }
                if (s(n, b)) throw "Illegal";
                return w += n, n.length || 1
            }
            var y = p[t];
            o(y);
            var b = y,
                w = "",
                E = 0,
                S = 0,
                x = "";
            try {
                var T, N, C = 0;
                for (;;) {
                    b.t.lastIndex = C, T = b.t.exec(n);
                    if (!T) break;
                    N = m(n.substr(C, T.index - C), T[0]), C = T.index + N
                }
                return m(n.substr(C)), {
                    r: E,
                    keyword_count: S,
                    value: x,
                    language: t
                }
            } catch (k) {
                if (k == "Illegal") return {
                    r: 0,
                    keyword_count: 0,
                    value: e(n)
                };
                throw k
            }
        }
        function a(t) {
            var n = {
                keyword_count: 0,
                r: 0,
                value: e(t)
            },
                r = n;
            for (var i in p) {
                if (!p.hasOwnProperty(i)) continue;
                var s = u(i, t);
                s.language = i, s.keyword_count + s.r > r.keyword_count + r.r && (r = s), s.keyword_count + s.r > n.keyword_count + n.r && (r = n, n = s)
            }
            return r.language && (n.second_best = r), n
        }
        function f(e, t, n) {
            return t && (e = e.replace(/^((<[^>]+>|\t)+)/gm, function(e, n, r, i) {
                return n.replace(/\t/g, t)
            })), n && (e = e.replace(/\n/g, "<br>")), e
        }
        function l(e, t, o) {
            var l = n(e, o),
                c = r(e);
            if (c == "no-highlight") return;
            var h = c ? u(c, l) : a(l);
            c = h.language;
            var p = i(e);
            if (p.length) {
                var v = document.createElement("pre");
                v.innerHTML = h.value, h.value = s(p, i(v), l)
            }
            h.value = f(h.value, t, o);
            var m = e.className;
            m.match("(\\s|^)(language-)?" + c + "(\\s|$)") || (m = m ? m + " " + c : c), e.innerHTML = h.value, e.className = m, e.result = {
                language: c,
                kw: h.keyword_count,
                re: h.r
            }, h.second_best && (e.second_best = {
                language: h.second_best.language,
                kw: h.second_best.keyword_count,
                re: h.second_best.r
            })
        }
        function c() {
            if (c.called) return;
            c.called = !0, Array.prototype.map.call(document.getElementsByTagName("pre"), t).filter(Boolean).forEach(function(e) {
                l(e, hljs.tabReplace)
            })
        }
        function h() {
            window.addEventListener("DOMContentLoaded", c, !1), window.addEventListener("load", c, !1)
        }
        var p = {};
        this.LANGUAGES = p, this.highlight = u, this.highlightAuto = a, this.fixMarkup = f, this.highlightBlock = l, this.initHighlighting = c, this.initHighlightingOnLoad = h, this.IR = "[a-zA-Z][a-zA-Z0-9_]*", this.UIR = "[a-zA-Z_][a-zA-Z0-9_]*", this.NR = "\\b\\d+(\\.\\d+)?", this.CNR = "(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", this.BNR = "\\b(0b[01]+)", this.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|\\.|-|-=|/|/=|:|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", this.BE = {
            b: "\\\\[\\s\\S]",
            r: 0
        }, this.ASM = {
            cN: "string",
            b: "'",
            e: "'",
            i: "\\n",
            c: [this.BE],
            r: 0
        }, this.QSM = {
            cN: "string",
            b: '"',
            e: '"',
            i: "\\n",
            c: [this.BE],
            r: 0
        }, this.CLCM = {
            cN: "comment",
            b: "//",
            e: "$"
        }, this.CBLCLM = {
            cN: "comment",
            b: "/\\*",
            e: "\\*/"
        }, this.HCM = {
            cN: "comment",
            b: "#",
            e: "$"
        }, this.NM = {
            cN: "number",
            b: this.NR,
            r: 0
        }, this.CNM = {
            cN: "number",
            b: this.CNR,
            r: 0
        }, this.BNM = {
            cN: "number",
            b: this.BNR,
            r: 0
        }, this.inherit = function(e, t) {
            var n = {};
            for (var r in e) n[r] = e[r];
            if (t) for (var r in t) n[r] = t[r];
            return n
        }
    };

hljs.LANGUAGES.bash = function(e) {
    var t = "true false",
        n = "if then else elif fi for break continue while in do done echo exit return set declare",
        r = {
            cN: "variable",
            b: "\\$[a-zA-Z0-9_#]+"
        },
        i = {
            cN: "variable",
            b: "\\${([^}]|\\\\})+}"
        },
        s = {
            cN: "string",
            b: '"',
            e: '"',
            i: "\\n",
            c: [e.BE, r, i],
            r: 0
        },
        o = {
            cN: "string",
            b: "'",
            e: "'",
            c: [{
                b: "''"
            }],
            r: 0
        },
        u = {
            cN: "test_condition",
            b: "",
            e: "",
            c: [s, o, r, i],
            k: {
                literal: t
            },
            r: 0
        };
    return {
        k: {
            keyword: n,
            literal: t
        },
        c: [{
            cN: "shebang",
            b: "(#!\\/bin\\/bash)|(#!\\/bin\\/sh)",
            r: 10
        },
        r, i, e.HCM, s, o, e.inherit(u, {
            b: "\\[ ",
            e: " \\]",
            r: 0
        }), e.inherit(u, {
            b: "\\[\\[ ",
            e: " \\]\\]"
        })]
    }
}(hljs),
hljs.LANGUAGES.cs = function(e) {
    return {
        k: "abstract as base bool break byte case catch char checked class const continue decimal default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock long namespace new null object operator out override params private protected public readonly ref return sbyte sealed short sizeof stackalloc static string struct switch this throw true try typeof uint ulong unchecked unsafe ushort using virtual volatile void while ascending descending from get group into join let orderby partial select set value var where yield",
        c: [{
            cN: "comment",
            b: "///",
            e: "$",
            rB: !0,
            c: [{
                cN: "xmlDocTag",
                b: "///|<!--|-->"
            }, {
                cN: "xmlDocTag",
                b: "</?",
                e: ">"
            }]
        },
        e.CLCM, e.CBLCLM,
        {
            cN: "preprocessor",
            b: "#",
            e: "$",
            k: "if else elif endif define undef warning error line region endregion pragma checksum"
        }, {
            cN: "string",
            b: '@"',
            e: '"',
            c: [{
                b: '""'
            }]
        },
        e.ASM, e.QSM, e.CNM]
    }
}(hljs),
hljs.LANGUAGES.ruby = function(e) {
    var t = "[a-zA-Z_][a-zA-Z0-9_]*(\\!|\\?)?",
        n = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",
        r = {
            keyword: "and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include"
        },
        i = {
            cN: "yardoctag",
            b: "@[A-Za-z]+"
        },
        s = [{
            cN: "comment",
            b: "#",
            e: "$",
            c: [i]
        }, {
            cN: "comment",
            b: "^\\=begin",
            e: "^\\=end",
            c: [i],
            r: 10
        }, {
            cN: "comment",
            b: "^__END__",
            e: "\\n$"
        }],
        o = {
            cN: "subst",
            b: "#\\{",
            e: "}",
            l: t,
            k: r
        },
        u = [e.BE, o],
        a = [{
            cN: "string",
            b: "'",
            e: "'",
            c: u,
            r: 0
        }, {
            cN: "string",
            b: '"',
            e: '"',
            c: u,
            r: 0
        }, {
            cN: "string",
            b: "%[qw]?\\(",
            e: "\\)",
            c: u
        }, {
            cN: "string",
            b: "%[qw]?\\[",
            e: "\\]",
            c: u
        }, {
            cN: "string",
            b: "%[qw]?{",
            e: "}",
            c: u
        }, {
            cN: "string",
            b: "%[qw]?<",
            e: ">",
            c: u,
            r: 10
        }, {
            cN: "string",
            b: "%[qw]?/",
            e: "/",
            c: u,
            r: 10
        }, {
            cN: "string",
            b: "%[qw]?%",
            e: "%",
            c: u,
            r: 10
        }, {
            cN: "string",
            b: "%[qw]?-",
            e: "-",
            c: u,
            r: 10
        }, {
            cN: "string",
            b: "%[qw]?\\|",
            e: "\\|",
            c: u,
            r: 10
        }],
        f = {
            cN: "function",
            bWK: !0,
            e: " |$|;",
            k: "def",
            c: [{
                cN: "title",
                b: n,
                l: t,
                k: r
            }, {
                cN: "params",
                b: "\\(",
                e: "\\)",
                l: t,
                k: r
            }].concat(s)
        },
        l = s.concat(a.concat([{
            cN: "class",
            bWK: !0,
            e: "$|;",
            k: "class module",
            c: [{
                cN: "title",
                b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?",
                r: 0
            }, {
                cN: "inheritance",
                b: "<\\s*",
                c: [{
                    cN: "parent",
                    b: "(" + e.IR + "::)?" + e.IR
                }]
            }].concat(s)
        },
        f,
        {
            cN: "constant",
            b: "(::)?(\\b[A-Z]\\w*(::)?)+",
            r: 0
        }, {
            cN: "symbol",
            b: ":",
            c: a.concat([{
                b: n
            }]),
            r: 0
        }, {
            cN: "symbol",
            b: t + ":",
            r: 0
        }, {
            cN: "number",
            b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
            r: 0
        }, {
            cN: "number",
            b: "\\?\\w"
        }, {
            cN: "variable",
            b: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))"
        }, {
            b: "(" + e.RSR + ")\\s*",
            c: s.concat([{
                cN: "regexp",
                b: "/",
                e: "/[a-z]*",
                i: "\\n",
                c: [e.BE, o]
            }]),
            r: 0
        }]));
    return o.c = l, f.c[1].c = l, {
        l: t,
        k: r,
        c: l
    }
}(hljs),
hljs.LANGUAGES.diff = function(e) {
    return {
        c: [{
            cN: "chunk",
            b: "^\\@\\@ +\\-\\d+,\\d+ +\\+\\d+,\\d+ +\\@\\@$",
            r: 10
        }, {
            cN: "chunk",
            b: "^\\*\\*\\* +\\d+,\\d+ +\\*\\*\\*\\*$",
            r: 10
        }, {
            cN: "chunk",
            b: "^\\-\\-\\- +\\d+,\\d+ +\\-\\-\\-\\-$",
            r: 10
        }, {
            cN: "header",
            b: "Index: ",
            e: "$"
        }, {
            cN: "header",
            b: "=====",
            e: "=====$"
        }, {
            cN: "header",
            b: "^\\-\\-\\-",
            e: "$"
        }, {
            cN: "header",
            b: "^\\*{3} ",
            e: "$"
        }, {
            cN: "header",
            b: "^\\+\\+\\+",
            e: "$"
        }, {
            cN: "header",
            b: "\\*{5}",
            e: "\\*{5}$"
        }, {
            cN: "addition",
            b: "^\\+",
            e: "$"
        }, {
            cN: "deletion",
            b: "^\\-",
            e: "$"
        }, {
            cN: "change",
            b: "^\\!",
            e: "$"
        }]
    }
}(hljs),
hljs.LANGUAGES.javascript = function(e) {
    return {
        k: {
            keyword: "in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const",
            literal: "true false null undefined NaN Infinity"
        },
        c: [e.ASM, e.QSM, e.CLCM, e.CBLCLM, e.CNM,
        {
            b: "(" + e.RSR + "|\\b(case|return|throw)\\b)\\s*",
            k: "return throw case",
            c: [e.CLCM, e.CBLCLM,
            {
                cN: "regexp",
                b: "/",
                e: "/[gim]*",
                i: "\\n",
                c: [{
                    b: "\\\\/"
                }]
            }, {
                b: "<",
                e: ">;",
                sL: "xml"
            }],
            r: 0
        }, {
            cN: "function",
            bWK: !0,
            e: "{",
            k: "function",
            c: [{
                cN: "title",
                b: "[A-Za-z$_][0-9A-Za-z$_]*"
            }, {
                cN: "params",
                b: "\\(",
                e: "\\)",
                c: [e.CLCM, e.CBLCLM],
                i: "[\"'\\(]"
            }],
            i: "\\[|%"
        }]
    }
}(hljs),
hljs.LANGUAGES.css = function(e) {
    var t = {
        cN: "function",
        b: e.IR + "\\(",
        e: "\\)",
        c: [e.NM, e.ASM, e.QSM]
    };
    return {
        cI: !0,
        i: "[=/|']",
        c: [e.CBLCLM,
        {
            cN: "id",
            b: "\\#[A-Za-z0-9_-]+"
        }, {
            cN: "class",
            b: "\\.[A-Za-z0-9_-]+",
            r: 0
        }, {
            cN: "attr_selector",
            b: "\\[",
            e: "\\]",
            i: "$"
        }, {
            cN: "pseudo",
            b: ":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+"
        }, {
            cN: "at_rule",
            b: "@(font-face|page)",
            l: "[a-z-]+",
            k: "font-face page"
        }, {
            cN: "at_rule",
            b: "@",
            e: "[{;]",
            eE: !0,
            k: "import page media charset",
            c: [t, e.ASM, e.QSM, e.NM]
        }, {
            cN: "tag",
            b: e.IR,
            r: 0
        }, {
            cN: "rules",
            b: "{",
            e: "}",
            i: "[^\\s]",
            r: 0,
            c: [e.CBLCLM,
            {
                cN: "rule",
                b: "[^\\s]",
                rB: !0,
                e: ";",
                eW: !0,
                c: [{
                    cN: "attribute",
                    b: "[A-Z\\_\\.\\-]+",
                    e: ":",
                    eE: !0,
                    i: "[^\\s]",
                    starts: {
                        cN: "value",
                        eW: !0,
                        eE: !0,
                        c: [t, e.NM, e.QSM, e.ASM, e.CBLCLM,
                        {
                            cN: "hexcolor",
                            b: "\\#[0-9A-F]+"
                        }, {
                            cN: "important",
                            b: "!important"
                        }]
                    }
                }]
            }]
        }]
    }
}(hljs),
hljs.LANGUAGES.xml = function(e) {
    var t = "[A-Za-z0-9\\._:-]+",
        n = {
            eW: !0,
            c: [{
                cN: "attribute",
                b: t,
                r: 0
            }, {
                b: '="',
                rB: !0,
                e: '"',
                c: [{
                    cN: "value",
                    b: '"',
                    eW: !0
                }]
            }, {
                b: "='",
                rB: !0,
                e: "'",
                c: [{
                    cN: "value",
                    b: "'",
                    eW: !0
                }]
            }, {
                b: "=",
                c: [{
                    cN: "value",
                    b: "[^\\s/>]+"
                }]
            }]
        };
    return {
        cI: !0,
        c: [{
            cN: "pi",
            b: "<\\?",
            e: "\\?>",
            r: 10
        }, {
            cN: "doctype",
            b: "<!DOCTYPE",
            e: ">",
            r: 10,
            c: [{
                b: "\\[",
                e: "\\]"
            }]
        }, {
            cN: "comment",
            b: "<!--",
            e: "-->",
            r: 10
        }, {
            cN: "cdata",
            b: "<\\!\\[CDATA\\[",
            e: "\\]\\]>",
            r: 10
        }, {
            cN: "tag",
            b: "<style(?=\\s|>|$)",
            e: ">",
            k: {
                title: "style"
            },
            c: [n],
            starts: {
                e: "</style>",
                rE: !0,
                sL: "css"
            }
        }, {
            cN: "tag",
            b: "<script(?=\\s|>|$)",
            e: ">",
            k: {
                title: "script"
            },
            c: [n],
            starts: {
                e: "</script>",
                rE: !0,
                sL: "javascript"
            }
        }, {
            b: "<%",
            e: "%>",
            sL: "vbscript"
        }, {
            cN: "tag",
            b: "</?",
            e: "/?>",
            c: [{
                cN: "title",
                b: "[^ />]+"
            },
            n]
        }]
    }
}(hljs),
hljs.LANGUAGES.http = function(e) {
    return {
        i: "\\S",
        c: [{
            cN: "status",
            b: "^HTTP/[0-9\\.]+",
            e: "$",
            c: [{
                cN: "number",
                b: "\\b\\d{3}\\b"
            }]
        }, {
            cN: "request",
            b: "^[A-Z]+ (.*?) HTTP/[0-9\\.]+$",
            rB: !0,
            e: "$",
            c: [{
                cN: "string",
                b: " ",
                e: " ",
                eB: !0,
                eE: !0
            }]
        }, {
            cN: "attribute",
            b: "^\\w",
            e: ": ",
            eE: !0,
            i: "\\n|\\s|=",
            starts: {
                cN: "string",
                e: "$"
            }
        }, {
            b: "\\n\\n",
            starts: {
                sL: "",
                eW: !0
            }
        }]
    }
}(hljs), 
hljs.LANGUAGES.java = function(e) {
    return {
        k: "false synchronized int abstract float private char boolean static null if const for true while long throw strictfp finally protected import native final return void enum else break transient new catch instanceof byte super volatile case assert short package default double public try this switch continue throws",
        c: [{
            cN: "javadoc",
            b: "/\\*\\*",
            e: "\\*/",
            c: [{
                cN: "javadoctag",
                b: "@[A-Za-z]+"
            }],
            r: 10
        },
        e.CLCM, e.CBLCLM, e.ASM, e.QSM,
        {
            cN: "class",
            bWK: !0,
            e: "{",
            k: "class interface",
            i: ":",
            c: [{
                bWK: !0,
                k: "extends implements",
                r: 10
            }, {
                cN: "title",
                b: e.UIR
            }]
        },
        e.CNM,
        {
            cN: "annotation",
            b: "@[A-Za-z]+"
        }]
    }
}(hljs), 
hljs.LANGUAGES.php = function(e) {
    var t = {
        cN: "variable",
        b: "\\$+[a-zA-Z_-ÿ][a-zA-Z0-9_-ÿ]*"
    },
        n = [e.inherit(e.ASM, {
            i: null
        }), e.inherit(e.QSM, {
            i: null
        }),
        {
            cN: "string",
            b: 'b"',
            e: '"',
            c: [e.BE]
        }, {
            cN: "string",
            b: "b'",
            e: "'",
            c: [e.BE]
        }],
        r = [e.BNM, e.CNM],
        i = {
            cN: "title",
            b: e.UIR
        };
    return {
        cI: !0,
        k: "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return implements parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception php_user_filter default die require __FUNCTION__ enddeclare final try this switch continue endfor endif declare unset true false namespace trait goto instanceof insteadof __DIR__ __NAMESPACE__ __halt_compiler",
        c: [e.CLCM, e.HCM,
        {
            cN: "comment",
            b: "/\\*",
            e: "\\*/",
            c: [{
                cN: "phpdoc",
                b: "\\s@[A-Za-z]+"
            }]
        }, {
            cN: "comment",
            eB: !0,
            b: "__halt_compiler.+?;",
            eW: !0
        }, {
            cN: "string",
            b: "<<<['\"]?\\w+['\"]?$",
            e: "^\\w+;",
            c: [e.BE]
        }, {
            cN: "preprocessor",
            b: "<\\?php",
            r: 10
        }, {
            cN: "preprocessor",
            b: "\\?>"
        },
        t,
        {
            cN: "function",
            bWK: !0,
            e: "{",
            k: "function",
            i: "\\$|\\[|%",
            c: [i,
            {
                cN: "params",
                b: "\\(",
                e: "\\)",
                c: ["self", t, e.CBLCLM].concat(n).concat(r)
            }]
        }, {
            cN: "class",
            bWK: !0,
            e: "{",
            k: "class",
            i: "[:\\(\\$]",
            c: [{
                bWK: !0,
                eW: !0,
                k: "extends",
                c: [i]
            },
            i]
        }, {
            b: "=>"
        }].concat(n).concat(r)
    }
}(hljs), 
hljs.LANGUAGES.python = function(e) {
    var t = {
        cN: "prompt",
        b: "^(>>>|\\.\\.\\.) "
    },
        n = [{
            cN: "string",
            b: "(u|b)?r?'''",
            e: "'''",
            c: [t],
            r: 10
        }, {
            cN: "string",
            b: '(u|b)?r?"""',
            e: '"""',
            c: [t],
            r: 10
        }, {
            cN: "string",
            b: "(u|r|ur)'",
            e: "'",
            c: [e.BE],
            r: 10
        }, {
            cN: "string",
            b: '(u|r|ur)"',
            e: '"',
            c: [e.BE],
            r: 10
        }, {
            cN: "string",
            b: "(b|br)'",
            e: "'",
            c: [e.BE]
        }, {
            cN: "string",
            b: '(b|br)"',
            e: '"',
            c: [e.BE]
        }].concat([e.ASM, e.QSM]),
        r = {
            cN: "title",
            b: e.UIR
        },
        i = {
            cN: "params",
            b: "\\(",
            e: "\\)",
            c: ["self", e.CNM, t].concat(n)
        },
        s = {
            bWK: !0,
            e: ":",
            i: "[${=;\\n]",
            c: [r, i],
            r: 10
        };
    return {
        k: {
            keyword: "and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda nonlocal|10",
            built_in: "None True False Ellipsis NotImplemented"
        },
        i: "(</|->|\\?)",
        c: n.concat([t, e.HCM, e.inherit(s, {
            cN: "function",
            k: "def"
        }), e.inherit(s, {
            cN: "class",
            k: "class"
        }), e.CNM,
        {
            cN: "decorator",
            b: "@",
            e: "$"
        }, {
            b: "\\b(print|exec)\\("
        }])
    }
}(hljs), 
hljs.LANGUAGES.sql = function(e) {
    return {
        cI: !0,
        c: [{
            cN: "operator",
            b: "(begin|start|commit|rollback|savepoint|lock|alter|create|drop|rename|call|delete|do|handler|insert|load|replace|select|truncate|update|set|show|pragma|grant)\\b(?!:)",
            e: ";",
            eW: !0,
            k: {
                keyword: "all partial global month current_timestamp using go revoke smallint indicator end-exec disconnect zone with character assertion to add current_user usage input local alter match collate real then rollback get read timestamp session_user not integer bit unique day minute desc insert execute like ilike|2 level decimal drop continue isolation found where constraints domain right national some module transaction relative second connect escape close system_user for deferred section cast current sqlstate allocate intersect deallocate numeric public preserve full goto initially asc no key output collation group by union session both last language constraint column of space foreign deferrable prior connection unknown action commit view or first into float year primary cascaded except restrict set references names table outer open select size are rows from prepare distinct leading create only next inner authorization schema corresponding option declare precision immediate else timezone_minute external varying translation true case exception join hour default double scroll value cursor descriptor values dec fetch procedure delete and false int is describe char as at in varchar null trailing any absolute current_time end grant privileges when cross check write current_date pad begin temporary exec time update catalog user sql date on identity timezone_hour natural whenever interval work order cascade diagnostics nchar having left call do handler load replace truncate start lock show pragma exists number",
                aggregate: "count sum min max avg"
            },
            c: [{
                cN: "string",
                b: "'",
                e: "'",
                c: [e.BE,
                {
                    b: "''"
                }],
                r: 0
            }, {
                cN: "string",
                b: '"',
                e: '"',
                c: [e.BE,
                {
                    b: '""'
                }],
                r: 0
            }, {
                cN: "string",
                b: "`",
                e: "`",
                c: [e.BE]
            },
            e.CNM]
        },
        e.CBLCLM,
        {
            cN: "comment",
            b: "--",
            e: "$"
        }]
    }
}(hljs),
hljs.LANGUAGES.ini = function(e) {
    return {
        cI: !0,
        i: "[^\\s]",
        c: [{
            cN: "comment",
            b: ";",
            e: "$"
        }, {
            cN: "title",
            b: "^\\[",
            e: "\\]"
        }, {
            cN: "setting",
            b: "^[a-z0-9\\[\\]_-]+[ \\t]*=[ \\t]*",
            e: "$",
            c: [{
                cN: "value",
                eW: !0,
                k: "on off true false yes no",
                c: [e.QSM, e.NM]
            }]
        }]
    }
}(hljs),
hljs.LANGUAGES.perl = function(e) {
    var t = "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when",
        n = {
            cN: "subst",
            b: "[$@]\\{",
            e: "\\}",
            k: t,
            r: 10
        },
        r = {
            cN: "variable",
            b: "\\$\\d"
        },
        i = {
            cN: "variable",
            b: "[\\$\\%\\@\\*](\\^\\w\\b|#\\w+(\\:\\:\\w+)*|[^\\s\\w{]|{\\w+}|\\w+(\\:\\:\\w*)*)"
        },
        s = [e.BE, n, r, i],
        o = {
            b: "->",
            c: [{
                b: e.IR
            }, {
                b: "{",
                e: "}"
            }]
        },
        u = {
            cN: "comment",
            b: "^(__END__|__DATA__)",
            e: "\\n$",
            r: 5
        },
        a = [r, i, e.HCM, u,
        {
            cN: "comment",
            b: "^\\=\\w",
            e: "\\=cut",
            eW: !0
        },
        o,
        {
            cN: "string",
            b: "q[qwxr]?\\s*\\(",
            e: "\\)",
            c: s,
            r: 5
        }, {
            cN: "string",
            b: "q[qwxr]?\\s*\\[",
            e: "\\]",
            c: s,
            r: 5
        }, {
            cN: "string",
            b: "q[qwxr]?\\s*\\{",
            e: "\\}",
            c: s,
            r: 5
        }, {
            cN: "string",
            b: "q[qwxr]?\\s*\\|",
            e: "\\|",
            c: s,
            r: 5
        }, {
            cN: "string",
            b: "q[qwxr]?\\s*\\<",
            e: "\\>",
            c: s,
            r: 5
        }, {
            cN: "string",
            b: "qw\\s+q",
            e: "q",
            c: s,
            r: 5
        }, {
            cN: "string",
            b: "'",
            e: "'",
            c: [e.BE],
            r: 0
        }, {
            cN: "string",
            b: '"',
            e: '"',
            c: s,
            r: 0
        }, {
            cN: "string",
            b: "`",
            e: "`",
            c: [e.BE]
        }, {
            cN: "string",
            b: "{\\w+}",
            r: 0
        }, {
            cN: "string",
            b: "-?\\w+\\s*\\=\\>",
            r: 0
        }, {
            cN: "number",
            b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
            r: 0
        }, {
            b: "(" + e.RSR + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
            k: "split return print reverse grep",
            r: 0,
            c: [e.HCM, u,
            {
                cN: "regexp",
                b: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",
                r: 10
            }, {
                cN: "regexp",
                b: "(m|qr)?/",
                e: "/[a-z]*",
                c: [e.BE],
                r: 0
            }]
        }, {
            cN: "sub",
            bWK: !0,
            e: "(\\s*\\(.*?\\))?[;{]",
            k: "sub",
            r: 5
        }, {
            cN: "operator",
            b: "-\\w\\b",
            r: 0
        }];
    return n.c = a, o.c[1].c = a, {
        k: t,
        c: a
    }
}(hljs),
hljs.LANGUAGES.json = function(e) {
    var t = {
        literal: "true false null"
    },
        n = [e.QSM, e.CNM],
        r = {
            cN: "value",
            e: ",",
            eW: !0,
            eE: !0,
            c: n,
            k: t
        },
        i = {
            b: "{",
            e: "}",
            c: [{
                cN: "attribute",
                b: '\\s*"',
                e: '"\\s*:\\s*',
                eB: !0,
                eE: !0,
                c: [e.BE],
                i: "\\n",
                starts: r
            }],
            i: "\\S"
        },
        s = {
            b: "\\[",
            e: "\\]",
            c: [e.inherit(r, {
                cN: null
            })],
            i: "\\S"
        };
    return n.splice(n.length, 0, i, s), {
        c: n,
        k: t,
        i: "\\S"
    }
}(hljs),
hljs.LANGUAGES.cpp = function(e) {
    var t = {
        keyword: "false int float while private char catch export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long throw volatile static protected bool template mutable if public friend do return goto auto void enum else break new extern using true class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue wchar_t inline delete alignof char16_t char32_t constexpr decltype noexcept nullptr static_assert thread_local restrict _Bool complex",
        built_in: "std string cin cout cerr clog stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr"
    };
    return {
        k: t,
        i: "</",
        c: [e.CLCM, e.CBLCLM, e.QSM,
        {
            cN: "string",
            b: "'\\\\?.",
            e: "'",
            i: "."
        }, {
            cN: "number",
            b: "\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)"
        },
        e.CNM,
        {
            cN: "preprocessor",
            b: "#",
            e: "$"
        }, {
            cN: "stl_container",
            b: "\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
            e: ">",
            k: t,
            r: 10,
            c: ["self"]
        }]
    }
}(hljs);