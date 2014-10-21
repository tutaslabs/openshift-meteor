#!/bin/env node
var fs = require('fs')

// Setup env
process.env.ROOT_URL = "http://"+process.env.OPENSHIFT_APP_DNS || "http://localhost";
process.env.MONGO_URL = (process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME) || "mongodb://localhost:27017/meteor";
process.env.PORT = process.env.OPENSHIFT_DIY_PORT || 8000;
process.env.BIND_IP = process.env.OPENSHIFT_DIY_IP || '127.0.0.1';

// Show connection details on startup
console.log("MONGO_URL IS: " + process.env.MONGO_URL);
console.log("ROOT_URL IS: " + process.env.ROOT_URL);
console.log("PORT: " + process.env.PORT);
console.log("BIND_IP: " + process.env.BIND_IP);

fs.stat('main.js', function(err, stat) {
// if the meteor application bundle is missing, 
// return additional installation instructions:
if(!err)
{
  // Start meteor server
  require('./main.js');
}else{
  var http = require('http');
  // Start a server that returns a short list of instructions
  var dev_instructions = "<body><h1>Half way there! - Next Steps&hellip;</h2><h2>Create a Meteor.js example project</h2> <p>To see a list of all available meteor.js example projects, type <code>meteor create --list</code>.</p> <p>In this guide, we'll use the meteor.js \"leaderboard\" example:</p> <pre><code>meteor create --example leaderboard </code></pre> <p>See <a href=\"http://meteor.com/examples/\">http://meteor.com/examples/</a> to learn about what other example applications are available.  Feel free to try them all.</p> <h2>Bundle and merge your meteor.js code</h2> <p>Bundle up your meteor application source:</p> <pre><code>cd leaderboard # if you chose the leaderboard example \nmeteor bundle bundle.tar.gz # to prep for deployment </code></pre> <p>Next, you'll need to extract the resulting code into your OpenShift application folder (minus the \"bundle/\" folder wrapper that Meteor will automatically include).  Use the <code>-k</code> flag when extracting to prevent the existing DB connection code from being overwritten during this merge process.</p> <p>If you are developing on Linux, or using GNU tar, this command should work:</p> <pre><code>tar -xvf bundle.tar.gz --transform 's|^bundle/||' -C ../meteor/ </code></pre> <p>For Mac or BSD-based operating systems:</p> <pre><code>tar -xvf bundle.tar.gz -s '/^bundle//' -C ../meteor/ </code></pre> <p>The above example assumes that you named your OpenShift application \"meteor\", as shown in the <code>rhc app create</code> step.  And, that your OpenShift application source code is available at this relative path: <code>../meteor</code></p> <p>Add these new files to your OpenShift application's Git repo:</p> <pre><code>cd ../meteor \ngit add . \ngit commit -am \"Adding a meteor.js application bundle\" </code></pre> <h2>Deploy to OpenShift</h2> <p>Then, push the new code to OpenShift to deploy your meteor.js application bundle:</p> <pre><code>git push </code></pre> <p>That's it! Check out your new Meteor.js application at:</p> <a href='http://"+process.env.OPENSHIFT_APP_DNS+"'><pre><code>http://"+process.env.OPENSHIFT_APP_DNS+"</code></a></pre><p>The latest version of this guide is available at: <a href='https://github.com/openshift-quickstart/openshift-meteorjs-quickstart'>http://github.com/openshift-quickstart/openshift-meteorjs-quickstart</a></body>";
  http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(dev_instructions);
}).listen(process.env.PORT, process.env.BIND_IP);
  console.log('Server running at http://' + process.env.BIND_IP + ":" + process.env.PORT); 
}
});
