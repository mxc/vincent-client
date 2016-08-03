# vincent-client
This is a demo client for Vincent. To use it you may need to edit the file src/Vincentc.js and change the default port 
of 1979 to connect to the vincent server. You should be able to provide a "-h <ip address>" option to connect to a remote server
otherwise it defaults to looking at localhost.

The client isn't very robust - the backspace doesn't work if you make a typo on login. As stated, this is a simple client 
we created to connect via tls and test the Vincent server. We hope to write a C based on later. 
