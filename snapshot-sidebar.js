(function () {
    if (window.__cmgSidebarLoaded) return;
    window.__cmgSidebarLoaded = true;

        var style = document.createElement('style');
    style.textContent =
        "@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=JetBrains+Mono:wght@400;500;700;800&display=swap');" +
        "#cmg-snapshot-bar { position: fixed; top: 0; right: 0; height: 100%; width: 320px; max-width: 85vw; box-sizing: border-box; background: #FDFBF7; border-left: 4px solid #000; z-index: 99999; padding: 0; font-family: 'JetBrains Mono', monospace; }" +
        "#cmg-snapshot-bar .cmg-bar-inner { height: 100%; overflow-y: auto; box-sizing: border-box; padding: 22px 20px 28px; }" +
        "#cmg-snapshot-bar .cmg-back { display: inline-block; font-family: 'Press Start 2P', cursive; font-size: 9px; line-height: 1.5; color: #1D61E8; text-decoration: none; border: 2px solid #000; padding: 9px 12px; background: #fff; box-shadow: 3px 3px 0px 0px rgba(0,0,0,1); transition: all 0.15s; }" +
        "#cmg-snapshot-bar .cmg-back:hover { background: #FFD166; color: #000; transform: translate(-1px, -1px); box-shadow: 4px 4px 0px 0px rgba(0,0,0,1); }" +
        "#cmg-snapshot-bar .cmg-bar-meta { font-size: 10px; font-weight: 700; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin: 20px 0 10px; }" +
        "#cmg-snapshot-bar .cmg-bar-title { font-family: 'Press Start 2P', cursive; font-size: 13px; line-height: 1.6; color: #000; margin: 0 0 12px; word-break: break-word; }" +
        "#cmg-snapshot-bar .cmg-bar-desc { font-size: 13px; color: #444; line-height: 1.7; margin: 0 0 6px; }" +
        "#cmg-snapshot-bar .cmg-bar-stats { margin-top: 18px; border-top: 3px solid #000; }" +
        "#cmg-snapshot-bar .cmg-stat { padding: 12px 0 10px; border-bottom: 1px dashed #bbb; }" +
        "#cmg-snapshot-bar .cmg-stat:last-child { border-bottom: none; }" +
        "#cmg-snapshot-bar .cmg-stat-label { font-family: 'Press Start 2P', cursive; font-size: 8px; line-height: 1.5; color: #666; letter-spacing: 0.5px; margin-bottom: 7px; }" +
        "#cmg-snapshot-bar .cmg-stat-value { font-size: 12px; font-weight: 700; color: #000; line-height: 1.6; word-break: break-word; white-space: pre-wrap; }" +
        "#cmg-snapshot-bar #cmg-bar-close { position: absolute; left: -22px; top: 50%; transform: translateY(-50%); width: 44px; height: 44px; border: 3px solid #000; background: #FDFBF7; font-family: 'Press Start 2P', cursive; font-size: 12px; color: #000; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 3px 3px 0px 0px rgba(0,0,0,1); padding: 0; transition: all 0.15s; }" +
        "#cmg-snapshot-bar #cmg-bar-close:hover { background: #FF6B6B; transform: translateY(-50%) translate(-2px, -2px); box-shadow: 5px 5px 0px 0px rgba(0,0,0,1); }" +
        "#cmg-snapshot-bar #cmg-bar-close:active { transform: translateY(-50%) translate(2px, 2px); box-shadow: 1px 1px 0px 0px rgba(0,0,0,1); }";
    document.head.appendChild(style);

        var bar = document.createElement('div');
    bar.id = 'cmg-snapshot-bar';
    bar.innerHTML =
        '<button id="cmg-bar-close" title="Close sidebar" aria-label="Close sidebar">&#9658;</button>' +
        '<div class="cmg-bar-inner">' +
        '    <a class="cmg-back" href="../../snapshots.html">&#9668; archive</a>' +
        '    <div class="cmg-bar-meta" id="cmg-bar-meta">snapshot</div>' +
        '    <h3 class="cmg-bar-title" id="cmg-bar-title">Snapshot</h3>' +
        '    <p class="cmg-bar-desc" id="cmg-bar-desc"></p>' +
        '    <div class="cmg-bar-stats" id="cmg-bar-stats"></div>' +
        '</div>';
    document.body.appendChild(bar);

    var titleEl = document.getElementById('cmg-bar-title');
    var descEl = document.getElementById('cmg-bar-desc');
    var metaEl = document.getElementById('cmg-bar-meta');
    var statsEl = document.getElementById('cmg-bar-stats');

    function esc(t) {
        var d = document.createElement('div');
        d.textContent = String(t == null ? '' : t);
        return d.innerHTML;
    }

        function applyManifest(m) {
        if (!m) m = {};
        titleEl.textContent = m.title || 'Snapshot';
        descEl.textContent = m.description || '';
        metaEl.textContent = (m.project ? m.project.toLowerCase() + ' ' : '') + 'snapshot';

                var rows = [];
        if (m.date)    rows.push(['DATE', m.date]);
        if (m.commit)  rows.push(['COMMIT', m.commit]);
        if (m.lines)   rows.push(['LINES COMMITTED', m.lines]);
        if (m.chars)   rows.push(['NEW CHARACTERS', m.chars]);
        if (m.version) rows.push(['VERSION INFO', m.version]);
        statsEl.innerHTML = rows.map(function (r) {
            return '<div class="cmg-stat">' +
                '<div class="cmg-stat-label">' + esc(r[0]) + '</div>' +
                '<div class="cmg-stat-value">' + esc(r[1]) + '</div>' +
                '</div>';
        }).join('');
    }

                            var inline = window.CMG_SNAPSHOT_MANIFEST;
    if (inline && (inline.title || inline.description)) {
        applyManifest(inline);
    } else {
        fetch('manifest.json')
            .then(function (r) { return r.ok ? r.json() : null; })
            .then(function (m) {
                if (m) {
                    applyManifest(m);
                } else {
                    applyManifest({
                        description: 'No manifest info found for this snapshot. Add window.CMG_SNAPSHOT_MANIFEST to its index.html.'
                    });
                }
            })
            .catch(function () {
                applyManifest({
                    description: 'Could not read the manifest for this snapshot. Add window.CMG_SNAPSHOT_MANIFEST to its index.html - that works even when opened straight from disk.'
                });
            });
    }

        document.getElementById('cmg-bar-close').addEventListener('click', function () {
        bar.remove();
    });
})();
