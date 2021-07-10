import React from 'react';
import List from '@material-ui/core/List';

// ⬇ This component doesn't do much - just plain HTML.

function AboutPage() {
  return (
    <div className="container">
      <div>
        <p>This applicaiton was made in two weeks with these technologies:</p>
        <List>
          <li>React</li>
          <li>Redux</li>
          <li>Redux-Saga</li>
          <li>HTML</li>
          <li>CSS</li>
          <li>Javascript</li>
          <li>Node.js</li>
          <li>Express</li>
          <li>PostgreSQL</li>
          <li>am4charts</li>
          <li>Material-ui</li>
          <li>react-masonry-css</li>
        </List>
        <br />
        <p>A huge shoutout to my instructor, Dane. Thank you for downloading all this
          code into my brain and for talking things out with me when the bees buzzed too
          loud.
        </p>
        <br />
        <p>And to my co-parent and partner, Isaac - thank you for being you. Word cannot express 
          how thankful I am that you were willing to take the large brunt of parenting our tiny
          hoomans while I furthered my career.
        </p>
        <br />
        <p>Have any feedback to give on this app? Please email me at mary.mettille.brist@gmail.com.</p>
      </div>
    </div>
  );
}

export default AboutPage;
