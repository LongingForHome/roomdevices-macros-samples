const xapi = require('xapi');

// Function to handle UI click events
function onGuiEvent(event)
{
  // Check for the button press of the webex_start icon
  if (event.PanelId === "webex_start")
  {
    xapi.command('UserInterface Message TextInput Display', {FeedbackId: "webexStart", Text:"For LU Webex meetings, enter the meeting number. For external Webex meetings, enter the full video address.", Placeholder:"Meeting number or video address...", SubmitText:"Start", Title:"Join a Webex Meeting"});
  }
}

// Function to handle TextInput response events
function textInputHandler(event)
{
  // Check for the webexStart feedback event  
  if (event.FeedbackId === "webexStart")
  {
    // If there is no @ symbol, then append your company's webex domain to the meeting number
    if (event.Text.search("@") == -1)
    {
      xapi.command('Dial', {Number: event.Text + "@<your company webex domain>.webex.com"});
    }
    // If there is an @ symbol, then treat it like a standard Webex SIP video dial in
    else
    {
      xapi.command('Dial', {Number: event.Text}); 
    }
  }
}

// Register the functions as event handlers
xapi.event.on('UserInterface Extensions Panel Clicked', onGuiEvent);
xapi.event.on('UserInterface Message TextInput Response', textInputHandler);

