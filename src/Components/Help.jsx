import React, { Fragment } from "react";
import "../CSS/Help.css";

const Help = () => {
  return (
    <Fragment>
      <div id="help-title" className="help-title">
        <h1>Help</h1>
      </div>
      <hr />
      <div id="help-body" className="help-body">
        <h3>What is Treat Your Shelf?</h3>
        <p>
          Treat Your Shelf is a book sharing app designed to encourage and
          assist reading &amp; sharing amongst people from all walks of life
          without needing to pay a penny.
        </p>
        <hr />
        <h3>How do I begin adding books to my bookshelf?</h3>
        <p>
          On your bookshelf you will see a green button with a plus symbol.
          <br />
          <br />
          Once you click this button you simply need to allow the page to use
          your camera and then you can begin scanning the ISBN code of the book
          you wish to add.
          <br />
          <br />
          The app will then confirm that you have added the book and you may
          choose to either add a new book or return to your bookshelf!
        </p>
        <hr />
        <h3>How can I swap books with another user?</h3>
        <p>
          Simply select the search icon in the Nav bar below and using the
          search fields find a book that you would like to read.
          <br />
          <br />
          View the book and at the bottom of the page select "Request Swap". The
          owner will then receive your request and must confirm the swap. This
          can be viewed in the "Exchanges" section by clicking on the Nav bar
          below.
          <br />
          <br />
          After the swap is confirmed, you can arrange the method of the swap
          using the Messages which can also be found on the Nav Bar.
          <br />
          <br />
          Simple!
        </p>
        <hr />
        <h3>I'm experiencing a problem with the app!</h3>
        <p>
          Oh no! We're very sorry for any issues you experience using Treat Yo
          Shelf.
          <br />
          <br />
          Whilst being extremely gifted programmers, even we cannot forsee every
          issue!
          <br />
          <br />
          Please contact us at:
          <br />
          <a href="mailto: thisemaildoesntactuallyexistlol@treatyoshelf.com">
            bugs@treatyourshelf.com
          </a>
          <br />
          and we will aim to fix your issue ASAP!
        </p>
      </div>
    </Fragment>
  );
};

export default Help;
