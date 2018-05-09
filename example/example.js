const ting = require('..');

const dirty = `
<script>alert(1)</script>
<img src="x.jpg" onclick="alert(1)"/>
<img src="cool.jpg"/>
<figcaption>caption</figcaption>
`;

const safe = ting.sanitize(dirty);
console.log(safe);
/** Prints
  <img src="x.jpg" />
  <img src="cool.jpg" />
  <figcaption>caption</figcaption>
 */
