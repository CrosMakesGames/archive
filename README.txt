THE CROSMAKESGAMES ARCHIVE
=========================

A static site - no build step, no dependencies. Drop it on any host
(GitHub Pages, Neocities, anything) and it works.

FILES
-----
index.html          The Timeline page
snapshots.html      The Snapshots page (collapsible project sections)
timeline-data.js    Edit this to add timeline entries
timeline-assets/    Images shown next to timeline entries (see image field)
snapshots-data.js   Edit this to register snapshots
snapshots/          One folder per snapshot, e.g. "horion 6-12-26"
snapshot-zips/      One zip per snapshot, e.g. "horion_8-17-26_16.zip"
snapshot-sidebar.js  Sidebar overlay injected into snapshot pages
logo.png favicon.ico

NAVBAR
------
Timeline  -> index.html, jumps past the description straight to the entries
            (timeline snapshot links go to snapshots/<folder>/index.html)
Snapshots -> snapshots.html
Random    -> picks a random snapshot and opens it (reads snapshots-data.js)

HOW TO ADD A TIMELINE ENTRY
---------------------------
Open timeline-data.js, copy a block, paste it at the TOP of the list
(newest first), fill in date / title / description / color, and set
snapshot: true + snapshotFolder if you want the blue "View snapshot" link,
and image: "file.png" (optional) to show a picture from timeline-assets/
on the opposite side of the line. That's it - the page renders itself.

HOW TO ADD A SNAPSHOT
---------------------
1. Create  snapshots/<project> <date>/   e.g. snapshots/crosmakesgames 8-26-26/
   and put EVERY file of that version inside it. The folder's index.html
   is the snapshot page people land on.
2. Create a manifest.json inside the folder with a "title" and a
   "description" object - the sidebar overlay shows these:
       { "title": "crosmakesgames.com - new homepage",
         "description": "What this version is / what changed." }
3. Add this just before </body> in the folder's index.html so the
   sidebar shows up (keep the inline manifest - it works even when
   the page is opened straight from disk, which fetching
   manifest.json does not):
       <script>
           window.CMG_SNAPSHOT_MANIFEST = {
               title: "crosmakesgames.com - new homepage",
               description: "What this version is / what changed."
           };
       </script>
       <script src="../../snapshot-sidebar.js" defer></script>
4. Zip the folder contents and drop it in snapshot-zips/ as
   <project>_<date>.zip   e.g. crosmakesgames_8-26-26.zip
5. Add the entry in snapshots-data.js under the right project
   (date, method, folder, zip). New project? New project block with a color.

Both the snapshot bubbles and the Random link update automatically.

HOW SNAPSHOTS OPEN
-----------------
Clicking a snapshot bubble (or Random) goes straight to
snapshots/<folder>/index.html - the real page, not an iframe. The
sidebar overlays the RIGHT side of it: manifest title + description,
a back-to-archive link, and an arrow on its left edge. The arrow closes
the sidebar, and it stays closed until the tab is refreshed.

NOTES
-----
- Every snapshot folder should have a manifest.json (title +
  description), an index.html, and the sidebar script line in it.
- Folder names use spaces ("crosmakesgames 8-26-26"); zip names use underscores
  ("horion_6-12-26.zip"). The site handles the URL encoding for you.
- All the snapshots that ship with the site were generated from the
  git history of the real repos: horion (77 commits), horionexp
  (74), crosmakesgames.github.io (18), conwaysgameoflife (4) and
  the launcher commits from the horion repo (4). Every commit = one snapshot, same-day
  snapshots get 1, 2, 3... after the date. The launcher snapshots
  contain ONLY the launcher files, at the snapshot root - that's
  their own project section on the Snapshots page.
- Each snapshot's manifest also carries the museum stats shown in
  the sidebar: the date, the commit hash, lines committed (+/-),
  new characters written, and - for the horion sites - the exact
  version info from the page itself (build number, version tag,
  branch, and the RECENT CHANGES log).
- Repo-initial commits had no index.html yet, so those snapshots have
  a small archive-generated note page instead of a real one. Every
  other snapshot is the real page from that commit, untouched except
  for the injected manifest + sidebar lines at the bottom.
- The timeline line runs down the middle: text flips sides every entry,
  images sit opposite the text.
- Everything is pure ASCII - safe for any editor/host.
