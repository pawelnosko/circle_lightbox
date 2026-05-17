<h1>Circle Lightbox</h1>
<p>Modern jQuery lightbox plugin with animated expanding circle backdrop, fullscreen morph effect, dynamic gradients, gallery navigation, and smooth bounce-in image transitions.</p>
<p>Created by Paweł Nosko.</p>
<h2>✨ Features</h2>
<ul>
<li>Animated expanding circle backdrop</li>
<li>Smooth fullscreen morph transition</li>
<li>Dynamic animated gradient background</li>
<li>Bounce-in image animations</li>
<li>Gallery support</li>
<li>Prev / next navigation</li>
<li>Keyboard controls</li>
<li>Responsive design</li>
<li>Lightweight and easy to integrate</li>
<li>Font Awesome support</li>
<li>Modern premium UI feeling</li>
</ul>
<h1>🎬 Live Demo, Video &amp; Download</h1>
<p>Project page with:</p>
<ul>
<li>live demo,</li>
<li>video presentation,</li>
<li>ZIP package download,</li>
<li>implementation examples.</li>
</ul>
<p><a href="https://pawelnosko.com/js-frontend-tools/circle-lightbox-a-modern-jquery-lightbox-with-circle-animation-gradient-and-morph-effect">Circle Lightbox &mdash; Official Project Page</a></p>
<h1>📦 Installation</h1>
<h2>1. Include CSS</h2>
<pre><code>&lt;link rel="stylesheet" href="jquery.circle-lightbox.css" /&gt;</code></pre>
<h2>2. Include jQuery</h2>
<pre><code>&lt;script src="https://code.jquery.com/jquery-3.7.1.min.js"&gt;&lt;/script&gt;</code></pre>
<h2>3. Include plugin JS</h2>
<pre><code>&lt;script src="jquery.circle-lightbox.js"&gt;&lt;/script&gt;</code></pre>
<h1>🚀 Basic Usage</h1>
<h2>HTML</h2>
<pre><code>&lt;div class="gallery" id="demo-gallery"&gt;<br /><br /> &lt;a href="image-1.jpg" data-clb-gallery="demo"&gt;<br /> &lt;img src="thumb-1.jpg" alt="Image 1"&gt;<br /> &lt;/a&gt;<br /><br /> &lt;a href="image-2.jpg" data-clb-gallery="demo"&gt;<br /> &lt;img src="thumb-2.jpg" alt="Image 2"&gt;<br /> &lt;/a&gt;<br /><br /> &lt;a href="image-3.jpg" data-clb-gallery="demo"&gt;<br /> &lt;img src="thumb-3.jpg" alt="Image 3"&gt;<br /> &lt;/a&gt;<br /><br />&lt;/div&gt;</code></pre>
<h2>JavaScript</h2>
<pre><code>$('#demo-gallery').circleLightbox({<br /> colors: ['#322658', '#7664b3'],<br /> morphToRect: true,<br /> openDuration: 650<br />});</code></pre>
<h1>⚙️ Configuration Options</h1>
<table>
<thead>
<tr>
<th>Option</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>colors</code></td>
<td>Array</td>
<td><code>['#1a1a2e','#16213e']</code></td>
<td>Gradient colors</td>
</tr>
<tr>
<td><code>selector</code></td>
<td>String</td>
<td><code>'a[href]'</code></td>
<td>Trigger selector</td>
</tr>
<tr>
<td><code>galleryAttr</code></td>
<td>String</td>
<td><code>'data-clb-gallery'</code></td>
<td>Gallery grouping attribute</td>
</tr>
<tr>
<td><code>imageSelector</code></td>
<td>String</td>
<td><code>'img'</code></td>
<td>Image selector</td>
</tr>
<tr>
<td><code>closeDuration</code></td>
<td>Number</td>
<td><code>380</code></td>
<td>Close animation duration</td>
</tr>
<tr>
<td><code>openDuration</code></td>
<td>Number</td>
<td><code>600</code></td>
<td>Open animation duration</td>
</tr>
<tr>
<td><code>morphToRect</code></td>
<td>Boolean</td>
<td><code>true</code></td>
<td>Enable morph effect</td>
</tr>
<tr>
<td><code>useFontAwesome</code></td>
<td>Boolean</td>
<td><code>false</code></td>
<td>Enable Font Awesome icons</td>
</tr>
</tbody>
</table>
<h1>🎨 How the Animation Works</h1>
<p>Circle Lightbox uses a multi-stage animation process:</p>
<ol>
<li>User clicks image thumbnail</li>
<li>Small animated circle appears</li>
<li>Circle expands fullscreen</li>
<li>Animated gradient background activates</li>
<li>Circle morphs into fullscreen rectangle</li>
<li>Image appears with bounce-in animation</li>
</ol>
<p>The plugin combines:</p>
<ul>
<li>CSS keyframes,</li>
<li>cubic-bezier easing,</li>
<li>dynamic backdrop transitions,</li>
<li>smooth image stage animations.</li>
</ul>
<h1>🖼 Gallery Support</h1>
<p>To create galleries, simply use:</p>
<pre><code>data-clb-gallery="gallery-name"</code></pre>
<p>Example:</p>
<pre><code>&lt;a href="image.jpg" data-clb-gallery="portfolio"&gt;</code></pre>
<p>You can create multiple independent galleries on the same page.</p>
<h1>⌨️ Keyboard Controls</h1>
<table>
<thead>
<tr>
<th>Key</th>
<th>Action</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>ESC</code></td>
<td>Close lightbox</td>
</tr>
<tr>
<td><code>&larr;</code></td>
<td>Previous image</td>
</tr>
<tr>
<td><code>&rarr;</code></td>
<td>Next image</td>
</tr>
</tbody>
</table>
<h1>📱 Responsive Design</h1>
<p>The plugin is fully responsive and optimized for:</p>
<ul>
<li>mobile devices,</li>
<li>tablets,</li>
<li>desktop screens,</li>
<li>fullscreen layouts.</li>
</ul>
<p>Responsive styles automatically adjust:</p>
<ul>
<li>navigation buttons,</li>
<li>spacing,</li>
<li>close button size,</li>
<li>image scaling.</li>
</ul>
<h1>🔥 Font Awesome Support</h1>
<p>Enable Font Awesome icons:</p>
<pre><code>$('#demo-gallery').circleLightbox({<br /> useFontAwesome: true<br />});</code></pre>
<p>Close button will automatically render using:</p>
<pre><code>&lt;i class="fa fa-times"&gt;&lt;/i&gt;</code></pre>
<h1>🎯 Example with Full Configuration</h1>
<pre><code>$('#demo-gallery').circleLightbox({<br /><br /> colors: ['#322658', '#7664b3'],<br /><br /> selector: 'a[href]',<br /><br /> galleryAttr: 'data-clb-gallery',<br /><br /> imageSelector: 'img',<br /><br /> closeDuration: 380,<br /><br /> openDuration: 650,<br /><br /> morphToRect: true,<br /><br /> useFontAwesome: false<br /><br />});</code></pre>
<h1>🧠 Built With</h1>
<ul>
<li>jQuery</li>
<li>CSS3 animations</li>
<li>CSS keyframes</li>
<li>Modern UI animation techniques</li>
<li>Responsive design principles</li>
</ul>
<h1>💡 Perfect For</h1>
<p>Circle Lightbox works perfectly for:</p>
<ul>
<li>portfolios,</li>
<li>agency websites,</li>
<li>eCommerce stores,</li>
<li>product presentations,</li>
<li>landing pages,</li>
<li>galleries,</li>
<li>modern blogs,</li>
<li>premium UI projects.</li>
</ul>
<h1>⚡ Performance</h1>
<p>The plugin was designed to stay:</p>
<ul>
<li>lightweight,</li>
<li>smooth,</li>
<li>visually modern,</li>
<li>easy to implement,</li>
<li>animation focused.</li>
</ul>
<p>No heavy dependencies beyond jQuery.</p>
<h1>👨&zwj;💻 Author</h1>
<p>Created by Paweł Nosko.</p>
<p>Official project page:</p>
<p><a href="https://pawelnosko.com/js-frontend-tools/circle-lightbox-a-modern-jquery-lightbox-with-circle-animation-gradient-and-morph-effect">pawelnosko.com &mdash; Circle Lightbox Project Page</a></p>
