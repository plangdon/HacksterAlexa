
/**
 * App ID for the skill
 */
var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing steely facts.
 */
var FACTS = [
    "Fagen and Becker were jazz fans who had no use for rock until they heard the Beatles.",
    "Becker and Fagen met at Bard College in Annandale-on-Hudson in upstate New York. The school, and the town, served as the setting in My Old School.",
    "Comedian Chevy Chase also attended Bard and played drums in Becker and Fagen’s band, the Leather Canary.",
    "Becker and Fagen were the bass and keyboard players in the touring band of Jay and the Americans in the late 1960s. Fagen used the pseudonym Tristan Fabriani; Becker was Gus Mahler.",
    "Walter Becker sang on many of their early demos. I sang a lot of the songs because I sang much louder, Becker says, but that ended when  I realized what a great singer he was.",
    "Fagen, who never felt comfortable as a lead singer, could not find anyone else with the smirky feel the music requires. At one point Loudon Wainwright III was asked to join as vocalist but declined.",
    "David Palmer was an early member of Steely Dan who sang lead on Dirty Work and Brooklyn. Palmer sued the band in early 2014, claiming he was cheated on digital performance royalties.",
    "When Do It Again was released in 1972, it was credited on the sleeve as a traditional song even though it was written by Becker and Fagen. You should never believe anything it ever says on a Steely Dan record, says Fagen. It's mostly a bunch of lies and bulls— that we write just to confuse the listener.",
    "Pretzel Logic is about time travel. When it says, I stepped up on the platform / The man gave me the news, we conceived the platform as a teleportation device, Fagen says. And there are other key lines like I've never met Napoleon but I plan to find the time. What we're actually saying is I plan to find the time in that he lived in.",
    "After losing a sports bet, one of the pair had to wear a paper clamp on stage during every show for ten years. Becker says, I'm not going to tell you who won the contest, but that was a mistake.",
    "When Michael McDonald joined Steely Dan in 1975, providing background vocals and keyboards, Fagen voted to make him lead singer but was vetoed.",
    "The songs Becker and Fagen are most tired of playing: Rikki Don’t Lose That Number and Reelin' in the Years.",
    "Steely Dan had decided to reject Kanye West's request to sample Kid Charlemagne for his Champion track. After West sent a heartfelt letter saying that the song was written about his feelings for his father, Becker and Fagen allowed it."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a steely fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your fact: " + randomFact;
    var cardTitle = "Your Fact";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var fact = new Fact();
    fact.execute(event, context);
};
